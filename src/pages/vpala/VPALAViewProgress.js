import React, { useState, useEffect } from "react";
import Topbar from "../../components/Topbar";
import { useParams, useNavigate } from "react-router-dom";
import { PDFViewer } from "@react-pdf/renderer";
import MyDocument from "../../components/GeneratePdf";
import axios from "axios";
import VPALASideBar from '../../components/VPALASideBar';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const ProjectProgressStep = ({ projectID }) => {
  const [reviews, setReviews] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const token = localStorage.getItem("token");

  // Group reviews by college
  const groupByCollege = (reviews) => {
    return reviews.reduce((acc, review) => {
      const { college } = review;
      const collegeLabel = college || "No College"; // Handle null/undefined college
      if (!acc[collegeLabel]) {
        acc[collegeLabel] = [];
      }
      acc[collegeLabel].push(review);
      return acc;
    }, {});
  };

  useEffect(() => {
    const fetchProjectReviews = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/get_reviews_with_projectID/${projectID}/`,
          {
            headers: { Authorization: `Token ${token}` },
          }
        );
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching project reviews:", error);
      }
    };

    fetchProjectReviews();
  }, [projectID, token]);

  const groupedReviews = groupByCollege(reviews);

  const calculateStepStatus = (reviews) => {
    const allApproved = reviews.every((review) => review.reviewStatus === "approved");
    const anyRejected = reviews.some((review) => review.reviewStatus === "rejected");
    const allCompleted = reviews.every((review) => review.reviewStatus && review.reviewStatus !== "pending");
  
    if (allApproved) {
      return "green"; // Approved
    } else if (anyRejected) {
      return "red"; // Rejected
    } else if (allCompleted) {
      return "yellow"; // Completed but not all approved
    } else {
      return "orange"; // In Progress
    }
  };

  // Major steps include colleges and director
  const steps = [
    ...Object.entries(groupedReviews)
      .filter(([college]) => college !== "No College") // Exclude null/undefined colleges
      .map(([college, collegeReviews]) => {
        const stepColor = calculateStepStatus(collegeReviews);
  
        return {
          label: college,
          description: (
            <Box>
              <Stepper orientation="vertical" nonLinear>
                {collegeReviews.map((review, index) => (
                  <Step
                    key={review.reviewID}
                    active={true}
                    completed={review.reviewStatus === "approved"}
                  >
                    <StepLabel
                      StepIconProps={{
                        style: {
                          color:
                            review.reviewStatus === "approved"
                              ? "green"
                              : review.reviewStatus === "rejected"
                              ? "red"
                              : "orange",
                        },
                      }}
                    >
                      {review.fullname} - {review.program || "Dean"}
                    </StepLabel>
                    <StepContent>
                      <Typography>Status: {review.reviewStatus || "Pending"}</Typography>
                      <Typography>Comment: {review.comment || "None"}</Typography>
                    </StepContent>
                  </Step>
                ))}
              </Stepper>
            </Box>
          ),
          stepColor, // Add color for major step
        };
      }),
    {
      label: "Director",
      description: (() => {
        const directorReview = reviews.find(
          (review) => !review.college && !review.program
        );
        return directorReview ? (
          <>
            <Typography>{directorReview.fullname}</Typography>
            <Typography>Status: {directorReview.reviewStatus || "Pending"}</Typography>
            <Typography>Comment: {directorReview.comment || "None"}</Typography>
          </>
        ) : (
          "No Director review found"
        );
      })(),
      stepColor: calculateStepStatus(
        reviews.filter((review) => !review.college && !review.program)
      ),
    },
  ];

  return (
    <Box sx={{ maxWidth: 600 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
            <StepContent>
              {step.description}
              <Box sx={{ mb: 2 }}></Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

const VPALAViewProgress = () => {
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
        <VPALASideBar />
      </div>
  
      {/* PDF Viewer */}
      <div className="flex-1 mt-14 ml-[19%] w-80">
        <PDFViewer className="w-full h-full border shadow-lg">
          <MyDocument projectID={projectID} />
        </PDFViewer>
      </div>

      <div className="flex-none mt-20 ml-[2%]">
        {/* Progress Legend */}
        <div className="flex space-x-4 mb-4">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-600 rounded-full mr-2"></div>
            <span>Approved</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-orange-400 rounded-full mr-2"></div>
            <span>Pending</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-600 rounded-full mr-2"></div>
            <span>Rejected</span>
          </div>
        </div>

        {/* Project Progress Step */}
        <ProjectProgressStep projectID={projectID} />
      </div>
    </div>
  </div>
  );
};

export default VPALAViewProgress;