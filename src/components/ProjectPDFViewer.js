import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { PDFViewer } from "@react-pdf/renderer";
import MyDocument from './GeneratePdf';

const ProjectPDFViewer = () => {
  const { projectID } = useParams();
  console.log("projectPDFViewer: ", projectID);

  return (
    <div style={{ height: '100vh' }}>
        <PDFViewer style={{ width: '100%', height: '100%' }}>
            <MyDocument projectID={projectID} />
        </PDFViewer>
    </div>
  );
};

export default ProjectPDFViewer;
