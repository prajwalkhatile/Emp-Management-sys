import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  EmployeeID: Number,
  FirstName: String,
  LastName: String,
  Email: String,
  DateOfBirth: String,
  Department: String,
  Position: String,
});

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;
