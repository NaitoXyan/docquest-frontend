import React, { useState, useEffect } from "react";

const MOAForm = ({ projectID }) => {

  const [formData, setFormData] = useState({
    projectID: projectID,
    partyADescription: "",
    partyBDescription: "",
    termination: "",
    witnesseth: [
      {
        whereas: ""
      }
    ],
    partyObligation: [
      {
        obligation: "",
        party: "party A"
      },
      {
        obligation: "",
        party: "party B"
      }
    ],
    effectivity: [
      {
        effectivity: ""
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
    witnesses: [
      {
        name: "",
        title: ""
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

  // Handle change for obligations
  const handlePartyObligationFormChange = (index, value, party) => {
    setFormData((prevData) => {
      const updatedPartyObligation = [...prevData.partyObligation];
      updatedPartyObligation[index] = {
        obligation: value,
        party: party,
      };
      return {
        ...prevData,
        partyObligation: updatedPartyObligation,
      };
    });
  };

  // Add obligation for specified party
  const handleAddObligation = (party) => {
    setFormData((prevData) => ({
      ...prevData,
      partyObligation: [
        ...prevData.partyObligation,
        { obligation: "", party: party },
      ],
    }));
  };

  // Remove last obligation for specified party
  const handleRemoveObligation = (party) => {
    setFormData((prevData) => ({
      ...prevData,
      partyObligation: prevData.partyObligation.filter(
        (obligation, index) =>
          !(obligation.party === party && index === prevData.partyObligation.length - 1)
      ),
    }));
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

  const handleEffectivityChange = (index, value) => {
    const updatedEffectivity = [...formData.effectivity];
    updatedEffectivity[index].effectivity = value;
    setFormData((prevData) => ({
      ...prevData,
      effectivity: updatedEffectivity,
    }));
  };  

  const handleAddEffectivity = () => {
    setFormData((prevData) => ({
      ...prevData,
      effectivity: [...prevData.effectivity, { effectivity: "" }],
    }));
  };
  
  const handleRemoveEffectivity = () => {
    setFormData((prevData) => {
      const updatedEffectivity = [...prevData.effectivity];
      if (updatedEffectivity.length > 1) {
        updatedEffectivity.pop(); // Remove the last item only if there’s more than one
      }
      return { ...prevData, effectivity: updatedEffectivity };
    });
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

  return (
    <div className="flex flex-col mt-14 px-10">
      <h1 className="text-2xl font-semibold mb-5 mt-5">
        MEMORANDUM OF AGREEMENT
      </h1>

      <form>
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
                name="partyADescription"
                value={formData.partyADescription}
                onChange={handleFormChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Ex: UNIVERSITY OF SCIENCE AND TECHNOLOGY OF SOUTHERN PHILIPPINES CAGAYAN DE ORO CAMPUS (USTP CDO), a state educational institution duly established  under Philippine law, whose office address located at Claro M. Recto Avenue, Lapasan, Cagayan  de Oro City, represented herein by its Chancellor ATTY. DIONEL O. ALBINA, hereafter referred  to as the FIRST PARTY;"
              ></textarea>
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                and
              </label>
              <textarea
                name="partyBDescription"
                value={formData.partyBDescription}
                onChange={handleFormChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Ex: DEPARTMENT OF EDUCATION DIVISION OF CAGAYAN DE ORO CITY, a state educational institution duly established under Philippine law, whose office address located at Fr.  William F. Masterson Avenue, Upper Balulang, Cagayan de Oro City Misamis Oriental, represented herein by the School Divisions Superintendent ROY ANGELO E. GAZO, Ph.D., hereafter referred to as the SECOND PARTY;"
              ></textarea>
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                Witnesset that:
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
                className="bg-red-500 text-white px-4 py-2 rounded">
                Remove
              </button>
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                NOW THEREFORE, for and in consideration of the above premises, the PARTIES hereby agree
                to the following:
              </label>
              <label className="block mb-2 font-semibold">
                OBLIGATIONS AND RESPONSIBILITIES of the FIRST PARTY:
              </label>
              {formData.partyObligation
              .filter((obligation) => obligation.party === "party A")
              .map((partyObligation, index) => (
                <textarea
                  key={`partyA-${index}`}
                  value={partyObligation.obligation}
                  onChange={(e) =>
                    handlePartyObligationFormChange(index, e.target.value, "party A")
                  }
                  className="w-full p-2 border border-gray-300 rounded mb-2"
                  placeholder="Provide the faculty experts who will shall conduct the training on journalism."
                ></textarea>
              ))}
            </div>
            <div className="flex space-x-2 mb-2">
              <button
                type="button"
                onClick={() => handleAddObligation("party A")}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Add obligation and responsibility
              </button>
              <button
                type="button"
                onClick={() => handleRemoveObligation("party A")}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Remove
              </button>
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                OBLIGATIONS AND RESPONSIBILITIES of the SECOND PARTY:
              </label>
              {formData.partyObligation
              .filter((obligation) => obligation.party === "party B")
              .map((partyObligation, index) => (
                <textarea
                  key={`partyB-${index}`}
                  value={partyObligation.obligation}
                  onChange={(e) =>
                    handlePartyObligationFormChange(index, e.target.value, "party B")
                  }
                  className="w-full p-2 border border-gray-300 rounded mb-2"
                  placeholder="Identify the target trainees/participants."
                ></textarea>
              ))}
            </div>
            <div className="flex space-x-2 mb-2">
              <button
                type="button"
                onClick={() => handleAddObligation("party B")}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Add obligation and responsibility
              </button>
              <button
                type="button"
                onClick={() => handleRemoveObligation("party B")}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Remove
              </button>
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                Coordination between the Parties shall be maintained for the success of the program.
              </label>
              <label className="block mb-2 font-semibold">
                EFFECTIVITY:
              </label>
              {formData.effectivity.map((effectivityItem, index) => (
                <input
                  key={index}
                  value={effectivityItem.effectivity}
                  onChange={(e) => handleEffectivityChange(index, e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded mb-2"
                  placeholder="Ex: This Agreement shall take effect upon the date it is signed by the parties until the completion of the training program."
                />
              ))}
            </div>
            <div className="flex space-x-2 mb-2">
              <button
                type="button"
                onClick={handleAddEffectivity}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Add effectivity
              </button>
              <button
                type="button"
                onClick={handleRemoveEffectivity}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Remove
              </button>
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                TERMINATION:
              </label>
              <input
                name="termination"
                value={formData.termination}
                onChange={handleFormChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Ex: Either of the parties may terminate this agreement based on a valid ground and after giving 30-day notice to the other party."
              ></input>
            </div>

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
        </div>

        {/* submit naa */}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-4 mb-4">
          Create
        </button>
      </form>
    </div>
  );
};

export default MOAForm;