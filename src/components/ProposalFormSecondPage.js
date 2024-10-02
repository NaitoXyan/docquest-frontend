import React, { useState } from "react";

const ProposalFormSecondPage = () => {
    // State to manage the budget items
  const [budgetItems, setBudgetItems] = useState([
    { item: 'Travel Allowance', ustpAmount: 18000, partnerAgencyAmount: '', totalAmount: 18000 },
  ]);

  // Function to handle changes in input fields
  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedItems = [...budgetItems];
    updatedItems[index][name] = value;

    // Update total amount for the row
    updatedItems[index].totalAmount = parseFloat(updatedItems[index].ustpAmount || 0) + parseFloat(updatedItems[index].partnerAgencyAmount || 0);

    setBudgetItems(updatedItems);
  };

  // Function to add a new row
  const addRow = () => {
    setBudgetItems([
      ...budgetItems,
      { item: '', ustpAmount: '', partnerAgencyAmount: '', totalAmount: 0 }
    ]);
  };

  const [row2, setRow2] = useState({
    phase: 'Before Project Implementation',
    instrument: 'Trainings Need Assessment/Pre-training Survey',
    strategy: 'Survey Questionnaire, Interview with Key Informant or FGD',
    schedule: 'A week after receiving training/extension request',
  });

  const [row3, setRow3] = useState({
    phase: 'During Project Implementation',
    instrument: '',
    strategy: '',
    schedule: '',
  });

  const [row4, setRow4] = useState({
    phase: 'After Project Implementation',
    instrument: '',
    strategy: '',
    schedule: '',
  });

  const handleRowChange = (e, rowSetter) => {
    const { name, value } = e.target;
    rowSetter((prev) => ({ ...prev, [name]: value }));
  };

    return (
        <div className="flex flex-col mt-14 px-10">
            <div className="justify-items-center w-full">
                <h1 className="text-2xl font-semibold mt-5 justify-items-center">
                    Extension Project Proposal
                </h1>
            </div>

            <form>
                {/* white bar thing */}
                <div className="bg-white p-8 rounded-lg shadow-md space-y-6 text-sm mb-1">
                    {/* row */}
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="block mb-2 font-semibold">
                                BACKGROUND OF THE PROJECT
                            </label>
                            <textarea
                                name="targetGroups"
                                value
                                onChange
                                className="w-full p-2 border border-gray-300 rounded"
                            ></textarea>
                        </div>
                    </div>
                    {/* row */}
                    <div className="grid grid-cols-1 gap-4"> 
                        <div>
                            <label className="block mb-2 font-semibold">
                                GOALS AND OBJECTIVES
                            </label>
                            <textarea
                                name="targetGroups"
                                value
                                onChange
                                className="w-full p-2 border border-gray-300 rounded"
                            ></textarea>
                        </div>
                    </div>

                    {/* row */}
                    <div className="grid grid-cols-1 gap-4"> 
                        <div>
                            <label className="block mb-2 font-semibold">
                                PROJECT COMPONENT
                            </label>
                            <textarea
                                name="targetGroups"
                                value
                                onChange
                                className="w-full p-2 border border-gray-300 rounded"
                            ></textarea>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-md space-y-6 text-sm mb-1">
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="block mb-2 font-semibold">
                                PROJECT IMPLEMENTATION PLAN AND MANAGEMENT
                            </label>
                        </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                        <div>
                            <label className="block mb-2 font-semibold">
                                PROJECT OBJECTIVE
                            </label>
                            <textarea
                                name="objective"
                                value
                                onChange
                                className="w-full p-2 border border-gray-300 rounded"
                            ></textarea>
                        </div>

                        <div>
                            <label className="block mb-2 font-semibold">
                                ACTIVITIES INVOLVED
                            </label>
                            <textarea
                                name="targetGroups"
                                value
                                onChange
                                className="w-full p-2 border border-gray-300 rounded"
                            ></textarea>
                        </div>

                        <div>
                            <label className="block mb-2 font-semibold">
                                TARGET DATE
                            </label>
                            <input
                                name="targetGroups"
                                value
                                onChange
                                type="date"
                                className="w-full p-2 border border-gray-300 rounded"
                            ></input>
                        </div>

                        <div>
                            <label className="block mb-2 font-semibold">
                                PERSON RESPONSIBLE
                            </label>
                            <input
                                name="targetGroups"
                                value
                                onChange
                                className="w-full p-2 border border-gray-300 rounded"
                            ></input>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-md space-y-6 text-sm mb-1">
                    {/* row */}
                    <div className="grid grid-cols-1 gap-4"> 
                        <div>
                            <label className="block mb-2 font-semibold">
                                PROJECT LOCATION AND BENEFICIARIES
                            </label>
                            <textarea
                                name="targetGroups"
                                value
                                onChange
                                className="w-full p-2 border border-gray-300 rounded"
                            ></textarea>
                        </div>
                    </div>

                    {/* row */}
                    <div className="grid grid-cols-1 gap-4"> 
                        <div>
                            <label className="block mb-2 font-semibold">
                                PROJECT MANAGEMENT TEAM/TRAINERS
                            </label>
                            <textarea
                                name="targetGroups"
                                value
                                onChange
                                className="w-full p-2 border border-gray-300 rounded"
                            ></textarea>
                        </div>
                    </div>
                </div>

                {/* budgetary requirements */}
                <div className="bg-white p-8 rounded-lg shadow-md space-y-6 text-sm mb-1">
                    {/* row */}
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="block mb-2 font-semibold">
                                BUDGETARY REQUIREMENTS
                            </label>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-8 gap-4 p-4">
                        <table className="min-w-full table-auto border-collapse border border-gray-300 col-span-8">
                            <thead>
                            <tr>
                                <th className="border border-gray-300 p-2">Item</th>
                                <th className="border border-gray-300 p-2">USTP</th>
                                <th className="border border-gray-300 p-2">Partner Agency</th>
                                <th className="border border-gray-300 p-2">Total Amount</th>
                            </tr>
                            </thead>
                            <tbody>
                            {budgetItems.map((item, index) => (
                                <tr key={index}>
                                <td className="border border-gray-300 p-2">
                                    <input
                                    type="text"
                                    name="item"
                                    value={item.item}
                                    onChange={(e) => handleInputChange(index, e)}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    placeholder="Enter item"
                                    />
                                </td>
                                <td className="border border-gray-300 p-2">
                                    <input
                                    type="number"
                                    name="ustpAmount"
                                    value={item.ustpAmount}
                                    onChange={(e) => handleInputChange(index, e)}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    placeholder="Enter USTP amount"
                                    />
                                </td>
                                <td className="border border-gray-300 p-2">
                                    <input
                                    type="number"
                                    name="partnerAgencyAmount"
                                    value={item.partnerAgencyAmount}
                                    onChange={(e) => handleInputChange(index, e)}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    placeholder="Enter Partner Agency amount"
                                    />
                                </td>
                                <td className="border border-gray-300 p-2">
                                    <input
                                    type="number"
                                    name="totalAmount"
                                    value={item.totalAmount}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    disabled
                                    />
                                </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>

                        <button
                            onClick={addRow}
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                        >
                            Add Row
                        </button>

                        {/* Total Budget Calculation */}
                        <div className="mt-4 col-span-8">
                            <h2 className="font-semibold">Total Budget: {budgetItems.reduce((total, item) => total + parseFloat(item.totalAmount || 0), 0)}</h2>
                        </div>
                    </div>
                </div>

                {/* project evaluation and monitoring */}
                <div className="bg-white p-8 rounded-lg shadow-md space-y-6 text-sm mb-1">
                     {/* row */}
                     <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="block mb-2 font-semibold">
                                PROJECT EVALUATION AND MONITORING
                            </label>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-8 gap-4 p-4">
                        <table className="min-w-full table-auto border-collapse border border-gray-300 col-span-8">
                            <thead>
                            <tr>
                                <th className="border border-gray-300 p-2">Item</th>
                                <th className="border border-gray-300 p-2">USTP</th>
                                <th className="border border-gray-300 p-2">Partner Agency</th>
                                <th className="border border-gray-300 p-2">Total Amount</th>
                            </tr>
                            </thead>
                            <tbody>
                            {budgetItems.map((item, index) => (
                                <tr key={index}>
                                <td className="border border-gray-300 p-2">
                                    <input
                                    type="text"
                                    name="item"
                                    value={item.item}
                                    onChange={(e) => handleInputChange(index, e)}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    placeholder="Enter item"
                                    />
                                </td>
                                <td className="border border-gray-300 p-2">
                                    <input
                                    type="number"
                                    name="ustpAmount"
                                    value={item.ustpAmount}
                                    onChange={(e) => handleInputChange(index, e)}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    placeholder="Enter USTP amount"
                                    />
                                </td>
                                <td className="border border-gray-300 p-2">
                                    <input
                                    type="number"
                                    name="partnerAgencyAmount"
                                    value={item.partnerAgencyAmount}
                                    onChange={(e) => handleInputChange(index, e)}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    placeholder="Enter Partner Agency amount"
                                    />
                                </td>
                                <td className="border border-gray-300 p-2">
                                    <input
                                    type="number"
                                    name="totalAmount"
                                    value={item.totalAmount}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    disabled
                                    />
                                </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>

                        <button
                            onClick={addRow}
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                        >
                            Add Row
                        </button>

                        {/* Total Budget Calculation */}
                        <div className="mt-4 col-span-8">
                            <h2 className="font-semibold">Total Budget: {budgetItems.reduce((total, item) => total + parseFloat(item.totalAmount || 0), 0)}</h2>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-md space-y-6 text-sm mb-1"> 
                    <div className="p-4">
                        <table className="min-w-full table-auto border-collapse border border-gray-300">
                            <thead>
                            <tr>
                                <th className="border border-gray-300 p-2">Monitoring Phase</th>
                                <th className="border border-gray-300 p-2">M&E Instrument/Approach</th>
                                <th className="border border-gray-300 p-2">Format or Strategy for Data Gathering</th>
                                <th className="border border-gray-300 p-2">Schedule</th>
                            </tr>
                            </thead>
                            <tbody>
                            {/* Row 1: Before Project Implementation */}
                            <tr>
                                <td className="border border-gray-300 p-2">{row2.phase}</td>
                                <td className="border border-gray-300 p-2">{row2.instrument}</td>
                                <td className="border border-gray-300 p-2">{row2.strategy}</td>
                                <td className="border border-gray-300 p-2">{row2.schedule}</td>
                            </tr>

                            {/* Row 2: Textarea Fields */}
                            <tr>
                                <td className="border border-gray-300 p-2">{row3.phase}</td>
                                <td className="border border-gray-300 p-2">
                                <textarea
                                    name="instrument"
                                    value={row3.instrument}
                                    onChange={(e) => handleRowChange(e, setRow3)}
                                    className="w-full p-1 border rounded"
                                    rows="2"
                                    placeholder="Enter M&E Instrument/Approach"
                                />
                                </td>
                                <td className="border border-gray-300 p-2">
                                <textarea
                                    name="strategy"
                                    value={row3.strategy}
                                    onChange={(e) => handleRowChange(e, setRow3)}
                                    className="w-full p-1 border rounded"
                                    rows="2"
                                    placeholder="Enter Strategy for Data Gathering"
                                />
                                </td>
                                <td className="border border-gray-300 p-2">
                                <textarea
                                    name="schedule"
                                    value={row3.schedule}
                                    onChange={(e) => handleRowChange(e, setRow3)}
                                    className="w-full p-1 border rounded"
                                    rows="2"
                                    placeholder="Enter Schedule"
                                />
                                </td>
                            </tr>

                            {/* Row 3: Textarea Fields */}
                            <tr>
                                <td className="border border-gray-300 p-2">{row4.phase}</td>
                                <td className="border border-gray-300 p-2">
                                <textarea
                                    name="instrument"
                                    value={row4.instrument}
                                    onChange={(e) => handleRowChange(e, setRow4)}
                                    className="w-full p-1 border rounded"
                                    rows="2"
                                    placeholder="Enter M&E Instrument/Approach"
                                />
                                </td>
                                <td className="border border-gray-300 p-2">
                                <textarea
                                    name="strategy"
                                    value={row4.strategy}
                                    onChange={(e) => handleRowChange(e, setRow4)}
                                    className="w-full p-1 border rounded"
                                    rows="2"
                                    placeholder="Enter Strategy for Data Gathering"
                                />
                                </td>
                                <td className="border border-gray-300 p-2">
                                <textarea
                                    name="schedule"
                                    value={row4.schedule}
                                    onChange={(e) => handleRowChange(e, setRow4)}
                                    className="w-full p-1 border rounded"
                                    rows="2"
                                    placeholder="Enter Schedule"
                                />
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ProposalFormSecondPage;