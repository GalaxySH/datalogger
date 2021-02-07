import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/pro-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/pro-duotone-svg-icons';
//import { faTrashAlt } from '@fortawesome/pro-light-svg-icons';

export function DataTable({ setStatus, rows, setRows, variables, setVariables }) {
    const [ar1, setAr1] = React.useState("");
    const [ar2, setAr2] = React.useState("");
    const [title] = React.useState({
        title: {
            text: "Data Graph"
        }
    });
    const [series, setSeries] = React.useState({
        series: [{
            name: "Tabled Data",
            data: []
        }]
    });
    const [xAxis, setXAxis] = React.useState({
        xAxis: {
            title: {
                text: "x"
            }
        }
    });
    const [yAxis, setYAxis] = React.useState({
        yAxis: {
            title: {
                text: "y"
            }
        }
    });
    /*const [chart, setChart] = React.useState(Object.assign(title, series, xAxis, yAxis));
    React.useEffect(() => {
        setChart(Object.assign(title, series, xAxis, yAxis))
        console.log("charted: ", JSON.stringify(chart))
    }, [title, series, xAxis, yAxis, chart]);*/
    const ar1Ref = React.useRef();
    const ar2Ref = React.useRef();
    const dataBodyRef = React.useRef();
    const [drBottom, setDrBottom] = React.useState(false);

    const updateVars = (e) => {
        //setRows(...rows, event.target.message)
        //if (!event || !(event.target instanceof Event)) return;

        if (!e.target.value || !e.target.attributes["data-target"]) {
            setStatus({msg: "Variable cannot be empty", success: false});
            //return;
            e.target.value = "v";
        }
        const vars = variables.slice();
        if (e.target.attributes["data-target"].value === "var1") {
            vars[0] = e.target.value;
            setXAxis({
                xAxis: {
                    title: {
                        text: e.target.value
                    }
                }
            })
        }
        if (e.target.attributes["data-target"].value === "var2") {
            vars[1] = e.target.value;
            setYAxis({
                yAxis: {
                    title: {
                        text: e.target.value
                    }
                }
            })
        }
        setVariables(vars);
        setStatus({msg: "", success: true});
    }

    const arChange = (e) => {
        if (!e.target.value) {
            const v = e.target.value;
            if (e.target.attributes["data-target"].value === "0") {
                setAr1(v);
            }
            if (e.target.attributes["data-target"].value === "1") {
                setAr2(v);
            }
            return;
        }
        if (/^-?\d+\.$/.test(e.target.value) && ar1Ref.current && ar2Ref.current) {
            //setStatus({msg: "No data provided", success: false});
            const v = e.target.value;
            const pos = `${v}0`.indexOf(".") + 1;
            if (e.target.attributes["data-target"].value === "0") {
                setAr1(`${v}0`);
                setTimeout(() => {
                    ar1Ref.current.focus();
                    ar1Ref.current.setSelectionRange(pos, pos);
                }, 20);
            }
            if (e.target.attributes["data-target"].value === "1") {
                setAr2(`${v}0`);
                setTimeout(() => {
                    ar2Ref.current.focus();
                    ar2Ref.current.setSelectionRange(pos, pos);
                }, 20);
            }
            return;
        }
        if (!/^-?\d+(\.\d+)?$/.test(e.target.value)) {
            setStatus({msg: "Variable value not a number", success: false});
            return;
        }
        //const v = parseInt(e.target.value, 10);
        const v = e.target.value;
        if (e.target.attributes["data-target"].value === "0") {
            setAr1(v);
        }
        if (e.target.attributes["data-target"].value === "1") {
            setAr2(v);
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

        ar1Ref.current && ar1Ref.current.focus();
        
        const mappedrs = rs.map(x => {
            return x.map(x1 => parseInt(x1, 10));
        })
        setTimeout(() => {
            setSeries({
                series: [{
                    name: "Tabled Data",
                    data: [...mappedrs]
                }]
            })
        }, 500)
    }

    const handleInputFocus = (event) => event.target.select();

    const setEntryChange = (row, entry, value) => {
        const rs = rows.slice();
        if (rs.length && rs[row] && rs[row][entry]) {
            rs[row][entry] = value;
        }
        setRows(rs);
        const mappedrs = rs.map(x => {
            return x.map(x1 => parseInt(x1, 10));
        })
        setStatus({msg: "", success: true});
        setTimeout(() => {
            setSeries({
                series: [{
                    name: "Tabled Data",
                    data: [...mappedrs]
                }]
            })
        }, 200)
    }

    const handleEntryChange = (e) => {
        if (!e.target.value) {
            setStatus({msg: "Entry value cannot be null", success: false});
            return;
        }
        if (!/^-?\d+(\.?\d*)?$/.test(e.target.value)) {
            setStatus({msg: "Entry value must be a number", success: false});
            return;
        }
        //const v = parseInt(e.target.value, 10);
        const v = e.target.value;
        if (e.target.attributes["data-target"].value.split("-").length !== 2) {
            setStatus({msg: "No target", success: false});
            return;
        }
        const t = e.target.attributes["data-target"].value.split("-");
        setEntryChange(t[0], t[1], v);
    }

    const addRowKeyPressed = (e) => {
        const code = e.keyCode || e.which;
        if (code === 13) {
            handleAddClick();
        }
    }

    const isDrBottom = () => {
        const a = dataBodyRef.current;
        //const ba = document.getElementsByClassName("data-row");
        //const b = ba[ba.length - 1];
        const b = a.lastChild;
        const ib = b.getBoundingClientRect().top <= a.scrollHeight;
        if (ib) {
            setDrBottom(true);
        } else {
            setDrBottom(false);
        }
    }

    const delRowClick = (i) => {
        if (!i && i !== 0) {
            setStatus({ msg: "No target", success: false });
            return;
        }
        delRow(i);
    }

    const delRow = (row) => {
        const rs = rows.slice();
        if (rs.length && rs[row]) {
            rs.splice(row, 1);
        }
        setRows(rs);
        const mappedrs = rs.map(x => {
            return x.map(x1 => parseInt(x1, 10));
        })
        setStatus({ msg: `Deleted row ${row}`, success: true });
        setTimeout(() => {
            setSeries({
                series: [{
                    name: "Tabled Data",
                    data: [...mappedrs]
                }]
            })
        }, 200)
    }

    return (
        <main>
            <section>
                {/*<div style={{position: "fixed", width: 400, height: 2, backgroundColor: "black", top: 274}}></div>*/}
                <div className="table-wrap">
                    <table id="data-table" className="data-table" style={{margin: "auto", marginTop: 20, marginBottom: 20}}>
                        <thead>
                            <tr>
                                <th>
                                    <input data-target="var1" type="text" name={variables[0]} placeholder="Variable Name" value={variables[0]} onChange={updateVars} onFocus={handleInputFocus} />
                                </th>
                                <th>
                                    <input data-target="var2" type="text" name={variables[1]} placeholder="Variable Name" value={variables[1]} onChange={updateVars} onFocus={handleInputFocus} />
                                </th>
                            </tr>
                        </thead>
                        <tbody ref={dataBodyRef} onScroll={isDrBottom}>
                            {!rows.length ? (
                                <tr>
                                    <td colSpan="2" style={{ padding: 5, textAlign: "center", width: 390 }}>
                                        Nothing here yet
                                    </td>
                                </tr>
                            ) : <></>}
                            {rows.sort(([a,], [b,]) => a - b).map((r, i) => (
                                <tr className="data-row" key={`row-${i}`}>
                                    {r.map((rx, i2) => (
                                        <td key={`entry-${i2}`}>
                                            <input type="text" value={rx} data-target={`${i}-${i2}`} onChange={handleEntryChange} />
                                            {i2 === 1 ? <div className="delrow" onClick={() => delRowClick(i)}><FontAwesomeIcon icon={faTrashAlt} /></div> : ""}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                        <tfoot className="scrollrow">
                            {dataBodyRef.current && !drBottom && dataBodyRef.current.clientHeight >= 180 ? (
                                <>
                                    <tr>
                                        <td>
                                            <FontAwesomeIcon icon={faChevronDown} style={{ marginLeft: 190 }} />
                                        </td>
                                    </tr>
                                </>
                            ) : <></>}
                        </tfoot>
                    </table>
                </div>
                <div className="adder-box">
                    <div>
                        <label htmlFor={variables[0]} style={{marginRight: 5}}>{variables[0]}</label>
                        <input data-target={`0`} type="text" name={variables[0]} placeholder={variables[0]} onChange={arChange} value={ar1} onKeyPress={addRowKeyPressed} ref={ar1Ref} />
                    </div>
                    <div>
                        <label htmlFor={variables[1]} style={{marginRight: 5}}>{variables[1]}</label>
                        <input data-target={`1`} type="text" name={variables[1]} placeholder={variables[1]} onChange={arChange} value={ar2} onKeyPress={addRowKeyPressed} ref={ar2Ref} />
                    </div>
                    <button id="data-input-button" onClick={handleAddClick}>
                        Add Row
                    </button>
                </div>
            </section>
            <section className="graph">
                <HighchartsReact 
                    highcharts={Highcharts}
                    options={{title: title.title, series: series.series, xAxis: xAxis.xAxis, yAxis: yAxis.yAxis}}
                />
            </section>
        </main>
    )
}
