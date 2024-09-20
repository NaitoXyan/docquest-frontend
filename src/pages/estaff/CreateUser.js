import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";

const CreateUser = () => {
  // State for controlling the dropdowns
  const [campusDropdownOpen, setCampusDropdownOpen] = useState(false);
  const [collegeDropdownOpen, setCollegeDropdownOpen] = useState(false);
  const [departmentDropdownOpen, setDepartmentDropdownOpen] = useState(false);
  const [selectedCampus, setSelectedCampus] = useState("Campus");
  const [selectedCollege, setSelectedCollege] = useState("College");
  const [selectedDepartment, setSelectedDepartment] = useState("Department");

  const toggleDropdownCampus = () => {
    setCampusDropdownOpen(!campusDropdownOpen);
  };

  const toggleDropdownCollege = () => {
    setCollegeDropdownOpen(!collegeDropdownOpen);
  };

  const toggleDropdownDepartment = () => {
    setDepartmentDropdownOpen(!departmentDropdownOpen);
  };

  const handleSelectCampus = (campus) => {
    setSelectedCampus(campus);
    setCampusDropdownOpen(false);
  };

  const handleSelectCollege = (college) => {
    setSelectedCollege(college);
    setCollegeDropdownOpen(false);
  };

  const handleSelectDepartment = (department) => {
    setSelectedDepartment(department);
    setDepartmentDropdownOpen(false);
  };

  return (
    <div className="bg-gray-200 min-h-screen flex">
      {/* Sidebar with fixed width */}
      <div className="w-1/5 fixed h-full">
        <Sidebar />
      </div>

      {/* Main content area */}
      <div className="flex-1 ml-[20%]">
        <Topbar />
        <div className="flex flex-col mt-14">
          <h1 className="text-2xl font-semibold m-7">Create User Account</h1>
          <div className="flex flex-col mx-10 mb-7 bg-white rounded-xl p-16 h-fit">
            <div className="flex flex-row mx-1">
              <div className="flex-1 flex-col mb-2 mx-2">
                <h1 className="font-semibold text-blue-900">First Name</h1>
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full bg-gray-200 p-2 pl-10 rounded-md"
                />
              </div>
              <div className="flex-1 flex-col mb-2 mx-2">
                <h1 className="font-semibold text-blue-900">Middle Initial</h1>
                <input
                  type="text"
                  placeholder="Middle Initial"
                  className="w-full bg-gray-200 p-2 pl-10 rounded-md"
                />
              </div>
              <div className="flex-1 flex-col mb-2 mx-2">
                <h1 className="font-semibold text-blue-900">Last Name</h1>
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full bg-gray-200 p-2 pl-10 rounded-md"
                />
              </div>
            </div>

            <div className="flex flex-row mx-1">
              <div className="flex-1 flex-col mb-2 mx-2">
                <h1 className="font-semibold text-blue-900">Email</h1>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full bg-gray-200 p-2 pl-10 rounded-md"
                />
              </div>
              <div className="flex-1 flex-col mb-2 mx-2">
                <h1 className="font-semibold text-blue-900">Contact Number</h1>
                <input
                  type="text"
                  placeholder="Contact Number"
                  className="w-full bg-gray-200 p-2 pl-10 rounded-md"
                />
              </div>
            </div>

            <div className="flex flex-row mx-1">
              <div className="flex-1 flex-col mb-2 mx-2">
                <h1 className="font-semibold text-blue-900">Password</h1>
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full bg-gray-200 p-2 pl-10 rounded-md"
                />
              </div>
              <div className="flex-1 flex-col mb-2 mx-2">
                <h1 className="font-semibold text-blue-900">Confirm Password</h1>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full bg-gray-200 p-2 pl-10 rounded-md"
                />
              </div>
            </div>

            {/* Dropdown for Campus */}
            <div className="flex items-center mb-2 mr-2 w-full">
              <div className="flex-1 flex-col">
                <h1 className="font-semibold text-blue-900">Campus</h1>
                <div className="relative flex">
                  <input
                    type="text"
                    value={selectedCampus}
                    onClick={toggleDropdownCampus}
                    className="w-full bg-gray-200 p-2 rounded-l-md"
                    readOnly
                  />
                  <button
                    onClick={toggleDropdownCampus}
                    className="bg-gray-200 p-2 rounded-r-md border-l border-gray-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  {campusDropdownOpen && (
                    <div className="absolute right-0 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
                      <div className="py-1">
                        <a
                          href="#"
                          onClick={() => handleSelectCampus("Cagayan de Oro")}
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                        >
                          Cagayan de Oro
                        </a>
                        <a
                          href="#"
                          onClick={() => handleSelectCampus("Claveria")}
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                        >
                          Claveria
                        </a>
                        <a
                          href="#"
                          onClick={() => handleSelectCampus("Villanueva")}
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                        >
                          Villanueva
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Similar structure for College and Department dropdowns */}
            {/* College Dropdown */}
            <div className="flex items-center mb-2 mr-2 w-full">
              <div className="flex-1 flex-col">
                <h1 className="font-semibold text-blue-900">College</h1>
                <div className="relative flex">
                  <input
                    type="text"
                    value={selectedCollege}
                    onClick={toggleDropdownCollege}
                    className="w-full bg-gray-200 p-2 rounded-l-md"
                    readOnly
                  />
                  <button
                    onClick={toggleDropdownCollege}
                    className="bg-gray-200 p-2 rounded-r-md border-l border-gray-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  {collegeDropdownOpen && (
                    <div className="absolute right-0 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
                      <div className="py-1">
                        <a
                          href="#"
                          onClick={() => handleSelectCollege("COCST")}
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                        >
                          COCST
                        </a>
                        <a
                          href="#"
                          onClick={() => handleSelectCollege("CAFES")}
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                        >
                          CAFES
                        </a>
                        <a
                          href="#"
                          onClick={() => handleSelectCollege("CAS")}
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                        >
                          CAS
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Department Dropdown */}
            <div className="flex items-center mb-2 mr-2 w-full">
              <div className="flex-1 flex-col">
                <h1 className="font-semibold text-blue-900">Department</h1>
                <div className="relative flex">
                  <input
                    type="text"
                    value={selectedDepartment}
                    onClick={toggleDropdownDepartment}
                    className="w-full bg-gray-200 p-2 rounded-l-md"
                    readOnly
                  />
                  <button
                    onClick={toggleDropdownDepartment}
                    className="bg-gray-200 p-2 rounded-r-md border-l border-gray-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  {departmentDropdownOpen && (
                    <div className="absolute right-0 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
                      <div className="py-1">
                        <a
                          href="#"
                          onClick={() => handleSelectDepartment("IT")}
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                        >
                          IT
                        </a>
                        <a
                          href="#"
                          onClick={() => handleSelectDepartment("Engineering")}
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                        >
                          Engineering
                        </a>
                        <a
                          href="#"
                          onClick={() => handleSelectDepartment("Business")}
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                        >
                          Business
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end items-end mt-3 mx-1">
              <button className="bg-blue-900 text-white px-10 py-2 rounded-md hover:bg-blue-800">
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
