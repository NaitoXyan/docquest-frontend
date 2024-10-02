import React, { useState } from "react";
import ProjLeadSidebar from "../../components/ProjLeadSideBar";
import Topbar from "../../components/Topbar";

const LoadTrainer = () => {
  const [projectInfo, setProjectInfo] = useState({
    projectTitle: "",
    partnerAgency: "",
    preparedBy: "",
    approved: "",
  });

  const [trainers, setTrainers] = useState([
    {
      nameOfFaculty: "",
      trainingLoad: "",
      noOfHours: "",
      budgetUSTP: "",
      budgetPartnerAgency: "",
      totalBudget: "",
    },
  ]);

  const handleProjectInfoChange = (e) => {
    setProjectInfo({ ...projectInfo, [e.target.name]: e.target.value });
  };

  const handleTrainerChange = (index, e) => {
    const { name, value } = e.target;
    const newTrainers = [...trainers];
    newTrainers[index][name] = value;

    // Calculate total budget if USTP or Partner Agency budget changes
    if (name === "budgetUSTP" || name === "budgetPartnerAgency") {
      const ustp = parseFloat(newTrainers[index].budgetUSTP) || 0;
      const partner = parseFloat(newTrainers[index].budgetPartnerAgency) || 0;
      newTrainers[index].totalBudget = ustp + partner;
    }

    setTrainers(newTrainers);
  };

  const addTrainerRow = () => {
    setTrainers([
      ...trainers,
      {
        nameOfFaculty: "",
        trainingLoad: "",
        noOfHours: "",
        budgetUSTP: "",
        budgetPartnerAgency: "",
        totalBudget: "",
      },
    ]);
  };

  const removeTrainerRow = (index) => {
    const newTrainers = [...trainers];
    newTrainers.splice(index, 1);
    setTrainers(newTrainers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      projectTitle: projectInfo.projectTitle,
      partnerAgency: projectInfo.partnerAgency,
      trainers: trainers,
      preparedBy: projectInfo.preparedBy,
      approved: projectInfo.approved,
    };

    try {
      const response = await fetch("/api/load-trainer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        // Handle success (e.g., show a success message, reset form)
        alert("Load Trainer data submitted successfully!");
        // Reset form
        setProjectInfo({
          projectTitle: "",
          partnerAgency: "",
          preparedBy: "",
          approved: "",
        });
        setTrainers([
          {
            nameOfFaculty: "",
            trainingLoad: "",
            noOfHours: "",
            budgetUSTP: "",
            budgetPartnerAgency: "",
            totalBudget: "",
          },
        ]);
      } else {
        // Handle error
        alert("Failed to submit Load Trainer data.");
      }
    } catch (error) {
      console.error("Error submitting Load Trainer data:", error);
      alert("An error occurred while submitting the data.");
    }
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
          <h1 className="text-2xl font-semibold mb-5 mt-5">Load Trainer</h1>

          <form
            className="bg-white p-8 rounded-lg shadow-md space-y-6"
            onSubmit={handleSubmit}
          >
            {/* First Row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 font-semibold">Project Title:</label>
                <input
                  name="projectTitle"
                  value={projectInfo.projectTitle}
                  onChange={handleProjectInfoChange}
                  type="text"
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Enter project title"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold">Partner Agency:</label>
                <input
                  name="partnerAgency"
                  value={projectInfo.partnerAgency}
                  onChange={handleProjectInfoChange}
                  type="text"
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Enter partner agency"
                />
              </div>
            </div>

            {/* Second Row - Trainers Table */}
            <div className="relative">
              <label className="block mb-2 font-semibold">Trainers:</label>
              <div className="overflow-x-auto">
                <table className="min-w-full border">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 border bg-gray-300">Name of Faculty</th>
                      <th className="px-4 py-2 border bg-gray-300">Training Load</th>
                      <th className="px-4 py-2 border bg-gray-300">No. of Hours</th>
                      <th className="px-4 py-2 border bg-gray-300">USTP Budget</th>
                      <th className="px-4 py-2 border bg-gray-300">Partner Agency Budget</th>
                      <th className="px-4 py-2 border bg-gray-300">Total Budgetary Requirement</th>
                    </tr>
                  </thead>
                  <tbody>
                    {trainers.map((trainer, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2 border">
                          <input
                            name="nameOfFaculty"
                            value={trainer.nameOfFaculty}
                            onChange={(e) => handleTrainerChange(index, e)}
                            type="text"
                            required
                            className="w-full p-1 border border-gray-300 rounded"
                            placeholder="Faculty Name"
                          />
                        </td>
                        <td className="px-4 py-2 border">
                          <input
                            name="trainingLoad"
                            value={trainer.trainingLoad}
                            onChange={(e) => handleTrainerChange(index, e)}
                            type="text"
                            required
                            className="w-full p-1 border border-gray-300 rounded"
                            placeholder="Training Load"
                          />
                        </td>
                        <td className="px-4 py-2 border">
                          <input
                            name="noOfHours"
                            value={trainer.noOfHours}
                            onChange={(e) => handleTrainerChange(index, e)}
                            type="number"
                            required
                            className="w-full p-1 border border-gray-300 rounded"
                            placeholder="Hours"
                            min="0"
                          />
                        </td>
                        <td className="px-4 py-2 border">
                          <input
                            name="budgetUSTP"
                            value={trainer.budgetUSTP}
                            onChange={(e) => handleTrainerChange(index, e)}
                            type="number"
                            required
                            className="w-full p-1 border border-gray-300 rounded"
                            placeholder="USTP Budget"
                            min="0"
                          />
                        </td>
                        <td className="px-4 py-2 border">
                          <input
                            name="budgetPartnerAgency"
                            value={trainer.budgetPartnerAgency}
                            onChange={(e) => handleTrainerChange(index, e)}
                            type="number"
                            required
                            className="w-full p-1 border border-gray-300 rounded"
                            placeholder="Partner Agency Budget"
                            min="0"
                          />
                        </td>
                        <td className="px-4 py-2 border">
                          <div className="flex items-center">
                            <input
                              name="totalBudget"
                              value={trainer.totalBudget}
                              readOnly
                              type="number"
                              className="w-full p-1 border border-gray-300 rounded bg-gray-100"
                              placeholder="Total"
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Add and Remove Buttons */}
              <div className="flex justify-between mt-2">
                <button
                  type="button"
                  onClick={addTrainerRow}
                  className="text-green-500 hover:underline"
                >
                  + Add Row
                </button>
                {trainers.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeTrainerRow(trainers.length - 1)}
                    className="text-red-500 hover:underline"
                    title="Remove Last Row"
                  >
                    - Remove Row
                  </button>
                )}
              </div>
            </div>

            {/* Third Row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 font-semibold">Prepared By:</label>
                <input
                  name="preparedBy"
                  value={projectInfo.preparedBy}
                  onChange={handleProjectInfoChange}
                  type="text"
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Main Proponent / Project Leader"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold">Approved:</label>
                <input
                  name="approved"
                  value={projectInfo.approved}
                  onChange={handleProjectInfoChange}
                  type="text"
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Name of approver"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="bg-yellow-500 text-white py-2 px-6 rounded-md hover:bg-yellow-600"
              >
                Load Trainer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoadTrainer;
