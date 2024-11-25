import React, { useState } from "react";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import axios from "axios";

const CoordinatorCreateUser = () => {
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

  const toggleDropdownCampus = () => {
    setCampusDropdownOpen(!campusDropdownOpen);
  };

  const toggleDropdownCollege = () => {
    setCollegeDropdownOpen(!collegeDropdownOpen);
  };

  const toggleDropdownDepartment = () => {
    setDepartmentDropdownOpen(!departmentDropdownOpen);
  };

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
        headers: {
          "Content-Type": "application/json",
        },
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
        
      </div>

      <div className="flex-1 ml-0%]">
        
        <div className="flex flex-col mt-14">
          <h1 className="text-2xl font-semibold m-7">Create User Account</h1>
          <form
            className="flex flex-col mx-10 mb-7 bg-white rounded-xl p-16 h-fit"
            onSubmit={handleSubmit}
          >
            {/* User Information Inputs */}
            <div className="flex flex-row mx-1">
              {/* First Name */}
              <div className="flex-1 flex-col mb-2 mx-2">
                <label className="font-semibold text-blue-900" htmlFor="firstName">
                  First Name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  className="w-full bg-gray-200 p-2 pl-10 rounded-md"
                  required
                />
              </div>
              {/* Middle Initial */}
              <div className="flex-1 flex-col mb-2 mx-2">
                <label className="font-semibold text-blue-900" htmlFor="middleInitial">
                  Middle Initial
                </label>
                <input
                  type="text"
                  name="middleInitial"
                  id="middleInitial"
                  value={formData.middleInitial}
                  onChange={handleChange}
                  placeholder="Middle Initial"
                  className="w-full bg-gray-200 p-2 pl-10 rounded-md"
                />
              </div>
              {/* Last Name */}
              <div className="flex-1 flex-col mb-2 mx-2">
                <label className="font-semibold text-blue-900" htmlFor="lastName">
                  Last Name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className="w-full bg-gray-200 p-2 pl-10 rounded-md"
                  required
                />
              </div>
            </div>

            <div className="flex flex-row mx-1">
              {/* Email */}
              <div className="flex-1 flex-col mb-2 mx-2">
                <label className="font-semibold text-blue-900" htmlFor="email">
                  Email<span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full bg-gray-200 p-2 pl-10 rounded-md"
                  required
                />
              </div>
              {/* Contact Number */}
              <div className="flex-1 flex-col mb-2 mx-2">
                <label className="font-semibold text-blue-900" htmlFor="contactNumber">
                  Contact Number<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="contactNumber"
                  id="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  placeholder="Contact Number"
                  className="w-full bg-gray-200 p-2 pl-10 rounded-md"
                  required
                />
              </div>
            </div>

            <div className="flex flex-row mx-1">
              {/* Password */}
              <div className="flex-1 flex-col mb-2 mx-2">
                <label className="font-semibold text-blue-900" htmlFor="password">
                  Password<span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full bg-gray-200 p-2 pl-10 rounded-md"
                  required
                />
              </div>
              {/* Confirm Password */}
              <div className="flex-1 flex-col mb-2 mx-2">
                <label className="font-semibold text-blue-900" htmlFor="confirmPassword">
                  Confirm Password<span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  className="w-full bg-gray-200 p-2 pl-10 rounded-md"
                  required
                />
              </div>
            </div>

            {/* Dropdowns for Campus, College, Department */}
            <div className="flex flex-row mx-1">
              {/* Campus Dropdown */}
              <div className="flex-1 flex-col mb-2 mx-2">
                <label className="font-semibold text-blue-900" htmlFor="campus">
                  Campus<span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="campus"
                    value={formData.campus || "Select Campus"}
                    onClick={toggleDropdownCampus}
                    className="w-full bg-gray-200 p-2 pl-4 pr-10 rounded-md cursor-pointer"
                    readOnly
                  />
                  <button
                    type="button"
                    onClick={toggleDropdownCampus}
                    className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  {campusDropdownOpen && (
                    <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
                      <div className="py-1">
                        <button
                          type="button"
                          onClick={() => handleSelectCampus("Cagayan de Oro")}
                          className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                        >
                          Cagayan de Oro
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSelectCampus("Claveria")}
                          className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                        >
                          Claveria
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSelectCampus("Villanueva")}
                          className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                        >
                          Villanueva
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* College Dropdown */}
              <div className="flex-1 flex-col mb-2 mx-2">
                <label className="font-semibold text-blue-900" htmlFor="college">
                  College<span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="college"
                    value={formData.college || "Select College"}
                    onClick={toggleDropdownCollege}
                    className="w-full bg-gray-200 p-2 pl-4 pr-10 rounded-md cursor-pointer"
                    readOnly
                  />
                  <button
                    type="button"
                    onClick={toggleDropdownCollege}
                    className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  {collegeDropdownOpen && (
                    <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
                      <div className="py-1">
                        <button
                          type="button"
                          onClick={() => handleSelectCollege("COCST")}
                          className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                        >
                          COCST
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSelectCollege("CAFES")}
                          className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                        >
                          CAFES
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSelectCollege("CAS")}
                          className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                        >
                          CAS
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Department Dropdown */}
              <div className="flex-1 flex-col mb-2 mx-2">
                <label className="font-semibold text-blue-900" htmlFor="department">
                  Department<span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="department"
                    value={formData.department || "Select Department"}
                    onClick={toggleDropdownDepartment}
                    className="w-full bg-gray-200 p-2 pl-4 pr-10 rounded-md cursor-pointer"
                    readOnly
                  />
                  <button
                    type="button"
                    onClick={toggleDropdownDepartment}
                    className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  {departmentDropdownOpen && (
                    <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
                      <div className="py-1">
                        <button
                          type="button"
                          onClick={() => handleSelectDepartment("IT")}
                          className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                        >
                          IT
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSelectDepartment("Engineering")}
                          className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                        >
                          Engineering
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSelectDepartment("Business")}
                          className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                        >
                          Business
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end items-end mt-3 mx-1">
              <button
                type="submit"
                className="bg-blue-900 text-white px-10 py-2 rounded-md hover:bg-blue-800"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CoordinatorCreateUser;
