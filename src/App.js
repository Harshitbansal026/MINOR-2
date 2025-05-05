/* import './App.css';
import Dashboard from './components/dashboard';
import Login from './components/login';
import Docs from './components/docs';
import EditDocs from './components/EditDocs';
import { Routes, Route } from "react-router-dom";
import { database } from './firebaseConfig';
import Signup from './components/signup';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Docs database={database} />} />
      <Route path="/editDocs/:id" element={<EditDocs database={database}/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App; */

import './App.css';
import Dashboard from './components/dashboard';
import Login from './components/login';
import Docs from './components/docs';
import Signup from './components/signup';
import EditDocs from './components/EditDocs';
import PrivateRoute from './components/PrivateRoute';
import { Routes, Route } from "react-router-dom";
import { database } from './firebaseConfig';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route 
        path="/" 
        element={
          <PrivateRoute>
            <Docs database={database} />
          </PrivateRoute>
        } 
      />
      
      <Route 
        path="/editDocs/:id" 
        element={
          <PrivateRoute>
            <EditDocs database={database} />
          </PrivateRoute>
        } 
      />

      <Route 
        path="/dashboard" 
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } 
      />
    </Routes>
  );
}

export default App;

