import React from 'react';
import logo from './logo.svg';
import './App.css';
import { DataTable, Header } from './components';

function App() {
  const [status, setStatus] = React.useState({msg: "", success: true});

  return (
    <div className="App">
      <Header />
      <DataTable setStatus={setStatus} />
      {status && status.msg && (
          <>
            <div className={`field-alert ${status.success ? "field-success" : "field-error"}`}>
                {status.msg}
            </div>
          </>
      )}
    </div>
  );
}

export default App;
