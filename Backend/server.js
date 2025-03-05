const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/auth');
/*const cors = require('cors');*/
/*app.use(cors());*/


const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/foodDonationDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

app.use('/api/auth', authRoutes);

 
const complaintSchema = new mongoose.Schema({
    name: String,
    email: String,
    complaint: String,
    date: { type: Date, default: Date.now }
});

 
const Complaint = mongoose.model("Complaint", complaintSchema);

 
app.post("/api/submit-complaint", async (req, res) => {
  try {
      const { name, email, complaint } = req.body;

      if (!name || !email ||  !complaint) {
          return res.status(400).json({ message: "All fields are required!" });
      }

      const newComplaint = new Complaint({ name, email, complaint });
      await newComplaint.save();

      console.log("Complaint saved:", newComplaint);  
      res.json({ message: "Complaint submitted successfully!" });

  } catch (error) {
      console.error("Error saving complaint:", error);  
      res.status(500).json({ message: "Error submitting complaint!", error });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server running on port ${PORT}'));