import axios from "axios";
import React, { useState, useEffect } from "react";

const ProposalFormFirstPage = () => {
  const userID = localStorage.getItem('userid');
  const token = localStorage.getItem('token');
  const storedFirstname = JSON.parse(localStorage.getItem('firstname'));
  const storedLastname = JSON.parse(localStorage.getItem('lastname'));

  const username = storedFirstname + " " + storedLastname;

  const [regions, setRegions] = useState([]);
  const [province, setProvince] = useState([]);
  const [city, setCity] = useState([]);
  const [barangay, setBarangay] = useState([]);
  const [error, setError] = useState([]);

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
    projectLocation: "", //idea ani is: input address, save to db, return id, save in form.
    agency: [1], //get agencyID
    targetImplementation: "",
    totalHours: 0,
    background: "",
    projectComponent: "",
    beneficiaries: "",
    totalBudget: 0,

    targetGroups: [{
      targetGroup: ""
    }],

    goalsAndObjectives: [
      { goalsAndObjectives: "" }
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

    budgetaryRequirements: [
      {
        itemName: "",
        ustpAmount: 0,
        partnerAmount: 0,
        totalAmount: 0,
      }
    ],

    projectActivities: [
      {
        objective: "",
        involved: "",
        targetDate: "",
        personResponsible: ""
      }
    ],

    loadingOfTrainers: [
      {
        faculty: "",
        trainingLoad: "",
        hours: 0,
        ustpBudget: 0,
        agencyBudget: 0,
        totalBudgetRequirement: 0,
      }
    ],

    signatories: [{
      userID: 2,
      approvalStatus: false
    }],

    proponents: [{ proponent: "" }],
    
    budgetUSTP: "",
    budgetPartnerAgency: "",
    programChair: "", //get userid of prog chair. make input selectable
    collegeDean: "", //get userid aning dean

    region: '',
    province: '',
    city: '',
    barangay: '',
  });

  const handleActivityChange = (index, event) => {
    const { name, value } = event.target;
    const updatedActivities = [...formData.projectActivities];
    updatedActivities[index][name] = value;
    setFormData({ ...formData, projectActivities: updatedActivities });
  };

  const addActivityRow = () => {
    setFormData({
      ...formData,
      projectActivities: [
        ...formData.projectActivities,
        {
          objective: "",
          involved: "",
          targetDate: "",
          personResponsible: ""
        }
      ]
    });
  };

  const removeLastActivityRow = () => {
    if (formData.projectActivities.length > 1) {
      const projectActivities = formData.projectActivities.slice(0, -1);
      setFormData({ ...formData, projectActivities: projectActivities });
    }
  };  

  const handleMonitoringPlanScheduleRowChange = (index, field, value) => {
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
  
  const handleTrainerChange = (index, e) => {
    const { name, value } = e.target;
    const updatedTrainers = formData.loadingOfTrainers.map((trainer, i) => {
      if (i === index) {
        let updatedTrainer = { ...trainer, [name]: value };
  
        // Automatically calculate totalBudgetRequirement when budget values change
        if (name === 'ustpBudget' || name === 'agencyBudget') {
          updatedTrainer.totalBudgetRequirement = parseFloat(updatedTrainer.ustpBudget) + parseFloat(updatedTrainer.agencyBudget);
        }
        return updatedTrainer;
      }
      return trainer;
    });
  
    setFormData({ ...formData, loadingOfTrainers: updatedTrainers });
  };
  
  const addTrainerRow = () => {
    setFormData({
      ...formData,
      loadingOfTrainers: [
        ...formData.loadingOfTrainers,
        { faculty: "", trainingLoad: "", hours: 0, ustpBudget: 0, agencyBudget: 0, totalBudgetRequirement: 0 }
      ]
    });
  };

  const removeTrainerRow = (index) => {
    const updatedTrainers = formData.loadingOfTrainers.filter((_, i) => i !== index);
    setFormData({ ...formData, loadingOfTrainers: updatedTrainers });
  };
    
  // Function to handle changes in proponents inputs
  const handleProponentChange = (index, value) => {
    const updatedProponents = [...formData.proponents];
    updatedProponents[index].proponent = value; // Update the 'proponent' field
    setFormData({ ...formData, proponents: updatedProponents });
  };
  
  const handleObjectiveChange = (index, value) => {
    const updatedObjectives = [...formData.goalsAndObjectives];
    updatedObjectives[index].goalsAndObjectives = value;
    setFormData({ ...formData, goalsAndObjectives: updatedObjectives });
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
  const handleProponentButtonClick = () => {
    setFormData({
      ...formData,
      proponents: [...formData.proponents, { proponent: "" }], // Add new object with 'proponent' key
    });
  };

  const handleObjectiveButtonClick = () => {
    setFormData({
      ...formData,
      goalsAndObjectives: [
        ...formData.goalsAndObjectives,
        { goalsAndObjectives: "" }
      ]
    });
  };
  
  const handleObjectiveRemoveClick = () => {
    if (formData.goalsAndObjectives.length > 1) {
      const updatedObjectives = formData.goalsAndObjectives.slice(0, -1);
      setFormData({ ...formData, goalsAndObjectives: updatedObjectives });
    }
  };
  
  // Function to remove the last proponent field
  const handleProponentRemoveClick = () => {
    if (formData.proponents.length > 1) {
      const updatedProponents = formData.proponents.slice(0, -1); // Remove the last proponent
      setFormData({ ...formData, proponents: updatedProponents });
    }
  };
  
  const handleFormChange = (e) => {
    const { name, value } = e.target;
  
    setFormData((prevData) => {
      const updatedData = { ...prevData, [name]: value };
  
      // If beneficiaries are updated, update targetGroups as well
      if (name === 'beneficiaries') {
        updatedData.targetGroups[0].targetGroup = value;
      }
  
      return updatedData;
    });
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Create a copy of formData
    const modifiedData = { ...formData };
  
    // Remove the specific fields
    delete modifiedData.budgetUSTP;
    delete modifiedData.budgetPartnerAgency;
    delete modifiedData.programChair;
    delete modifiedData.collegeDean;
  
    console.log("Modified Data to be sent:", modifiedData); // Check the structure
  
    try {
      // Send POST request
      const response = await axios({
        method: 'post',
        url: 'http://127.0.0.1:8000/create_project',
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json',
        },
        data: modifiedData, // Axios automatically stringifies the object to JSON
      });
  
      // Handle successful response
      console.log('Successfully submitted:', response.data); // Response data from the server
    } catch (error) {
      // Handle errors, particularly validation errors from Django
      if (error.response) {
        // Server responded with a status other than 200
        console.error('Error:', error.response.data); // Display specific error messages
        alert('Submission failed. Please check your input.'); // You can provide better user feedback here
      } else {
        // Other errors (network issues, etc.)
        console.error('Request failed:', error.message);
        alert('An error occurred. Please try again later.');
      }
    }
  };
  
  // kuha region
  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/get_regions');
        setRegions(response.data);
      } catch (error) {
        console.error('Error fetching regions:', error);
      }
    };

    fetchRegions();
  }, []); // Empty dependency array means this will run only once on mount

  useEffect(() => {
    const fetchProvinces = async () => {
      if (!formData.region) {
        // If no region is selected, show error and don't fetch provinces
        setError('Please select a region first.');
        return;
      }

      try {
        const response = await axios.get(`http://127.0.0.1:8000/get_provinces/${formData.region}`);
        setProvince(response.data);
        setError(''); // Clear error when provinces are successfully fetched
      } catch (error) {
        console.error('Error fetching province:', error);
        setError('Error fetching province data.');
      }
    };

    fetchProvinces();
  }, [formData.region]); // Re-run when formData.region changes

  useEffect(() => {
    const fetchCity = async () => {
      if (!formData.province) {
        setError('Please select a province first.');
        return;
      }

      try {
        const response = await axios.get(`http://127.0.0.1:8000/get_cities/${formData.province}`);
        setCity(response.data);
        setError('');
      } catch (error) {
        console.error('Error fetching city:', error);
        setError('Error fetching province data.');
      }
    };

    fetchCity();
  }, [formData.province]);

  useEffect(() => {
    const fetchBarangay = async () => {
      if (!formData.city) {
        setError('Please select a city first');
        return;
      }

      try {
        const response = await axios.get(`http://127.0.0.1:8000/get_barangays/${formData.city}`);
        setBarangay(response.data);
        setError('');
      } catch (error) {
        console.error('Error fetching barangays:', error);
        setError('Error fetching province data.');
      }
    };

    fetchBarangay();
  }, [formData.city]);

  // Calculate and update the total budget whenever USTP or Partner Agency budget changes
  useEffect(() => {
    const total = parseFloat(formData.budgetUSTP || 0) + parseFloat(formData.budgetPartnerAgency || 0);
    setFormData((prevData) => ({ ...prevData, totalBudget: total }));
  }, [formData.budgetUSTP, formData.budgetPartnerAgency]); // Only run when these values change

  const handleBudgetFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
                {formData.proponents.map((proponentObj, index) => (
                  <input
                    key={index}
                    name={`proponent-${index}`}
                    value={proponentObj.proponent} // Access 'proponent' field in the object
                    onChange={(e) => handleProponentChange(index, e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mt-2"
                    placeholder={`Proponent ${index + 1}`}
                  />
                ))}


                <div className="flex space-x-2 mt-2">
                  <button 
                    type="button" // Prevent default form submission
                    onClick={handleProponentButtonClick} 
                    className="bg-blue-500 text-white px-4 py-2 rounded">
                    Add Proponent
                  </button>
                  <button 
                    type="button" // Prevent default form submission
                    onClick={handleProponentRemoveClick}
                    className={
                      formData.goalsAndObjectives.length === 1
                        ? "bg-gray-400 text-gray-300 px-4 py-2 rounded"
                        : "bg-red-500 text-white px-4 py-2 rounded"
                    }>
                    Remove Proponent
                  </button>
                </div>
            </div>
          </div>

          {/* Fourth Row */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block mb-2 font-semibold">PROGRAM</label>
              <input
                name="program"
                value={formData.program}
                onChange={(e) => handleFormChange(e.target.name, e.target.value.toUpperCase())}
                type="text"
                placeholder="Ex: BSIT"
                className="w-full p-2 border border-gray-300 rounded"
              />
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
                <option value="" disabled hidden>Select</option>
                <option value="I">I</option>
                <option value="II">II</option>
                <option value="III">III</option>
                <option value="IV">IV</option>
                <option value="V">V</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-semibold">COLLEGE</label>
              <input
                name="college"
                value={formData.college}
                onChange={(e) => handleFormChange(e.target.name, e.target.value.toUpperCase())}
                type="text"
                placeholder="Ex: CITC"
                className="w-full p-2 border border-gray-300 rounded"
              />
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
                value={formData.agency}
                onChange={handleFormChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="" disabled hidden>Select</option>
                <option value="Sample Agency">Sample Agency</option>
              </select>
            </div>
          </div>

          {/* Seventh Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-semibold">TARGET DATE OF IMPLEMENTATION</label>
              <input
                name="targetImplementation"
                value={formData.targetImplementation}
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
                type="number"
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
                onChange={handleBudgetFormChange}
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
                onChange={handleBudgetFormChange}
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
                <option value="" disabled hidden>Select</option>
                {regions.map((region) => (
                  <option key={region.regionID} value={region.regionID}>
                    {region.region}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-2 font-semibold">Province</label>
              <select
                name="province"
                value={formData.province}
                onChange={handleFormChange}
                disabled={!formData.region}//disabled till region selected
                className="w-full p-2 border border-gray-300 rounded"
              >
                {!formData.region ? (
                  <option value="" disabled>Select region first</option>
                ) : (
                  <option value="" disabled hidden>Select</option>
                )}
                {province.map((province) => (
                  <option key={province.provinceID} value={province.provinceID}>
                    {province.province}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-2 font-semibold">City</label>
              <select
                name="city"
                value={formData.city}
                onChange={handleFormChange}
                disabled={!formData.province}
                className="w-full p-2 border border-gray-300 rounded"
              >
                {!formData.province ? (
                  <option value="" disabled>Select province first</option>
                ) : (
                  <option value="" disabled hidden>Select</option>
                )}
                {city.map((city) => (
                  <option key={city.cityID} value={city.cityID}>
                    {city.city}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-2 font-semibold">Barangay</label>
              <select
                name="barangay"
                value={formData.barangay}
                onChange={handleFormChange}
                disabled={!formData.city}
                className="w-full p-2 border border-gray-300 rounded"
              >
                {!formData.city ? (
                  <option value="" disabled>Select city first</option>
                ) : (
                  <option value="" disabled hidden>Select</option>
                )}
                {barangay.map((barangay) => (
                  <option key={barangay.barangayID} value={barangay.barangayID}>
                    {barangay.barangay}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* row */}
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block mb-2 font-semibold">Address</label>
              <input
                name="address"
                value={formData.projectLocation}
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

              {/* Render input fields for each objective */}
              {formData.goalsAndObjectives.map((goal, index) => (
                <textarea
                  key={index} // Use index as key for simplicity; in production, use a unique ID
                  name={`objective-${index}`} // Dynamic name for each input
                  value={goal.goalsAndObjectives}
                  onChange={(e) => handleObjectiveChange(index, e.target.value)} // Update value on change
                  className="w-full p-2 border border-gray-300 rounded mt-2"
                  placeholder={`Objective ${index + 1}`}
                />
              ))}

              <div className="flex space-x-2 mt-2">
                <button
                  type="button" // Prevent default form submission
                  onClick={handleObjectiveButtonClick}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Add Objective
                </button>
                <button
                  type="button" // Prevent default form submission
                  onClick={handleObjectiveRemoveClick}
                  className={
                    formData.goalsAndObjectives.length === 1
                      ? "bg-gray-400 text-gray-300 px-4 py-2 rounded"
                      : "bg-red-500 text-white px-4 py-2 rounded"
                  }
                >
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

          {/* Project Activities Rows */}
          {formData.projectActivities.map((activity, index) => (
            <div key={index} className="grid grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block mb-2 font-semibold">PROJECT OBJECTIVE</label>
                <textarea
                  name="objective"
                  value={activity.objective}
                  onChange={(e) => handleActivityChange(index, e)}
                  className="w-full p-2 border border-gray-300 rounded"
                ></textarea>
              </div>

              <div>
                <label className="block mb-2 font-semibold">ACTIVITIES INVOLVED</label>
                <textarea
                  name="involved"
                  value={activity.involved}
                  onChange={(e) => handleActivityChange(index, e)}
                  className="w-full p-2 border border-gray-300 rounded"
                ></textarea>
              </div>

              <div>
                <label className="block mb-2 font-semibold">TARGET DATE</label>
                <input
                  name="targetDate"
                  value={activity.targetDate}
                  onChange={(e) => handleActivityChange(index, e)}
                  type="date"
                  className="w-full p-2 border border-gray-300 rounded"
                ></input>
              </div>

              <div>
                <label className="block mb-2 font-semibold">PERSON RESPONSIBLE</label>
                <input
                  name="personResponsible"
                  value={activity.personResponsible}
                  onChange={(e) => handleActivityChange(index, e)}
                  className="w-full p-2 border border-gray-300 rounded"
                ></input>
              </div>
            </div>
          ))}

          {/* Add Button and remove bttn*/}
          <div className="flex space-x-2 mt-2">
            <button
              type="button"
              onClick={addActivityRow}
              className="mt-4 p-2 bg-blue-500 text-white rounded"
            >
              Add Row
            </button>

            <button
              type="button"
              disabled={formData.projectActivities.length === 1}
              onClick={removeLastActivityRow} // Function to remove the last row
              className={
                formData.projectActivities.length === 1
                 ? "mt-4 p-2 bg-gray-400 text-gray-200 rounded"
                 : "mt-4 p-2 bg-red-500 text-white rounded"
              }
            >
              Remove Last Row
            </button>
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
                        onChange={(e) => handleMonitoringPlanScheduleRowChange(index, "approach", e.target.value)}
                        className="w-full p-1 border rounded"
                        rows="2"
                        placeholder="Enter M&E Instrument/Approach"
                      />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <textarea
                        name="dataGatheringStrategy"
                        value={row.dataGatheringStrategy}
                        onChange={(e) => handleMonitoringPlanScheduleRowChange(index, "dataGatheringStrategy", e.target.value)}
                        className="w-full p-1 border rounded"
                        rows="2"
                        placeholder="Enter Strategy for Data Gathering"
                      />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <textarea
                        name="schedule"
                        value={row.schedule}
                        onChange={(e) => handleMonitoringPlanScheduleRowChange(index, "schedule", e.target.value)}
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

        <div className="bg-white p-8 rounded-lg shadow-md space-y-6 text-sm mb-1">
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
                  {formData.loadingOfTrainers.map((trainer, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 border">
                        <input
                          name="faculty"
                          value={trainer.faculty}
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
                          name="hours"
                          value={trainer.hours}
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
                          name="ustpBudget"
                          value={trainer.ustpBudget}
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
                          name="agencyBudget"
                          value={trainer.agencyBudget}
                          onChange={(e) => handleTrainerChange(index, e)}
                          type="number"
                          required
                          className="w-full p-1 border border-gray-300 rounded"
                          placeholder="Partner Agency Budget"
                          min="0"
                        />
                      </td>
                      <td className="px-4 py-2 border">
                        <input
                          name="totalBudgetRequirement"
                          value={trainer.totalBudgetRequirement}
                          readOnly
                          type="number"
                          className="w-full p-1 border border-gray-300 rounded bg-gray-100"
                          placeholder="Total"
                        />
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
              {formData.loadingOfTrainers.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeTrainerRow(formData.loadingOfTrainers.length - 1)}
                  className="text-red-500 hover:underline"
                  title="Remove Last Row"
                >
                  - Remove Row
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md space-y-6 text-sm mb-1">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-semibold">
                ENDORSED BY PROGRAM CHAIR
              </label>
              <select
                name="programChair"
                value={formData.programChair}
                onChange={handleFormChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option>Select...</option>
                <option value={"guylord"}>Guylord</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                ENDORSED BY COLLEGE DEAN
              </label>
              <select
                name="collegeDean"
                value={formData.collegeDean}
                onChange={handleFormChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option>Select...</option>
                <option value={"EJ"}>EJ</option>
              </select>
            </div>
          </div>

          {/* row */}
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block mb-2 font-semibold">SUBMITTED BY: {username}</label>
            </div>
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