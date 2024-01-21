import express from "express";
import { check } from "express-validator";
import authenticate from "../middleware/authentication.js";
const router = express.Router();
import {
  createEmployee,
  readEmployee,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employeeController.js";

// Validation middleware for the Create Employee route
const validateCreateEmployee = [
  check("EmployeeID").isInt().withMessage("EmployeeID must be an integer"),
  check("FirstName").notEmpty().withMessage("FirstName is required"),
  check("LastName").notEmpty().withMessage("LastName is required"),
  check("Email").isEmail().withMessage("Invalid Email"),
  check("DateOfBirth").isDate().withMessage("Invalid DateOfBirth"),
  check("Department").notEmpty().withMessage("Department is required"),
  check("Position").notEmpty().withMessage("Position is required"),
];

// Validation middleware for the Update Employee route
const validateUpdateEmployee = [
  check("FirstName").optional().notEmpty().withMessage("FirstName is required"),
  check("LastName").optional().notEmpty().withMessage("LastName is required"),
  check("Email").optional().isEmail().withMessage("Invalid Email"),
  check("DateOfBirth").optional().isDate().withMessage("Invalid DateOfBirth"),
  check("Department")
    .optional()
    .notEmpty()
    .withMessage("Department is required"),
  check("Position").optional().notEmpty().withMessage("Position is required"),
];

// Routes
// Create Employee
router.post("/employees", validateCreateEmployee, createEmployee);

// Read Employee
router.get("/getemployees", authenticate, readEmployee);

// Update Employee
router.put(
  "/employees/:employeeId",
  authenticate,
  validateUpdateEmployee,
  updateEmployee
);

// Delete Employee
router.delete("/employees/:employeeId", authenticate, deleteEmployee);

//default route
router.get("/", (req, res) => {
  res.send("Hello, welcome to the Employee Management System!");
});

export default router;
