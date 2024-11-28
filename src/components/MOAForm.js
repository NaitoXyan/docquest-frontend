import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const MOAForm = ({ projectID }) => {
  const token = localStorage.getItem('token');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    projectID: projectID,
    partyDescription: `UNIVERSITY OF SCIENCE AND TECHNOLOGY OF SOUTHERN PHILIPPINES CAGAYAN DE ORO CAMPUS, a State University created and existing under the laws of the Republic of the Philippines, with principal office address located at Claro M. Recto Avenue, Lapasan, Cagayan de Oro City, represented herein by its System President, DR. AMBROSIO B. CULTURA II, hereafter referred to as the "FIRST PARTY"`,
    coverageAndEffectivity: ``,
    confidentialityClause: `The parties mutually agree to process personal information and sensitive personal information in conformity with the provisions of Republic Act No. 10173 (Data Privacy Act of 2012) and all other applicable laws and regulations of all the parties regarding data privacy protection laws.
    
    Both parties shall ensure that appropriate organizational, physical, and technical measures are in place to maintain the confidentiality, integrity and security of personal information and sensitive personal information that may come to their knowledge or possession by reason of any provision of this MOA and that their employees, agents, representatives, or any person under their authority shall hold said information under strict confidentiality at all times.`,
   
    termination: `Either of the parties may terminate this agreement based on a valid ground and after giving 30-day notice to the other party.`,
    witnesseth: [
      {
        whereas: `WHEREAS, the FIRST PARTY is mandated to provide advanced education, higher technological, professional and advanced instructions in mathematics, science, technology, engineering, and advance research and extension work in human resource development in critical skills and competencies required for global competitiveness (Republic Act 10919);

WHEREAS, the FIRST PARTY, has its extension function to serve the underprivileged communities/groups and other stakeholders within its sphere of influence by providing competency-based training programs, transfer of technology, technical services and/or advisory;`
      }
    ],
    firstParty: [
      {
        name: "DR. AMBROSIO B. CULTURA II",
        title: "President, USTP System"
      }
    ],
    secondParty: [
      {
        name: "",
        title: ""
      }
    ],
    witnesses: [
      {
        name: "DR. MARIA TERESA M. FAJARDO",
        title: "Director, Extension & Community Relations	",
      },
      {
        name: "ENGR. ALEX L. MAUREAL",
        title: "Vice Chancellor for Research and Innovation",
      }
    ],
    partyAObligation: [
      {
        obligation: ``,
        party: "party A"
      }
    ],
    partyBObligation: [
      {
        obligation: ``,
        party: "party B"
      }
    ]
  });

  // Handle form change for party descriptions
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle change for witnesseth inputs
  const handleWitnessethFormChange = (index, value) => {
    const updatedWitnesseth = [...formData.witnesseth];
    updatedWitnesseth[index].whereas = value;
    setFormData((prevData) => ({
      ...prevData,
      witnesseth: updatedWitnesseth,
    }));
  };

  // Handle changes for FIRST PARTY obligations
  const handleFirstPartyObligationChange = (index, value) => {
    setFormData((prevData) => {
      const updatedObligations = [...prevData.partyAObligation];
      updatedObligations[index].obligation = value;
      return { ...prevData, partyAObligation: updatedObligations };
    });
  };

  // Handle changes for SECOND PARTY obligations
  const handleSecondPartyObligationChange = (index, value) => {
    setFormData((prevData) => {
      const updatedObligations = [...prevData.partyBObligation];
      updatedObligations[index].obligation = value;
      return { ...prevData, partyBObligation: updatedObligations };
    });
  };

  // Add obligation for FIRST PARTY
  const handleAddFirstPartyObligation = () => {
    setFormData((prevData) => ({
      ...prevData,
      partyAObligation: [
        ...prevData.partyAObligation,
        { obligation: "", party: "party A" }
      ]
    }));
  };

  // Add obligation for SECOND PARTY
  const handleAddSecondPartyObligation = () => {
    setFormData((prevData) => ({
      ...prevData,
      partyBObligation: [
        ...prevData.partyBObligation,
        { obligation: "", party: "party B" }
      ]
    }));
  };

  // Remove obligation for FIRST PARTY
  const handleRemoveFirstPartyObligation = (index) => {
    setFormData((prevData) => {
      const updatedObligations = [...prevData.partyAObligation];
      if (updatedObligations.length > 1) {
        updatedObligations.splice(index, 1);
      }
      return { ...prevData, partyAObligation: updatedObligations };
    });
  };

  // Remove obligation for SECOND PARTY
  const handleRemoveSecondPartyObligation = (index) => {
    setFormData((prevData) => {
      const updatedObligations = [...prevData.partyBObligation];
      if (updatedObligations.length > 1) {
        updatedObligations.splice(index, 1);
      }
      return { ...prevData, partyBObligation: updatedObligations };
    });
  };

  // Function to add a new witnesseth statement
  const addWitnessethStatement = () => {
    setFormData((prevData) => ({
      ...prevData,
      witnesseth: [...prevData.witnesseth, { whereas: "" }],
    }));
  };

  // Function to remove the last witnesseth statement
  const removeWitnessethStatement = () => {
    setFormData((prevData) => ({
      ...prevData,
      witnesseth: prevData.witnesseth.slice(0, -1),
    }));
  };


  const handleFirstPartyChange = (index, field, value) => {
    setFormData((prevData) => {
      const updatedFirstParty = [...prevData.firstParty];
      updatedFirstParty[index][field] = value;
      return {
        ...prevData,
        firstParty: updatedFirstParty
      };
    });
  };

  const handleSecondPartyChange = (index, field, value) => {
    setFormData((prevData) => {
      const updatedSecondParty = [...prevData.secondParty];
      updatedSecondParty[index][field] = value;
      return {
        ...prevData,
        secondParty: updatedSecondParty
      };
    });
  };

  const handleWitnessChange = (index, field, value) => {
    const updatedWitnesses = [...formData.witnesses];
    updatedWitnesses[index][field] = value;
    setFormData({ ...formData, witnesses: updatedWitnesses });
  };

  const handleAddWitness = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      witnesses: [...prevFormData.witnesses, { name: '', title: '' }]
    }));
  };

  const handleRemoveWitness = () => {
    if (formData.witnesses.length > 1) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        witnesses: prevFormData.witnesses.slice(0, -1)
      }));
    }
  };

  const handleNavigation = () => {
    setIsModalOpen(false);
    navigate('/user');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a copy of formData
    const modifiedData = { ...formData };

    const partyObligation = [
      ...formData.partyAObligation,
      ...formData.partyBObligation
    ];

    modifiedData.partyObligation = partyObligation;

    delete modifiedData.partyAObligation;
    delete modifiedData.partyBObligation;

    console.log("formData to be sent:", modifiedData); // Check the structure

    try {
      // Send POST request
      const response = await axios({
        method: 'post',
        url: 'http://127.0.0.1:8000/create_moa',
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

  return (
    <div className="flex flex-col mt-14 px-10">
      <h1 className="text-2xl font-semibold mb-5 mt-5">
        MEMORANDUM OF AGREEMENT / MEMORANDUM OF UNDERSTANDING
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="bg-white p-8 rounded-lg shadow-md space-y-6 text-sm mb-1">
          {/* First Row */}
          <div className="grid grid-cols-1 gap-2">
            <div>
              <label className="block mb-2 font-semibold">
                KNOWN ALL MEN BY THESE PRESENTS:
              </label>
              <label className="block mb-2 font-semibold">
                This Memorandum of Agreement executed and entered into by and between:
              </label>
              <textarea
                required
                name="partyDescription"
                value={formData.partyDescription}
                onChange={handleFormChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Ex: UNIVERSITY OF SCIENCE AND TECHNOLOGY OF SOUTHERN PHILIPPINES CAGAYAN DE ORO CAMPUS (USTP CDO), a state educational institution duly established  under Philippine law, whose office address located at Claro M. Recto Avenue, Lapasan, Cagayan  de Oro City, represented herein by its Chancellor ATTY. DIONEL O. ALBINA, hereafter referred  to as the FIRST PARTY;"
              ></textarea>
            </div>

          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md space-y-6 text-sm mb-1">
          <div>
            <label className="block mb-2 font-semibold">
              Witnesseth that:
            </label>
            {formData.witnesseth.map((witness, index) => (
              <textarea
                required
                key={index}
                value={witness.whereas}
                onChange={(e) =>
                  handleWitnessethFormChange(index, e.target.value)
                }
                className="w-full p-2 border border-gray-300 rounded mb-2"
                placeholder="Enter a witnesseth statement"
              ></textarea>
            ))}
          </div>
          <div className="flex space-x-2 mb-2">
            <button
              type="button"
              onClick={addWitnessethStatement}
              className="bg-blue-500 text-white px-4 py-2 rounded">
              Add Statement
            </button>
            <button
              type="button"
              onClick={removeWitnessethStatement}
              className="bg-red-500 text-white px-4 py-2 rounded"
              disabled={formData.witnesseth.length === 1}>
              Remove
            </button>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md space-y-6 text-sm mb-1">
          <div>
            <label className="block mb-2 font-semibold">
              NOW THEREFORE, for and in consideration of the above premises, the PARTIES hereby agree
              to the following:
            </label>
            <label className="block mb-2 font-semibold">
              OBLIGATIONS AND RESPONSIBILITIES of the FIRST PARTY:
            </label>
            {formData.partyAObligation.map((partyAObligation, index) => (
              <textarea
                required
                key={`partyA-${index}`}
                value={partyAObligation.obligation}
                onChange={(e) => handleFirstPartyObligationChange(index, e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mb-2"
                placeholder="Provide the faculty experts who will conduct the training on journalism."
              ></textarea>
            ))}
          </div>
          <div className="flex space-x-2 mb-2">
            <button
              type="button"
              onClick={handleAddFirstPartyObligation}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add obligation and responsibility
            </button>
            <button
              type="button"
              onClick={() => handleRemoveFirstPartyObligation(formData.partyAObligation.length - 1)}
              className="bg-red-500 text-white px-4 py-2 rounded"
              disabled={formData.partyAObligation.length === 1}
            >
              Remove
            </button>
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              OBLIGATIONS AND RESPONSIBILITIES of the SECOND PARTY:
            </label>
            {formData.partyBObligation.map((partyBObligation, index) => (
              <textarea
                required
                key={`partyB-${index}`}
                value={partyBObligation.obligation}
                onChange={(e) => handleSecondPartyObligationChange(index, e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mb-2"
                placeholder="Identify the target trainees/participants."
              ></textarea>
            ))}
          </div>
          <div className="flex space-x-2 mb-2">
            <button
              type="button"
              onClick={handleAddSecondPartyObligation}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add obligation and responsibility
            </button>
            <button
              type="button"
              onClick={() => handleRemoveSecondPartyObligation(formData.partyBObligation.length - 1)}
              className="bg-red-500 text-white px-4 py-2 rounded"
              disabled={formData.partyBObligation.length === 1}
            >
              Remove
            </button>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md space-y-6 text-sm mb-1">
          <div>
            <label className="block mb-2 font-semibold">
              COVERAGE AND EFFECTIVITY:
            </label>
            <input
              required
              name="coverageAndEffectivity"
              value={formData.coverageAndEffectivity}
              onChange={handleFormChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md space-y-6 text-sm mb-1">
          <div>
            <label className="block mb-2 font-semibold">
              CONFIDENTIALITY CLAUSE:
            </label>
            <textarea
              required
              name="confidentialityClause"
              value={formData.confidentialityClause}
              onChange={handleFormChange}
              className="w-full p-2 border border-gray-300 rounded"
            ></textarea>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md space-y-6 text-sm mb-1">
          <label className="block mb-2 font-semibold">
            TERMINATION:
          </label>
          <input
            required
            name="termination"
            value={formData.termination}
            onChange={handleFormChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Ex: Either of the parties may terminate this agreement based on a valid ground and after giving 30-day notice to the other party."
          ></input>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md space-y-6 text-sm mb-1">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block mb-2 font-semibold">
                First Party Name
              </label>
              {formData.firstParty.map((party, index) => (
                <input
                  required
                  key={`firstParty-name-${index}`}
                  type="text"
                  value={party.name}
                  onChange={(e) => handleFirstPartyChange(index, 'name', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="name"
                />
              ))}

            </div>
            <div>
              <label className="block mb-2 font-semibold">
                First Party Title
              </label>
              {formData.firstParty.map((party, index) => (
                <input
                  required
                  key={`firstParty-title-${index}`}
                  type="text"
                  value={party.title}
                  onChange={(e) => handleFirstPartyChange(index, 'title', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="title"
                />
              ))}
            </div>

          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block mb-2 font-semibold">
                Second Party Name
              </label>
              {formData.secondParty.map((party, index) => (
                <input
                  required
                  key={`secondParty-name-${index}`}
                  type="text"
                  value={party.name}
                  onChange={(e) => handleSecondPartyChange(index, 'name', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="name"
                />
              ))}
            </div>
            <div>
              <label className="block mb-2 font-semibold">
                Second Party Title
              </label>
              {formData.secondParty.map((party, index) => (
                <input
                  required
                  key={`secondParty-title-${index}`}
                  type="text"
                  value={party.title}
                  onChange={(e) => handleSecondPartyChange(index, 'title', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="title"
                />
              ))}
            </div>
          </div>

          <div>
            <label className="block mb-2 font-semibold">Witnesses:</label>
            {formData.witnesses.map((witness, index) => (
              <div key={index} className="grid grid-cols-2 gap-2 mb-2">
                <div>
                  <label className="block mb-2 font-semibold">Witness Name</label>
                  <input
                    required
                    type="text"
                    value={witness.name}
                    onChange={(e) => handleWitnessChange(index, 'name', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Enter witness name"
                  />
                </div>
                <div>
                  <label className="block mb-2 font-semibold">Witness Title</label>
                  <input
                    required
                    type="text"
                    value={witness.title}
                    onChange={(e) => handleWitnessChange(index, 'title', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Enter witness title"
                  />
                </div>
              </div>
            ))}

            <div className="flex space-x-2 mb-2">
              <button
                type="button"
                onClick={handleAddWitness}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Add Witness
              </button>
              <button
                type="button"
                onClick={handleRemoveWitness}
                className="bg-red-500 text-white px-4 py-2 rounded"
                disabled={formData.witnesses.length === 1} // disable remove if only one entry
              >
                Remove
              </button>
            </div>
          </div>
        </div>

        {/* submit naa */}
        <button
          type="submit"
          className="bg-[#FCC72C] text-[#060E57] px-4 py-2 rounded-lg mb-10 mt-5 m-auto block w-1/4"
        >
          Create
        </button>

      </form>

      {/* Success Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md text-center space-y-4">
            <h2 className="text-xl font-semibold">MOA Submission Success!</h2>
            <p>Your MOA has been successfully submitted and is now awaiting review.</p>
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

export default MOAForm;