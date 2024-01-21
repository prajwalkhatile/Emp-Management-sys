import { validationResult } from "express-validator";
import Employee from "../models/employeeModel.js";
import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  const secretKey = process.env.JWT_SECRET;
  const token = jwt.sign({ user: userId }, secretKey, { expiresIn: "1h" });
  return token;
};

// Create Employee
export const createEmployee = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      EmployeeID,
      FirstName,
      LastName,
      Email,
      DateOfBirth,
      Department,
      Position,
    } = req.body;

    const newEmployee = new Employee({
      EmployeeID,
      FirstName,
      LastName,
      Email,
      DateOfBirth,
      Department,
      Position,
    });

    const saveEmployee = await newEmployee.save();

    // Generate a token for employee
    const token = generateToken(saveEmployee._id);

    res.json({ employee: saveEmployee, token });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Read Employee with Pagination
export const readEmployee = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    // Extract query parameters for sorting and filtering
    const { sortBy, sortOrder, department, position } = req.query;

    let query = {};

    if (department) query.Department = department;
    if (position) query.Position = position;

    const employees = await Employee.find(query)
      .sort({ [sortBy]: sortOrder === "desc" ? -1 : 1 })
      .skip(skip)
      .limit(limit)
      .exec();

    res.json(employees);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update employee

export const updateEmployee = async (req, res) => {
  try {
    const { employeeId } = req.params;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(
      employeeId,
      req.body,
      { new: true, runValidators: true }
    ).exec();

    if (updatedEmployee) {
      res.json(updatedEmployee);
    } else {
      res.status(404).json({ error: "Employee not found" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete Employee
export const deleteEmployee = async (req, res) => {
  try {
    const { employeeId } = req.params;

    const deletedEmployee = await Employee.findByIdAndDelete(employeeId).exec();

    if (deletedEmployee) {
      res.json(deletedEmployee);
    } else {
      res.status(404).json({ error: "Employee not found" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
