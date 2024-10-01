import React, { useState } from "react";
import ProjLeadSidebar from "../../components/ProjLeadSideBar";
import Topbar from "../../components/Topbar";

const ProjLeadProposalForm = () => {
  const [formData, setFormData] = useState({
    projectCategory: "",
    projectTitle: "",
    typeOfProject: "",
    projectCategorySelect: "",
    titleOfResearch: "",
    program: "",
    accreditationLevel: "",
    college: "",
    targetGroups: "",
    projectLocation: "",
    partnerAgency: "",
    budgetRequirement: "",
    targetDate: "",
    totalHours: "",
    submittedBy: "",
    endorsedByProgramChair: "",
    endorsedByCollegeDean: "",
  });

  // State to manage proponents
  const [proponents, setProponents] = useState(['']); // Initialize with one empty input

  // Function to handle changes in form inputs
  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to handle adding a new input field
  const handleButtonClick = () => {
    setProponents([...proponents, '']); // Add a new empty string for a new input
  };

  // Function to handle removing the last proponent input field
  const handleRemoveClick = () => {
    if (proponents.length > 1) {
      setProponents(proponents.slice(0, proponents.length - 1)); // Remove the last proponent
    }
  };

  // Function to handle changes in the proponents input fields
  const handleProponentChange = (index, value) => {
    const newProponents = [...proponents]; // Create a copy of the current proponents
    newProponents[index] = value; // Update the value at the specific index
    setProponents(newProponents); // Update state
  };

  return (
    <div className="bg-gray-200 min-h-screen flex">
      {/* Sidebar */}
      <div className="w-1/5 fixed h-full">
        <ProjLeadSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-[20%]">
        <Topbar />
        <div className="flex flex-col mt-14 px-10">
          <h1 className="text-2xl font-semibold mb-5 mt-5">
            Extension Project Proposal
          </h1>

          <form className="bg-white p-8 rounded-lg shadow-md space-y-6 text-sm">
            {/* First Row */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block mb-2 font-semibold">
                  PROJECT CATEGORY under USTP CARES
                </label>
                <select
                  name="projectCategory"
                  value={formData.projectCategory}
                  onChange={handleFormChange}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="" disabled selected hidden>Select project category</option>
                  <option value="I-Share">I-Share</option>
                  <option value="I-Help">I-Help</option>
                  <option value="I-Support">I-Support</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 font-semibold">TYPE OF PROJECT</label>
                <select
                  name="typeOfProject"
                  value={formData.typeOfProject}
                  onChange={handleFormChange}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="" disabled selected hidden>Select a project type</option>
                  <option value="New Project">New Project</option>
                  <option value="Continuing Project">Continuing Project</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 font-semibold">PROJECT CATEGORY</label>
                <select
                  name="projectCategorySelect"
                  value={formData.projectCategorySelect}
                  onChange={handleFormChange}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="" disabled selected hidden>Select a project category</option>
                  <option value="New Project">Skills Training/Capacity Building</option>
                  <option value="New Project">Training Needs Survey</option>
                  <option value="New Project">Technical Advice/Consultancy</option>
                  <option value="New Project">Monitoring and Evaluation</option>
                </select>
              </div>
            </div>

            {/* Row */}
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-3">
                <label className="block mb-2 font-semibold">PROJECT TITLE</label>
                <input
                  name="projectTitle"
                  value={formData.projectTitle}
                  onChange={handleFormChange}
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>

            {/* Second Row */}
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-3">
                <label className="block mb-2 font-semibold">TITLE OF RESEARCH</label>
                <input
                  name="titleOfResearch"
                  value={formData.titleOfResearch}
                  onChange={handleFormChange}
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>

            {/* Third Row */}
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block mb-2 font-bold text-base">PROPONENTS</label>
                <div className="grid grid-cols-1 gap-2">
                  <label className="block mb-2">
                    Project Leader: Emmannuel Duallo
                  </label>

                  <div className="flex space-x-2">
                    <button 
                      type="button" // Prevent default form submission
                      onClick={handleButtonClick} 
                      className="bg-blue-500 text-white px-4 py-2 rounded">
                      Add Proponent
                    </button>
                    <button 
                      type="button" // Prevent default form submission
                      onClick={handleRemoveClick}
                      className="bg-red-500 text-white px-4 py-2 rounded">
                      Remove Proponent
                    </button>
                  </div>
                </div>

                {/* Render input fields for each proponent */}
                {proponents.map((proponent, index) => (
                  <input
                    key={index} // Use index as key for simplicity; in production, use a unique ID
                    name={`proponent-${index}`} // Dynamic name for each input
                    value={proponent}
                    onChange={(e) => handleProponentChange(index, e.target.value)} // Update value on change
                    className="w-full p-2 border border-gray-300 rounded mt-2"
                    placeholder={`Proponent ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Fourth Row */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block mb-2 font-semibold">PROGRAM</label>
                <select
                  name="program"
                  value={formData.program}
                  onChange={handleFormChange}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option>Select...</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 font-semibold">
                  ACCREDITATION LEVEL
                </label>
                <select
                  name="accreditationLevel"
                  value={formData.accreditationLevel}
                  onChange={handleFormChange}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option>Select...</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 font-semibold">COLLEGE</label>
                <select
                  name="college"
                  value={formData.college}
                  onChange={handleFormChange}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option>Select...</option>
                </select>
              </div>
            </div>

            {/* Fifth Row */}
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block mb-2 font-semibold">
                  TARGET GROUPS/BENEFICIARIES
                </label>
                <textarea
                  name="targetGroups"
                  value={formData.targetGroups}
                  onChange={handleFormChange}
                  className="w-full p-2 border border-gray-300 rounded"
                ></textarea>
              </div>
            </div>

            {/* Sixth Row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 font-semibold">PARTNER AGENCY</label>
                <select
                  name="college"
                  value={formData.college}
                  onChange={handleFormChange}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option>Select...</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 font-semibold">BUDGET REQUIREMENT</label>
                <input
                  name="budgetRequirement"
                  value={formData.budgetRequirement}
                  onChange={handleFormChange}
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>

            {/* Seventh Row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 font-semibold">TARGET DATE</label>
                <input
                  name="targetDate"
                  value={formData.targetDate}
                  onChange={handleFormChange}
                  type="date"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold">TOTAL HOURS</label>
                <input
                  name="totalHours"
                  value={formData.totalHours}
                  onChange={handleFormChange}
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>

            <div>
               {/* row */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block mb-2 font-bold text-base">PROJECT LOCATION</label>
              </div>
            </div>

            {/* row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 font-semibold">Region</label>
                <select
                  name="college"
                  value={formData.college}
                  onChange={handleFormChange}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option>Select...</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 font-semibold">Province</label>
                <select
                  name="college"
                  value={formData.college}
                  onChange={handleFormChange}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option>Select...</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 font-semibold">City</label>
                <select
                  name="college"
                  value={formData.college}
                  onChange={handleFormChange}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option>Select...</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 font-semibold">Barangay</label>
                <select
                  name="college"
                  value={formData.college}
                  onChange={handleFormChange}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option>Select...</option>
                </select>
              </div>
            </div>

            {/* row */}
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block mb-2 font-semibold">Address</label>
                <input
                  name="endorsedByCollegeDean"
                  value={formData.endorsedByCollegeDean}
                  onChange={handleFormChange}
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>
            </div>

            {/* row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 font-semibold">
                  ENDORSED BY PROGRAM CHAIR
                </label>
                <select
                  name="college"
                  value={formData.college}
                  onChange={handleFormChange}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option>Select...</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 font-semibold">
                  ENDORSED BY COLLEGE DEAN
                </label>
                <select
                  name="college"
                  value={formData.college}
                  onChange={handleFormChange}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option>Select...</option>
                </select>
              </div>
            </div>

            {/* row */}
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block mb-2 font-semibold">SUBMITTED BY</label>
                <input
                  name="submittedBy"
                  value={formData.submittedBy}
                  onChange={handleFormChange}
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>

            {/* submit naa */}
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProjLeadProposalForm;
