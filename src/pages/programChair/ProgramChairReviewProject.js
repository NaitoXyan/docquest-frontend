import React, { useState, useEffect } from "react";
import Topbar from "../../components/Topbar";
import { useParams, useNavigate } from "react-router-dom";
import { PDFViewer } from "@react-pdf/renderer";
import MyDocument from "../../components/GeneratePdf";
import axios from "axios";
import ProgramChairSidebar from "../../components/ProgramChairSideBar";

const ProgramChairReviewProject = () => {
  const { reviewID, projectID } = useParams();
  const navigate = useNavigate();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    action: "",
    comment: ""
  });

  useEffect(() => {
    // Check if token is present
    if (!token) {
      navigate('/login', { replace: true });
      return;
    }

    // Retrieve roles from localStorage
    const roles = JSON.parse(localStorage.getItem('roles') || '[]');
    
    // Redirect if "ecrd" role is not found
    if (!roles.includes("prch")) {
      navigate('/login', { replace: true });
    }
  }, [token, navigate]);

  const [isLoading, setIsLoading] = useState(false);

  const handleAction = async (actionType) => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      const response = await axios({
        method: "post",
        url: `http://127.0.0.1:8000/review_project`,
        headers: {
           Authorization: `Token ${token}`,
          "Content-Type": "application/json"
        },
        data: {
          reviewID: reviewID,
          action: actionType,
          comment: formData.comment
        }
      });

      console.log(response.data);
      // Check if response contains the expected data structure
     // Check if the response contains the success message
    if (response.data.message && response.data.message.includes("Review successfully")) {
      setShowSuccessModal(true);
    } else {
      setError("An error occurred. Please try again.");
    }
    } catch (err) {
      console.error("Error details:", err);
      setError(
        err.response?.data?.error || "An error occurred. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCommentChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      comment: e.target.value
    }));
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
    navigate("/program-chair-review-list/pending/all");
  };

  return (
    <div className="bg-gray-200 min-h-screen flex">
      {/* Sidebar */}
      <div className="w-1/5 fixed h-full">
        <ProgramChairSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-[20%] mr-[20%]">
        <Topbar />
        <div className="h-[calc(100vh-80px)] flex justify-center items-center p-5">
          <PDFViewer className="w-full h-full border shadow-lg">
            <MyDocument projectID={projectID} />
          </PDFViewer>
        </div>
      </div>

      {/* Approval Panel */}
      <div className="w-1/5 fixed right-0 top-0 h-full p-4 bg-white shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Pending For Approval:</h3>
        <label>Comment:</label>
        <textarea
          placeholder="Add comment"
          className="w-full p-2 border rounded mb-2 resize-none"
          rows="4"
          value={formData.comment}
          onChange={handleCommentChange}
        ></textarea>
        <button
          type="button"
          disabled={isLoading}
          className={`w-full py-2 mb-2 text-white font-bold ${
            isLoading ? 'bg-green-400' : 'bg-green-600 hover:bg-green-700'
          } rounded`}
          onClick={() => handleAction("approve")}
        >
          {isLoading ? 'Processing...' : 'Approve'}
        </button>

        <button
          type="button"
          disabled={isLoading}
          className={`w-full py-2 mb-2 text-white font-bold ${
            isLoading ? 'bg-red-400' : 'bg-red-600 hover:bg-red-700'
          } rounded`}
          onClick={() => handleAction("deny")}
        >
          {isLoading ? 'Processing...' : 'Revise'}
        </button>
        {error && (
          <div className="mt-4 p-2 text-center text-red-600 border border-red-600 rounded">
            {error}
          </div>
        )}
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-1/3 text-center">
            <h3 className="text-xl font-semibold mb-4">Review Successful</h3>
            <p className="mb-4">The user has been notified with your review.</p>
            <button
              onClick={closeSuccessModal}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Go to Review List
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgramChairReviewProject;