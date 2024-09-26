import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
// import { Document, Page } from 'react-pdf'; // Commenting out the imports
// import 'react-pdf/dist/esm/Page/AnnotationLayer.css'; // Commenting out CSS import

const EstaffViewDocument = ({ projectLeader, documentType, documentDate, pdfFileUrl }) => {
  // const [numPages, setNumPages] = useState(null);

  // const onDocumentLoadSuccess = ({ numPages }) => {
  //   setNumPages(numPages);
  // };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfFileUrl;
    link.setAttribute('download', 'document.pdf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-gray-200 min-h-screen flex">
      <div className="w-1/5 fixed h-full">
        <Sidebar />
      </div>

      <div className="flex-1 ml-[20%]">
        <Topbar />
        <div className="flex flex-col mt-14">
          <h1 className="text-2xl font-semibold m-7">View Document</h1>
          <div className="flex flex-row mx-10 mb-7 bg-white rounded-xl p-16 h-fit items-start">
            {/* 
            <div className="flex-1 mx-5 rounded-xl p-16 h-[500px] border-2 border-gray-500 items-center">
              <Document
                file={pdfFileUrl}
                onLoadSuccess={onDocumentLoadSuccess}
              >
                {Array.from(new Array(numPages), (el, index) => (
                  <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                ))}
              </Document>
            </div>
            */}
            <div className="flex-2 mx-5 rounded-xl p-16 h-fit flex flex-col items-center">
              <div>
                <h1>Project Leader</h1>
                <a>{projectLeader || "(leader's name)"}</a>
              </div>
              <div className="mt-10">
                <h1>Document Type</h1>
                <a>{documentType || "(type's name)"}</a>
              </div>
              <div className="mt-10">
                <h1>Date</h1>
                <a>{documentDate || "(document's date)"}</a>
              </div>
              <button
                onClick={handleDownload}
                className="mt-10 bg-yellow-500 text-white font-semibold py-2 px-4 rounded hover:bg-yellow-600"
              >
                Download Document
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstaffViewDocument;
