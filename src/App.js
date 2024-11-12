import React from "react";
import {BrowserRouter, Routers, Routes, Route, Navigate} from  "react-router-dom";
import { BrowserRouter, Routers, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { BrowserRouter, Routers, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import CoordinatorTab from "./pages/coordinator/CoordinatorTab";
import UserList from "./pages/estaff/UserList";
import CreateUser from "./pages/estaff/CreateUser";
import EStaffDocumentsList from "./pages/estaff/EStaffDocumentsList";
import EstaffDashboard from "./pages/estaff/EstaffDashboard";
import EstaffViewDocument from "./pages/estaff/EstaffViewDocuments";
import ProjLeadDashboard from "./pages/projectlead/ProjLeadDashboard";
import Topbar from "./components/Topbar";
import DeptOffSideBar from './components/DeptOffSideBar';
import DeptOffDashboard from "./pages/deptoff/DeptOffDashboard";
import DeptOffGenerateDocument from "./pages/deptoff/DeptOffGenerateDocument";
import DeptOffProfilePage from "./pages/deptoff/DeptOffProfilePage";
import CoordinatorDashboard from "./pages/coordinator/CoordinatorDashboard";
import CoordinatorProfilePage from "./pages/coordinator/ProfilePage";
import SignatoryDashboard from "./pages/signatory/SignatoryDashboard";
import ProjLeadProposalForm from "./pages/projectlead/ProjLeadProposalForm";
import ProjLeadMOAForm from "./pages/projectlead/ProjLeadMOAform";
import ProjLeadProfilePage from "./pages/projectlead/ProjLeadProfilePage";
import ProjLeadLoadTrainer from "./pages/projectlead/ProjLeadLoadTrainer";
import ProjLeadDocList from "./pages/projectlead/ProjLeadDocList";
import MyDocument from "./components/GeneratePdf";
import MOAPDF from "./components/GenerateMOA-PDF";
import MyDocument1 from "./components/GeneratePdf copy";
import { PDFViewer } from "@react-pdf/renderer";
import ProposalFormSecondPage from "./components/ProposalFormSecondPage";
import ProjLeadProjectStatus from "./pages/projectlead/ProjLeadProjectStatus";
import ProjectPDFViewer from "./components/ProjectPDFViewer";
import EditProposalForm from "./components/EditProjectForm";

import PickProjCreateMoa from "./pages/projectlead/ProjLeadPickProjCreateMoa";
import ProjLeadMoaStatus from "./pages/projectlead/ProjLeadMoaStatus";
import ProposalFormFirstPage_Deliverables from "./components/ProposalFormFirstPage_Deliverables";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={ <LoginPage /> } />
      <Route path="/user" element={ <ProjLeadDashboard /> } />
      <Route path="/estaff" element={ <EstaffDashboard /> } />
      <Route path="/deptoff" element={ <DeptOffDashboard /> } />
      <Route path="/coordinator" element={ <CoordinatorDashboard /> } />
      <Route path="/signatory" element={ <SignatoryDashboard /> } />
    </Routes>

        Login

        {/* Login */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        
        {/* Project Lead routes */}
        <Route path="/user" element={<ProjLeadDashboard />} />
        <Route path="/create_proposal" element={<ProjLeadProposalForm />} />
        <Route path="/profile" element={<ProjLeadProfilePage />} />
        <Route path="/load_trainer" element={<ProjLeadLoadTrainer />} />

        <Route path="/project-status/:statusFilterParam" element={<ProjLeadProjectStatus />} /> "need UI/UX"
        <Route path="/pick-project-create-moa" element={<PickProjCreateMoa/>}/> "need UI/UX"
        <Route path="/create_moa/:projectID" element={<ProjLeadMOAForm />}/>
        <Route path="/moa-status/:statusFilterParam" element={<ProjLeadMoaStatus/>} />
        <Route path="/ProposalFormFirstPage_Deliverables" element={<ProposalFormFirstPage_Deliverables/>} />

        {/* Create proposal routes */}
        {/* <Route path="/proposal_form_second_page" element={<ProposalFormSecondPage />} /> */}

        {/* Other Unorganized */}
        <Route path="/pdf-viewer/:projectID" element={<ProjectPDFViewer />} />
        <Route path="/edit-project/:projectID" element={<EditProposalForm />} /> "need UI/UX"

        <Route path="/project-status/:statusFilterParam" element={<ProjLeadProjectStatus />} />

        {/* Create proposal routes */}
        <Route path="/proposal_form_second_page" element={<ProposalFormSecondPage />} />

        {/* Other Unorganized */}
        <Route path="/pdf-viewer/:projectID" element={<ProjectPDFViewer />} />
        <Route path="/edit-project/:projectID" element={<EditProposalForm />} />

        <Route path="/estaff" element={<EstaffDashboard />} />
        <Route path="/deptoff" element={<DeptOffDashboard />} />
        <Route path="/coordinator" element={<CoordinatorDashboard />} />
        <Route path="/signatory" element={<SignatoryDashboard />} />
      </Routes>

      // <div style={{ height: '100vh' }}>
      //   <PDFViewer style={{ width: '100%', height: '100%' }}>
      //     <MyDocument projectID={11} />
      //   </PDFViewer>
      // </div>

  );
}

export default App;