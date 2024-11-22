// import React from 'react';
// import { Document, Packer, Paragraph, TextRun, AlignmentType, HeadingLevel } from 'docx';
// import { saveAs } from 'file-saver';

// const MOAGenerator = () => {
//   const generateMOA = async () => {
//     const doc = new Document({
//       sections: [{
//         properties: {},
//         children: [
//           new Paragraph({
//             alignment: AlignmentType.CENTER,
//             heading: HeadingLevel.HEADING_1,
//             children: [
//               new TextRun({
//                 text: "MEMORANDUM OF AGREEMENT",
//                 bold: true,
//               }),
//             ],
//           }),
//           new Paragraph({
//             alignment: AlignmentType.CENTER,
//             children: [
//               new TextRun({
//                 text: "KNOW ALL MEN BY THESE PRESENTS:",
//                 bold: true,
//               }),
//             ],
//           }),
//           new Paragraph({
//             children: [
//               new TextRun({
//                 text: "This Memorandum of Agreement executed and entered into by and between:",
//               }),
//             ],
//           }),
//           new Paragraph({
//             children: [
//               new TextRun({
//                 text: "UNIVERSITY OF SCIENCE AND TECHNOLOGY OF SOUTHERN PHILIPPINES CAGAYAN DE ORO CAMPUS,",
//                 bold: true,
//               }),
//               new TextRun({
//                 text: " a State University created and existing under the laws of the Republic of the Philippines, with principal office address located at Claro M. Recto Avenue, Lapasan, Cagayan de Oro City, represented herein by its System President, ",
//               }),
//               new TextRun({
//                 text: "DR. AMBROSIO B. CULTURA II,",
//                 bold: true,
//               }),
//               new TextRun({
//                 text: " hereafter referred to as the ",
//               }),
//               new TextRun({
//                 text: '"FIRST PARTY";',
//                 bold: true,
//               }),
//             ],
//           }),
//           new Paragraph({
//             children: [
//               new TextRun({
//                 text: "-and-",
//                 bold: true,
//               }),
//             ],
//             alignment: AlignmentType.CENTER,
//           }),
//           // Second Party
//           new Paragraph({
//             children: [
//               new TextRun({
//                 text: "CORPUS CHRISTI SCHOOL,",
//                 bold: true,
//               }),
//               new TextRun({
//                 text: " a private school duly established under Philippine law, whose office address located Masterson Avenue, Cagayan de Oro, represented herein by the School Principal, ",
//               }),
//               new TextRun({
//                 text: "MR. MICHAEL V. LEUTERIO",
//                 bold: true,
//               }),
//               new TextRun({
//                 text: " hereafter referred to as the ",
//               }),
//               new TextRun({
//                 text: '"SECOND PARTY";',
//                 bold: true,
//               }),
//             ],
//           }),
//           // Parties Declaration
//           new Paragraph({
//             children: [
//               new TextRun({
//                 text: 'Collectively herein referred to as the "PARTIES"',
//               }),
//             ],
//           }),
//           // Witnesseth
//           new Paragraph({
//             alignment: AlignmentType.CENTER,
//             children: [
//               new TextRun({
//                 text: "WITNESSETH THAT:",
//                 bold: true,
//               }),
//             ],
//           }),
//           // Whereas Clauses
//           ...generateWhereasSection(),
//           // Now Therefore
//           new Paragraph({
//             children: [
//               new TextRun({
//                 text: "NOW THEREFORE,",
//                 bold: true,
//               }),
//               new TextRun({
//                 text: " for and in consideration of the above premises, the ",
//               }),
//               new TextRun({
//                 text: "PARTIES",
//                 bold: true,
//               }),
//               new TextRun({
//                 text: " hereby agree to the following:",
//               }),
//             ],
//           }),
//           // Obligations Sections
//           ...generateObligationsSection(),
//           // Coverage and Effectivity
//           ...generateCoverageSection(),
//           // Confidentiality Clause
//           ...generateConfidentialitySection(),
//           // Termination
//           ...generateTerminationSection(),
//           // Signature Section
//           ...generateSignatureSection(),
//         ],
//       }],
//     });

//     // Generate and save document
//     const blob = await Packer.toBlob(doc);
//     saveAs(blob, "Memorandum_of_Agreement.docx");
//   };

//   // Helper function to generate Whereas section
//   const generateWhereasSection = () => {
//     const whereasContent = [
//       "the FIRST PARTY is mandated to provide advanced education...",
//       "the FIRST PARTY, has its extension function to serve the underprivileged communities...",
//       "the FIRST PARTY through the faculty members and students...",
//       "the SECOND PARTY, is a private academic institution...",
//       "the SECOND PARTY, is willing to facilitate the full participation..."
//     ];

//     return whereasContent.map(content => 
//       new Paragraph({
//         children: [
//           new TextRun({
//             text: "WHEREAS, ",
//             bold: true,
//           }),
//           new TextRun({
//             text: content,
//           }),
//         ],
//       })
//     );
//   };

//   // Helper function to generate Obligations section
//   const generateObligationsSection = () => {
//     const firstPartyObligations = [
//       "Provide the faculty experts who will conduct the capacity building.",
//       "Provide student participants who will work with the Corpus Christi School teachers...",
//       "Provide other supportive learning resources for the successful conduct of action research.",
//       "The honoraria of the assigned faculty extensionists shall likewise be shouldered by USTP...",
//       "Prohibit themselves in participating any community activities...",
//       "Coordination between the Parties shall be maintained for the success of the program."
//     ];

//     const secondPartyObligations = [
//       "Identify the training participants.",
//       "Ensure the full attendance of the training participants.",
//       "Provide a certificate of recognition/completion for the faculty members and students.",
//       "Provide certificate of recognition for the USTP Extension and Community Relations Division.",
//       "Coordination between the Parties shall be maintained for the success of the program."
//     ];

//     return [
//       new Paragraph({
//         heading: HeadingLevel.HEADING_2,
//         children: [
//           new TextRun({
//             text: "OBLIGATIONS AND RESPONSIBILITIES of the FIRST PARTY:",
//             bold: true,
//           }),
//         ],
//       }),
//       ...generateNumberedList(firstPartyObligations),
//       new Paragraph({
//         heading: HeadingLevel.HEADING_2,
//         children: [
//           new TextRun({
//             text: "OBLIGATIONS AND RESPONSIBILITIES of the SECOND PARTY:",
//             bold: true,
//           }),
//         ],
//       }),
//       ...generateNumberedList(secondPartyObligations),
//     ];
//   };

//   // Helper function to generate Coverage section
//   const generateCoverageSection = () => {
//     return [
//       new Paragraph({
//         heading: HeadingLevel.HEADING_2,
//         children: [
//           new TextRun({
//             text: "COVERAGE and EFFECTIVITY",
//             bold: true,
//           }),
//         ],
//       }),
//       new Paragraph({
//         children: [
//           new TextRun({
//             text: "This Agreement shall cover CY 2024-2025 and take effect upon the date it is signed by the parties until the completion of the training and research collaboration program.",
//           }),
//         ],
//       }),
//     ];
//   };

//   // Helper function to generate Confidentiality section
//   const generateConfidentialitySection = () => {
//     return [
//       new Paragraph({
//         heading: HeadingLevel.HEADING_2,
//         children: [
//           new TextRun({
//             text: "CONFIDENTIALITY CLAUSE",
//             bold: true,
//           }),
//         ],
//       }),
//       new Paragraph({
//         children: [
//           new TextRun({
//             text: "The parties mutually agree to process personal information and sensitive personal information in conformity with the provisions of Republic Act No. 10173 (Data Privacy Act of 2012) and all other applicable laws and regulations of all the parties regarding data privacy protection laws.",
//           }),
//         ],
//       }),
//     ];
//   };

//   // Helper function to generate Termination section
//   const generateTerminationSection = () => {
//     return [
//       new Paragraph({
//         heading: HeadingLevel.HEADING_2,
//         children: [
//           new TextRun({
//             text: "TERMINATION",
//             bold: true,
//           }),
//         ],
//       }),
//       new Paragraph({
//         children: [
//           new TextRun({
//             text: "Either of the parties may terminate this agreement based on a valid ground and after giving 30-day notice to the other party.",
//           }),
//         ],
//       }),
//     ];
//   };

//   // Helper function to generate Signature section
//   const generateSignatureSection = () => {
//     return [
//       new Paragraph({
//         alignment: AlignmentType.CENTER,
//         children: [
//           new TextRun({
//             text: "IN WITNESS WHEREOF,",
//             bold: true,
//           }),
//           new TextRun({
//             text: " the parties have hereunto signed this Contract this ___ day of _______ 2024 at _________________, Philippines.",
//           }),
//         ],
//       }),
//       // Signature blocks for parties and witnesses
//       new Paragraph({
//         alignment: AlignmentType.LEFT,
//         children: [
//           new TextRun({
//             text: "\nFIRST PARTY:\t\t\t\tSECOND PARTY:",
//             bold: true,
//           }),
//         ],
//       }),
//     ];
//   };

//   // Helper function to generate numbered lists
//   const generateNumberedList = (items) => {
//     return items.map((item, index) => 
//       new Paragraph({
//         children: [
//           new TextRun({
//             text: `${index + 1}. ${item}`,
//           }),
//         ],
//       })
//     );
//   };

//   return (
//     <div className="p-4">
//       <button 
//         onClick={generateMOA}
//         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//       >
//         Generate MOA Document
//       </button>
//     </div>
//   );
// };

// export default MOAGenerator;