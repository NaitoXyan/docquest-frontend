import React, { useState, useEffect } from "react";
import DirectorSidebar from "../../components/DirectorSidebar";
import Topbar from "../../components/Topbar";
import { useParams, useNavigate } from "react-router-dom";
import { PDFViewer } from "@react-pdf/renderer";
import MyDocument from "../../components/GeneratePdf";
import axios from "axios";
import ProjLeadViewMoa from "../../components/GenerateMOA-PDF";
import MOADocument from "./DirectorMoaViewer";
import DirectorViewMoa from "./DirectorMoaViewer";

const DirectorReviewMOA = () => {
  const { moaID } = useParams();
  const navigate = useNavigate();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    decision: "",
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
    if (!roles.includes("ecrd")) {
      navigate('/login', { replace: true });
    }
  }, [token, navigate]);

  const [isLoading, setIsLoading] = useState(false);

  // send review
  const handleAction = async (actionType) => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      const response = await axios({
        method: "post",
        url: `https://web-production-4b16.up.railway.app/director_review_moa/${moaID}/`,
        headers: {
           Authorization: `Token ${token}`,
          "Content-Type": "application/json"
        },
        data: {
          decision: actionType,
          comment: formData.comment
        }
      });

    // Check if response contains the expected data structure
    if (response.status === 200) {
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
    navigate("/moa-review-list/pending/all");
  };

  return (
    <div className="bg-gray-200 min-h-screen flex">
      {/* Sidebar */}
      <div className="w-1/5 fixed h-full">
        <DirectorSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-[20%] mr-[20%]">
        <Topbar />
        <div className="h-[calc(100vh-80px)] flex justify-center items-center p-5">
          <DirectorViewMoa moaID={moaID} />
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
          onClick={() => handleAction("approved")}
        >
          {isLoading ? 'Processing...' : 'Approve'}
        </button>

        <button
          type="button"
          disabled={isLoading}
          className={`w-full py-2 mb-2 text-white font-bold ${
            isLoading ? 'bg-red-400' : 'bg-red-600 hover:bg-red-700'
          } rounded`}
          onClick={() => handleAction("rejected")}
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

export default DirectorReviewMOA;
