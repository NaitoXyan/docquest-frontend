import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import ProponentsDeliverables from "./ProposalFormFirstPage_Deliverables";
import ReactTooltip from 'react-tooltip';
import Select from 'react-select';
import CreatableSelect from "react-select/creatable";

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
  const [programCategory, setProgramCategory] = useState([]);
  const [projectCategory, setProjectCategory] = useState([]);
  const [campus, setCampus] = useState([]);
  const [college, setCollege] = useState([]);
  const [program, setProgram] = useState([]);
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
  const [deliverables, setDeliverables] = useState([]);
  const [isAgencyModalOpen, setIsAgencyModalOpen] = useState(false);
  const [newAgencyName, setNewAgencyName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    userID: userID,
    programCategory: [],
    projectTitle: "",
    projectType: "",
    projectCategory: [],
    researchTitle: "",
    program: [],
    accreditationLevel: "",
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
    deliverables: [],

    campus: [],
    college: [],
    region: '',
    province: '',
    city: '',
    barangay: '',
  });

  const [touched, setTouched] = useState(false);
  const handleBlur = () => setTouched(true);
  const isFieldValid = formData.projectCategory.length > 0;

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
    delete modifiedData.college;

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

  useEffect(() => {
    const fetchProgramCategory = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/get_programCategory");
        setProgramCategory(response.data);
      } catch (error) {
        console.error('Error fetching proponents:', error);
      }
    };

    fetchProgramCategory();
  }, []);

  const handleProgramCategoryFormChange = (event) => {
    const { value } = event.target;
    const programCategoryID = parseInt(value);

    if (isNaN(programCategoryID)) {
      console.error("Invalid program category ID");
      return;  // Exit if value is not a valid number
    }

    setFormData((prevFormData) => {
      const programCategory = prevFormData.programCategory.includes(programCategoryID)
        ? prevFormData.programCategory.filter(id => id !== programCategoryID) // Remove if already selected
        : [...prevFormData.programCategory, programCategoryID]; // Add if not selected

      return {
        ...prevFormData,
        programCategory,
      };
    });
  };

  useEffect(() => {
    const fetchProjectCategory = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/get_projectCategory");
        setProjectCategory(response.data);
      } catch (error) {
        console.error('Error fetching proponents:', error);
      }
    };

    fetchProjectCategory();
  }, []);

  const handleProjectCategoryFormChange = (event) => {
    const { value } = event.target;
    const projectCategoryID = parseInt(value);

    if (isNaN(projectCategoryID)) {
      console.error("Invalid project category ID");
      return;  // Exit if value is not a valid number
    }

    setFormData((prevFormData) => {
      const projectCategory = prevFormData.projectCategory.includes(projectCategoryID)
        ? prevFormData.projectCategory.filter(id => id !== projectCategoryID) // Remove if already selected
        : [...prevFormData.projectCategory, projectCategoryID]; // Add if not selected

      return {
        ...prevFormData,
        projectCategory,
      };
    });
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

  // Handle changes in budget items
  const handleBudgetChange = (index, field, value) => {
    const updatedBudgetRequirements = [...formData.budgetRequirements];
    updatedBudgetRequirements[index][field] = value;

    // Auto-calculate total amount for the current item
    if (field === 'ustpAmount' || field === 'partnerAmount') {
      const ustp = Number(field === 'ustpAmount' ? value : updatedBudgetRequirements[index].ustpAmount) || 0;
      const partner = Number(field === 'partnerAmount' ? value : updatedBudgetRequirements[index].partnerAmount) || 0;
      updatedBudgetRequirements[index].totalAmount = (ustp + partner).toString();
    }

    setFormData(prev => ({
      ...prev,
      budgetRequirements: updatedBudgetRequirements
    }));
  };

  // Calculate totals and update budget requirements
  useEffect(() => {
    const ustpTotal = formData.budgetRequirements.reduce(
      (sum, item) => sum + (Number(item.ustpAmount) || 0),
      0
    );

    const partnerTotal = formData.budgetRequirements.reduce(
      (sum, item) => sum + (Number(item.partnerAmount) || 0),
      0
    );

    const total = ustpTotal + partnerTotal;

    setFormData(prev => ({
      ...prev,
      ustpBudget: ustpTotal,
      partnerAgencyBudget: partnerTotal,
      totalBudget: total
    }));
  }, [formData.budgetRequirements]);

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

  const handleAgencyFormChange = async (e) => {
    const { value } = e.target;

    if (value === 'add_new_agency') {
      setIsAgencyModalOpen(true);
    } else {
      setFormData(prevData => ({
        ...prevData,
        agency: [value] // Maintain array structure
      }));
    }
  };

  const handleSubmitNewAgency = async () => {
    if (!newAgencyName.trim()) return;
    
    setIsSubmitting(true);
    try {
      const response = await axios.post('http://127.0.0.1:8000/create_agency', {
        agencyName: newAgencyName,
      });

      const newAgency = { 
        agencyID: response.data.agencyID, 
        agencyName: newAgencyName 
      };

      // Update agencies list
      setAgencies(prevAgencies => [...prevAgencies, newAgency]);
      
      // Update form data maintaining the entire structure
      setFormData(prevData => ({
        ...prevData,
        agency: [newAgency.agencyID] // Maintain array structure
      }));

      setIsAgencyModalOpen(false);
      setNewAgencyName('');
    } catch (error) {
      console.error('Error creating new agency:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmitNewAgency();
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

  const handleBudgetFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSkillsTraining = (selectedOptions) => {
    // Check if 'Skills Training' is in the selected options
    const selectedCategories = selectedOptions.map(option => option.label);
    if (selectedCategories.includes('Skills Training/Capacity Building')) {
      setShowTrainers(true);
    } else {
      setShowTrainers(false);
    }
  };

  const handleProjTypeChange = (selectedOption) => {
    setFormData({
      ...formData,
      projectType: selectedOption ? selectedOption.value : '', // Ensure it sets to an empty string if nothing is selected
    });
  };

  const projectTypeOptions = [
    { value: 'New Project', label: 'New Project' },
    { value: 'Continuing Project', label: 'Continuing Project' },
  ];

  const removeBudgetItem = (index) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      budgetRequirements: prevFormData.budgetRequirements.filter((_, i) => i !== index),
    }));
  };

  // Fetch colleges on component mount
  useEffect(() => {
    const fetchCampus = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/get_campuses');
        setCampus(response.data);
      } catch (error) {
        console.error('Error fetching campus:', error);
      }
    };

    fetchCampus();
  }, []);

  // Handle college selection - toggle selection on click
  const handleCampusChange = (campusID) => {
    setFormData(prev => {
      const newCampuses = prev.campus.includes(campusID)
        ? prev.campus.filter(id => id !== campusID)  // Remove if already selected
        : [...prev.campus, campusID];                // Add if not selected

      return {
        ...prev,
        campus: newCampuses,
        college: [],
        program: [] // Clear program selection when colleges change
      };
    });
  };

  // Fetch programs whenever selected colleges change
  useEffect(() => {
    const fetchColleges = async () => {
      if (formData.campus.length === 0) {
        setCollege([]); // Clear programs if no college is selected
        setFormData(prev => ({ ...prev, college: [] })); // Also clear selected programs
        return;
      }

      try {
        const response = await axios.post('http://127.0.0.1:8000/get_colleges/', {
          campusIDs: formData.campus,
        });
        setCollege(response.data);
      } catch (error) {
        console.error('Error fetching colleges:', error);
      }
    };

    fetchColleges();
  }, [formData.campus]);

  // Handle college selection - toggle selection on click
  const handleCollegeChange = (collegeId) => {
    setFormData(prev => {
      const newColleges = prev.college.includes(collegeId)
        ? prev.college.filter(id => id !== collegeId)  // Remove if already selected
        : [...prev.college, collegeId];                // Add if not selected

      return {
        ...prev,
        college: newColleges,
        program: [] // Clear program selection when colleges change
      };
    });
  };

  // Fetch programs whenever selected colleges change
  useEffect(() => {
    const fetchPrograms = async () => {
      if (formData.college.length === 0) {
        setProgram([]); // Clear programs if no college is selected
        setFormData(prev => ({ ...prev, program: [] })); // Also clear selected programs
        return;
      }

      try {
        const response = await axios.post('http://127.0.0.1:8000/get_programs/', {
          collegeIDs: formData.college,
        });
        setProgram(response.data);
      } catch (error) {
        console.error('Error fetching programs:', error);
      }
    };

    fetchPrograms();
  }, [formData.college]);

  // Handle program selection - toggle selection on click
  const handleProgramChange = (programId) => {
    setFormData(prev => {
      const newPrograms = prev.program.includes(programId)
        ? prev.program.filter(id => id !== programId)  // Remove if already selected
        : [...prev.program, programId];                // Add if not selected

      return {
        ...prev,
        program: newPrograms
      };
    });
  };

  const selectedOptions = formData.programCategory.map((id) => {
    const category = programCategory.find(
      (category) => category.programCategoryID === id
    );
    return category
      ? { value: category.programCategoryID, label: category.title }
      : null;
  }).filter(Boolean); // Remove nulls

  const CustomOption = (props) => {
    const { data, innerRef, innerProps } = props;
    return (
      <div ref={innerRef} {...innerProps} className="p-2 hover:bg-gray-100">
        <div className="font-medium">{data.title}</div>
        <div className="text-sm text-gray-600">{data.abbreviation}</div>
      </div>
    );
  };

  const CustomSingleValue = (props) => {
    const { data } = props;
    return (
      <div>
        <div className="font-medium">{data.title}</div>
        <div className="text-sm text-gray-600">{data.abbreviation}</div>
      </div>
    );
  };

  return (
    <div className="flex flex-col mt-14 px-10">
      <h1 className="text-2xl font-semibold mb-5 mt-3">
        Extension Project Proposal
      </h1>


      <form onSubmit={handleSubmit}>
        <div className="bg-white p-8 rounded-lg shadow-md space-y-6 text-sm mb-1">
          <div className="grid grid-cols-2 gap-4">
            <div>
              {/* <label className="block mb-2 font-bold text-base">
                Training
                <input
                  className="ml-2"
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
              </label> */}
            </div>
          </div>
          {/* First Row */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block mb-2 font-semibold">
                PROGRAM CATEGORY under USTP CARES
                <span className="text-red-500 ml-1">*</span>
                <span
                  data-tip="Select the program category related to USTP CARES."
                  className="ml-2 text-gray-500 cursor-pointer text-sm"
                >
                  ⓘ
                </span>
                <ReactTooltip place="top" type="dark" effect="solid" />
              </label>
              <CreatableSelect
                required
                options={
                  programCategory.length
                    ? programCategory.map((category) => ({
                      value: category.programCategoryID,
                      label: category.title,
                    }))
                    : []
                }
                isMulti
                value={formData.programCategory.map((id) => {
                  const category = programCategory.find(
                    (category) => category.programCategoryID === id
                  );
                  return category
                    ? { value: category.programCategoryID, label: category.title }
                    : null;
                }).filter(Boolean)}
                onChange={(selectedOptions) => {
                  setFormData({
                    ...formData,
                    programCategory: selectedOptions.map((option) => option.value),
                  });
                }}
                classNamePrefix="react-select"
                className="w-full"
                placeholder={programCategory.length ? "Select" : "No options available"}
                isDisabled={!programCategory.length} // Disable when no options
              />

            </div>

            <div>
              <label className="block mb-2 font-semibold">
                TYPE OF PROJECT
                <span className="text-red-500 ml-1">*</span>
                <span
                  data-tip="Choose whether this is a new project or a continuing project."
                  className="ml-2 text-gray-500 cursor-pointer text-sm"
                >
                  ⓘ
                </span>
                <ReactTooltip place="top" type="dark" effect="solid" />
              </label>
              <Select
                id="projectType"
                name="projectType"
                value={projectTypeOptions.find((option) => option.value === formData.projectType)} // Find the selected option
                onChange={handleProjTypeChange}
                options={projectTypeOptions}
                className="w-full"
                placeholder="Select a project type"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                PROJECT CATEGORY
                <span className="text-red-500 ml-1">*</span>
                <span
                  data-tip="Select one or more categories that best describe the project."
                  className="ml-2 text-gray-500 cursor-pointer text-sm"
                >
                  ⓘ
                </span>
                <ReactTooltip place="top" type="dark" effect="solid" />
              </label>

              <Select
                required
                options={projectCategory.map(category => ({
                  value: category.projectCategoryID,
                  label: category.title,
                }))}
                isMulti
                value={formData.projectCategory
                  .map(id => {
                    const category = projectCategory.find(
                      category => category.projectCategoryID === id
                    );
                    return category
                      ? { value: category.projectCategoryID, label: category.title }
                      : null;
                  })
                  .filter(Boolean)}
                onChange={(selectedOptions) => {
                  // Update formData with selected category IDs
                  const selectedValues = selectedOptions?.map(option => option.value) || [];
                  setFormData({
                    ...formData,
                    projectCategory: selectedValues,
                  });

                  // Handle 'Skills Training' selection
                  handleSkillsTraining(selectedOptions || []);
                }}
                classNamePrefix="react-select"
                className="w-full"
                placeholder={projectCategory.length ? "Select" : "No options available"}
                isDisabled={!projectCategory.length}
              />
            </div>
          </div>

          {/* Row */}
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-3">
              <label className="block mb-2 font-semibold">
                PROJECT TITLE
                <span className="text-red-500 ml-1">*</span>
                <span
                  data-tip="Enter the official title of the project."
                  className="ml-2 text-gray-500 cursor-pointer text-sm"
                >
                  ⓘ
                </span>
                <ReactTooltip place="top" type="dark" effect="solid" />
              </label>
              <input
                required
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
              <label className="block mb-2 font-semibold">
                TITLE OF RESEARCH
                <span className="text-red-500 ml-1">*</span>
                <span
                  data-tip="Enter the official title of the research project."
                  className="ml-2 text-gray-500 cursor-pointer text-sm"
                >
                  ⓘ
                </span>
                <ReactTooltip place="top" type="dark" effect="solid" />
              </label>
              <input
                required
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
              <label className="block mb-2 font-bold text-base">
                PROPONENTS
                <span className="text-red-500 ml-1">*</span>
                <span
                  data-tip="Select the individuals who will be involved in the project."
                  className="ml-2 text-gray-500 cursor-pointer text-sm"
                >
                  ⓘ
                </span>
                <ReactTooltip place="top" type="dark" effect="solid" />
              </label>
              <div className="grid grid-cols-1 gap-2">
                <label className="block mb-2">
                  Project Leader: {username}
                </label>
              </div>
              <div>
                <Select
                  required
                  options={proponents.map((proponent) => ({
                    value: proponent.userID, // Unique identifier
                    label: `${proponent.firstname} ${proponent.lastname}`, // Full name
                  }))}
                  isMulti
                  value={formData.proponents.map((id) => {
                    const proponent = proponents.find((p) => p.userID === id);
                    return proponent
                      ? { value: proponent.userID, label: `${proponent.firstname} ${proponent.lastname}` }
                      : null;
                  }).filter(Boolean)} // Ensure no null values
                  onChange={(selectedOptions) => {
                    setFormData({
                      ...formData,
                      proponents: selectedOptions.map((option) => option.value), // Map back to userIDs
                    });
                  }}
                  classNamePrefix="react-select"
                  className="w-full"
                  placeholder="Select proponents"
                />

              </div>
            </div>
          </div>


          {/* Third Row */}
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block mb-2 font-bold text-base">
                NON-USER PROPONENTS
                <span className="text-red-500 ml-1">*</span>
                <span
                  data-tip="Add non-user proponents by entering their names manually."
                  className="ml-2 text-gray-500 cursor-pointer text-sm"
                >
                  ⓘ
                </span>
                <ReactTooltip place="top" type="dark" effect="solid" />
              </label>
              {/* Render input fields for each proponent */}
              {formData.nonUserProponents.map((proponentObj, index) => (
                <input
                  required
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
          <div className="grid grid-cols-7 gap-4">
            {/* CAMPUS */}
            <div className="col-span-2">
            <label className="block mb-2 font-semibold">
                CAMPUS
                <span className="text-red-500 ml-1">*</span>
                <span
                  data-tip="Select the campus/campuses, including those in collaboration."
                  className="ml-2 text-gray-500 cursor-pointer text-sm"
                >
                  ⓘ
                </span>
                <ReactTooltip place="top" type="dark" effect="solid" />
              </label>
              <Select
                required
                options={campus.map((col) => ({
                  value: col.campusID,
                  title: col.name
                }))}
                components={{
                  Option: CustomOption,
                  SingleValue: CustomSingleValue,
                }}
                getOptionLabel={(e) => `${e.title}`}
                isMulti
                value={formData.campus.map((id) => {
                  const col = campus.find((c) => c.campusID === id);
                  return col
                    ? {
                      value: col.campusID,
                      title: col.name,
                    }
                    : null;
                }).filter(Boolean)}
                onChange={(selectedOptions) => {
                  setFormData({
                    ...formData,
                    campus: selectedOptions.map((option) => option.value),
                  });
                }}
                classNamePrefix="react-select"
                className="w-full"
                placeholder="Select campus"
                styles={{
                  control: (base) => ({
                    ...base,
                    display: 'flex',
                    flexWrap: 'nowrap',
                    overflowX: 'auto',
                    scrollbarWidth: 'thin',
                  }),
                  option: (base, state) => ({
                    ...base,
                    backgroundColor: state.isSelected
                      ? 'rgba(59, 130, 246, 0.1)'
                      : state.isFocused
                        ? 'rgba(229, 231, 235, 1)'
                        : 'transparent',
                    color: state.isSelected ? '#2563EB' : base.color,
                  }),
                  multiValue: (base) => ({
                    ...base,
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                  }),
                  multiValueLabel: (base) => ({
                    ...base,
                    color: '#2563EB',
                  }),
                }}
              />
            </div>

            {/* COLLEGE */}
            <div className="col-span-2">
              <label className="block mb-2 font-semibold">
                COLLEGE
                <span className="text-red-500 ml-1">*</span>
                <span
                  data-tip="Select the college(s), including those in collaboration."
                  className="ml-2 text-gray-500 cursor-pointer text-sm"
                >
                  ⓘ
                </span>
                <ReactTooltip place="top" type="dark" effect="solid" />
              </label>
              <Select
                required
                options={college.map((col) => ({
                  value: col.collegeID,
                  title: col.title,
                  abbreviation: col.abbreviation,
                }))}
                components={{
                  Option: CustomOption,
                  SingleValue: CustomSingleValue,
                }}
                getOptionLabel={(e) => `${e.title} ${e.abbreviation}`}
                isMulti
                value={formData.college.map((id) => {
                  const col = college.find((c) => c.collegeID === id);
                  return col
                    ? {
                      value: col.collegeID,
                      title: col.title,
                      abbreviation: col.abbreviation,
                    }
                    : null;
                }).filter(Boolean)}
                onChange={(selectedOptions) => {
                  setFormData({
                    ...formData,
                    college: selectedOptions.map((option) => option.value),
                  });
                }}
                classNamePrefix="react-select"
                className="w-full"
                isDisabled={formData.campus.length === 0}
                placeholder="Select colleges"
                styles={{
                  control: (base) => ({
                    ...base,
                    display: 'flex',
                    flexWrap: 'nowrap',
                    overflowX: 'auto',
                    scrollbarWidth: 'thin',
                  }),
                  option: (base, state) => ({
                    ...base,
                    backgroundColor: state.isSelected
                      ? 'rgba(59, 130, 246, 0.1)'
                      : state.isFocused
                        ? 'rgba(229, 231, 235, 1)'
                        : 'transparent',
                    color: state.isSelected ? '#2563EB' : base.color,
                  }),
                  multiValue: (base) => ({
                    ...base,
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                  }),
                  multiValueLabel: (base) => ({
                    ...base,
                    color: '#2563EB',
                  }),
                }}
              />

              <p className="text-sm text-gray-500 mt-1">Click items to select/deselect</p>
            </div>

            {/* PROGRAM Section */}
            <div className="col-span-2">
              <label className="block mb-2 font-semibold">
                PROGRAM
                <span className="text-red-500 ml-1">*</span>
                <span
                  data-tip="Select a program from the list based on the college selection."
                  className="ml-2 text-gray-500 cursor-pointer text-sm"
                >
                  ⓘ
                </span>
                <ReactTooltip place="top" type="dark" effect="solid" />
              </label>
              {/* Fixed height container with shadow to indicate scrollability */}
              <Select
                required
                options={program.map((prog) => ({
                  value: prog.programID,
                  label: (
                    <div>
                      <div className="font-medium">{prog.title}</div>
                      <div className="text-sm text-gray-600">{prog.college.abbreviation}</div>
                    </div>
                  ),
                }))}
                isMulti
                value={formData.program.map((id) => {
                  const prog = program.find((p) => p.programID === id);
                  return prog
                    ? {
                      value: prog.programID,
                      label: (
                        <div>
                          <div className="font-medium">{prog.title}</div>
                          <div className="text-sm text-gray-600">{prog.college.abbreviation}</div>
                        </div>
                      ),
                    }
                    : null;
                }).filter(Boolean)} // Filter out null values
                onChange={(selectedOptions) => {
                  const selectedIDs = selectedOptions.map((option) => option.value);
                  setFormData({
                    ...formData,
                    program: selectedIDs,
                  });
                }}
                isDisabled={formData.college.length === 0} // Disable if no college is selected
                placeholder={
                  formData.college.length === 0
                    ? "Please select college(s) first"
                    : "Select programs"
                }
                classNamePrefix="react-select"
                className="w-full"
                styles={{
                  control: (base) => ({
                    ...base,
                    borderColor: '#d1d5db', // Tailwind gray-300
                    boxShadow: 'none',
                    '&:hover': {
                      borderColor: '#9ca3af', // Tailwind gray-400
                    },
                  }),
                  multiValue: (base) => ({
                    ...base,
                    backgroundColor: 'rgba(59, 130, 246, 0.1)', // Light blue background
                    borderRadius: '0.375rem', // Rounded tags
                  }),
                  multiValueLabel: (base) => ({
                    ...base,
                    color: '#2563eb', // Tailwind blue-600
                    fontWeight: '500', // Tailwind font-medium
                  }),
                  multiValueRemove: (base) => ({
                    ...base,
                    color: '#000', // Black "X" icon
                    cursor: 'pointer',
                    '&:hover': {
                      color: '#ef4444', // Tailwind red-500
                    },
                  }),
                  placeholder: (base) => ({
                    ...base,
                    color: '#6b7280', // Tailwind gray-500
                  }),
                  menu: (base) => ({
                    ...base,
                    maxHeight: '100px', // Match your original scrollable height
                    overflowY: 'auto',
                  }),
                }}
              />
              <p className="text-sm text-gray-500 mt-1">Click items to select/deselect</p>
            </div>

            {/* ACCREDITATION LEVEL Section */}
            <div className="col-span-1">
              <label className="block mb-2 font-semibold">
                ACCREDITATION LEVEL
                <span className="text-red-500 ml-1">*</span>
                <span
                  data-tip="Select the accreditation base on the main college/program."
                  className="ml-2 text-gray-500 cursor-pointer text-sm"
                >
                  ⓘ
                </span>
                <ReactTooltip place="top" type="dark" effect="solid" />
              </label>
              <select
                required
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
          </div>


          {/* Fifth Row */}
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block mb-2 font-semibold">
                TARGET GROUPS/BENEFICIARIES
                <span className="text-red-500 ml-1">*</span>
                <span
                  data-tip="Enter the target groups or beneficiaries for the project."
                  className="ml-2 text-gray-500 cursor-pointer text-sm"
                >
                  ⓘ
                </span>
                <ReactTooltip place="top" type="dark" effect="solid" />
              </label>
              <textarea
                required
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
              <label className="block mb-2 font-semibold">
                PARTNER AGENCY
                <span className="text-red-500 ml-1">*</span>
                <span
                  data-tip="Select a partner agency from the list or add a new one."
                  className="ml-2 text-gray-500 cursor-pointer text-sm"
                >
                  ⓘ
                </span>
                <ReactTooltip place="top" type="dark" effect="solid" />
              </label>
              <select
                required
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

          {/* Modal */}
          {isAgencyModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Add New Agency</h2>
                  <button 
                    onClick={() => setIsAgencyModalOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Agency Name
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    value={newAgencyName}
                    onChange={(e) => setNewAgencyName(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter agency name"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    autoFocus
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setIsAgencyModalOpen(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmitNewAgency}
                    disabled={isSubmitting || !newAgencyName.trim()}
                    className={`px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none ${
                      (isSubmitting || !newAgencyName.trim()) && 'opacity-50 cursor-not-allowed'
                    }`}
                  >
                    {isSubmitting ? 'Adding...' : 'Add Agency'}
                  </button>
                </div>
              </div>
            </div>
          )}


          {/* Seventh Row */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block mb-2 font-semibold">
                TARGET START DATE OF IMPLEMENTATION
                <span className="text-red-500 ml-1">*</span>
                <span
                  data-tip="Select the target START date when the implementation is expected to start."
                  className="ml-2 text-gray-500 cursor-pointer text-sm"
                >
                  ⓘ
                </span>
                <ReactTooltip place="top" type="dark" effect="solid" />
              </label>
              <input
              required
                name="targetImplementation"
                value={formData.targetImplementation}
                onChange={handleFormChange}
                type="month"
                min={new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().slice(0, 7)}  // Sets the minimum date to the previous month
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold">
                TARGET END DATE OF IMPLEMENTATION
                <span className="text-red-500 ml-1">*</span>
                <span
                  data-tip="Select the target END date when the implementation is expected to end."
                  className="ml-2 text-gray-500 cursor-pointer text-sm"
                >
                  ⓘ
                </span>
                <ReactTooltip place="top" type="dark" effect="solid" />
              </label>
              <input
              required
                name="targetImplementation"
                value={formData.targetImplementation}
                onChange={handleFormChange}
                type="month"
                min={new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().slice(0, 7)}  // Sets the minimum date to the previous month
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                TOTAL HOURS
                <span className="text-red-500 ml-1">*</span>
                <span
                  data-tip="Enter the total hours required for the implementation of the project."
                  className="ml-2 text-gray-500 cursor-pointer text-sm"
                >
                  ⓘ
                </span>
                <ReactTooltip place="top" type="dark" effect="solid" />
              </label>
              <input
              required
                name="totalHours"
                value={formData.totalHours}
                onChange={(e) => {
                  const value = Math.max(0, e.target.value); // Ensure the value is greater than zero
                  handleFormChange({ target: { name: "totalHours", value } });
                }}
                type="number"
                min="0"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md space-y-6 text-sm mb-1 mt-1">
          {/* row */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block mb-2 font-bold text-base">
                PROJECT LOCATION
                <span className="text-red-500 ml-1">*</span>
                <span
                  data-tip="Specify the location where the project will take place."
                  className="ml-2 text-gray-500 cursor-pointer text-sm"
                >
                  ⓘ
                </span>
                <ReactTooltip place="top" type="dark" effect="solid" />
              </label>
            </div>
          </div>

          {/* row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-semibold">
                Region
                <span className="text-red-500 ml-1">*</span>
              </label>
              <select
              required
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
              <label className="block mb-2 font-semibold">
                Province
                <span className="text-red-500 ml-1">*</span>
              </label>
              <select
              required
                name="province"
                value={formData.province}
                onChange={handleFormChange}
                disabled={!formData.region} //disabled till region selected
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
              <label className="block mb-2 font-semibold">
                City
                <span className="text-red-500 ml-1">*</span>
              </label>
              <select
              required
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
              <label className="block mb-2 font-semibold">
                Barangay
                <span className="text-red-500 ml-1">*</span>
              </label>
              <select
              required
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
              <label className="block mb-2 font-semibold">
                Address
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
              required
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
          {/* Background of the Project Section */}
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block mb-2 font-semibold">
                BACKGROUND OF THE PROJECT
                <span className="text-red-500 ml-1">*</span>
                <span
                  data-tip="Provide a detailed explanation of the project's background and why it is being undertaken."
                  className="ml-2 text-gray-500 cursor-pointer text-sm"
                >
                  ⓘ
                </span>
                <ReactTooltip place="top" type="dark" effect="solid" />
              </label>
              <textarea
              required
                name="background"
                value={formData.background}
                onChange={handleFormChange}
                className="w-full p-2 border border-gray-300 rounded"
              ></textarea>
            </div>
          </div>

          {/* Goals and Objectives Section */}
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block mb-2 font-semibold text-base">
                GOALS AND OBJECTIVES
                <span className="text-red-500 ml-1">*</span>
                <span
                  data-tip="State the goals and objectives clearly and concisely."
                  className="ml-2 text-gray-500 cursor-pointer text-sm"
                >
                  ⓘ
                </span>
                <ReactTooltip place="top" type="dark" effect="solid" />
              </label>
              <div className="grid grid-cols-1 gap-2">
                <label className="block mb-2">
                  Specifically, the objectives of the project are:
                </label>
              </div>

              {/* Render input fields for each objective */}
              {formData.goalsAndObjectives.map((goal, index) => (
                <textarea
                required
                  key={index}
                  name={`objective-${index}`}
                  value={goal.goalsAndObjectives}
                  onChange={(e) => handleObjectiveChange(index, e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded mt-2"
                  placeholder={`Objective ${index + 1}`}
                />
              ))}

              <div className="flex space-x-2 mt-2">
                <button
                  type="button"
                  onClick={handleObjectiveButtonClick}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Add Objective
                </button>
                <button
                  type="button"
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

          {/* Project Component Section */}
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block mb-2 font-semibold">
                PROJECT COMPONENT
                <span className="text-red-500 ml-1">*</span>
                <span
                  data-tip="Provide a detailed description of the project components and their functions."
                  className="ml-2 text-gray-500 cursor-pointer text-sm"
                >
                  ⓘ
                </span>
                <ReactTooltip place="top" type="dark" effect="solid" />
              </label>
              <textarea
              required
                name="projectComponent"
                value={formData.projectComponent}
                onChange={handleFormChange}
                className="w-full p-2 border border-gray-300 rounded"
              ></textarea>
            </div>
          </div>
        </div>

        {/* PROJECT IMPLEMENTATION PLAN AND MANAGEMENT */}
        <div className="bg-white p-8 rounded-lg shadow-md space-y-6 text-sm mb-1">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block mb-2 font-bold">
                PROJECT IMPLEMENTATION PLAN AND MANAGEMENT
                <span
                  data-tip="Outline the steps and management strategies involved in project implementation."
                  className="ml-2 text-gray-500 cursor-pointer text-sm"
                >
                  ⓘ
                </span>
                <ReactTooltip place="top" type="dark" effect="solid" />
              </label>
            </div>
          </div>

          {/* Project Activities Rows */}
          {formData.projectActivities.map((activity, index) => (
            <div key={index} className="grid grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block mb-2 font-semibold">
                  PROJECT OBJECTIVE
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <textarea
                required
                  name="objective"
                  value={activity.objective}
                  onChange={(e) => handleActivityChange(index, e)}
                  className="w-full p-2 border border-gray-300 rounded"
                ></textarea>
              </div>

              <div>
                <label className="block mb-2 font-semibold">
                  ACTIVITIES INVOLVED
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <textarea
                required
                  name="involved"
                  value={activity.involved}
                  onChange={(e) => handleActivityChange(index, e)}
                  className="w-full p-2 border border-gray-300 rounded"
                ></textarea>
              </div>

              <div>
                <label className="block mb-2 font-semibold">
                  TARGET DATE
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                required
                  name="targetDate"
                  value={formData.targetDate}
                  onChange={handleFormChange}
                  type="month"
                  className="w-full p-2 border border-gray-300 rounded"
                  min={new Date().toISOString().slice(0, 7)} // Current month and year
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold">
                  PERSON RESPONSIBLE
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                required
                  name="personResponsible"
                  value={activity.personResponsible}
                  onChange={(e) => handleActivityChange(index, e)}
                  className="w-full p-2 border border-gray-300 rounded"
                ></input>
              </div>
            </div>
          ))}

          {/* Add Button and remove button */}
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
              <label className="block mb-2 font-bold text-base">
                PROJECT LOCATION AND BENEFICIARIES
                <span className="text-red-500 ml-1">*</span>
                <span
                  data-tip="Provide the location of the project and specify the beneficiaries it will serve."
                  className="ml-2 text-gray-500 cursor-pointer text-sm"
                >
                  ⓘ
                </span>
                <ReactTooltip place="top" type="dark" effect="solid" />
              </label>
              <textarea
              required
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
              <label className="block mb-2 font-bold text-base">
                PROJECT MANAGEMENT TEAM/TRAINERS
                <span className="text-red-500 ml-1">*</span>
                <span
                  data-tip="List the individuals responsible for overseeing the project and training efforts."
                  className="ml-2 text-gray-500 cursor-pointer text-sm"
                >
                  ⓘ
                </span>
                <ReactTooltip place="top" type="dark" effect="solid" />
              </label>

              {/* Render input fields for each TRAINER */}
              {formData.projectManagementTeam.map((personObj, index) => (
                <input
                required
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

        {/* BUDGETARY REQUIREMENTS */}
        <div className="bg-white p-8 rounded-lg shadow-md space-y-6 text-sm mb-1">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block font-bold">
                BUDGETARY REQUIREMENTS
                <span className="text-red-500 ml-1">*</span>
                <span
                  data-tip="Enter the financial requirements necessary for the successful implementation of the project."
                  className="ml-2 text-gray-500 cursor-pointer text-sm"
                >
                  ⓘ
                </span>
                <ReactTooltip place="top" type="dark" effect="solid" />
              </label>
            </div>
          </div>

          {formData.budgetRequirements.map((budgetItem, index) => (
            <div key={index} className="grid grid-cols-4 gap-10 mt-0 items-center">
              <div>
                <label className="block font-semibold">
                  ITEM NAME
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                required
                  name="itemName"
                  value={budgetItem.itemName}
                  onChange={(e) => handleBudgetChange(index, "itemName", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block font-semibold">
                  USTP AMOUNT
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                required
                  type="number" // Allows only numeric input
                  name="ustpAmount"
                  value={budgetItem.ustpAmount}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Allow only non-negative numbers
                    if (/^\d*$/.test(value)) {
                      handleBudgetChange(index, "ustpAmount", value);
                    }
                  }}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Enter Amount"
                />
              </div>

              <div>
                <label className="block font-semibold">
                  PARTNER AMOUNT
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                required
                  type="number" // Allows only numeric input
                  name="partnerAmount"
                  value={budgetItem.partnerAmount}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Allow only non-negative numbers
                    if (/^\d*$/.test(value)) {
                      handleBudgetChange(index, "partnerAmount", value);
                    }
                  }}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Enter Amount"
                />
              </div>


              <div className=" justify-between items-center gap-2">
                <label className="block font-semibold">
                  ITEM TOTAL
                </label>
                <input
                  value={(Number(budgetItem.ustpAmount) + Number(budgetItem.partnerAmount)).toLocaleString()} // Properly sum and format with commas
                  className="flex-1 p-2 border border-gray-300 rounded bg-gray-200"
                  disabled
                  placeholder="Item Total"
                />
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeBudgetItem(index)}
                    className="p-1 text-xl text-red-500 font-bold"
                    title="Remove Item"
                  >
                    −
                  </button>
                )}
              </div>
            </div>
          ))}
          <div>
            <div className="grid grid-cols-4">
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={addBudgetItem}
                  className="p-3 bg-blue-500 text-white rounded"
                >
                  Add Item
                </button>
              </div>
              <div>
                <label className="block border p-1 border-black bg-blue-400 font-semibold">USTP Total</label>
                <label className="block border p-1 border-black">{(formData.ustpBudget).toLocaleString()}</label>
              </div>

              <div>
                <label className="block border p-1 border-black bg-amber-400 font-semibold">Partner Agency Total</label>
                <label className="block border p-1 border-black">{(formData.partnerAgencyBudget).toLocaleString()}</label>
              </div>

              <div>
                <label className="block border p-1 border-black bg-green-400 font-semibold">TOTAL</label>
                <label className="block border p-1 border-black">{(formData.totalBudget).toLocaleString()}</label>
              </div>
            </div>
          </div>

        </div>

        <div className="bg-white p-8 rounded-lg shadow-md space-y-6 text-sm mb-1">
          <div>
            <label className="block mb-2 font-bold">
              PROJECT EVALUATION AND MONITORING
              <span className="text-red-500 ml-1">*</span>
              <span
                data-tip="Describe the strategies for monitoring the project's progress and evaluating its success."
                className="ml-2 text-gray-500 cursor-pointer text-sm"
              >
                ⓘ
              </span>
              <ReactTooltip place="top" type="dark" effect="solid" />
            </label>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="block mb-2 font-semibold">
                PROJECT SUMMARY
                <span className="text-red-500 ml-1">*</span>
              </label>
            </div>
            <div>
              <label className="block mb-2 font-semibold">
                INDICATORS
                <span className="text-red-500 ml-1">*</span>
              </label>
            </div>
            <div>
              <label className="block mb-2 font-semibold">
                MEANS OF VERIFICATION
                <span className="text-red-500 ml-1">*</span>
              </label>
            </div>
            <div>
              <label className="block mb-2 font-semibold">
                RISKS/ASSUMPTIONS
                <span className="text-red-500 ml-1">*</span>
              </label>
            </div>
          </div>

          {/* Table Rows */}
          {formData.evaluationAndMonitorings.map((evaluation, index) => (
            <div key={index} className="grid grid-cols-4 gap-4">
              {/* Project Summary */}
              <div>
                <textarea
                required
                  rows="4"
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
                required
                  rows="4"
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
                required
                  rows="4"
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
                required
                  rows="4"
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
          <div>
            <label className="block mb-2 font-bold">
              MONITORING PLAN AND SCHEDULE
              <span className="text-red-500 ml-1">*</span>
              <span
                data-tip="Outline the timeline and process for monitoring the project's progress."
                className="ml-2 text-gray-500 cursor-pointer text-sm"
              >
                ⓘ
              </span>
              <ReactTooltip place="top" type="dark" effect="solid" />
            </label>
          </div>
          <div className="p-4">
            <table className="min-w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 p-2">
                    Monitoring Phase <span className="text-red-500">*</span>
                  </th>
                  <th className="border border-gray-300 p-2">
                    M&E Instrument/Approach <span className="text-red-500">*</span>
                  </th>
                  <th className="border border-gray-300 p-2">
                    Format or Strategy for Data Gathering <span className="text-red-500">*</span>
                  </th>
                  <th className="border border-gray-300 p-2">
                    Schedule <span className="text-red-500">*</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {formData.monitoringPlanSchedules.map((row, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 p-2">{row.implementationPhase}</td>
                    <td className="border border-gray-300 p-2">
                      <textarea
                      required
                        name="approach"
                        value={row.approach}
                        onChange={(e) => handleMonitoringPlanScheduleRowChange(index, "approach", e.target.value)}
                        className="w-full p-1 border rounded"
                        rows="4"
                        placeholder={
                          [
                            "Training Need Assessment/Pre-training Survey",
                            "Pretest and Posttest Skills Demo or Competency Assessment",
                            "Effect of Project to Participants and Community Questionnaire Trainings Need Assessment",
                          ][index] || "Default placeholder for Approach"
                        }
                      />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <textarea
                      required
                        name="dataGatheringStrategy"
                        value={row.dataGatheringStrategy}
                        onChange={(e) => handleMonitoringPlanScheduleRowChange(index, "dataGatheringStrategy", e.target.value)}
                        className="w-full p-1 border rounded"
                        rows="4"
                        placeholder={
                          [
                            "Survey Questionnaire Interview with Key Informant of FGD",
                            "Multiple Choice Questionnaire, Survey Questionnaire, Competency Checklist",
                            "Survey Questionnaire, Interview with Key Informant or FGD",
                          ][index] || "Default placeholder for Approach"
                        }
                      />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <textarea
                      required
                        name="schedule"
                        value={row.schedule}
                        onChange={(e) => handleMonitoringPlanScheduleRowChange(index, "schedule", e.target.value)}
                        className="w-full p-1 border rounded"
                        rows="4"
                        placeholder={
                          [
                            "A Week after receiving training/extension request",
                            "During Training Proper",
                            "May be periodically scheduled based on the objectives of the extension project (e.g. after 3 months, after 6 months, etc.)",
                          ][index] || "Default placeholder for Approach"
                        }
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
                            className="w-full p-1"
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
              required
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
              required
                name="collegeDean"
                value={formData.collegeDean.name}
                onChange={handleSignatoryFormChange}
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>

          <label className="block mb-2 mt-10 font-semibold">Recommending Approval:</label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-semibold">
                Director, Extension & Community Relations
              </label>
              <input
              required
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
              required
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
              required
                name="vcri"
                value={formData.vcri.name}
                onChange={handleSignatoryFormChange}
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>

          {/* <label className="block mb-2 font-semibold">Funds Available:</label> */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-semibold">
                Accountant III
              </label>
              <input
              required
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
              required
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

        <ProponentsDeliverables
          formData={formData}
          setFormData={setFormData}
        />

        {/* submit naa */}
        <button
          type="submit"
          className="bg-[#FCC72C] text-[#060E57] px-4 py-2 rounded-lg mb-10 mt-5 m-auto block w-1/4"
        >
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