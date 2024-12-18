const express = require("express"); 
const mongoose = require("mongoose"); 
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express(); 
app.use(cors());

app.use(bodyParser.json());

// Connect to MongoDB 
// mongoose.connect("mongodb+srv://vishwasracharla09:vishwasracharla09@cluster0.7nfmvrv.mongodb.net/StudentDB?retryWrites=true&w=majority&appName=Cluster0", { 
//     useNewUrlParser: true, 
//     useUnifiedTopology: true, 
//   }) 
//   .then(() => console.log("Connected to MongoDB")) 
//   .catch((err) => console.error("MongoDB connection error:", err)); 
mongoose.connect("mongodb://localhost:27017", { 
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
}) 
.then(() => console.log("Connected to MongoDB")) 
 


// Define Student Schema 
const studentSchema = new mongoose.Schema({ 
  name: String, 
  rollNo: String, 
  scores: { 
    Java: Number, 
    CPP: Number, 
    Python: Number, 
    GenAI: Number, 
    FSD: Number, 
  }, 
}); 
 
// Create Student Model 
const Student = mongoose.model("Student", studentSchema); 
 
// Middleware 
app.use(express.json()); 


// Route to insert student data
app.post("/student", async(req,res)=>{
  try{
    const newStudent = new Student(req.body);
    await newStudent.save()
  res.status(201).json({message: "Student added successfully",newStudent})
  }catch(err){
    res.status(400).json({message: "Failed to add the student",error:err})
  }
})

app.delete("/student/:rollNo", async(req,res)=>{
  const rollNo = req.params.rollNo;
  try{
    const deletedStudent = await Student.findOneAndDelete({rollNo});
    if(deletedStudent){
      res.status(200).json({message: "Student deleted successfully",deletedStudent})
    }else{
      res.status(404).json({message: "Student not found"});
    }
  }catch(err){
    res.status(400).json({message: "Failed to delete student",  error: err})
  }
})
// Delete a student document based on rollNo
// app.delete("/student/:rollNo", async (req, res) => {
//   const rollNo = req.params.rollNo;
//   try {
//     const deletedStudent = await Student.findOneAndDelete({ rollNo });
//     if (deletedStudent) {
//       res.status(200).json({ message: "Student deleted successfully", deletedStudent });
//     } else {
//       res.status(404).json({ message: "Student not found" });
//     }
//   } catch (err) {
//     res.status(400).json({ message: "Failed to delete student", error: err });
//   }
// });

app.put('/student/:rollNo', async(req,res)=>{
  const rollNo = req.params.rollNo;
  try{
    const updatedStudent = await Student.findOneAndUpdate({rollNo}, req.body, {new:true, runValidators:true});
    if(updatedStudent){
      res.status(200).json({message:"Student updated successfully", updatedStudent});
    }else{
      res.status(404).json({message:"Student not found"});
    }
  }catch(err){
    res.status(400).json({message:"Failes to update student",error:err})
  }
})
// Update student data based on rollNo
// app.put("/student/:rollNo", async (req, res) => {
//   const rollNo = req.params.rollNo;
//   try {
//     const updatedStudent = await Student.findOneAndUpdate(
//       { rollNo },
//       req.body,
//       { new: true, runValidators: true }
//     );
//     if (updatedStudent) {
//       res.status(200).json({ message: "Student updated successfully", updatedStudent });
//     } else {
//       res.status(404).json({ message: "Student not found" });
//     }
//   } catch (err) {
//     res.status(400).json({ message: "Failed to update student", error: err });
//   }
// });

app.get('/studentsGPA', async(req,res)=>{
  try{
    const students = await Student.find({},{name:1, rollNo:1, scores:1});
    const studentsWithGPA = students.map((student)=>{
      const {Java,CPP,Python,GenAI,FSD} = student.scores;
      const gpa = ((Java + CPP + Python + GenAI + FSD)/5).toFixed(2);
      return {
        name:student.name,
        rollNo:student.rollNo,
        gpa
      };
    })
    res.status(200).json(studentsWithGPA)
  }catch(err){
    res.status(400).json({message:"Failed to fetch students", error:err});
  }
  
})

app.get('/allstudents', async(req,res)=>{
  try{
    const allstudents = await Student.find({},{name:1, rollNo:1, scores:1});
    res.status(200).json(allstudents)
  }catch(err){
    res.status(400).json({message:"Failed to fetch students", error:err});
  } 
})
 
// Route to fetch student data by roll number 
app.get("/student/:rollNo", async (req, res) => { 
  const rollNo = req.params.rollNo; 
  try { 
    const student = await Student.findOne({ rollNo },{_id:0}); 
    if (student) { 
      res.status(200).json(student); 
    } else { 
      res.status(404).json({ message: "Student not found" }); 
    } 
  } catch (err) { 
    res.status(500).json({ message: "Error fetching student data", error: err 
}); 
  } 
}); 
 
// Start the server 
const PORT = 4000; 
app.listen(PORT, () => { 
  console.log(`Server running on http://localhost:${PORT}`); 
});









// const express = require("express");
// const mongoose = require("mongoose");
// const path = require("path");
// const cors = require('cors');

// const app = express();
// app.use(express.json());

// // Configure CORS to allow the specific URL
// // const corsOptions = {
// //   origin: 'https://bd7c-183-82-0-115.ngrok-free.app',
// // };


// // Use the CORS middleware with the specified options
// app.use(cors());

// // Connect to MongoDB Atlas
// mongoose
//   .connect("mongodb://localhost:27017", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("Connected MongoDB"))
//   .catch((err) => console.error("MongoDB connection error:", err));

// // Student Schema and Model
// const studentSchema = new mongoose.Schema({
//   name: String,
//   rollNo: String,
//   scores: {
//     Java: Number,
//     CPP: Number,
//     Python: Number,
//     GenAI: Number,
//     FSD: Number,
//   },
// });

// const Student = mongoose.model("Student", studentSchema);

// // Routes

// // Insert a new student document
// app.post("/student", async (req, res) => {
//   try {
//     const student = new Student(req.body); // Expecting full student object in the request body
//     await student.save();
//     res.status(201).json({ message: "Student added successfully", student });
//   } catch (err) {
//     res.status(400).json({ message: "Failed to add student", error: err });
//   }
// });

// // Update student data based on rollNo
// app.put("/student/:rollNo", async (req, res) => {
//   const rollNo = req.params.rollNo;
//   try {
//     const updatedStudent = await Student.findOneAndUpdate(
//       { rollNo },
//       req.body,
//       { new: true, runValidators: true }
//     );
//     if (updatedStudent) {
//       res.status(200).json({ message: "Student updated successfully", updatedStudent });
//     } else {
//       res.status(404).json({ message: "Student not found" });
//     }
//   } catch (err) {
//     res.status(400).json({ message: "Failed to update student", error: err });
//   }
// });

// // Delete a student document based on rollNo
// app.delete("/student/:rollNo", async (req, res) => {
//   const rollNo = req.params.rollNo;
//   try {
//     const deletedStudent = await Student.findOneAndDelete({ rollNo });
//     if (deletedStudent) {
//       res.status(200).json({ message: "Student deleted successfully", deletedStudent });
//     } else {
//       res.status(404).json({ message: "Student not found" });
//     }
//   } catch (err) {
//     res.status(400).json({ message: "Failed to delete student", error: err });
//   }
// });

// // Retrieve all students' information: rollNo, name, GPA
// app.get("/studentsGPA", async (req, res) => {
//   try {
//     const students = await Student.find({}, { name: 1, rollNo: 1, scores: 1 }); // Fetch specific fields
//     const studentsWithGPA = students.map((student) => {
//       const { Java, CPP, Python, GenAI, FSD } = student.scores;
//       const gpa = ((Java + CPP + Python + GenAI + FSD) / 5).toFixed(2); // GPA Calculation
//       return {
//         name: student.name, 
//         rollNo: student.rollNo,
//         gpa,
//       };
//     });
//     res.status(200).json(studentsWithGPA);
//   } catch (err) {
//     res.status(400).json({ message: "Failed to fetch students", error: err });
//   }
// });

// // Retrieve student details by rollNo
// app.get("/student/:rollNo", async (req, res) => {
//   const rollNo = req.params.rollNo;
//   try {
//     const student = await Student.findOne({ rollNo });
//     if (student) {
//       res.status(200).json(student);
//     } else {
//       res.status(404).json({ message: "Student not found" });
//     }
//   } catch (err) {
//     res.status(500).json({ message: "Error fetching student data", error: err });
//   }
// });

// // Retrieve student details by rollNo
// app.get("/allStudents", async (req, res) => {
//   try {
//     const students = await Student.find({}, { name: 1, rollNo: 1, scores: 1, _id: 0 });
//     res.status(200).json(students);
//   } catch (error) {
//     console.error("Error fetching students:", error);
//     res.status(500).json({ message: "Failed to fetch students", error });
//   }
// });

// // Serve React Application
// // const reactAppPath = path.join(__dirname, "client/public");
// // app.use(express.static(reactAppPath));

// // // Catch-all route to serve React's index.html for unknown routes
// // app.get("*", (req, res) => {
// //   res.sendFile(path.join(reactAppPath, "index.html"));
// // });

// // Start the server
// const PORT = 4000;
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
