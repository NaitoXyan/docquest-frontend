import React, { useState, useEffect } from "react";

const ProposalFormFirstPage = () => {
  const userID = JSON.parse(localStorage.getItem('userID'));
  const storedFirstname = JSON.parse(localStorage.getItem('firstname'));
  const storedLastname = JSON.parse(localStorage.getItem('lastname'));

  const username = storedFirstname + " " + storedLastname;

  const [formData, setFormData] = useState({
    userID: userID,
    programCategory: "",
    projectTitle: "",
    projectType: "",
    projectCategory: "",
    researchTitle: "",
    program: "",
    accreditationLevel: "",
    college: "",
    addressID: "", //idea ani is: input address, save to db, return id, save in form.
    targetDateImplementation: "",
    totalHours: "",
    background: "",
    projectComponent: "",
    beneficiaries: "",
    totalBudget: "",

    goalsAndObjectives: [''],

    budgetaryRequirements: [
      {
        itemName: "",
        ustpAmount: "",
        partnerAmount: "",
        totalAmount: "",
      }
    ],

    evaluationAndMonitorings: [
      {
          projectSummary: "",
          indicators: "",
          meansOfVerification: "",
          risksAssumptions: "",
          type: "goal"
      },
      {
          projectSummary: "",
          indicators: "",
          meansOfVerification: "",
          risksAssumptions: "",
          type: "outcome"
      },
      {
          projectSummary: "",
          indicators: "",
          meansOfVerification: "",
          risksAssumptions: "",
          type: "outputs"
      },
      {
          projectSummary: "",
          indicators: "",
          meansOfVerification: "",
          risksAssumptions: "",
          type: "activities"
      }
    ],

    monitoringPlanSchedules: [
      {
          approach: "",
          dataGatheringStrategy: "",
          schedule: "",
          implementationPhase: "Before Implementation Phase"
      },
      {
          approach: "",
          dataGatheringStrategy: "",
          schedule: "",
          implementationPhase: "During Project Implementation"
      },
      {
          approach: "",
          dataGatheringStrategy: "",
          schedule: "",
          implementationPhase: "After Project Implementation"
      }
    ],

    projectObjective: "",
    involved: "",
    targetDate: "",
    personResponsible: "",

    budgetUSTP: "",
    budgetPartnerAgency: "",

    proponents: [''],
    partnerAgency: "", //get agencyID
    programChair: "", //get userid of prog chair. make input selectable
    collegeDean: "", //get userid aning dean
  });

  const handleRowChange = (index, field, value) => {
    setFormData((prevData) => {
      const updatedSchedules = prevData.monitoringPlanSchedules.map((row, i) => {
        if (i === index) {
          return { ...row, [field]: value };
        }
        return row;
      });
      return { ...prevData, monitoringPlanSchedules: updatedSchedules };
    });
  };
  

    
  // Function to handle changes in proponents inputs
  const handleProponentChange = (index, value) => {
    const newProponents = [...formData.proponents];
    newProponents[index] = value;
    setFormData({ ...formData, proponents: newProponents });
  };

    // Function to handle changes in objectives inputs
  const handleObjectiveChange = (index, value) => {
    const newObjectives = [...formData.goalsAndObjectives];
    newObjectives[index] = value;
    setFormData({ ...formData, goalsAndObjectives: newObjectives });
  };

  // Function to handle form change for each row
  const handleEvaluationChange = (index, field, value) => {
    const updatedEvaluation = formData.evaluationAndMonitorings.map((item, i) => {
      if (i === index) {
        return { ...item, [field]: value };
      }
      return item;
    });
    setFormData({ ...formData, evaluationAndMonitorings: updatedEvaluation });
  };


    // Function to add a new proponent field
  const handleButtonClick = () => {
    setFormData({
    ...formData,
    proponents: [...formData.proponents, ''],
    });
  };

  // Function to add a new objectives field
  const handleObjectiveButtonClick = () => {
    setFormData({
    ...formData,
    goalsAndObjectives: [...formData.goalsAndObjectives, ''],
    });
  };

  // Function to remove the last proponent field
  const handleRemoveClick = () => {
    if (formData.proponents.length > 1) {
    setFormData({
      ...formData,
      proponents: formData.proponents.slice(0, formData.proponents.length - 1),
    });
    }
  };

  // Function to remove the last proponent field
  const handleObjectiveRemoveClick = () => {
    if (formData.goalsAndObjectives.length > 1) {
    setFormData({
      ...formData,
      goalsAndObjectives: formData.goalsAndObjectives.slice(0, formData.goalsAndObjectives.length - 1),
    });
    }
  };
    
    // Function to handle changes in form inputs
    const handleFormChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Calculate and update the total budget whenever USTP or Partner Agency budget changes
    useEffect(() => {
      const total = parseFloat(formData.budgetUSTP || 0) + parseFloat(formData.budgetPartnerAgency || 0);
      setFormData((prevData) => ({ ...prevData, totalBudget: total }));
    }, [formData.budgetUSTP, formData.budgetPartnerAgency]);

  // Function to handle form change for budgetary requirements
  const handleBudgetChange = (index, field, value) => {
    const updatedBudget = formData.budgetaryRequirements.map((item, i) => {
      if (i === index) {
        return { ...item, [field]: value };
      }
      return item;
    });
    setFormData({ ...formData, budgetaryRequirements: updatedBudget });
  };

  // Function to add a new budget item
  const addBudgetItem = () => {
    setFormData({
      ...formData,
      budgetaryRequirements: [
        ...formData.budgetaryRequirements,
        { itemName: "", ustpAmount: "", partnerAmount: "", totalAmount: "" }
      ]
    });
  };


  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh
    console.log("Form Data Submitted:", formData);
    // Further submit logic like API calls can be added here
  };

  return (
    <div className="flex flex-col mt-14 px-10">
      <h1 className="text-2xl font-semibold mb-5 mt-5">
        Extension Project Proposal
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="bg-white p-8 rounded-lg shadow-md space-y-6 text-sm mb-1">
          {/* First Row */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block mb-2 font-semibold">
                PROJECT CATEGORY under USTP CARES
              </label>
              <select
                name="programCategory"
                value={formData.programCategory}
                onChange={handleFormChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="" disabled hidden>Select project category</option>
                <option value="I-Share">I-Share</option>
                <option value="I-Help">I-Help</option>
                <option value="I-Support">I-Support</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-semibold">TYPE OF PROJECT</label>
              <select
                name="projectType"
                value={formData.projectType}
                onChange={handleFormChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="" disabled hidden>Select a project type</option>
                <option value="New Project">New Project</option>
                <option value="Continuing Project">Continuing Project</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-semibold">PROJECT CATEGORY</label>
              <select
                name="projectCategory"
                value={formData.projectCategory}
                onChange={handleFormChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="" disabled hidden>
                    Select a project category
                </option>
                <option value="Skills Training/Capacity Building">
                    Skills Training/Capacity Building
                </option>
                <option value="Training Needs Survey">
                    Training Needs Survey
                </option>
                <option value="Technical Advice/Consultancy">
                    Technical Advice/Consultancy
                </option>
                <option value="Monitoring and Evaluation">
                    Monitoring and Evaluation
                </option>
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
                name="researchTitle"
                value={formData.researchTitle}
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
                  Project Leader: {username}
                </label>
              </div>

                {/* Render input fields for each proponent */}
                {formData.proponents.map((proponent, index) => (
                <input
                    key={index} // Use index as key for simplicity; in production, use a unique ID
                    name={`proponent-${index}`} // Dynamic name for each input
                    value={proponent}
                    onChange={(e) => handleProponentChange(index, e.target.value)} // Update value on change
                    className="w-full p-2 border border-gray-300 rounded mt-2"
                    placeholder={`Proponent ${index + 1}`}
                />
                ))}

                <div className="flex space-x-2 mt-2">
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
                name="beneficiaries"
                value={formData.beneficiaries}
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
                name="partnerAgency"
                value={formData.partnerAgency}
                onChange={handleFormChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option>Select...</option>
              </select>
            </div>
          </div>

          {/* Seventh Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-semibold">TARGET DATE OF IMPLEMENTATION</label>
              <input
                name="targetDateImplementation"
                value={formData.targetDateImplementation}
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
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md space-y-6 text-sm mb-1 mt-1">
          {/* Sixth Row */}
          <div className="grid grid-cols-1 gap-4">
            <label className="block mb-2 font-bold text-base">BUDGET REQUIREMENT</label>
          </div>

          {/* Sixth Row */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block mb-2 font-semibold">USTP</label>
              <input
                name="budgetUSTP"
                value={formData.budgetUSTP}
                onChange={handleFormChange}
                type="number"
                placeholder="Enter Amount"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">PARTNER AGENCY</label>
              <input
                name="budgetPartnerAgency"
                value={formData.budgetPartnerAgency}
                onChange={handleFormChange}
                type="number"
                placeholder="Enter Amount"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div>
            <label className="block mb-2 font-semibold">Total</label>
              <input
                name="totalBudget"
                value={formData.totalBudget}
                readOnly
                type="number"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md space-y-6 text-sm mb-1 mt-1">
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
                name="region"
                value={formData.region}
                onChange={handleFormChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option>Select...</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-semibold">Province</label>
              <select
                name="province"
                value={formData.province}
                onChange={handleFormChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option>Select...</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-semibold">City</label>
              <select
                name="city"
                value={formData.city}
                onChange={handleFormChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option>Select...</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-semibold">Barangay</label>
              <select
                name="barangay"
                value={formData.barangay}
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
                name="address"
                value={formData.addressID}
                onChange={handleFormChange}
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md space-y-6 text-sm mb-1">
          {/* row */}
          <div className="grid grid-cols-1 gap-4">
              <div>
                  <label className="block mb-2 font-semibold">
                      BACKGROUND OF THE PROJECT
                  </label>
                  <textarea
                      name="background"
                      value={formData.background}
                      onChange={handleFormChange}
                      className="w-full p-2 border border-gray-300 rounded"
                  ></textarea>
              </div>
          </div>
          {/* row */}
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block mb-2 font-bold text-base">GOALS AND OBJECTIVES</label>
              <div className="grid grid-cols-1 gap-2">
                <label className="block mb-2">
                  Specifically, the objectives of the project are:
                </label>
              </div>

                {/* Render input fields for each proponent */}
                {formData.goalsAndObjectives.map((goalsAndObjectives, index) => (
                <input
                    key={index} // Use index as key for simplicity; in production, use a unique ID
                    name={`objective-${index}`} // Dynamic name for each input
                    value={goalsAndObjectives}
                    onChange={(e) => handleObjectiveChange(index, e.target.value)} // Update value on change
                    className="w-full p-2 border border-gray-300 rounded mt-2"
                    placeholder={`Objective ${index + 1}`}
                />
                ))}

                <div className="flex space-x-2 mt-2">
                  <button 
                    type="button" // Prevent default form submission
                    onClick={handleObjectiveButtonClick} 
                    className="bg-blue-500 text-white px-4 py-2 rounded">
                    Add Objective
                  </button>
                  <button 
                    type="button" // Prevent default form submission
                    onClick={handleObjectiveRemoveClick}
                    className="bg-red-500 text-white px-4 py-2 rounded">
                    Remove Objective
                  </button>
                </div>
            </div>
          </div>


          {/* row */}
          <div className="grid grid-cols-1 gap-4"> 
              <div>
                  <label className="block mb-2 font-semibold">
                      PROJECT COMPONENT
                  </label>
                  <textarea
                      name="projectComponent"
                      value={formData.projectComponent}
                      onChange={handleFormChange}
                      className="w-full p-2 border border-gray-300 rounded"
                  ></textarea>
              </div>
            </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md space-y-6 text-sm mb-1">
          <div className="grid grid-cols-1 gap-4">
              <div>
                  <label className="block mb-2 font-semibold">
                      PROJECT IMPLEMENTATION PLAN AND MANAGEMENT
                  </label>
              </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="block mb-2 font-semibold">
                  PROJECT OBJECTIVE
              </label>
              <textarea
                  name="objective"
                  value={formData.projectObjective}
                  onChange={handleFormChange}
                  className="w-full p-2 border border-gray-300 rounded"
              ></textarea>
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                ACTIVITIES INVOLVED
              </label>
              <textarea
                name="involved"
                value={formData.involved}
                onChange={handleFormChange}
                className="w-full p-2 border border-gray-300 rounded"
              ></textarea>
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                TARGET DATE
              </label>
              <input
                name="targetDate"
                value={formData.targetDate}
                onChange={handleFormChange}
                type="date"
                className="w-full p-2 border border-gray-300 rounded"
              ></input>
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                PERSON RESPONSIBLE
              </label>
              <input
                name="personResponsible"
                value={formData.personResponsible}
                onChange={handleFormChange}
                className="w-full p-2 border border-gray-300 rounded"
              ></input>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md space-y-6 text-sm mb-1">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block mb-2 font-semibold">BUDGETARY REQUIREMENTS</label>
            </div>
          </div>

          {formData.budgetaryRequirements.map((budgetItem, index) => (
            <div key={index} className="grid grid-cols-4 gap-4">
              <div>
                <label className="block mb-2 font-semibold">ITEM NAME</label>
                <input
                  name="itemName"
                  value={budgetItem.itemName}
                  onChange={(e) => handleBudgetChange(index, "itemName", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold">USTP AMOUNT</label>
                <input
                  name="ustpAmount"
                  value={budgetItem.ustpAmount}
                  onChange={(e) => handleBudgetChange(index, "ustpAmount", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold">PARTNER AMOUNT</label>
                <input
                  name="partnerAmount"
                  value={budgetItem.partnerAmount}
                  onChange={(e) => handleBudgetChange(index, "partnerAmount", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold">TOTAL AMOUNT</label>
                <input
                  name="totalAmount"
                  value={budgetItem.totalAmount}
                  onChange={(e) => handleBudgetChange(index, "totalAmount", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>
          ))}

          <button type="button" onClick={addBudgetItem} className="mt-4 p-2 bg-blue-500 text-white rounded">
            Add Budget Item
          </button>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md space-y-6 text-sm mb-1">
          {/* Table Headers */}
          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="block mb-2 font-semibold">PROJECT SUMMARY</label>
            </div>
            <div>
              <label className="block mb-2 font-semibold">INDICATORS</label>
            </div>
            <div>
              <label className="block mb-2 font-semibold">MEANS OF VERIFICATION</label>
            </div>
            <div>
              <label className="block mb-2 font-semibold">RISKS/ASSUMPTIONS</label>
            </div>
          </div>

          {/* Table Rows */}
          {formData.evaluationAndMonitorings.map((evaluation, index) => (
            <div key={index} className="grid grid-cols-4 gap-4">
              {/* Project Summary */}
              <div>
                <textarea
                  name="projectSummary"
                  value={evaluation.projectSummary}
                  onChange={(e) => handleEvaluationChange(index, "projectSummary", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder={`Project Summary (${evaluation.type.toUpperCase()})`}
                ></textarea>
              </div>

              {/* Indicators */}
              <div>
                <textarea
                  name="indicators"
                  value={evaluation.indicators}
                  onChange={(e) => handleEvaluationChange(index, "indicators", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder={`Indicators (${evaluation.type.toUpperCase()})`}
                ></textarea>
              </div>

              {/* Means of Verification */}
              <div>
                <textarea
                  name="meansOfVerification"
                  value={evaluation.meansOfVerification}
                  onChange={(e) => handleEvaluationChange(index, "meansOfVerification", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder={`Means of Verification (${evaluation.type.toUpperCase()})`}
                ></textarea>
              </div>

              {/* Risks/Assumptions */}
              <div>
                <textarea
                  name="risksAssumptions"
                  value={evaluation.risksAssumptions}
                  onChange={(e) => handleEvaluationChange(index, "risksAssumptions", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder={`Risks/Assumptions (${evaluation.type.toUpperCase()})`}
                ></textarea>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md space-y-6 text-sm mb-1">
          <div className="p-4">
            <table className="min-w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 p-2">Monitoring Phase</th>
                  <th className="border border-gray-300 p-2">M&E Instrument/Approach</th>
                  <th className="border border-gray-300 p-2">Format or Strategy for Data Gathering</th>
                  <th className="border border-gray-300 p-2">Schedule</th>
                </tr>
              </thead>
              <tbody>
                {formData.monitoringPlanSchedules.map((row, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 p-2">{row.implementationPhase}</td>
                    <td className="border border-gray-300 p-2">
                      <textarea
                        name="approach"
                        value={row.approach}
                        onChange={(e) => handleRowChange(index, "approach", e.target.value)}
                        className="w-full p-1 border rounded"
                        rows="2"
                        placeholder="Enter M&E Instrument/Approach"
                      />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <textarea
                        name="dataGatheringStrategy"
                        value={row.dataGatheringStrategy}
                        onChange={(e) => handleRowChange(index, "dataGatheringStrategy", e.target.value)}
                        className="w-full p-1 border rounded"
                        rows="2"
                        placeholder="Enter Strategy for Data Gathering"
                      />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <textarea
                        name="schedule"
                        value={row.schedule}
                        onChange={(e) => handleRowChange(index, "schedule", e.target.value)}
                        className="w-full p-1 border rounded"
                        rows="2"
                        placeholder="Enter Schedule"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>


        {/* submit naa */}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ProposalFormFirstPage;