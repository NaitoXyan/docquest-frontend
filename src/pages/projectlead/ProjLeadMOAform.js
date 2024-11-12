import React, { useState } from "react";
import ProjLeadSidebar from "../../components/ProjLeadSideBar";
import Topbar from "../../components/Topbar";
import MOAForm from "../../components/MOAForm";

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
        <MOAForm />
      </div>
    </div>
  );
};

export default ProjLeadProposalForm;
