import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import CoordinatorTab from "./pages/coordinator/CoordinatorTab";
import UserList from "./pages/estaff/UserList";
import CreateUser from "./pages/estaff/CreateUser";
import EStaffDocumentsList from "./pages/estaff/EStaffDocumentsList";
import EstaffDashboard from "./pages/estaff/EstaffDashboard";
import EstaffViewDocuments from "./pages/estaff/EstaffViewDocuments";
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
import ProjLeadViewMoa from "./components/GenerateMOA-PDF";
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
import ProjLeadViewProjectProgress from "./pages/projectlead/ProjLeadViewProjectProgress";
import EStaffProfilePage from "./pages/estaff/EStaffProfilePage";
import UserListCoord from "./pages/coordinator/UserListCoord";
import CreateUserCoord from "./pages/coordinator/CreateUserCoord";
import DocListCoord from "./pages/coordinator/DocListCoord";
import CampusProposal from "./pages/estaff/CampusProposal";
import SharedProposal from "./pages/estaff/SharedProposal";
import LoadTrainers from "./pages/estaff/LoadTrainers";
import MoaMou from "./pages/estaff/MoaMou";
import DirectorProjectStatistics from "./pages/director/DirectorProjectStatistics";
import CoordProjectStatus from "./pages/coordinator/CoordProjectStatus";
import VPALAScanCall from "./pages/vpala/VPALAScanCall";
import VPALADocStatus from "./pages/vpala/VPALADocStatus";
import VPALAViewProgress from "./pages/vpala/VPALAViewProgress";
import CoordViewProjectProgress from "./pages/coordinator/CoordViewProjectProgress";
import DirectorMOAReviewList from "./pages/director/DirectorMOAReviewList";
import DirectorReviewMOA from "./pages/director/DirectorReviewMOA";
import VPALAMOAReviewList from "./pages/vpala/VPALAMOAReviewList";
import VPALAReviewMOA from "./pages/vpala/VPALAReviewMOA";
import CollegeDeanProposalForm from "./pages/collegeDean/CollegeDeanProposalForm";
import ProgramChairProposalForm from "./pages/programChair/ProgramChairProposalForm";
import EstaffReviewList from "./pages/estaff/EstaffProjectReviewList";
import EstaffMOAViewList from "./pages/estaff/EstaffMOAViewList";
import EstaffUserList from "./pages/estaff/EstaffUserList";
import EstaffProjectStatistics from "./pages/estaff/EstaffProjectStatistics";
import EstaffCreateUser from "./pages/estaff/EstaffCreateUser";

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
        <Route path="/moa-pdf-viewer/:moaID" element={<ProjLeadViewMoa/>}/>
        <Route path="/deliverables" element={<ProposalFormFirstPage_Deliverables/>}/>
        <Route path="/view-project-progress/:projectID" element={<ProjLeadViewProjectProgress/>}/>

        {/* programchair routes */}
        <Route path="/program-chair" element={<ProgramChairDashboard/>}/>
        <Route path="/program-chair-create-project" element={<ProgramChairProposalForm/>}/>
        <Route path="/program-chair-review-list/:status/:document" element={<ProgramChairReviewList/>}/>
        <Route path="/program-chair-review-project/:reviewID/:projectID" element={<ProgramChairReviewProject/>}/>

        {/* College Dean routes */}
        <Route path="/college-dean" element={<CollegeDeanDashboard/>}/>
        <Route path="/college-dean-create-project" element={<CollegeDeanProposalForm/>}/>
        <Route path="/college-dean-review-list/:status/:document" element={<CollegeDeanReviewList/>}/>
        <Route path="/college-dean-review-project/:reviewID/:projectID" element={<CollegeDeanReviewProject/>}/>

        {/*director routes  */}
        <Route path="/director" element={<DirectorDashboard/>} />
        <Route path="/review-project/:reviewID/:projectID" element={<DirectorReviewProject/>} />
        <Route path="/review-list/:status/:document" element={<DirectorReviewList/>}/>
        <Route path="/moa-review-list/:status/:document" element={<DirectorMOAReviewList/>}/>
        <Route path="/review-moa/:moaID" element={<DirectorReviewMOA/>} />
        <Route path="director-project-statistics" element={<DirectorProjectStatistics/>}/>

        {/*VPAPLA Routes  */}
        <Route path="/vpala" element={<VPALADashboard/>}/>
        <Route path="/vpala-generate-moa" element={<MOAGenerator/>}/>
        <Route path="/scan/:id" element={<VPALAScanCall />} />
        <Route path="/documents" element={<VPALADocStatus />} />
        <Route path="/documents/:statusFilter" element={<VPALADocStatus />} /> {/* Dynamic route */}
        <Route path="/view/:id" element={<VPALAViewProgress/>} />
        <Route path="/document/:id" element={<VPALAViewProgress />} />
        <Route path="/vpala-review-list/:status/:document" element={<VPALAMOAReviewList/>}/>
        <Route path="/vpala-review-moa/:moaID" element={<VPALAReviewMOA/>} />

        {/* EStaff routes */}
        <Route path="/vpalamemolist" element={<VPALAMemoList/>}/>

        {/* ESTAFF ROUTING */}
        <Route path="/estaff" element={<EstaffDashboard />} />
        <Route path="/estaff-project-view-list/:status/:document" element={<EstaffReviewList />} /> 
        <Route path="/estaff-moa-view-list/:status/:document" element={<EstaffMOAViewList />} /> 
        <Route path="/estaff-userlist" element={<EstaffUserList />} />
        <Route path="estaff-project-statistics" element={<EstaffProjectStatistics/>}/>
        <Route path="/estaff-submit-scanned-copy/:content_type_name/:source_id" element={<EstaffScancopy />} />
        <Route path="/estaff-create-user" element={<EstaffCreateUser />} />

        <Route path="/documents-list" element={<EStaffDocumentsList />} />  {/* Add this line */}
        <Route path="/view-download/:id" element={<ProjectPDFViewer />} />  {/* Add this line */}
        <Route path="/user-list" element={<UserList />} />  {/* Add this line */}
        <Route path="/create-user" element={<CreateUser />} />  {/* Add this line */}
        <Route path="/profile-estaff" element={<EStaffProfilePage />} />
        <Route path="/campus-proposal" element={<CampusProposal />} />
        <Route path="/shared-proposal" element={<SharedProposal />} />
        <Route path="/load-trainers" element={<LoadTrainers />} />
        <Route path="/moa-mou" element={<MoaMou />} />
        {/* <Route path="/estaff/profile-estaff" element={<EStaffProfilePage />} />  Add this line */}

        {/* COORDINATOR ROUTES */}
        {<Route path="/coordusers" element={<UserListCoord />} />}
        <Route path="/coordinatordashboard" element={<CoordinatorDashboard />} />
        <Route path="/createuser:id" element={<CreateUserCoord />} />
        <Route path="/documents-coord" element={<DocListCoord />} />
        <Route path="/coordinator-view-project-progress/:projectID" element={<CoordViewProjectProgress/>}/>
        <Route path="/projects/:statusFilterParam" element={<CoordProjectStatus />} />
        <Route path="/projectpdfviewer/:projectId" element={<ProjectPDFViewer />} /> 

        {/* Create proposal routes */}
        {<Route path="/proposal_form_second_page" element={<ProposalFormSecondPage />} />}

        {/* EStaff routes */}
          
        {/* Other Unorganized */}
        <Route path="/pdf-viewer/:projectID" element={<ProjectPDFViewer />} />
        <Route path="/edit-project/:projectID" element={<ProjLeadEditProject />} />
        
        <Route path="/deptoff" element={<DeptOffDashboard />} />
       
        <Route path="/signatory" element={<EstaffDashboard />} />
        
      </Routes>
  );
}

export default App;