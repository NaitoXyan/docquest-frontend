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
        beneficiaries: "",
        totalBudget: "",

        budgetUSTP: "",
        budgetPartnerAgency: "",

        proponents: [''],
        partnerAgency: "", //get agencyID
        programChair: "", //get userid of prog chair. make input selectable
        collegeDean: "", //get userid aning dean
    });
    
    // Function to handle changes in proponents inputs
    const handleProponentChange = (index, value) => {
        const newProponents = [...formData.proponents];
        newProponents[index] = value;
        setFormData({ ...formData, proponents: newProponents });
    };

    // Function to add a new proponent field
    const handleButtonClick = () => {
        setFormData({
        ...formData,
        proponents: [...formData.proponents, ''],
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
    
    // Function to handle changes in form inputs
    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Calculate and update the total budget whenever USTP or Partner Agency budget changes
    useEffect(() => {
        const total = parseFloat(formData.budgetUSTP || 0) + parseFloat(formData.budgetPartnerAgency || 0);
        setFormData((prevData) => ({ ...prevData, totalBudget: total }));
    }, [formData.budgetUSTP, formData.budgetPartnerAgency]);

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

                    <div className="flex space-x-2">
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

            <div className="bg-white p-8 rounded-lg shadow-md space-y-6 text-sm mt-1">
              {/* row */}
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