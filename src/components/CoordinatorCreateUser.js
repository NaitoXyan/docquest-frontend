import React, { useState, useEffect } from "react";
import axios from "axios";

const CoordinatorCreateUser = () => {
  const token = localStorage.getItem("token");
  const BASE_URL = "http://127.0.0.1:8000";

  const initialFormState = {
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
    roleID: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [options, setOptions] = useState({
    campus: [],
    college: [],
    department: [],
    role: []
  });
  const [dropdownState, setDropdownState] = useState({
    campus: false,
    college: false,
    department: false
  });

  const axiosConfig = {
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    }
  };

  const fetchData = async (url) => {
    try {
      const response = await axios.get(`${BASE_URL}${url}`, axiosConfig);
      return response.data;
    } catch (error) {
      console.error(`Error fetching data from ${url}:`, error);
      throw error;
    }
  };

  const initializeData = async () => {
    try {
      const [programData, roleData] = await Promise.all([
        fetchData('/get_program_to_campus'),
        fetchData('/coordinator_get_roles')
      ]);

      const campus = programData.programID.college.campus.name;
      const college = programData.programID.college.abbreviation;
      const department = programData.programID.abbreviation;

      setOptions({
        campus: [campus],
        college: [college],
        department: [department],
        role: roleData
      });

      setFormData(prev => ({
        ...prev,
        campus,
        college,
        department,
        roleID: roleData[0]?.roleID || ""
      }));
    } catch (error) {
      alert("Failed to load initial data");
    }
  };

  useEffect(() => {
    initializeData();
  }, []);

  const handleDropdownToggle = (dropdownName) => {
    setDropdownState(prev => ({
      ...prev,
      [dropdownName]: !prev[dropdownName]
    }));
  };

  const handleSelect = (field, value) => {
    setFormData(prev => {
      const newState = { ...prev, [field]: value };
      
      // Reset dependent fields
      if (field === 'campus') {
        newState.college = "";
        newState.department = "";
      } else if (field === 'college') {
        newState.department = "";
      }
      
      return newState;
    });

    setDropdownState(prev => ({
      ...prev,
      [field]: false
    }));

    // Fetch dependent data
    if (field === 'campus' || field === 'college') {
      fetchDependentData(field, value);
    }
  };

  const fetchDependentData = async (field, value) => {
    try {
      const programData = await fetchData('/get_program_to_campus');
      
      if (field === 'campus') {
        const filteredColleges = [programData.programID.college.abbreviation];
        setOptions(prev => ({ ...prev, college: filteredColleges }));
        
        if (filteredColleges.length > 0) {
          handleSelect('college', filteredColleges[0]);
        }
      } else if (field === 'college') {
        const filteredDepartments = [programData.programID.abbreviation];
        setOptions(prev => ({ ...prev, department: filteredDepartments }));
        
        if (filteredDepartments.length > 0) {
          handleSelect('department', filteredDepartments[0]);
        }
      }
    } catch (error) {
      console.error(`Error fetching dependent data for ${field}:`, error);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return false;
    }

    const requiredFields = [
      'firstName', 'lastName', 'email', 'contactNumber', 
      'password', 'campus', 'college', 'department', 'roleID'
    ];

    const missingFields = requiredFields.filter(field => !formData[field]);
    if (missingFields.length > 0) {
      alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const payload = {
      email: formData.email,
      password: formData.password,
      firstname: formData.firstName,
      middlename: formData.middleInitial || "",
      lastname: formData.lastName,
      contactNumber: formData.contactNumber,
      role: [formData.roleID],
      college: null,
      program: null,
    };

    try {
      const response = await axios.post("/api/users", payload, axiosConfig);

      if (response.status === 201) {
        alert("User created successfully!");
        setFormData(initialFormState);
        setOptions(prev => ({
          ...prev,
          college: [],
          department: []
        }));
      }
    } catch (error) {
      console.error("Error creating user:", error);
      const errorMessage = error.response?.status === 400
        ? error.response.data.error || "Invalid input. Please check your data."
        : "An unexpected error occurred. Please try again.";
      alert(errorMessage);
    }
  };

  const renderDropdown = (field, label, options, disabled = false) => (
    <div className="flex-1 flex-col mb-2 mx-2">
      <label className="font-semibold text-blue-900" htmlFor={field}>
        {label}<span className="text-red-500">*</span>
      </label>
      <div className="relative">
        <input
          type="text"
          id={field}
          value={formData[field] || `Select ${label}`}
          onClick={() => !disabled && handleDropdownToggle(field)}
          className="w-full bg-gray-200 p-2 pl-4 pr-10 rounded-md cursor-pointer"
          readOnly
          disabled={disabled}
        />
        {dropdownState[field] && (
          <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
            <div className="py-1">
              {options.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleSelect(field, option)}
                  className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-gray-200 min-h-screen flex">
      <div className="w-1/5 fixed h-full"></div>
      <div className="flex-1 ml-0">
        <div className="flex flex-col">
          <h1 className="text-2xl font-semibold m-7">Create User Account</h1>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col mx-10 mb-5 bg-white rounded-xl p-6 h-fit">
              <div className="flex flex-row mx-1">
                {['firstName', 'middleInitial', 'lastName'].map((field) => (
                  <div key={field} className="flex-1 flex-col mb-2 mx-2">
                    <label className="font-semibold text-blue-900" htmlFor={field}>
                      {field === 'middleInitial' ? 'Middle Initial' : 
                       field === 'firstName' ? 'First Name' : 'Last Name'}
                      {field !== 'middleInitial' && <span className="text-red-500">*</span>}
                    </label>
                    <input
                      type="text"
                      name={field}
                      id={field}
                      value={formData[field]}
                      onChange={handleChange}
                      placeholder={field === 'middleInitial' ? 'Middle Initial' : 
                                 field === 'firstName' ? 'First Name' : 'Last Name'}
                      className="w-full bg-gray-200 p-2 pl-10 rounded-md"
                      required={field !== 'middleInitial'}
                    />
                  </div>
                ))}
              </div>

              <div className="flex flex-row mx-1">
                {['email', 'contactNumber'].map((field) => (
                  <div key={field} className="flex-1 flex-col mb-2 mx-2">
                    <label className="font-semibold text-blue-900" htmlFor={field}>
                      {field === 'email' ? 'Email' : 'Contact Number'}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type={field === 'email' ? 'email' : 'text'}
                      name={field}
                      id={field}
                      value={formData[field]}
                      onChange={handleChange}
                      placeholder={field === 'email' ? 'Email' : 'Contact Number'}
                      className="w-full bg-gray-200 p-2 pl-10 rounded-md"
                      required
                    />
                  </div>
                ))}
              </div>

              <div className="flex flex-row mx-1">
                {['password', 'confirmPassword'].map((field) => (
                  <div key={field} className="flex-1 flex-col mb-2 mx-2">
                    <label className="font-semibold text-blue-900" htmlFor={field}>
                      {field === 'password' ? 'Password' : 'Confirm Password'}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="password"
                      name={field}
                      id={field}
                      value={formData[field]}
                      onChange={handleChange}
                      placeholder={field === 'password' ? 'Password' : 'Confirm Password'}
                      className="w-full bg-gray-200 p-2 pl-10 rounded-md"
                      required
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col mx-10 mb-7 bg-white rounded-xl p-6 h-fit">
              <div className="flex flex-row mx-1">
                {renderDropdown('campus', 'Campus', options.campus)}
                {renderDropdown('college', 'College', options.college, !formData.campus)}
                {renderDropdown('department', 'Department', options.department, !formData.college)}
              </div>

              <div className="flex flex-row mx-1">
                <div className="flex-1 flex-col mb-2 mx-2">
                  <label className="font-semibold text-blue-900" htmlFor="roleID">
                    Role<span className="text-red-500">*</span>
                  </label>
                  <select
                    id="roleID"
                    name="roleID"
                    value={formData.roleID}
                    onChange={handleChange}
                    className="w-full bg-gray-200 p-2 rounded-md"
                  >
                    <option value="">Select a Role</option>
                    {options.role.map((role) => (
                      <option key={role.roleID} value={role.roleID}>
                        {role.role}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

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