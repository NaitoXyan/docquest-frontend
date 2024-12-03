import React, { useState, useEffect } from "react";
import Topbar from "../../components/Topbar";
import ProjLeadSidebar from "../../components/ProjLeadSideBar";
import { useNavigate } from "react-router-dom";

const ProjLeadMOA = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    useEffect(() => {
      if (!token) {
          localStorage.clear();
          navigate('/login', { replace: true });
          return;
      }
    }, [token]);

    // State to hold the list of "Whereas" descriptions
    const [whereasList, setWhereasList] = useState(["", ""]); // Initialize with two empty strings

    // State to hold obligations and responsibilities
    const [firstPartyObligations, setFirstPartyObligations] = useState(["", "", ""]);
    const [secondPartyObligations, setSecondPartyObligations] = useState(["", "", ""]);

    // Function to handle adding a new input box for "Whereas"
    const addWhereasInput = () => {
        setWhereasList([...whereasList, ""]);
    };

    // Function to handle input changes for Whereas
    const handleWhereasInputChange = (index, value) => {
        const updatedList = [...whereasList];
        updatedList[index] = value;
        setWhereasList(updatedList);
    };

    // Function to handle adding a new obligation row
    const addFirstPartyObligation = () => {
        setFirstPartyObligations([...firstPartyObligations, ""]);
    };

    const addSecondPartyObligation = () => {
        setSecondPartyObligations([...secondPartyObligations, ""]);
    };

    // Function to handle input changes for obligations
    const handleFirstPartyObligationChange = (index, value) => {
        const updatedList = [...firstPartyObligations];
        updatedList[index] = value;
        setFirstPartyObligations(updatedList);
    };

    const handleSecondPartyObligationChange = (index, value) => {
        const updatedList = [...secondPartyObligations];
        updatedList[index] = value;
        setSecondPartyObligations(updatedList);
    };

    return (
        <div className="bg-gray-200 min-h-screen flex">
            {/* Sidebar with fixed width */}
            <div className="w-1/5 fixed h-full">
                <ProjLeadSidebar />
            </div>
            {/* Main content area */}
            <div className="flex-1 ml-[20%]">
                <Topbar />
                {/* Memorandum of Agreement */}
                <div className="flex flex-col mt-14 px-10">
                    <div className="bg-white shadow-lg rounded-lg p-6 mb-10">
                        <h2 className="text-3xl font-bold mb-5 text-gray-800 text-center">MEMORANDUM OF AGREEMENT</h2>
                        <p className="mb-4 text-gray-700 text-center">
                            KNOW ALL MEN BY THESE PRESENTS:
                        </p>
                        <p className="mb-4 text-gray-700">
                            This Memorandum of Agreement executed and entered into by and between:
                        </p>
                        <p className="mb-4 text-gray-700">
                        UNIVERSITY OF SCIENCE AND TECHNOLOGY OF SOUTHERN PHILIPPINES CAGAYAN DE ORO CAMPUS, a State University created and existing under the laws of the Republic of the Philippines, with principal office address located at Claro M. Recto Avenue, Lapasan, Cagayan de Oro City, represented herein by its System President,  DR. AMBROSIO B. CULTURA II, hereafter referred to as the “FIRST PARTY”;
                        </p>
                        <p className="mb-4 text-gray-700 text-center">-and-</p>
                        <p className="mb-4 text-gray-700">
                            <textarea
                                className="border border-gray-300 rounded-lg p-2 w-full mb-2 h-24 resize-none"
                                placeholder="Ex. DEPARTMENT OF EDUCATION DIVISION OF CAGAYAN DE ORO CITY, a state educational institution duly established under Philippine law"
                            />
                        </p>
                        <p className="mb-4 text-gray-700">
                            , whose office address located at...
                        </p>
                        <p className="mb-4 text-gray-700">
                            <textarea
                                className="border border-gray-300 rounded-lg p-2 w-full mb-2 h-24 resize-none"
                                placeholder="Ex. Fr. William F. Masterson Avenue, Upper Balulang, Cagayan de Oro City Misamis Oriental"
                            />
                        </p>
                        <p className="mb-4 text-gray-700">
                            , represented herein by the...
                        </p>
                        <p className="mb-4 text-gray-700">
                            <textarea
                                className="border border-gray-300 rounded-lg p-2 w-full mb-2 h-24 resize-none"
                                placeholder="Ex. School Divisions Superintendent ROY ANGELO E. GAZO, Ph.D."
                            />
                        </p>
                        <p className="mb-4 text-gray-700">
                            , hereafter referred to as the SECOND PARTY;
                        </p>
                        <h3 className="font-bold mt-6 mb-2">WITNESSETH THAT:</h3>

                        {/* Whereas Statements */}
                        <div className="mb-4 text-gray-700">
                            <p>WHEREAS, the FIRST PARTY has its mission to...</p>
                            <textarea
                                className="border border-gray-300 rounded-lg p-2 w-full mb-2 h-24 resize-none"
                                value={whereasList[0]}
                                onChange={(e) => handleWhereasInputChange(0, e.target.value)}
                                placeholder="Ex. primarily bring the world of work into the actual higher education and training of students; offer entrepreneurs the opportunity to maximize their business potentials through a gamut of services from product conceptualization to commercialization; and contribute significantly to the National Development Goals of food security and energy sufficiency through technology solutions;"
                            />
                            <p>WHEREAS, the FIRST PARTY has its extension function to serve...</p>
                            <textarea
                                className="border border-gray-300 rounded-lg p-2 w-full mb-2 h-24 resize-none"
                                value={whereasList[1]}
                                onChange={(e) => handleWhereasInputChange(1, e.target.value)}
                                placeholder="Ex. the underprivileged communities/groups and other stakeholders within its sphere of influence by providing competency-based training programs, transfer of technology, technical services and/or advisory;"
                            />
                        </div>

                        {/* Add "Whereas" Button */}
                        <button
                            onClick={addWhereasInput}
                            className="mt-4 bg-gray-500 text-white rounded-lg p-2 hover:bg-gray-600 transition"
                        >
                            Add Another "Whereas"
                        </button>

                        {/* Render additional Whereas inputs */}
                        {whereasList.slice(2).map((whereas, index) => (
                            <div key={index + 2} className="mb-4 text-gray-700">
                                <p>WHEREAS,</p>
                                <textarea
                                    className="border border-gray-300 rounded-lg p-2 w-full mb-2 h-24 resize-none"
                                    value={whereas}
                                    onChange={(e) => handleWhereasInputChange(index + 2, e.target.value)}
                                    placeholder="Ex. Enter description here..."
                                />
                            </div>
                        ))}

                        <div className="mt-6 mb-4 text-gray-700">
                            <p>WHEREAS, the SECOND PARTY has its mission to...</p>
                            <textarea
                                className="border border-gray-300 rounded-lg p-2 w-full mb-2 h-24 resize-none"
                                placeholder="Ex. protect and promote the right of every Filipino to quality, equitable, culture-based, and complete basic education and envisions Filipinos who passionately love their country and whose values and competencies enable them to realize their full potential and contribute meaningfully to building the nation;"
                            />
                            <p>WHEREAS, the SECOND PARTY has expressed its interest for the...</p>
                            <textarea
                                className="border border-gray-300 rounded-lg p-2 w-full mb-2 h-24 resize-none"
                                placeholder="Ex. conduct of journalism training for students-journalists of the Department of Education, Cagayan De Oro City Division."
                            />
                            <p>WHEREAS, the FIRST PARTY through Extension and Community Relations Division and the...</p>
                            <textarea
                                className="border border-gray-300 rounded-lg p-2 w-full mb-2 h-24 resize-none"
                                placeholder="Ex. College of Science and Mathematics, is keen on answering the call for good working partnership with the SECOND PARTY;"
                            />
                            <p>WHEREAS, the FIRST PARTY is willing to...</p>
                            <textarea
                                className="border border-gray-300 rounded-lg p-2 w-full mb-2 h-24 resize-none"
                                placeholder="Ex. conduct training programs for Journalism and provide the needed expertise through its faculty members and students from the Communication Arts, Languages, and Literature Unit under the College of Science and Mathematics (CSM)."
                            />
                        </div>

                        <h3 className="font-bold mt-6 mb-2">NOW THEREFORE, for and in consideration of the above premises, the PARTIES hereby agree to the following:</h3>

                        {/* Obligations and Responsibilities of the FIRST PARTY */}
                        <h4 className="font-bold mt-6 mb-2">OBLIGATIONS AND RESPONSIBILITIES of the FIRST PARTY:</h4>
                        <div className="flex flex-col mb-6">
                            {firstPartyObligations.map((obligation, index) => (
                                <div key={index} className="mb-2">
                                    <textarea
                                        className="border border-gray-300 rounded-lg p-2 w-full h-24 resize-none"
                                        value={obligation}
                                        onChange={(e) => handleFirstPartyObligationChange(index, e.target.value)}
                                        placeholder="Enter obligation here..."
                                    />
                                </div>
                            ))}
                            {/* Add New Row Button */}
                            <button
                                onClick={addFirstPartyObligation}
                                className="bg-gray-500 text-white rounded-lg p-2 hover:bg-gray-600 transition"
                            >
                                Add Another Obligation
                            </button>
                        </div>

                        {/* Obligations and Responsibilities of the SECOND PARTY */}
                        <h4 className="font-bold mt-6 mb-2">OBLIGATIONS AND RESPONSIBILITIES of the SECOND PARTY:</h4>
                        <div className="flex flex-col mb-6">
                            {secondPartyObligations.map((obligation, index) => (
                                <div key={index} className="mb-2">
                                    <textarea
                                        className="border border-gray-300 rounded-lg p-2 w-full h-24 resize-none"
                                        value={obligation}
                                        onChange={(e) => handleSecondPartyObligationChange(index, e.target.value)}
                                        placeholder="Enter obligation here..."
                                    />
                                </div>
                            ))}
                            {/* Add New Row Button */}
                            <button
                                onClick={addSecondPartyObligation}
                                className="bg-gray-500 text-white rounded-lg p-2 hover:bg-gray-600 transition"
                            >
                                Add Another Obligation
                            </button>
                        </div>

                        {/* Coordination and Effectivity Sections */}
                        <h4 className="font-bold mt-6 mb-2">Coordination</h4>
                        <p className="mb-4 text-gray-700">
                            Coordination between the Parties shall be maintained for the success of the program.
                        </p>
                        
                        <h4 className="font-bold mt-6 mb-2">EFFECTIVITY</h4>
<ol className="list-decimal list-inside mb-4">
    <li>This Agreement shall take effect upon the date it is signed by the parties until the completion of the training program.</li>
    <li>Any amendment or modification of any provisions of this agreement shall be subject to mutual consent of the parties.</li>
    <li>
        The 
        <input
            type="text"
            className="border border-gray-300 rounded-lg p-1 w-36 h-6 resize-none mb-1 inline-block" // Input for program
            placeholder="Program"
        />
        will be conducted on 
        <div className="inline-flex items-center mb-1"> {/* Using inline-flex for alignment */}
            <select className="border border-gray-300 rounded-lg p-1 h-8 w-16 mr-1"> {/* Adjusted size for day */}
                <option value="">Day</option>
                {Array.from({ length: 31 }, (_, i) => (
                    <option key={i} value={i + 1}>{i + 1}</option>
                ))}
            </select>
            <select className="border border-gray-300 rounded-lg p-1 h-8 w-32 mr-1"> {/* Adjusted size for month */}
                <option value="">Month</option>
                {[
                    "January", "February", "March", "April", "May", "June", 
                    "July", "August", "September", "October", "November", "December"
                ].map((month, index) => (
                    <option key={index} value={index + 1}>{month}</option>
                ))}
            </select>
            <input
                type="text"
                className="border border-gray-300 rounded-lg p-1 h-8 w-20 resize-none mb-1" // Input for year
                placeholder="Year"
            />
        </div>
        .
    </li>
</ol>







                        {/* Termination Section */}
                        <h4 className="font-bold mt-6 mb-2">TERMINATION</h4>
                        <p className="mb-4 text-gray-700">
                            Either of the parties may terminate this agreement based on a valid ground and after giving 30-day notice to the other party.
                        </p>

                        {/* Signature Section */}
                        <h4 className="font-bold mt-6 mb-2">IN WITNESS WHEREOF, the PARTIES have hereunto signed this Contract this </h4>
<p className="mb-4 text-gray-700">
    <select className="border border-gray-300 rounded-lg p-1 w-16 h-8 inline-block mr-1"> {/* Smaller dropdown for day */}
        <option value="">Day</option>
        {Array.from({ length: 31 }, (_, i) => (
            <option key={i} value={i + 1}>{i + 1}</option>
        ))}
    </select>
    day of
    <select className="border border-gray-300 rounded-lg p-1 w-32 h-8 inline-block mx-1"> {/* Smaller dropdown for month */}
        <option value="">Month</option>
        {[
            "January", "February", "March", "April", "May", "June", 
            "July", "August", "September", "October", "November", "December"
        ].map((month, index) => (
            <option key={index} value={index + 1}>{month}</option>
        ))}
    </select>
    2024.
</p>
{/* Additional Notes Section */}
<h4 className="font-bold mt-6 mb-2">ADDITIONAL NOTES:</h4>
<div className="flex justify-between">
    {/* Left Side Input Boxes - First Party */}
    <div className="w-1/2 pr-4"> {/* Adjust width and padding */}
        <h5 className="font-bold mb-2 text-center">FIRST PARTY:</h5> {/* Centered header */}
        <p className="text-center mb-4">ATTY. DIONEL O. ALBINA Chancellor, USTP CDO</p> {/* Added text below header */}
        {[...Array(3)].map((_, index) => (
            <div key={index} className="mb-6"> {/* Added margin for spacing */}
                <input
                    type="text"
                    className="border border-gray-300 rounded p-2 w-full h-12 resize-none" // Square-rounded boxes
                    placeholder={`Enter name/signature ${index + 1} here...`} // Placeholder text
                />
            </div>
        ))}
    </div>

    {/* Witness Text */}
    <div className="flex items-center mx-4">
        <h5 className="font-bold text-center">WITNESS</h5>
    </div>

    {/* Right Side Input Boxes - Second Party */}
    <div className="w-1/2 pl-4"> {/* Adjust width and padding */}
        <h5 className="font-bold mb-2 text-center">SECOND PARTY:</h5> {/* Centered header */}
        {[...Array(3)].map((_, index) => (
            <div key={index + 3} className="mb-6"> {/* Added margin for spacing */}
                <input
                    type="text"
                    className="border border-gray-300 rounded p-2 w-full h-12 resize-none" // Square-rounded boxes
                    placeholder={`Enter name/signature ${index + 4} here...`} // Placeholder text
                />
            </div>
        ))}
        <p className="text-center mt-4">DR. MARIA TERESA M. FAJARDO Director, Extension and Community Relations Division</p> {/* Added text below the last input */}
    </div>
</div>

{/* Acknowledgment Section */}
<div className="flex flex-col items-start mt-6">
    <h5 className="font-bold mb-2">ACKNOWLEDGMENT</h5>
    <p>Republic of the Philippines      )</p>
    <p>City of Cagayan de Oro            )     S. S.</p>
    <p>BEFORE ME, a NOTARY PUBLIC for and in <input
            type="text"
            className="border border-gray-300 rounded-lg p-2 w-1/2 h-8 inline-block mb-2" // Input for place
            placeholder="Enter place here..." // Placeholder for place
        /> Philippines this</p>
    <div className="flex items-center mb-2"> {/* Flex container for alignment */}
        <select className="border border-gray-300 rounded-lg p-1 h-8 w-16 mr-2"> {/* Dropdown for day */}
            <option value="">Day</option>
            {Array.from({ length: 31 }, (_, i) => (
                <option key={i} value={i + 1}>{i + 1}</option>
            ))}
        </select>
        <p className="mx-2">of</p>
        <input
            type="text"
            className="border border-gray-300 rounded-lg p-2 h-8 w-20 resize-none" // Input for year
            placeholder="2024" // Placeholder for year
        />
    </div>
    <p>personally appeared:</p>
</div>
{/* New Section for Competent Evidence */}
<h4 className="font-bold mt-6 mb-2">COMPETENT EVIDENCE OF IDENTITY:</h4>
<table className="table-auto w-full border-collapse border border-gray-300">
    <thead>
        <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Competent Evidence of Identity</th>
            <th className="border border-gray-300 px-4 py-2">Date and Place of Issue</th>
        </tr>
    </thead>
    <tbody>
        {Array.from({ length: 3 }).map((_, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-100">
                <td className="border border-gray-300 p-2">
                    <input
                        type="text"
                        className="border border-gray-300 rounded-lg p-2 w-full h-8 resize-none" // Input for Name
                        placeholder="Enter name here..."
                    />
                </td>
                <td className="border border-gray-300 p-2">
                    <input
                        type="text"
                        className="border border-gray-300 rounded-lg p-2 w-full h-8 resize-none" // Input for Competent Evidence of Identity
                        placeholder="Enter evidence here..."
                    />
                </td>
                <td className="border border-gray-300 p-2">
                    <input
                        type="text"
                        className="border border-gray-300 rounded-lg p-2 w-full h-8 resize-none" // Input for Date and Place of Issue
                        placeholder="Enter date and place here..."
                    />
                </td>
            </tr>
        ))}
    </tbody>
</table>

{/* Notarization Section */}
<p className="mt-6 text-gray-700">
    Known to me to be the same persons who executed the foregoing MEMORANDUM OF AGREEMENT consisting of&nbsp;
    <input
        type="text"
        className="border border-gray-300 rounded-lg p-1 w-16 inline-block mx-1 h-8 resize-none"
        placeholder="Enter number of pages"
    />&nbsp;including the pages wherein this Acknowledgment is written, signed by the parties and their respective witnesses on each and every page hereof, and they acknowledge to me that the same is their free and voluntary act and deed, as well as those of the entities they respectively represent.
</p>
<p className="mt-4 text-gray-700">
    WITNESS MY HAND AND NOTARIAL SEAL on the date and place first above written.
</p>
<p className="mt-6 font-bold">NOTARY PUBLIC</p>
<p className="mt-4 text-gray-700">
    Doc. No.&nbsp;
    <input
        type="text"
        className="border border-gray-300 rounded-lg p-1 w-20 inline-block mx-1 h-8 resize-none"
        placeholder="Enter Doc No."
    />
    ;<br />
    Page No.&nbsp;
    <input
        type="text"
        className="border border-gray-300 rounded-lg p-1 w-20 inline-block mx-1 h-8 resize-none"
        placeholder="Enter Page No."
    />
    ;<br />
    Book No.&nbsp;
    <input
        type="text"
        className="border border-gray-300 rounded-lg p-1 w-20 inline-block mx-1 h-8 resize-none"
        placeholder="Enter Book No."
    />
    ;<br />
    Series of 2024.
</p>

<div className="flex justify-center w-full mt-4">
    <button 
        className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg">
        Create MOA
    </button>
</div>










                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProjLeadMOA;
