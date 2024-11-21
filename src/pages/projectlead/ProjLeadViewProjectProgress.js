import React, { useState, useEffect } from "react";
import Topbar from "../../components/Topbar";
import { useParams, useNavigate } from "react-router-dom";
import { PDFViewer } from "@react-pdf/renderer";
import MyDocument from "../../components/GeneratePdf";
import axios from "axios";
import ProjLeadSidebar from '../../components/ProjLeadSideBar';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const ProjectProgressStep = ({ projectID }) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [signatories, setSignatories] = useState([]);

  const [formData, setFormData] = useState({
    reviewID: 0,
    contentOwnerID: 0,
    firstname: "",
    lastname: "",
    content_type: "",
    content_type_name: "",
    source_id: "",
    projectTitle: "",
    dateCreated: "",
    reviewByID: "",
    reviewStatus: "",
    reviewDate: "",
    comment: "",
    approvalCounter: "",
    reviewerResponsible: ""
  });

  const steps = [
    {
      label: (() => {
        const programChair = signatories.find(
          (signatory) => signatory.title === "Program Chair"
        );
        return programChair ? (
          <>
            {programChair.name}
            <br />
            {programChair.title}
          </>
        ) : (
          "Program Chair not found"
        );
      })(),
      description: (() => {
        if (formData.approvalCounter < 0) {
          return "Status: Pending";
        } else {
          return "Status: Approved";
        }
      })()
    },
    {
      label: (() => {
        const collegeDean = signatories.find(
          (signatory) => signatory.title === "College Dean"
        );
        return collegeDean ? (
          <>
            {collegeDean.name}
            <br />
            {collegeDean.title}
          </>
        ) : (
          "college Dean not found"
        );
      })(),
      description: (() => {
        if (formData.approvalCounter < 1) {
          return "Status: Pending";
        } else {
          return "Status: Approved";
        }
      })()
    },
    {
      label: (() => {
        const director = signatories.find(
          (signatory) => signatory.title === "Director, Extension & Community Relations"
        );
        return director ? (
          <>
            {director.name}
            <br />
            {director.title}
          </>
        ) : (
          "Director not found"
        );
      })(),
      description: (() => {
        if (formData.approvalCounter < 2) {
          return "Status: Pending";
        } else {
          return "Status: Approved";
        }
      })()
    },
  ];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  useEffect(() => {
    setActiveStep(formData.approvalCounter);
  }, [formData.approvalCounter]);

  useEffect(() => {
    const fetchProject = async () => {
        try {
          const response = await axios({
            method: "get",
            url: `http://127.0.0.1:8000/get_project_review/${projectID}/`,
            headers: {
                Authorization: `Token ${token}`,
              "Content-Type": "application/json"
            }
          });
          setFormData(response.data);
          console.log('get review project: ', response.data);

        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    };

    fetchProject();
  }, [projectID, token]);

  useEffect(() => {
    const fetchSignatories = async () => {
        try {
          const response = await axios({
            method: "get",
            url: `http://127.0.0.1:8000/get_project/${projectID}/`,
            headers: {
                Authorization: `Token ${token}`,
              "Content-Type": "application/json"
            }
          });
          const data = response.data;
          setSignatories(data.signatories);
          console.log('get signatories : ', response.data.signatories);

        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    };

    fetchSignatories();
  }, [projectID, token]);

  const handleEditProject = (projectID) => {
    navigate(`/edit-project/${projectID}`);
  };

  return (
    <Box sx={{ maxWidth: 300 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel>
              {step.label}
            </StepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>
              <Box sx={{ mb: 2 }}>
                
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>

      <Button
        variant="contained"
        color="primary"
        onClick={() => handleEditProject(formData.source_id)}
        disabled={formData.reviewStatus !== 'rejected'}
      >
        Edit Project
      </Button>
    </Box>
  );
};

const ProjLeadViewProjectProgress = () => {
  const { projectID } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Check if token is present
    if (!token) {
      navigate('/login', { replace: true });
      return;
    }
  }, [token, navigate]);

  return (
  <div className="bg-gray-200 min-h-screen flex flex-col">
    {/* Topbar */}
    <div className="flex-none">
      <Topbar />
    </div>
  
    {/* Main Content */}
    <div className="flex flex-1">
      {/* Sidebar */}
      <div className="flex-none">
        <ProjLeadSidebar />
      </div>
  
      {/* PDF Viewer */}
      <div className="flex-1 mt-14 ml-[19%] w-80">
        <PDFViewer className="w-full h-full border shadow-lg">
          <MyDocument projectID={projectID} />
        </PDFViewer>
      </div>

      <div className="flex-none mt-20 ml-[2%]">
        <ProjectProgressStep projectID={projectID} />
      </div>
    </div>
  </div>
  );
};

export default ProjLeadViewProjectProgress;