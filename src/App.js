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
import ProposalFormFirstPage from "./components/ProposalFormFirstPage";
import ProposalFormSecondPage from "./components/ProposalFormSecondPage";
import ProjLeadProjectStatus from "./pages/projectlead/ProjLeadProjectStatus";
import ProjectPDFViewer from "./components/ProjectPDFViewer";
import EditProposalForm from "./components/EditProjectForm";
import PickProjCreateMoa from "./pages/projectlead/ProjLeadPickProjCreateMoa";
import ProjLeadMoaStatus from "./pages/projectlead/ProjLeadMoaStatus";
import ProjLeadEditProject from "./pages/projectlead/ProjLeadEditProject";
import ProjLeadEditMoaForm from "./pages/projectlead/ProjLeadEditMoaForm";
import DirectorReviewProject from "./pages/director/DirectorReviewProject";
import ProposalFormFirstPage_Deliverables from "./components/ProposalFormFirstPage_Deliverables";
import DirectorDashboard from "./pages/director/DirectorDashboard";
import ProjLeadStatusBar from './pages/projectlead/ProjLeadStatusBar'; // Correct path
import VPALADashboard from "./pages/vpala/VPALADashboard";
import VPALASideBar from './components/VPALASideBar';
import VPALAMemoList from "./pages/vpala/VPALAMemoList";
import EstaffScancopy from "./pages/estaff/EstaffScancopy";
import DirectorReviewList from "./pages/director/DirectorProjectReviewList";
import ProgramChairDashboard from "./pages/programChair/ProgramChairDashboard";
import MOAGenerator from "./pages/vpala/VPALAGenerateMOA";
import ProgramChairReviewList from "./pages/programChair/ProgramChairProjectReviewList";
import ProgramChairReviewProject from "./pages/programChair/ProgramChairReviewProject";
import CollegeDeanDashboard from "./pages/collegeDean/CollegeDeanDashboard";
import CollegeDeanReviewList from "./pages/collegeDean/CollegeDeanReviewList";
import CollegeDeanReviewProject from "./pages/collegeDean/CollegeDeanReviewProject";

function App() {
  return (
    <Routes>
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
        <Route path="/projectlead" element={<ProjLeadStatusBar />} />
        <Route path="/moa-status/:statusFilterParam" element={<ProjLeadMoaStatus/>} />
        <Route path="/edit-moa/:moaID" element={<ProjLeadEditMoaForm/>}/>
        <Route path="/deliverables" element={<ProposalFormFirstPage_Deliverables/>}/>

        {/* programchair routes */}
        <Route path="/program-chair" element={<ProgramChairDashboard/>}/>
        <Route path="/program-chair-review-list/:status/:document" element={<ProgramChairReviewList/>}/>
        <Route path="/program-chair-review-project/:reviewID/:projectID" element={<ProgramChairReviewProject/>}/>

        {/* College Dean routes */}
        <Route path="/college-dean" element={<CollegeDeanDashboard/>}/>
        <Route path="/college-dean-review-list/:status/:document" element={<CollegeDeanReviewList/>}/>
        <Route path="/college-dean-review-project/:reviewID/:projectID" element={<CollegeDeanReviewProject/>}/>

        {/*director routes  */}
        <Route path="/director" element={<DirectorDashboard/>} />
        <Route path="/review-project/:reviewID/:projectID" element={<DirectorReviewProject/>} />
        <Route path="/review-list/:status/:document" element={<DirectorReviewList/>}/>

        {/*VPAPLA Routes  */}
        <Route path="/vpala" element={<VPALADashboard/>}/>
        <Route path="/vpala-generate-moa" element={<MOAGenerator/>}/>
        
        {/* EStaff routes */}
        <Route path="/vpalamemolist" element={<VPALAMemoList/>}/>

         {/* ESTAFF ROUTING */}
        <Route path="/estaff/documents-list" element={<EStaffDocumentsList />} />  {/* Add this line */}
        <Route path="/estaff/view-document" element={<EstaffViewDocument />} />  {/* Add this line */}
        <Route path="/estaff/user-list" element={<UserList />} />  {/* Add this line */}
        <Route path="/estaff/create-user" element={<CreateUser />} />  {/* Add this line */}
        {/* <Route path="/estaff/profile-estaff" element={<EStaffProfilePage />} />  Add this line */}
        
        {/* Create proposal routes */}
        {<Route path="/proposal_form_second_page" element={<ProposalFormSecondPage />} />}
          
        {/* Other Unorganized */}
        <Route path="/pdf-viewer/:projectID" element={<ProjectPDFViewer />} />
        <Route path="/edit-project/:projectID" element={<ProjLeadEditProject />} /> {/* Walay remove button for Budgetary Requirements */}
        <Route path="/estaff" element={<EstaffDashboard />} />
        <Route path="/deptoff" element={<DeptOffDashboard />} />
        <Route path="/coordinator" element={<CoordinatorDashboard />} />
        <Route path="/signatory" element={<SignatoryDashboard />} />
        {<Route path="/estaff/scancopy" element={<EstaffScancopy />} />}
      </Routes>
  );
}

export default App;