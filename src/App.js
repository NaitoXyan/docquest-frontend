import React from "react";
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

function App() {
  return (
    // <Routes>
    //   {/* Login */}
    //   <Route path="/" element={<Navigate to="/login" />} />
    //   <Route path="/login" element={ <LoginPage /> } />
    //   {/* Project Lead routes */}
    //   <Route path="/user" element={ <ProjLeadDashboard /> } />
    //   <Route path="/create_proposal" element={ <ProjLeadProposalForm /> } />
    //   <Route path="/profile" element={ <ProjLeadProfilePage /> } />
    //   <Route path="/load_trainer" element={ <ProjLeadLoadTrainer /> } />
    //   <Route path="/doc_list" element={ <ProjLeadDocList /> } />

    //   {/* create proposal routes */}
    //   <Route path="/proposal_form_second_page" element={ <ProposalFormSecondPage /> }/>

    //   {/* Other Unorganized */}
    //   <Route path="/estaff" element={ <EstaffDashboard /> } />
    //   <Route path="/deptoff" element={ <DeptOffDashboard /> } />
    //   <Route path="/coordinator" element={ <CoordinatorDashboard /> } />
    //   <Route path="/signatory" element={ <SignatoryDashboard /> } />

    // </Routes>

    <div style={{ height: '100vh' }}>
      <PDFViewer style={{ width: '100%', height: '100%' }}>
        <MOAPDF />
      </PDFViewer>
    </div>
  );
}

export default App;