import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./AddEmployeeForm.css";

const AddEmployeeForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [responseMessage, setResponseMessage] = useState("");

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:5000/employees", data);
      setResponseMessage(response.data.message); 
      reset(); 
    } catch (error) {
      setResponseMessage(error.response?.data?.message || "Submission failed");
    }
  };

  return (
    <div className="form-container">
      <h2>Add Employee</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="employee-form">
        <label>Name:</label>
        <input 
          {...register("name", { 
            required: "Name is required", 
            minLength: { value: 3, message: "Name must be at least 3 characters" },
            maxLength: { value: 100, message: "Name cannot exceed 100 characters" }
          })} 
        />
        {errors.name && <p className="error">{errors.name.message}</p>}

        <label>Employee ID:</label>
        <input 
          {...register("employeeID", { 
            required: "Employee ID is required", 
            maxLength: { value: 10, message: "Employee ID cannot exceed 10 characters" },
            pattern: { value: /^[A-Za-z0-9]+$/, message: "Employee ID should only contain alphanumeric characters" }
          })} 
        />
        {errors.employeeID && <p className="error">{errors.employeeID.message}</p>}

        <label>Email:</label>
        <input 
          {...register("email", { 
            required: "Email is required", 
            pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email format" }
          })} 
        />
        {errors.email && <p className="error">{errors.email.message}</p>}

        <label>Phone Number:</label>
        <input 
          {...register("phone", { 
            required: "Phone is required", 
            pattern: { value: /^[0-9]{10}$/, message: "Phone number must be 10 digits" }
          })} 
        />
        {errors.phone && <p className="error">{errors.phone.message}</p>}

        <label>Department:</label>
        <select 
          {...register("department", { required: "Department is required" })}
        >
          <option value="">Select Department</option>
          <option value="HR">HR</option>
          <option value="Engineering">Engineering</option>
          <option value="Marketing">Marketing</option>
        </select>
        {errors.department && <p className="error">{errors.department.message}</p>}

        <label>Date of Joining:</label>
        <input 
          type="date" 
          {...register("joiningDate", { 
            required: "Joining Date is required", 
            validate: value => new Date(value) <= new Date() || "Future dates are not allowed"
          })} 
        />
        {errors.joiningDate && <p className="error">{errors.joiningDate.message}</p>}

        <label>Role:</label>
        <input 
          {...register("role", { 
            required: "Role is required", 
            minLength: { value: 3, message: "Role must be at least 3 characters" },
            maxLength: { value: 50, message: "Role cannot exceed 50 characters" }
          })} 
        />
        {errors.role && <p className="error">{errors.role.message}</p>}

        <button type="submit" className="submit-btn">Submit</button>
        <button type="reset" className="reset-btn" onClick={() => reset()}>Reset</button>
      </form>

      {responseMessage && <p className="response">{responseMessage}</p>}
    </div>
  );
};

export default AddEmployeeForm;