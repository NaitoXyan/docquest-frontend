import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

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
  const [proponents, setProponents] = useState([]);
  const [nonUserProponents, setNonUserProponents] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [showTrainers, setShowTrainers] = useState(false);
  const [programChair, setProgramChair] = useState("");
  const [collegeDean, setCollegeDean] = useState("");
  var director = "Dr. Maria Teresa M. Fajardo";
  var vcaa = "Dr. Jocelyn B. Barbosa";
  var vcri = "Engr. Alex L. Maureal";
  var accountant = "Cherry Ann S. Villarte, CPA";
  var chancellor = "Atty. Dionel O. Albina";
  const [agencies, setAgencies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

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
    beneficiaries: "",
    targetImplementation: "",
    totalHours: 0,
    background: "",
    projectComponent: "",
    targetScope: "",
    ustpBudget: 0,
    partnerAgencyBudget: 0,
    totalBudget: 0,
    proponents: [],
    nonUserProponents: [{ name: "" }],
    projectLocationID: {
      street: "",
      barangayID: 0,
    },
    agency: [],
    goalsAndObjectives: [
      { goalsAndObjectives: "" }
    ],
    projectActivities: [
      {
        objective: "",
        involved: "",
        targetDate: "",
        personResponsible: ""
      }
    ],
    projectManagementTeam: [
      {
        name: ""
      }
    ],
    budgetRequirements: [
      {
        itemName: "",
        ustpAmount: 0,
        partnerAmount: 0,
        totalAmount: 0,
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
    signatories: [],

    programChair: {
      name: programChair,
      title: "Program Chair"
    }, 
    collegeDean: {
      name: collegeDean,
      title: "College Dean"
    }, 
    director: {
      name: director,
      title: "Director, Extension & Community Relations"
    },
    vcaa: {
      name: vcaa,
      title: "Vice - Chancellor for Academic Affairs"
    },
    vcri: {
      name: vcri,
      title: "Vice - Chancellor for Research and Innovation"
    },
    accountant: {
      name: accountant,
      title: "Accountant III"
    },
    chancellor: {
      name: chancellor,
      title: "Chancellor, USTP CDO"
    },

    region: '',
    province: '',
    city: '',
    barangay: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Create a copy of formData
    const modifiedData = { ...formData };

    const signatories = [
      formData.programChair,
      formData.collegeDean,
      formData.director,
      formData.vcaa,
      formData.vcri,
      formData.accountant,
      formData.chancellor,
      ...formData.signatories, // If there are any other signatories already in the list, keep them
    ];

    modifiedData.signatories = signatories;
  
    // Remove the specific fields
    delete modifiedData.programChair;
    delete modifiedData.collegeDean;
    delete modifiedData.director;
    delete modifiedData.vcaa;
    delete modifiedData.vcri;
    delete modifiedData.accountant;
    delete modifiedData.chancellor;
    delete modifiedData.region;
    delete modifiedData.province;
    delete modifiedData.city;
    delete modifiedData.barangay;

    if (showTrainers === false) {
      delete modifiedData.loadingOfTrainers;
    }
  
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
      console.log('Successfully submitted:', response.data);
      setIsModalOpen(true);
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

  const handleNavigation = () => {
    setIsModalOpen(false);
    navigate('/user');
  };

  const handleSignatoryFormChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: {
        ...prevFormData[name],
        name: value,
      },
    }));
  };

  // Handle input change for each project management team member
  const handleProjectManagementTeamChange = (index, value) => {
    setFormData((prevFormData) => {
      const updatedTeam = [...prevFormData.projectManagementTeam];
      updatedTeam[index].name = value;

      return {
        ...prevFormData,
        projectManagementTeam: updatedTeam,
      };
    });
  };

  // Add a new person to the project management team
  const handleProjectManagementTeamButtonClick = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      projectManagementTeam: [...prevFormData.projectManagementTeam, { name: "" }],
    }));
  };

  // Remove the last person from the project management team
  const handleProjectManagementTeamRemoveClick = () => {
    setFormData((prevFormData) => {
      const updatedTeam = [...prevFormData.projectManagementTeam];
      if (updatedTeam.length > 1) {
        updatedTeam.pop();
      }

      return {
        ...prevFormData,
        projectManagementTeam: updatedTeam,
      };
    });
  };


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
  const handleNonUserProponentChange = (index, value) => {
    const updatedNonUserProponents = [...formData.nonUserProponents];
    updatedNonUserProponents[index].name = value; // Correct field name
    setFormData({ ...formData, nonUserProponents: updatedNonUserProponents });
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
  const handleNonUserProponentButtonClick = () => {
    setFormData({
      ...formData,
      nonUserProponents: [...formData.nonUserProponents, { name: "" }], // Add new object with 'name' key
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
  const handleNonUserProponentRemoveClick = () => {
    if (formData.nonUserProponents.length > 1) {
      const updatedNonUserProponents = formData.nonUserProponents.slice(0, -1); // Remove the last proponent
      setFormData({ ...formData, nonUserProponents: updatedNonUserProponents });
    }
  };

  const handleProjectLocationFormChange = (e) => {
    const { name, value } = e.target;

    if (name === "barangay") {
      // Update both formData.barangay and formData.projectLocationID.barangayID
      setFormData((prevFormData) => ({
        ...prevFormData,
        barangay: value,
        projectLocationID: {
          ...prevFormData.projectLocationID,
          barangayID: value,
        },
      }));
    }
  }

  const handleAddressFormChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
        if (name === "address") {
            // Update nested street field inside projectLocationID
            return {
                ...prevData,
                projectLocationID: {
                    ...prevData.projectLocationID,
                    street: value,
                },
            };
        } else {
            // For other fields, update as usual
            return {
                ...prevData,
                [name]: value,
            };
        }
    });
};
  
  const handleFormChange = (eOrName, value) => {
    // Check if the first argument is an event
    if (typeof eOrName === "object" && eOrName.target) {
      const { name, value } = eOrName.target;
      setFormData((prevData) => {
        const updatedData = { ...prevData, [name]: value };
  
        // // Update targetGroups if beneficiaries are updated
        // if (name === 'beneficiaries') {
        //   updatedData.targetGroups[0].targetGroup = value;
        // }
  
        return updatedData;
      });
    } else {
      // Handle cases where name and value are passed directly
      const name = eOrName;
      setFormData((prevData) => {
        const updatedData = { ...prevData, [name]: value };
  
        // Update targetGroups if beneficiaries are updated
        // if (name === 'beneficiaries') {
        //   updatedData.targetGroups[0].targetGroup = value;
        // }
  
        return updatedData;
      });
    }
  };

  const handleProponentsFormChange = (event) => {
    const { value } = event.target;
    const userID = parseInt(value);
  
    if (isNaN(userID)) {
      console.error("Invalid user ID");
      return;  // Exit if value is not a valid number
    }
  
    setFormData((prevFormData) => {
      const proponents = prevFormData.proponents.includes(userID)
        ? prevFormData.proponents.filter(id => id !== userID) // Remove if already selected
        : [...prevFormData.proponents, userID]; // Add if not selected
  
      return {
        ...prevFormData,
        proponents,
      };
    });
  };

  // Function to handle form change for budgetary requirements
  const handleBudgetChange = (index, field, value) => {
    const updatedBudget = formData.budgetRequirements.map((item, i) => {
      if (i === index) {
        return { ...item, [field]: value };
      }
      return item;
    });
    setFormData({ ...formData, budgetRequirements: updatedBudget });
  };

  // Function to add a new budget item
  const addBudgetItem = () => {
    setFormData({
      ...formData,
      budgetRequirements: [
        ...formData.budgetRequirements,
        { itemName: "", ustpAmount: "", partnerAmount: "", totalAmount: "" }
      ]
    });
  };

  useEffect(() => {
    const fetchProponents = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/get_users_exclude_roles");
        setProponents(response.data);
      } catch (error) {
        console.error('Error fetching proponents:', error);
      }
    };

    fetchProponents();
  }, []);

  // Fetch agencies on component mount
useEffect(() => {
  const fetchAgencies = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/get_agencies');
      setAgencies(response.data);
    } catch (error) {
      console.error('Error fetching agencies:', error);
    }
  };

  fetchAgencies();
}, []);

// Handle agency selection and adding new agency
const handleAgencyFormChange = async (e) => {
  const { value } = e.target;

  if (value === 'add_new_agency') {
    const newAgencyName = prompt('Enter the name of the new agency:');

    if (newAgencyName) {
      try {
        // Send POST request to create the new agency
        const response = await axios.post('http://127.0.0.1:8000/create_agency', {
          agencyName: newAgencyName,
        });

        const newAgency = { agencyID: response.data.agencyID, agencyName: newAgencyName };

        // Add the new agency to the list of agencies and set the selected agency
        setAgencies((prevAgencies) => [...prevAgencies, newAgency]);
        setFormData((prevFormData) => ({ ...prevFormData, agency: [newAgency.agencyID] }));  // Wrap in array
      } catch (error) {
        console.error('Error creating new agency:', error);
      }
    }
  } else {
    setFormData((prevFormData) => ({ ...prevFormData, agency: [value] }));  // Wrap in array
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
    const total = parseFloat(formData.ustpBudget || 0) + parseFloat(formData.partnerAgencyBudget || 0);
    setFormData((prevData) => ({ ...prevData, totalBudget: total }));
  }, [formData.ustpBudget, formData.partnerAgencyBudget]); // Only run when these values change

  const handleBudgetFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
    setShowTrainers(!showTrainers);
  };

  return (
    <div className="flex flex-col mt-14 px-10">
      <h1 className="text-2xl font-semibold mb-5 mt-5">
        Extension Project Proposal
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="bg-white p-8 rounded-lg shadow-md space-y-6 text-sm mb-1">
          <div  className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-bold text-base">
                Training
                <input
                  className="ml-2"
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
              </label>
            </div>
          </div>
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
              <div>
                <select
                  name="proponents"
                  value={formData.proponents}
                  onChange={handleProponentsFormChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  multiple
                >
                  <option value="" disabled hidden>Select</option>
                  {proponents.map((proponent) => (
                    <option key={proponent.userID} value={proponent.userID}>
                      {proponent.firstname} {proponent.lastname}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Third Row */}
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block mb-2 font-bold text-base">NON-USER PROPONENTS</label>

              {/* Render input fields for each proponent */}
              {formData.nonUserProponents.map((proponentObj, index) => (
                <input
                  key={index}
                  name={`proponent-${index}`}
                  value={proponentObj.name} // Access 'name' field in the object
                  onChange={(e) => handleNonUserProponentChange(index, e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded mt-2"
                  placeholder={`Proponent ${index + 1}`}
                />
              ))}

              <div className="flex space-x-2 mt-2">
                <button
                  type="button" // Prevent default form submission
                  onClick={handleNonUserProponentButtonClick}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Add Proponent
                </button>
                <button
                  type="button" // Prevent default form submission
                  onClick={handleNonUserProponentRemoveClick}
                  className={
                    formData.nonUserProponents.length === 1
                      ? "bg-gray-400 text-gray-300 px-4 py-2 rounded"
                      : "bg-red-500 text-white px-4 py-2 rounded"
                  }
                  disabled={formData.nonUserProponents.length === 1}
                >
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
                name="agency"
                value={formData.agency}
                onChange={handleAgencyFormChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="" disabled hidden>Select</option>
                {agencies.map((agency) => (
                  <option key={agency.agencyID} value={agency.agencyID}>
                    {agency.agencyName}
                  </option>
                ))}
                <option value="add_new_agency">+ Add New Agency</option>
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
                name="ustpBudget"
                value={formData.ustpBudget}
                onChange={handleBudgetFormChange}
                type="number"
                placeholder="Enter Amount"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">PARTNER AGENCY</label>
              <input
                name="partnerAgencyBudget"
                value={formData.partnerAgencyBudget}
                onChange={handleBudgetFormChange}
                type="number"
                placeholder="Enter Amount"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div>
            <label className="block mb-2 font-semibold">TOTAL</label>
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
                onChange={handleProjectLocationFormChange}
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
                value={formData.projectLocationID.street}
                onChange={handleAddressFormChange}
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
              <label className="block mb-2 font-semibold text-base">GOALS AND OBJECTIVES</label>
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
              <label className="block mb-2 font-bold">
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
                <label className="block mb-2 font-semibold">
                    PROJECT LOCATION AND BENEFICIARIES
                </label>
                <textarea
                    name="targetScope"
                    value={formData.targetScope}
                    onChange={handleFormChange}
                    className="w-full p-2 border border-gray-300 rounded"
                ></textarea>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md space-y-6 text-sm mb-1">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block mb-2 font-semibold text-base">PROJECT MANAGEMENT TEAM/TRAINERS</label>

              {/* Render input fields for each TRAINER */}
              {formData.projectManagementTeam.map((personObj, index) => (
                <input
                  key={index}
                  name={`person-${index}`}
                  value={personObj.name} // Access 'name' field in the object
                  onChange={(e) => handleProjectManagementTeamChange(index, e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded mt-2"
                  placeholder={`Person ${index + 1}`}
                />
              ))}

              <div className="flex space-x-2 mt-2">
                <button
                  type="button" // Prevent default form submission
                  onClick={handleProjectManagementTeamButtonClick}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Add Person
                </button>
                <button
                  type="button" // Prevent default form submission
                  onClick={handleProjectManagementTeamRemoveClick}
                  className={
                    formData.projectManagementTeam.length === 1
                      ? "bg-gray-400 text-gray-300 px-4 py-2 rounded"
                      : "bg-red-500 text-white px-4 py-2 rounded"
                  }
                  disabled={formData.projectManagementTeam.length === 1}
                >
                  Remove Person
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md space-y-6 text-sm mb-1">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block mb-2 font-bold">BUDGETARY REQUIREMENTS</label>
            </div>
          </div>

          {formData.budgetRequirements.map((budgetItem, index) => (
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
          <label className="block mb-2 font-bold">PROJECT EVALUATION AND MONITORING</label>
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
        <label className="block mb-2 font-bold">MONITORING PLAN AND SCHEDULE</label>
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

        {showTrainers && (
          <div className="bg-white p-8 rounded-lg shadow-md space-y-6 text-sm mb-1">
            <label className="block mb-2 font-bold">LOADING OF TRAINERS</label>
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
        )}

        <div className="bg-white p-8 rounded-lg shadow-md space-y-6 text-sm mb-1">
        <label className="block mb-2 font-bold">SIGNATORIES</label>
        <label className="block mb-2 font-semibold">Endorsed by:</label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-semibold">
                Program Chair
              </label>
              <input
                name="programChair"
                value={formData.programChair.name}
                onChange={handleSignatoryFormChange}
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                College Dean
              </label>
              <input
                name="collegeDean"
                value={formData.collegeDean.name}
                onChange={handleSignatoryFormChange}
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>

          <label className="block mb-2 font-semibold">Recommending Approval:</label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-semibold">
                Director, Extension & Community Relations
              </label>
              <input
                name="director"
                value={formData.director.name}
                onChange={handleSignatoryFormChange}
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
          <div>
              <label className="block mb-2 font-semibold">
                Vice - Chancellor for Academic Affairs
              </label>
              <input
                name="vcaa"
                value={formData.vcaa.name}
                onChange={handleSignatoryFormChange}
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                Vice - Chancellor for Research and Innovation
              </label>
              <input
                name="vcri"
                value={formData.vcri.name}
                onChange={handleSignatoryFormChange}
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>

          <label className="block mb-2 font-semibold">Funds Available:</label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-semibold">
                Accountant III
              </label>
              <input
                name="accountant"
                value={formData.accountant.name}
                onChange={handleSignatoryFormChange}
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                Chancellor, USTP CDO
              </label>
              <input
                name="chancellor"
                value={formData.chancellor.name}
                onChange={handleSignatoryFormChange}
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
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

      {/* Success Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md text-center space-y-4">
            <h2 className="text-xl font-semibold">Project Submission Success!</h2>
            <p>Your project has been successfully submitted and is now awaiting review.</p>
            <button
              onClick={handleNavigation}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProposalFormFirstPage;