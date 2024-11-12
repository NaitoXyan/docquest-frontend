import React, { useState } from 'react';

import ProjLeadSideBar from './ProjLeadSideBar';
import Topbar from './Topbar'; 

const ProponentsDeliverables = () => {
  const [showTextField, setShowTextField] = useState(false);

  const handleCheckboxChange = (event) => {
    setShowTextField(event.target.checked);
  };

  return (
    <div className="bg-gray-200 min-h-screen flex">
      {/* Sidebar */}
      <div className="w-1/5 fixed h-full">
        <ProjLeadSideBar />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 ml-[20%]">
        <Topbar />
        
        <div className="p-8">
          <h2 className="text-2xl font-semibold mb-4 mt-10">Proponents Deliverables</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            
            {/* Form Fields */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700">Project Title</label>
                <input type="text" placeholder="Title" className="w-full mt-1 p-2 border border-gray-300 rounded" />
              </div>
              
              <div>
                <label className="block text-gray-700">Date of Implementation</label>
                <input type="date" className="w-full mt-1 p-2 border border-gray-300 rounded" />
              </div>
              
              <div>
                <label className="block text-gray-700">Prepared by:</label>
                <input type="text" placeholder="Main Proponent/Project Leader" className="w-full mt-1 p-2 border border-gray-300 rounded" />
              </div>
              
              <div>
                <label className="block text-gray-700">Noted by:</label>
                <input type="text" value="DR. MARIA TERESA M. FAJARDO" readOnly className="w-full mt-1 p-2 border border-gray-300 rounded bg-gray-100" />
              </div>
            </div>

            {/* Checklist */}
            <h3 className="text-lg font-semibold mb-1 mt-10">Sigfred Tong</h3>
            <p className="text-sm italic font-normal text-gray-600 mb-5">(Main Proponent/Project Leader)</p>

            <div className="grid grid-cols-2 gap-2 text-gray-700 mr-5">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" /> Letter request from requesting party
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" /> Daily Attendance Sheet
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" /> Letter response to requesting party (within 3 days)
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" /> Evaluation Sheets
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" /> Approved Project Proposal or Letter to Conduct Activity
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" /> Summary of Evaluation (in Excel form)
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" /> Loading of Trainers
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" /> Trainers CV
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" /> MOA/MOU
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" /> Trainers DTR
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" /> Progress/Accomplishment/Terminal Report (include pictures with captions)
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" /> Modules/Lecture Notes
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" /> List of Participants
              </label>
              <label className="flex items-center">
                <input 
                  type="checkbox" 
                  className="mr-2" 
                  onChange={handleCheckboxChange} 
                /> 
                Others
              </label>
              {showTextField && (
                <input 
                  type="text" 
                  className="mt-2 p-2 border border-gray-300 rounded w-full" 
                  placeholder="Please specify..." 
                />
              )}
            </div>

            {/* Submit Button */}
            <div className="text-center mt-6">
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded">
                Submit Checklist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProponentsDeliverables;
