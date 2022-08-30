
import './App.css';
import Calculator from './Component/Calculator';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Report from './Component/Report';
import Register from './Component/Register';

import { useState } from 'react';
import EditUser from './Component/EditUser';

function App() {


return (<>
    <div className="App">  
      <Router>
          <Routes>
            <Route path="/" element={<Register/>}></Route>
            <Route path="/Report" element={<Report/>}></Route>
            <Route path="/Calculator" element={<Calculator/>}></Route>
            <Route path="/EditUser/:id" element={<EditUser/>}></Route>
            
          </Routes>
      </Router>
    </div>
    
 </>
  );
}

export default App;
