import React from 'react';
import './App.css';
import { DataTable, Header } from './components';

function App() {
  const [rows, setRows] = React.useState([]);
  const [variables, setVariables] = React.useState(["x", "y"]);
  const [status, setStatus] = React.useState({msg: "", success: true});

  return (
    <div className="App">
      <Header />
      <DataTable setStatus={setStatus} variables={variables} setVariables={setVariables} rows={rows} setRows={setRows} />
      {status && status.msg && (
          <div>
            <div className={`field-alert ${status.success ? "field-success" : "field-error"}`}>
                {status.msg}
            </div>
          </div>
      )}
    </div>
  );
}

export default App;
