// import React, {useState} from "react";
// const axios = require('axios');

// export default function AddStudentForm(){
//     const [formData, setFormData] = useState({
//         name : '',
//         rollno : '',
//         scores: {
//             Java: '',
//             CPP: '',
//             Python: '',
//             GenAI: '',
//             FSD: '',
//         }, 
//     });
//     const [message,setMessage] = useState("");

//     const HandleChange = (e) => {
//         const {name,value} = e.target
//         if(name in formData.scores){
//             setFormData((prev)=>({
//                 ...prev,
//                 scores:{
//                     ...prev.scores,
//                     [name] : value,
//                 },
//             }))
//         }else{
//             setFormData((prev)=>({
//                 ...prev,
//                 [name]: value
//             }))
//         }     
//     }

//     const HandleSubmit = async (e) =>{
//         e.preventDefault();
//         try{
//             await axios.post("https://aa24-103-88-236-42.ngrok-free.app/student",formData,{
//               headers: {
//                 'ngrok-skip-browser-warning': 'true'
//               },});
//             alert("Student added successfully");
//             setFormData({
//                 name : '',
//                 rollno : '',
//                 scores:{
//                     Java: '',
//                     CPP: '',
//                     Python: '',
//                     GenAI: '',
//                     FSD: ''
//                 }  
//             })
//             setMessage("Student added successfully")  
//         }catch(error){
//             console.log(error);
//             setMessage("Failed to add student");
//             alert("Error submitting data");
//         }

//     }

//     return(
//         <div>
//             {message && <p>{message}</p>}
//             <form onSubmit={HandleSubmit}>
//                 <div>
//                     <label>Name: </label>
//                     <input
//                         type="text"
//                         name="name"
//                         value={formData.name}
//                         onChange={HandleChange}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label>Roll Number: </label>
//                     <input
//                         type="text"
//                         name="rollno"
//                         value={formData.rollno}
//                         onChange={HandleChange}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label>Java: </label>
//                     <input
//                         type="number"
//                         name="Java"
//                         value={formData.scores.Java}
//                         onChange={HandleChange}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label>CPP: </label>
//                     <input
//                         type="number"
//                         name="CPP"
//                         value={formData.scores.CPP}
//                         onChange={HandleChange}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label>Python: </label>
//                     <input
//                         type="number"
//                         name="Python"
//                         value={formData.scores.Python}
//                         onChange={HandleChange}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label>GenAI: </label>
//                     <input
//                         type="number"
//                         name="GenAI"
//                         value={formData.scores.GenAI}
//                         onChange={HandleChange}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label>FSD: </label>
//                     <input
//                         type="number"
//                         name="FSD"
//                         value={formData.scores.FSD}
//                         onChange={HandleChange}
//                         required
//                     />
//                 </div>
//                 <button type="submit">Submit</button>
//             </form>
//         </div>
//     )
// }

import React, { useState } from 'react';

const AddStudentForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    rollNo: '',
    scores: {
      Java: '',
      CPP: '',
      Python: '',
      GenAI: '',
      FSD: '',
    },
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name in formData.scores) {
      setFormData((prev) => ({
        ...prev,
        scores: {
          ...prev.scores,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://192.168.106.57:4000/student', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to add student');
        }
        return response.json();
      })
      .then(() => {
        setMessage('Student added successfully!');
        setFormData({
          name: '',
          rollNo: '',
          scores: {
            Java: '',
            CPP: '',
            Python: '',
            GenAI: '',
            FSD: '',
          },
        });
      })
      .catch((error) => {
        console.error('Error:', error);
        setMessage('Failed to add student. Please try again.');
      });
  };

  return (
    <div className="container mx-auto p-4">
      <h3 className="text-lg font-bold mb-4">Add New Student</h3>
      {message && <p className="mb-4 text-green-600">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border px-4 py-2"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Roll Number</label>
          <input
            type="text"
            name="rollNo"
            value={formData.rollNo}
            onChange={handleChange}
            className="w-full border px-4 py-2"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Java</label>
          <input
            type="number"
            name="Java"
            value={formData.scores.Java}
            onChange={handleChange}
            className="w-full border px-4 py-2"
            required
          />
        </div>
        <div>
          <label className="block font-medium">CPP</label>
          <input
            type="number"
            name="CPP"
            value={formData.scores.CPP}
            onChange={handleChange}
            className="w-full border px-4 py-2"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Python</label>
          <input
            type="number"
            name="Python"
            value={formData.scores.Python}
            onChange={handleChange}
            className="w-full border px-4 py-2"
            required
          />
        </div>
        <div>
          <label className="block font-medium">GenAI</label>
          <input
            type="number"
            name="GenAI"
            value={formData.scores.GenAI}
            onChange={handleChange}
            className="w-full border px-4 py-2"
            required
          />
        </div>
        <div>
          <label className="block font-medium">FSD</label>
          <input
            type="number"
            name="FSD"
            value={formData.scores.FSD}
            onChange={handleChange}
            className="w-full border px-4 py-2"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Student
        </button>
      </form>
    </div>
  );
};

export default AddStudentForm;