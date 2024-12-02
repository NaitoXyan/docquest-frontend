import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const EditMOAForm = ({ moaID }) => {
  const token = localStorage.getItem('token');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    partyDescription: ``,
    coverageAndEffectivity: ``,
    confidentialityClause: ``,
    termination: ``,
    witnesseth: [
      {
        whereas: ``
      }
    ],
    firstParty: [
      {
        name: "",
        title: ""
      }
    ],
    secondParty: [
      {
        name: "",
        title: ""
      }
    ],
    thirdParty: [
      {
        name: "",
        title: ""
      }
    ],
    witnesses: [
      {
        name: "",
        title: ""
      }
    ],
    partyAObligation: [
      {
        obligation: "",
        party: "party A"
      }
    ],
    partyBObligation: [
      {
        obligation: "",
        party: "party B"
      }
    ],
    partyCObligation: [
      {
        obligation: "",
        party: "party C"
      }
    ]
  });

  const fetchData = async () => {
    try {
      console.log("Fetching data using moaID:", moaID);
      const response = await axios.get(`https://web-production-4b16.up.railway.app/get_moa/${moaID}/`, {
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json',
        }
      });
      console.log("Fetched data:", response.data); // Log fetched data for debugging

      setFormData(prevFormData => ({
        ...prevFormData,
        ...response.data,
        partyAObligation: response.data.partyObligation
          .filter(obligation => obligation.party === "party A")
          .map(obligation => ({
            obligation: obligation.obligation,
            party: "party A",
          })),
        partyBObligation: response.data.partyObligation
          .filter(obligation => obligation.party === "party B")
          .map(obligation => ({
            obligation: obligation.obligation,
            party: "party B",
          })),
        partyCObligation: response.data.partyObligation
          .filter(obligation => obligation.party === "party C")
          .map(obligation => ({
            obligation: obligation.obligation,
            party: "party C",
          })),
      }));
      console.log("Form data:", formData);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [moaID]);

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

  // Handle changes for SECOND PARTY obligations
  const handleThirdPartyObligationChange = (index, value) => {
    setFormData((prevData) => {
      const updatedObligations = [...prevData.partyCObligation];
      updatedObligations[index].obligation = value;
      return { ...prevData, partyCObligation: updatedObligations };
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

  // Add obligation for SECOND PARTY
  const handleAddThirdPartyObligation = () => {
    setFormData((prevData) => ({
      ...prevData,
      partyCObligation: [
        ...prevData.partyCObligation,
        { obligation: "", party: "party C" }
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

  // Remove obligation for THIRD PARTY
  const handleRemoveThirdPartyObligation = (index) => {
    setFormData((prevData) => {
      const updatedObligations = [...prevData.partyCObligation];
      if (updatedObligations.length > 1) {
        updatedObligations.splice(index, 1);
      }
      return { ...prevData, partyCObligation: updatedObligations };
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

  const handleThirdPartyChange = (index, field, value) => {
    setFormData((prevData) => {
      const updatedThirdParty = [...prevData.thirdParty];
      updatedThirdParty[index][field] = value;
      return {
        ...prevData,
        thirdParty: updatedThirdParty
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
      ...formData.partyBObligation,
      ...formData.partyCObligation
    ];

    modifiedData.partyObligation = partyObligation;

    delete modifiedData.partyAObligation;
    delete modifiedData.partyBObligation;
    delete modifiedData.partyCObligation;

    console.log("formData to be sent:", modifiedData); // Check the structure

    try {
      // Send POST request
      const response = await axios({
        method: 'put',
        url: `https://web-production-4b16.up.railway.app/edit_moa/${moaID}/`,
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
        MEMORANDUM OF AGREEMENT
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
              <label className="block mb-2 font-semibold">
                First Party
              </label>
              <textarea
                required
                name="partyADescription"
                value={formData.partyADescription}
                onChange={handleFormChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="First party"
              ></textarea>
              <label className="block mb-2 font-semibold">
                Second Party
              </label>
              <textarea
                required
                name="partyBDescription"
                value={formData.partyBDescription}
                onChange={handleFormChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Second party"
              ></textarea>
              <label className="block mb-2 font-semibold">
                Third Party
              </label>
              <textarea
                name="partyCDescription"
                value={formData.partyCDescription}
                onChange={handleFormChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Third party (Leave blank if there is no third party)"
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

          {formData.partyCDescription && (
            <div>
              <div>
                <label className="block mb-2 font-semibold">
                  OBLIGATIONS AND RESPONSIBILITIES of the THIRD PARTY:
                </label>
                {formData.partyCObligation.map((partyCObligation, index) => (
                  <textarea
                    key={`partyC-${index}`}
                    value={partyCObligation.obligation}
                    onChange={(e) => handleThirdPartyObligationChange(index, e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mb-2"
                    placeholder="Third Party Obligation and Responsibilities"
                  ></textarea>
                ))}
              </div>
              <div className="flex space-x-2 mb-2">
                <button
                  type="button"
                  onClick={handleAddThirdPartyObligation}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Add obligation and responsibility
                </button>
                <button
                  type="button"
                  onClick={() => handleRemoveThirdPartyObligation(formData.partyCObligation.length - 1)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  disabled={formData.partyCObligation.length === 1}
                >
                  Remove
                </button>
              </div>
            </div>
          )}

        </div>

        <div className="bg-white p-8 rounded-lg shadow-md space-y-6 text-sm mb-1">
          <div>
            <label className="block mb-2 font-semibold">
              Coordination between the Parties shall be maintained for the success of the program.
            </label>
            <label className="block mb-2 font-semibold">
              COVERAGE AND EFFECTIVITY:
            </label>
            <textarea
              name="coverageAndEffectivity"
              value={formData.coverageAndEffectivity}
              onChange={handleFormChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Ex: Either of the parties may terminate this agreement based on a valid ground and after giving 30-day notice to the other party."
            ></textarea>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md space-y-6 text-sm mb-1">
          <div>
            <label className="block mb-2 font-semibold">
              CONFIDENTIALITY CLAUSE:
            </label>
            <textarea
              name="confidentialityClause"
              value={formData.confidentialityClause}
              onChange={handleFormChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Ex: Either of the parties may terminate this agreement based on a valid ground and after giving 30-day notice to the other party."
            ></textarea>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md space-y-6 text-sm mb-1">
          <label className="block mb-2 font-semibold">
            TERMINATION:
          </label>
          <textarea
            name="termination"
            value={formData.termination}
            onChange={handleFormChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Ex: Either of the parties may terminate this agreement based on a valid ground and after giving 30-day notice to the other party."
          ></textarea>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md space-y-6 text-sm mb-1">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block mb-2 font-semibold">
                First Party Name
              </label>
              {formData.firstParty.map((party, index) => (
                <input
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
          {formData.partyCDescription && (
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block mb-2 font-semibold">
                  Third Party Name
                </label>
                {formData.thirdParty.map((party, index) => (
                  <input
                    required
                    key={`thirdParty-name-${index}`}
                    type="text"
                    value={party.name}
                    onChange={(e) => handleThirdPartyChange(index, 'name', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="name"
                  />
                ))}
              </div>
              <div>
                <label className="block mb-2 font-semibold">
                  Third Party Title
                </label>
                {formData.thirdParty.map((party, index) => (
                  <input
                    required
                    key={`thirdParty-title-${index}`}
                    type="text"
                    value={party.title}
                    onChange={(e) => handleThirdPartyChange(index, 'title', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="title"
                  />
                ))}
              </div>
            </div>
          )}
          <div>
            <label className="block mb-2 font-semibold">Witnesses:</label>
            {formData.witnesses.map((witness, index) => (
              <div key={index} className="grid grid-cols-2 gap-2 mb-2">
                <div>
                  <label className="block mb-2 font-semibold">Witness Name</label>
                  <input
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
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-4 mb-4">
          Confirm Changes
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

export default EditMOAForm;