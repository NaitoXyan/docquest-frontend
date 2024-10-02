import React from "react";
import {BrowserRouter, Routers, Routes, Route, Navigate} from  "react-router-dom";
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
import ProjLeadProfilePage from "./pages/projectlead/ProjLeadProfilePage";

function App() {
  return (
    
    <Routes>
      {/* Login */}
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={ <LoginPage /> } />
      {/* Project Lead routes */}
      <Route path="/user" element={ <ProjLeadDashboard /> } />
      <Route path="/create_proposal" element={ <ProjLeadProposalForm /> } />
      <Route path="/estaff" element={ <EstaffDashboard /> } />
      <Route path="/deptoff" element={ <DeptOffDashboard /> } />
      <Route path="/coordinator" element={ <CoordinatorDashboard /> } />
      <Route path="/signatory" element={ <SignatoryDashboard /> } />
      <Route path="/profile" element={ <ProjLeadProfilePage /> } />
    </Routes>
  );
}

export default App;