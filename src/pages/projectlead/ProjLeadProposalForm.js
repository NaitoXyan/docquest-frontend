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
    proponents: "",
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

          <form className="bg-white p-8 rounded-lg shadow-md space-y-6">
            {/* First Row */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block mb-2 font-semibold">
                  PROJECT CATEGORY under USTP CARES
                </label>
                <select
                  name="projectCategory"
                  value={formData.projectCategory}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                    <option value="" disabled selected hidden>Select project category</option>
                    <option value="I-Share">I-Share</option>
                    <option value="I-Help">I-Help</option>
                    <option value="I-Support">I-Support</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 font-semibold">PROJECT TITLE</label>
                <input
                  name="projectTitle"
                  value={formData.projectTitle}
                  onChange={handleChange}
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold">TYPE OF PROJECT</label>
                <select
                  name="typeOfProject"
                  value={formData.typeOfProject}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="" disabled selected hidden>Select a project type</option>
                  <option value="New Project">New Project</option>
                  <option value="Continuing Project">Continuing Project</option>
                </select>
              </div>
            </div>

            {/* Second Row */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block mb-2 font-semibold">PROJECT CATEGORY</label>
                <select
                  name="projectCategorySelect"
                  value={formData.projectCategorySelect}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="" disabled selected hidden>Select a project category</option>
                  <option value="New Project">Skills Training/Capacity Building</option>
                  <option value="New Project">Training Needs Survey</option>
                  <option value="New Project">Technical Advice/Consultancy</option>
                  <option value="New Project">Monitoring and Evaluation</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 font-semibold">TITLE OF RESEARCH</label>
                <input
                  name="titleOfResearch"
                  value={formData.titleOfResearch}
                  onChange={handleChange}
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>

            {/* Third Row */}
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block mb-2 font-semibold">PROPONENTS</label>
                <textarea
                  name="proponents"
                  value={formData.proponents}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                ></textarea>
              </div>
            </div>

            {/* Fourth Row */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block mb-2 font-semibold">PROGRAM</label>
                <select
                  name="program"
                  value={formData.program}
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                ></textarea>
              </div>
            </div>

            {/* Sixth Row */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block mb-2 font-semibold">PROJECT LOCATION</label>
                <input
                  name="projectLocation"
                  value={formData.projectLocation}
                  onChange={handleChange}
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold">PARTNER AGENCY</label>
                <input
                  name="partnerAgency"
                  value={formData.partnerAgency}
                  onChange={handleChange}
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold">BUDGET REQUIREMENT</label>
                <input
                  name="budgetRequirement"
                  value={formData.budgetRequirement}
                  onChange={handleChange}
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>

            {/* Seventh Row */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block mb-2 font-semibold">
                  TARGET DATE OF IMPLEMENTATION
                </label>
                <input
                  name="targetDate"
                  value={formData.targetDate}
                  onChange={handleChange}
                  type="date"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold">
                  TOTAL NUMBER OF HOURS
                </label>
                <input
                  name="totalHours"
                  value={formData.totalHours}
                  onChange={handleChange}
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold">Submitted by</label>
                <input
                  name="submittedBy"
                  value={formData.submittedBy}
                  onChange={handleChange}
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>

            {/* Eighth Row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 font-semibold">
                  Endorsed by: Program Chair
                </label>
                <input
                  name="endorsedByProgramChair"
                  value={formData.endorsedByProgramChair}
                  onChange={handleChange}
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold">
                  Endorsed by: College Dean
                </label>
                <input
                  name="endorsedByCollegeDean"
                  value={formData.endorsedByCollegeDean}
                  onChange={handleChange}
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="bg-yellow-500 text-white py-2 px-6 rounded-md hover:bg-yellow-600"
              >
                Create Proposal
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProjLeadProposalForm;
