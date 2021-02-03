import React from 'react';

export function DataTable({ setStatus }) {
    const [rows, setRows] = React.useState([]);
    const [variables, setVariables] = React.useState(["x", "y"]);
    const [ar1, setAr1] = React.useState(undefined);
    const [ar2, setAr2] = React.useState(undefined);

    const updateVars = (e) => {
        //setRows(...rows, event.target.message)
        //if (!event || !(event.target instanceof Event)) return;

        if (!e.target.value || !e.target.attributes["data-target"]) {
            setStatus({msg: "Variable cannot be empty", success: false});
            return;
        }
        const vars = variables.slice();
        if (e.target.attributes["data-target"].value === "var1") {
            vars[0] = e.target.value;
        }
        if (e.target.attributes["data-target"].value === "var2") {
            vars[1] = e.target.value;
        }
        setVariables(vars);
        setStatus({msg: "", success: true});
    }

    const arChange = (e) => {
        if (!e.target.value) {
            setStatus({msg: "No data provided", success: false});
            return;
        }
        if (!/^\d+$/.test(e.target.value)) {
            setStatus({msg: "Variable value not a number", success: false});
            return;
        }
        const v = parseInt(e.target.value, 10);
        if (e.target.attributes["data-target"].value === "0") {
            setAr1(e.target.value);
        }
        if (e.target.attributes["data-target"].value === "1") {
            setAr2(e.target.value);
        }
        setStatus({msg: "", success: true});
    }

    const handleAddClick = () => {
        if (!ar1 || !ar2) {
            setStatus({msg: "Not all fields filled", success: false});
            return;
        }
        const rs = rows.slice();
        rs.push([ar1,ar2]);
        setAr1("");
        setAr2("");
        setRows(rs);
        setStatus({msg: "Row added", success: true});
    }

    const handleInputFocus = (event) => event.target.select();

    return (
        <section>
            <table className="data-table" style={{border: "solid 2px black", margin: "auto", marginTop: 20, marginBottom: 20}}>
                <thead style={{border: "solid 2px black"}}>
                    <tr>
                        <th><input data-target="var1" type="text" name={variables[0]} placeholder="Variable Name" value={variables[0]} onChange={updateVars} onFocus={handleInputFocus} /></th>
                        <th><input data-target="var2" type="text" name={variables[1]} placeholder="Variable Name" value={variables[1]} onChange={updateVars} onFocus={handleInputFocus} /></th>
                    </tr>
                </thead>
                <tbody style={{border: "solid 2px black"}}>
                    {rows.map((r, i) => (
                        <tr key={`row-${i}`}>
                            {r.map((rx, i2) => (
                                <td key={`entry-${i2}`} data-target={`${i}-${i2}`} >
                                    <input type="text" value={rx} />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="adder-box">
                <div>
                    <label htmlFor={variables[0]} style={{marginRight: 5}}>{variables[0]}</label>
                    <input data-target={`0`} type="text" name={variables[0]} placeholder={variables[0]} onChange={arChange} value={ar1}/>
                </div>
                <div>
                    <label htmlFor={variables[1]} style={{marginRight: 5}}>{variables[1]}</label>
                    <input data-target={`1`} type="text" name={variables[1]} placeholder={variables[1]} onChange={arChange} value={ar2}/>
                </div>
                <button id="data-input-button" onClick={handleAddClick}>
                    Add Row
                </button>
            </div>
        </section>
    )
}