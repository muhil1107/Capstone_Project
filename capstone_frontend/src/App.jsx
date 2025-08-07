import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
// import Signup from './pages/Signup';
// import Dashboard from './pages/EmployeeDashboard';
// Create other pages similarly

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      {/* <Route path="/signup" element={<Signup />} /> */}
      {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      {/* Add more pages here */}
    </Routes>
  );
}

export default App;
