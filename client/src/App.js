// import './App.css';
// import StudentsTable from './StudentsTable';
// function App() {
//   return (
//     <div className="App">
//       <StudentsTable/>
//     </div>
//   );
// }
// export default App;




import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AddStudentForm from "./AddStudentForm";
import StudentsTable from './StudentsTable';

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              Student App
            </Link>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Add Student
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/students">
                    View Students
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div>
          <Routes>
            <Route path="/" element={<AddStudentForm />} />
            <Route path="/students" element={<StudentsTable />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;







// import React, { useState, useMemo } from 'react';

// const EmployeeSearchApp = () => {
//   // Static list of employees
//   const employees = [
//     "Alice Johnson",
//     "Bob Smith",
//     "Charlie Brown",
//     "David Wilson",
//     "Eva Green",
//   ];

//   // State to manage search input
//   const [searchTerm, setSearchTerm] = useState("");

//   // Memoized filtered employee list
//   const filteredEmployees = useMemo(() => {
//     console.log("Filtering employees...");
//     return employees.filter((employee) =>
//       employee.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   }, [searchTerm, employees]);

//   return (
//     <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
//       <h1>Employee Directory</h1>

//       {/* Search Bar */}
//       <input
//         type="text"
//         placeholder="Search employees by name..."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         style={{ padding: "10px", width: "100%", marginBottom: "20px" }}
//       />

//       {/* Employee List */}
//       <ul>
//         {filteredEmployees.map((employee, index) => (
//           <li key={index} style={{ margin: "10px 0" }}>
//             {employee}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default EmployeeSearchApp;