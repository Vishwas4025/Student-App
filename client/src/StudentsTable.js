// import React, {useState, useEffect} from 'react';
// import axios from 'axios';

// function StudentsTable(){
//     const [data, setData] = useState([]);
//     const [update, setUpdate] = useState([]);

//     useEffect(()=>{
//         axios.get("http://localhost:4000/allstudents",{
//           headers: {
//             'ngrok-skip-browser-warning': 'true'
//           },})
//         .then(response => {
//             setData(response.data)
//         })
//         .catch(error => {
//             console.error("There was an error fetching the data",error);
//         });
//     },[]);

//     const handleUpdate = () => {
//       setUpdate(1);
//     }

//     const handleSubmit = () => {
//       setUpdate(1);
//     }

//     return (
//         <div className='student_table'>
//           <h3>Students List</h3>
//           <table border="1" style={{borderCollapse: 'collapse', textAlign: 'left' }}>
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Roll Number</th>
//                 <th>Java</th>
//                 <th>CPP</th>
//                 <th>Python</th>
//                 <th>GenAI</th>
//                 <th>FSD</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {data.map((student, index) => (
                
//                 <tr key={index}>
                  
//                   <td>{student.name}</td>
//                   <td>{student.rollNo}</td>
//                   <td>{student.scores?.Java || "N/A"}</td>
//                   <td>{student.scores?.CPP || "N/A"}</td>
//                   <td>{student.scores?.Python || "N/A"}</td>
//                   <td>{student.scores?.GenAI || "N/A"}</td>
//                   <td>{student.scores?.FSD || "N/A"}</td>
//                   <td>
//                     <button onClick={handleUpdate}>
//                       update
//                     </button>
//                     <button>
//                       delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//     );
// };

// export default StudentsTable;








// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const StudentsTable = () => {
//   const [students, setStudents] = useState([]);
//   const [editRow, setEditRow] = useState(null); // Track which row is being edited
//   const [updatedScores, setUpdatedScores] = useState({}); // Track updated scores for the row

//   // Fetch all students' full information
//   // const fetchStudents = async () => {
//   //   try {
//   //     console.log("Started Fetch");
//   //     const response = await axios.get("https://e8a2-45-127-57-83.ngrok-free.app/allStudents", {
//   //       headers: {
//   //         'ngrok-skip-browser-warning': true,
//   //       },
//   //     });
//   //     setStudents(response.data);
//   //     console.log("Completed Fetch");
//   //   } catch (error) {
//   //     console.error("Error fetching students:", error);
//   //   }
//   // };

//   const fetchStudents = async () => {
//     try {
//       console.log("Started Fetch");
//       const response = await axios.get("http://localhost:4000/allStudents", {
//         headers: {
//           'ngrok-skip-browser-warning': true,
//         },
//       });
  
//       // Remove duplicate students by roll number
//       const uniqueStudents = response.data.reduce((acc, current) => {
//         if (!acc.some((student) => student.rollNo === current.rollNo)) {
//           acc.push(current);
//         }
//         return acc;
//       }, []);
  
//       setStudents(uniqueStudents);
//       console.log("Completed Fetch");
//     } catch (error) {
//       console.error("Error fetching students:", error);
//     }
//   };
  

//   useEffect(() => {
//     fetchStudents();
//   }, []);

//   // Handle update button click
//   const handleUpdateClick = (rollNo, scores) => {
//     setEditRow(rollNo);
//     setUpdatedScores(scores);
//   };
//   const handleDeleteClick = async(rollNo) => {
//     try {
//       await axios.delete(`http://localhost:4000/student/${rollNo}`);
//       alert(`Are you sure you want to delete the student with Roll Number: ${rollNo}?`);
//     } catch (error) {
//       console.error("Error deleting student:", error);
//       alert("Failed to delete student record.");
//     }
//     fetchStudents();
//     alert("Student(s) deleted successfully");
//   };

//   // Handle input change for updated scores
//   const handleScoreChange = (e) => {
//     const { name, value } = e.target;
//     setUpdatedScores((prevScores) => ({
//       ...prevScores,
//       [name]: parseInt(value, 10),
//     }));
//   };

//   // Handle submit button click
//   const handleSubmitClick = async (rollNo) => {
//     try {
//       const response = await axios.put(
//         `http://localhost:4000/student/${rollNo}`,
//         { scores: updatedScores },
//         {
//           headers: {
//             'ngrok-skip-browser-warning': true,
//           },
//         }
//       );
//       alert(response.data.message);
//       setEditRow(null); // Exit edit mode
//       fetchStudents(); // Refresh table data
//     } catch (error) {
//       console.error("Error updating student:", error);
//       alert("Failed to update student.");
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h3>Students List</h3>
//       <table className="table table-striped" border="1" style={{borderCollapse: 'collapse', textAlign: 'left' }}>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Roll Number</th>
//             <th>Java</th>
//             <th>CPP</th>
//             <th>Python</th>
//             <th>GenAI</th>
//             <th>FSD</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {students.map((student) => (
//             <tr key={`row${student.rollNo}`} id={`row${student.rollNo}`}>
//               <td>{student.name}</td>
//               <td>{student.rollNo}</td>
//               {["Java", "CPP", "Python", "GenAI", "FSD"].map((subject) => (
//                 <td key={subject}>
//                   {editRow === student.rollNo ? (
//                     <input
//                       type="number"
//                       name={subject}
//                       className="form-control"
//                       value={updatedScores[subject]}
//                       onChange={handleScoreChange}
//                     />
//                   ) : (
//                     student.scores[subject]
//                   )}
//                 </td>
//               ))}
//               <td>
//                 {editRow === student.rollNo ? (
//                   <button
//                     className="btn btn-success"
//                     onClick={() => handleSubmitClick(student.rollNo)}
//                   >
//                     Submit
//                   </button>
//                 ) : (
//                   <button
//                     id={`update${student.rollNo}`}
//                     className="btn btn-primary"
//                     onClick={() => handleUpdateClick(student.rollNo, student.scores)}
//                   >
//                     Update
//                   </button>
//                 )}
//               </td>
//               <td>
//                 <button
//                     id={`delete${student.rollNo}`}
//                     className="btn btn-danger"
//                     onClick={() => handleDeleteClick(student.rollNo)}
//                   >
//                     delete
//                   </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default StudentsTable;










import React, { useEffect, useState } from "react";
import axios from "axios";

const StudentsTable = () => {
  const [students, setStudents] = useState([]);
  const [editRow, setEditRow] = useState(null); // Track which row is being edited
  const [updatedScores, setUpdatedScores] = useState({}); // Track updated scores for the row

  // Fetch all students' full information
  // const fetchStudents = async () => {
  //   try {
  //     console.log("Started Fetch");
  //     const response = await axios.get("https://e8a2-45-127-57-83.ngrok-free.app/allStudents", {
  //       headers: {
  //         'ngrok-skip-browser-warning': true,
  //       },
  //     });
  //     setStudents(response.data);
  //     console.log("Completed Fetch");
  //   } catch (error) {
  //     console.error("Error fetching students:", error);
  //   }
  // };

  const fetchStudents = async () => {
    try {
      console.log("Started Fetch");
      const response = await axios.get("http://192.168.106.57:4000/allStudents", {
        headers: {
          'ngrok-skip-browser-warning': true,
        },
      });
  
      // Remove duplicate students by roll number
      const uniqueStudents = response.data.reduce((acc, current) => {
        if (!acc.some((student) => student.rollNo === current.rollNo)) {
          acc.push(current);
        }
        return acc;
      }, []);
  
      setStudents(uniqueStudents);
      console.log("Completed Fetch");
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };
  

  useEffect(() => {
    fetchStudents();
  }, []);

  // Handle update button click
  const handleUpdateClick = (rollNo, scores) => {
    setEditRow(rollNo);
    setUpdatedScores(scores);
  };
  const handleDeleteClick = async(rollNo) => {
    try {
      await axios.delete(`http://192.168.106.57:4000/student/${rollNo}`);
      alert(`Are you sure you want to delete the student with Roll Number: ${rollNo}?`);
    } catch (error) {
      console.error("Error deleting student:", error);
      alert("Failed to delete student record.");
    }
    fetchStudents();
    alert("Student(s) deleted successfully");
  };

  // Handle input change for updated scores
  const handleScoreChange = (e) => {
    const { name, value } = e.target;
    setUpdatedScores((prevScores) => ({
      ...prevScores,
      [name]: parseInt(value, 10),
    }));
  };

  // Handle submit button click
  const handleSubmitClick = async (rollNo) => {
    try {
      const response = await axios.put(`http://192.168.106.57:4000/student/${rollNo}`,
        { scores: updatedScores },
        {
          headers: {
            'ngrok-skip-browser-warning': true,
          },
        }
      );
      alert(response.data.message);
      setEditRow(null); // Exit edit mode
      fetchStudents(); // Refresh table data
    } catch (error) {
      console.error("Error updating student:", error);
      alert("Failed to update student.");
    }
  };

  return (
    <div className="container mt-5">
      <h3>Students List</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Roll Number</th>
            <th>Java</th>
            <th>CPP</th>
            <th>Python</th>
            <th>GenAI</th>
            <th>FSD</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={`row${student.rollNo}`} id={`row${student.rollNo}`}>
              <td>{student.name}</td>
              <td>{student.rollNo}</td>
              {["Java", "CPP", "Python", "GenAI", "FSD"].map((subject) => (
                <td key={subject}>
                  {editRow === student.rollNo ? (
                    <input
                      type="number"
                      name={subject}
                      className="form-control"
                      value={updatedScores[subject]}
                      onChange={handleScoreChange}
                    />
                  ) : (
                    student.scores[subject]
                  )}
                </td>
              ))}
              {/* <td>
                {editRow === student.rollNo ? (
                  <button
                    className="btn btn-success"
                    onClick={() => handleSubmitClick(student.rollNo)}
                  >
                    Submit
                  </button>
                ) : (
                  <button
                    id={`update${student.rollNo}`}
                    className="btn btn-primary"
                    onClick={() => handleUpdateClick(student.rollNo, student.scores)}
                  >
                    Update
                  </button>
                )}
              </td> */}
              <td>
              <button
                    id={`delete${student.rollNo}`}
                    className="btn btn-danger"
                    onClick={() => handleDeleteClick(student.rollNo)}
                  >
                    delete
                  </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentsTable;