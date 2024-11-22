import React, { useState } from "react";
import EstaffSideBar from "../../components/EstaffSideBar";
import Topbar from "../../components/Topbar";
import InputField from "./InputField";
import Dropdown from "./Dropdown";

const CreateUserStaffCoord = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    middleInitial: "",
    lastName: "",
    email: "",
    contactNumber: "",
    password: "",
    confirmPassword: "",
    campus: "",
    college: "",
    department: "",
  });

  const [campusDropdownOpen, setCampusDropdownOpen] = useState(false);
  const [collegeDropdownOpen, setCollegeDropdownOpen] = useState(false);
  const [departmentDropdownOpen, setDepartmentDropdownOpen] = useState(false);

  const toggleDropdownCampus = () => setCampusDropdownOpen(!campusDropdownOpen);
  const toggleDropdownCollege = () => setCollegeDropdownOpen(!collegeDropdownOpen);
  const toggleDropdownDepartment = () => setDepartmentDropdownOpen(!departmentDropdownOpen);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectCampus = (campus) => {
    setFormData({ ...formData, campus });
    setCampusDropdownOpen(false);
    setFormData((prev) => ({ ...prev, college: "", department: "" }));
  };

  const handleSelectCollege = (college) => {
    setFormData({ ...formData, college });
    setCollegeDropdownOpen(false);
    setFormData((prev) => ({ ...prev, department: "" }));
  };

  const handleSelectDepartment = (department) => {
    setFormData({ ...formData, department });
    setDepartmentDropdownOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.contactNumber ||
      !formData.password ||
      !formData.campus ||
      !formData.college ||
      !formData.department
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        alert("User created successfully!");
        setFormData({
          firstName: "",
          middleInitial: "",
          lastName: "",
          email: "",
          contactNumber: "",
          password: "",
          confirmPassword: "",
          campus: "",
          college: "",
          department: "",
        });
      } else {
        alert(`Error: ${result.message || "Failed to create user."}`);
      }
    } catch (error) {
      alert("Failed to create user. Please try again.");
      console.error("Error creating user:", error);
    }
  };

  return (
    <div className="bg-gray-200 min-h-screen flex">
      <div className="w-1/5 fixed h-full">
        <EstaffSideBar />
      </div>
      <div className="flex-1 ml-[20%]">
        <Topbar />
        <div className="flex flex-col mt-14">
          <h1 className="text-2xl font-semibold m-7">Create User Account</h1>
          <form
            className="flex flex-col mx-10 mb-7 bg-white rounded-xl p-16 h-fit"
            onSubmit={handleSubmit}
          >
            {/* User Information Inputs */}
            <div className="flex flex-row mx-1">
              <InputField
                label="First Name"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                required
                placeholder="First Name"
              />
              <InputField
                label="Middle Initial"
                name="middleInitial"
                type="text"
                value={formData.middleInitial}
                onChange={handleChange}
                placeholder="Middle Initial"
              />
              <InputField
                label="Last Name"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                required
                placeholder="Last Name"
              />
            </div>

            <div className="flex flex-row mx-1">
              <InputField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Email"
              />
              <InputField
                label="Contact Number"
                name="contactNumber"
                type="text"
                value={formData.contactNumber}
                onChange={handleChange}
                required
                placeholder="Contact Number"
              />
            </div>

            <div className="flex flex-row mx-1">
              <InputField
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Password"
              />
              <InputField
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Confirm Password"
              />
            </div>

            {/* Dropdowns for Campus, College, Department */}
            <div className="flex flex-row mx-1">
              <Dropdown
                label="Campus"
                name="campus"
                options={["Cagayan de Oro", "Claveria", "Villanueva"]}
                value={formData.campus}
                onSelect={handleSelectCampus}
                toggleDropdown={toggleDropdownCampus}
                isOpen={campusDropdownOpen}
                placeholder="Select Campus"
              />
              <Dropdown
                label="College"
                name="college"
                options={["College of Engineering", "College of Business"]}
                value={formData.college}
                onSelect={handleSelectCollege}
                toggleDropdown={toggleDropdownCollege}
                isOpen={collegeDropdownOpen}
                placeholder="Select College"
              />
              <Dropdown
                label="Department"
                name="department"
                options={["Department of Computer Science", "Department of Business"]}
                value={formData.department}
                onSelect={handleSelectDepartment}
                toggleDropdown={toggleDropdownDepartment}
                isOpen={departmentDropdownOpen}
                placeholder="Select Department"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="px-8 py-3 text-lg bg-blue-600 text-white rounded-md hover:bg-blue-700 mt-4"
            >
              Create User
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateUserStaffCoord;
