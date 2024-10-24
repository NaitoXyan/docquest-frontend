import React, { useEffect, useState } from 'react';
import { Document, Page, View, Text, Image, StyleSheet, Font } from '@react-pdf/renderer';
import axios from 'axios';

Font.register({
  family: 'Arial',
  src: 'fonts/arial.TTF',
});
Font.register({
  family: 'ArialB',
  src: 'fonts/arialb.TTF',
});
Font.register({
  family: 'Zapf',
  src: 'fonts/zapf.ttf',
});
// fonts: Arial, Zapf Calligraphic // color #a4b494 #1A1851
const styles = StyleSheet.create({
  page: {
    fontFamily: 'Arial',
    fontSize: 10,
    padding: 60,
    flexDirection: 'column',
  },
  arialText: {
    fontFamily: 'Arial',  // Use Arial font with bold weight
  },
  margintwo: {
    marginBottom: 2,
  },
  headerUSTP: {
    textAlign: 'center',
  },
  headerCampus: {
    textAlign: 'center',
  },
  right: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  textCenter: {
    textAlign: 'center',
  },
  rowNormal: {
    flexDirection: 'row',
    border: 'solid',
    borderWidth: 1,
  },
  tableNormal: {
    display: 'table',
    width: 'auto',
  },
  tableColone: {
    width: '',
  },
  tableColtwo: {
    width: '50%',
  },
  tableColthree: {
    width: '33.3%',
    textAlign: 'center',
  },
  tableColfour: {
    width: '25%',
    textAlign: 'center',
    borderWidth: '1',
    borderColor: '#000',
  },
  tableColfive: {
    width: '20%',
    borderWidth: '1',
    borderColor: '#000',
  },
  tableColsix: {
    width: '16.6',
  },
  textpadded: {
    padding: 5,
    marginBottom: 2,
    width: '30%',
    border: 'solid',
    borderWidth: '1',
    borderColor: '#000',
    textAlign: 'center',
  },
});

const MyDocument = () => {
  const [formData, setFormData] = useState({
    programCategory: '',
    projectTitle: '',
    projectType: '',
    projectCategory: '',
    researchTitle: '',
    program: '',
    accreditationLevel: '',
    college: '',
    beneficiaries: '',
    targetImplementation: '',
    totalHours: 0,
    background: '',
    projectComponent: '',
    targetScope: '',
    ustpBudget: 0,
    partnerAgencyBudget: 0,
    totalBudget: 0,
    proponents: '',
    projectLocationID: '',
    agency: '',
    goalsAndObjectives: '',
    projectActivities: '',
    projectManagementTeam: '',
    budgetRequirements: '',
    evaluationAndMonitorings: '',
    monitoringPlanSchedules: '',
    loadingOfTrainers: '',
    signatories: '',
    dateCreated: '',
  });

  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/get_project/9/');
      setFormData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    // Fetch data and then log formData after fetching
    fetchData().then(() => {
      console.log(formData); // Check the structure of formData
    });
  }, []);

  return (
    <Document>
      {/* first page */}
      <Page style={styles.page}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <View style={[{ paddingRight: 5 }]}>
            <Image style={[styles.headerImage, { width: 60, height: 'auto' }]} src="/images/ustp_logo.png" />
          </View>
          <View style={{ paddingLeft: 5, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ textAlign: 'center', marginBottom: 2, fontFamily: 'Zapf', fontSize: 12 }}>
              University of Science and Technology of Southern Philippines
            </Text>
            <Text style={{ textAlign: 'center', marginBottom: 2, fontFamily: 'Zapf', fontSize: 7 }}>
              Alubijid | Cagayan de Oro | Claveria | Jasaan | Oroquieta | Panaon
            </Text>
          </View>
        </View>
        <View style={styles.right}>
          <View style={[{ width: '40%', flexDirection: 'row', border: 1, borderBottom: 0, justifyContent: 'center', backgroundColor: '#1A1851', }]}>
            <Text style={[{ color: '#fff', fontSize: 8, paddingTop: 2, paddingBottom: 2 }]}>
              Document Code No.
            </Text>
          </View>
        </View>
        <View style={styles.right}>
          <View style={[{ width: '40%', flexDirection: 'row', border: 1, borderBottom: 0, justifyContent: 'center', fontFamily: 'ArialB' }]}>
            <Text>
              FM-USTP-ECRD-01a {/* GET: Document Code No. Ex: FM-USTP-ECRD-01a*/}
            </Text>
          </View>
        </View>
        <View style={styles.right}>
          <View style={[{ width: '40%', flexDirection: 'row', border: 1, borderBottom: 0, }]}>
            <View style={[styles.tableColthree, { borderRight: 1, borderColor: '#000', justifyContent: 'center', backgroundColor: '#1A1851', }]}>
              <Text style={[{ color: '#fff', fontSize: 8, paddingTop: 2, paddingBottom: 2 }]}>
                Rev. No.
              </Text>
            </View>
            <View style={[styles.tableColthree, { borderRight: 1, borderColor: '#000', justifyContent: 'center', backgroundColor: '#1A1851', }]}>
              <Text style={[{ color: '#fff', fontSize: 8, paddingTop: 2, paddingBottom: 2 }]}>
                Effective Date
              </Text>
            </View>
            <View style={[styles.tableColthree, { justifyContent: 'center', backgroundColor: '#1A1851', }]}>
              <Text style={[{ color: '#fff', fontSize: 8, paddingTop: 2, paddingBottom: 2 }]}>
                Page No.
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.right}>
          <View style={[{ width: '40%', flexDirection: 'row', border: 1 }]}>;
            <View style={[styles.tableColthree, { borderRight: 1, borderColor: '#000', justifyContent: 'center', fontSize: 8, fontFamily: 'ArialB', paddingTop: 1, paddingBottom: 1 }]}>
              <Text>
                02  {/* GET: Revision Number */}
              </Text>
            </View>
            <View style={[styles.tableColthree, { borderRight: 1, borderColor: '#000', justifyContent: 'center', fontSize: 8, fontFamily: 'ArialB', paddingTop: 1, paddingBottom: 1 }]}>
              <Text>
                {formData.dateCreated.substring(0, 10)}  {/* GET: Effective Date of proposal */}
              </Text>
            </View>
            <View style={[styles.tableColthree, { justifyContent: 'center', fontSize: 8, fontFamily: 'ArialB', paddingTop: 1, paddingBottom: 1 }]}>
              <Text>
                1 {/* GET: Page number  */}
              </Text>
            </View>
          </View>
        </View>
        <Text style={[{ border: 1, width: '30%', padding: '1%', textAlign: 'center', marginBottom: 2, justifyContent: 'center', fontFamily: 'ArialB', }]}>
          Extension Project Proposal
        </Text>
        <View style={[styles.tableColone, { flexDirection: 'row', border: 1, borderBottom: 0, paddingLeft: '1%', paddingRight: '1%', fontFamily: 'ArialB', }]}>
          <Text>
            Program Category under USTP CARES: I-Share I-Help I-Support {/* GET: Project category under */}
          </Text>
        </View>
        <View style={[styles.tableColone, { flexDirection: 'row', border: 1, borderBottom: 0, paddingLeft: '1%', paddingRight: '1%', fontFamily: 'ArialB', }]}>
          <Text>
            Project Title: {formData.projectTitle}
          </Text>
        </View>
        <View style={[styles.tableColone, { flexDirection: 'row', border: 1, borderBottom: 0, paddingLeft: '1%', paddingRight: '1%', backgroundColor: '#a4b494', fontFamily: 'ArialB', }]}>
          <Text>
            TYPE OF PROJECT:          New Project          Continuing Project {/* GET: Type of Project */}
          </Text>
        </View>
        <View style={[styles.tableColone, { flexDirection: 'row', border: 1, borderBottom: 0, paddingLeft: '1%', paddingRight: '1%', backgroundColor: '#a4b494', fontFamily: 'ArialB', }]}>
          <Text>
            PROJECT CATEGORY: Skills Training/Capacity Building     Training Needs Survey     Techical Advice/Consultancy     Monitoring and Evaluation {/* GET: Project Category */}
          </Text>
        </View>
        <View style={[styles.tableColone, { flexDirection: 'row', border: 1, borderBottom: 0, paddingLeft: '1%', paddingRight: '1%', backgroundColor: '#a4b494', fontFamily: 'ArialB', }]}>
          <Text>
            TITLE OF RESEARCH: {formData.researchTitle}
          </Text>
        </View>
        <View style={[{ flexDirection: 'row', border: 1, borderBottom: 0, backgroundColor: '#a4b494', }]}>
          <View style={[styles.tableColtwo, { flexDirection: 'row', borderRight: 1, paddingLeft: '1%', paddingRight: '1%', fontFamily: 'ArialB', }]}>
            <Text>
              PROPONENTS: 
              {formData.proponents && formData.proponents.length > 0 ? (
                formData.proponents.map((item, index) => (
                  <Text key={index}>
                    {item.proponent}{index < formData.proponents.length - 1 ? ', ' : ''}
                  </Text>
                ))) : ('None')}
            </Text>
          </View>
          <View style={[styles.tableColtwo, { flexDirection: 'row', paddingLeft: '1%', paddingRight: '1%', fontFamily: 'ArialB', }]}>
            <Text>
              PROGRAM: {formData.program}
            </Text>
          </View>
        </View>
        <View style={[{ flexDirection: 'row', border: 1, borderBottom: 0 }]}>
          <View style={[styles.tableColtwo, { flexDirection: 'row', borderRight: 1, paddingLeft: '1%', paddingRight: '1%', fontFamily: 'ArialB', }]}>
            <Text>
            </Text>
          </View>
          <View style={[styles.tableColtwo, { flexDirection: 'row', paddingLeft: '1%', paddingRight: '1%', backgroundColor: '#a4b494', fontFamily: 'ArialB', }]}>
            <Text>
              ACCREDITATION LEVEL: {formData.accreditationLevel}
            </Text>
          </View>
        </View>
        <View style={[{ flexDirection: 'row', border: 1, borderBottom: 0, borderTop: 0 }]}>
          <View style={[styles.tableColtwo, { flexDirection: 'row', borderRight: 1, paddingLeft: '1%', paddingRight: '1%', fontFamily: 'ArialB', }]}>
            <Text>
            </Text>
          </View>
          <View style={[styles.tableColtwo, { borderTop: 1, flexDirection: 'row', paddingLeft: '1%', paddingRight: '1%', backgroundColor: '#a4b494', fontFamily: 'ArialB', }]}>
            <Text>
              COLLEGE: {formData.college}
            </Text>
          </View>
        </View>
        <View style={[styles.tableColone, { flexDirection: 'row', border: 1, borderBottom: 0, paddingLeft: '1%', paddingRight: '1%', backgroundColor: '#a4b494', fontFamily: 'ArialB', }]}>
          <Text>
            TARGET GROUPS/BENEFICIARIES: {formData.beneficiaries}
          </Text>
        </View>
        <View style={[styles.tableColone, { flexDirection: 'row', border: 1, borderBottom: 0, paddingLeft: '1%', paddingRight: '1%', backgroundColor: '#a4b494', fontFamily: 'ArialB', }]}>
          <Text>
            PROJECT LOCATION: {formData.projectLocationID?.street || 'No street available'}
          </Text>
        </View>
        <View style={[styles.tableColone, { flexDirection: 'row', border: 1, borderBottom: 0, paddingLeft: '1%', paddingRight: '1%', backgroundColor: '#a4b494', fontFamily: 'ArialB', }]}>
          <Text>
            PARTNER AGENCY:
            {formData.agency?.length 
              ? formData.agency.map((agencyItem, index) => (
                  <Text key={index}>
                    {agencyItem.agencyName}
                  </Text>
                )) 
              : 'No agencies available'}
          </Text>
        </View>
        <View style={[styles.tableColone, { flexDirection: 'row', border: 1, borderBottom: 0, paddingLeft: '1%', paddingRight: '1%', backgroundColor: '#a4b494', fontFamily: 'ArialB', }]}>
          <Text>
            BUDGET REQUIREMENT: {/* GET: Budget Requirement */}
          </Text>
        </View>
        <View style={[{ flexDirection: 'row', border: 1, borderBottom: 0, }]}>
          <View style={[styles.tableColthree, { borderRight: 1, paddingLeft: '1%', paddingRight: '1%', justifyContent: 'center', fontFamily: 'ArialB', }]}>
            <Text>
              USTP
            </Text>
          </View>
          <View style={[styles.tableColthree, { borderRight: 1, paddingLeft: '1%', paddingRight: '1%', justifyContent: 'center', fontFamily: 'ArialB', }]}>
            <Text>
              Partner Agency
            </Text>
          </View>
          <View style={[styles.tableColthree, { paddingLeft: '1%', paddingRight: '1%', justifyContent: 'center', fontFamily: 'ArialB', }]}>
            <Text>
              Total
            </Text>
          </View>
        </View>
        <View style={[{ flexDirection: 'row', border: 1, borderBottom: 0, }]}>
          <View style={[styles.tableColthree, { borderRight: 1, paddingLeft: '1%', paddingRight: '1%', justifyContent: 'center' }]}>
            <Text>
              {formData.ustpBudget}
            </Text>
          </View>
          <View style={[styles.tableColthree, { borderRight: 1, paddingLeft: '1%', paddingRight: '1%', justifyContent: 'center' }]}>
            <Text>
              {formData.partnerAgencyBudget}
            </Text>
          </View>
          <View style={[styles.tableColthree, { paddingLeft: '1%', paddingRight: '1%', justifyContent: 'center' }]}>
            <Text>
              {formData.totalBudget}
            </Text>
          </View>
        </View>
        <View style={[{ flexDirection: 'row', border: 1, borderBottom: 0, backgroundColor: '#a4b494', }]}>
          <View style={[{ width: '60%', borderRight: 1, paddingLeft: '1%', paddingRight: '1%', justifyContent: 'center', fontFamily: 'ArialB', }]}>
            <Text>
              TARGET DATE OF IMPLEMENTATION:
            </Text>
          </View>
          <View style={[{ width: '40%', paddingLeft: '1%', paddingRight: '1%', justifyContent: 'center', fontFamily: 'ArialB', }]}>
            <Text>
              TOTAL NUMBER OF HOURS:
            </Text>
          </View>
        </View>
        <View style={[{ flexDirection: 'row', border: 1, borderBottom: 0, }]}>
          <View style={[{ width: '60%', borderRight: 1, paddingLeft: '1%', paddingRight: '1%', justifyContent: 'center' }]}>
            <Text>
              {formData.targetImplementation}
            </Text>
          </View>
          <View style={[{ width: '40%', paddingLeft: '1%', paddingRight: '1%', justifyContent: 'center' }]}>
            <Text>
              {formData.totalHours}
            </Text>
          </View>
        </View>
        <View style={[{ border: 1, borderBottom: 0, paddingLeft: '20%', paddingRight: '20%', fontFamily: 'ArialB', }]}>
          <Text>
            Submitted by:
          </Text>
          <Text style={[{ textAlign: 'center', paddingTop: 5, textDecoration: 'underline', paddingBottom: 5, }]}>
            {`${formData.userID?.firstname} ${formData.userID?.lastname}`}
          </Text>
        </View>
        <View style={[{ border: 1, borderBottom: 0, paddingLeft: '1%', paddingRight: '1%', fontFamily: 'ArialB', }]}>
          <Text>
            Endorsed by:
          </Text>
          <View style={[{ flexDirection: 'row', paddingTop: '1%' }]}>
            <Text style={[{ flexDirection: 'row', width: '50%', textAlign: 'center', textDecoration: 'underline', }]}>
              * {/* GET: name of endorser1 */}
            </Text>
            <Text style={[{ flexDirection: 'row', width: '50%', textAlign: 'center', textDecoration: 'underline', }]}>
              * {/* GET:  name of endorder2 */}
            </Text>
          </View>
          <View style={[{ flexDirection: 'row', paddingBottom: '1%' }]}>
            <Text style={[{ flexDirection: 'row', width: '50%', textAlign: 'center', }]}>
              Program Chair
            </Text>
            <Text style={[{ flexDirection: 'row', width: '50%', textAlign: 'center', }]}>
              College Dean
            </Text>
          </View>
        </View>
        <View style={[{ border: 1, borderBottom: 0, paddingLeft: '1%', paddingRight: '1%' }]}>
          <Text style={{ fontFamily: 'ArialB', }}>
            Recommending Approval:
          </Text>
          <Text style={[{ textAlign: 'center', textDecoration: 'underline', paddingTop: '1%', fontFamily: 'ArialB', }]}>
            MARIA TERESA M. FRAJARDO. Ed.D. {/* GET: Direcctor of extension office name */}
          </Text>
          <Text style={[{ textAlign: 'center', }]}>
            Director, Extension & Community Relations
          </Text>
          <View style={[{ flexDirection: 'row', }]}>
            <Text style={[{ flexDirection: 'row', width: '50%', textAlign: 'center', textDecoration: 'underline', paddingTop: '1%', fontFamily: 'ArialB', }]}>
              JOCELYN B. BARBOSA  {/* GET: Vice - chansellor of accademic affairs */}
            </Text>
            <Text style={[{ flexDirection: 'row', width: '50%', textAlign: 'center', textDecoration: 'underline', paddingTop: '1%', fontFamily: 'ArialB', }]}>
              ENGR. ALEX L. MAUREAL {/* GET: vice chancellor for research and innovation */}
            </Text>
          </View>
          <View style={[{ flexDirection: 'row', paddingBottom: '5%' }]}>
            <Text style={[{ flexDirection: 'row', width: '50%', textAlign: 'center', }]}>
              Vice - Chancellor for Accademic Affairs
            </Text>
            <Text style={[{ flexDirection: 'row', width: '50%', textAlign: 'center', }]}>
              Vice - Chancellor for Research and Innovation
            </Text>
          </View>
        </View>
        <View style={[{ border: 1, paddingLeft: '1%', paddingRight: '1%' }]}>
          <Text style={[{ fontFamily: 'ArialB', }]}>
            Funds Available:
          </Text>
          <View style={[{ flexDirection: 'row', paddingTop: '1%' }]}>
            <Text style={[{ flexDirection: 'row', width: '50%', textAlign: 'center', textDecoration: 'underline', fontFamily: 'ArialB', }]}>
              CHERRY ANN S. VILLARTE. CPA  {/* GET: Accountant name */}
            </Text>
            <Text style={[{ flexDirection: 'row', width: '50%', textAlign: 'center', textDecoration: 'underline', fontFamily: 'ArialB', }]}>
              ATTY. DIONEL 0. ALBINA  {/* GET: Chancellor,, USTP CDO name */}
            </Text>
          </View>
          <View style={[{ flexDirection: 'row', paddingBottom: '5%' }]}>
            <Text style={[{ flexDirection: 'row', width: '50%', textAlign: 'center', }]}>
              Accountant III
            </Text>
            <Text style={[{ flexDirection: 'row', width: '50%', textAlign: 'center', }]}>
              Chancellor, USTP CDO
            </Text>
          </View>
        </View>
      </Page>

      {/* second page */}
      <Page style={styles.page}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <View style={[{ paddingRight: 5 }]}>
            <Image style={[styles.headerImage, { width: 60, height: 'auto' }]} src="/images/ustp_logo.png" />
          </View>
          <View style={{ paddingLeft: 5, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ textAlign: 'center', marginBottom: 2, fontFamily: 'Zapf', fontSize: 12 }}>
              University of Science and Technology of Southern Philippines
            </Text>
            <Text style={{ textAlign: 'center', marginBottom: 2, fontFamily: 'Zapf', fontSize: 7 }}>
              Alubijid | Cagayan de Oro | Claveria | Jasaan | Oroquieta | Panaon
            </Text>
          </View>
        </View>
        <View style={styles.right}>
          <View style={[{ width: '40%', flexDirection: 'row', border: 1, borderBottom: 0, justifyContent: 'center', backgroundColor: '#1A1851', }]}>
            <Text style={[{ color: '#fff', fontSize: 8, paddingTop: 2, paddingBottom: 2 }]}>
              Document Code No.
            </Text>
          </View>
        </View>
        <View style={styles.right}>
          <View style={[{ width: '40%', flexDirection: 'row', border: 1, borderBottom: 0, justifyContent: 'center', fontFamily: 'ArialB' }]}>
            <Text>
              FM-USTP-ECRD-01a {/* GET: Document Code No. Ex: FM-USTP-ECRD-01a*/}
            </Text>
          </View>
        </View>
        <View style={styles.right}>
          <View style={[{ width: '40%', flexDirection: 'row', border: 1, borderBottom: 0, }]}>
            <View style={[styles.tableColthree, { borderRight: 1, borderColor: '#000', justifyContent: 'center', backgroundColor: '#1A1851', }]}>
              <Text style={[{ color: '#fff', fontSize: 8, paddingTop: 2, paddingBottom: 2 }]}>
                Rev. No.
              </Text>
            </View>
            <View style={[styles.tableColthree, { borderRight: 1, borderColor: '#000', justifyContent: 'center', backgroundColor: '#1A1851', }]}>
              <Text style={[{ color: '#fff', fontSize: 8, paddingTop: 2, paddingBottom: 2 }]}>
                Effective Date
              </Text>
            </View>
            <View style={[styles.tableColthree, { justifyContent: 'center', backgroundColor: '#1A1851', }]}>
              <Text style={[{ color: '#fff', fontSize: 8, paddingTop: 2, paddingBottom: 2 }]}>
                Page No.
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.right}>
          <View style={[{ width: '40%', flexDirection: 'row', border: 1 }]}>;
            <View style={[styles.tableColthree, { borderRight: 1, borderColor: '#000', justifyContent: 'center', fontSize: 8, fontFamily: 'ArialB', paddingTop: 1, paddingBottom: 1 }]}>
              <Text>
                02  {/* GET: Revision Number */}
              </Text>
            </View>
            <View style={[styles.tableColthree, { borderRight: 1, borderColor: '#000', justifyContent: 'center', fontSize: 8, fontFamily: 'ArialB', paddingTop: 1, paddingBottom: 1 }]}>
              <Text>
                08.01.23  {/* GET: Effective Date of proposal */}
              </Text>
            </View>
            <View style={[styles.tableColthree, { justifyContent: 'center', fontSize: 8, fontFamily: 'ArialB', paddingTop: 1, paddingBottom: 1 }]}>
              <Text>
                2 {/* GET: Page number  */}
              </Text>
            </View>
          </View>
        </View>
        <View style={[{ justifyContent: 'center', alignItems: 'center', marginTop: '1%' }]}>
          <Text style={[{ fontSize: 13 }]}>
            Extension Project Proposal
          </Text>
        </View>
        <View style={[{ justifyContent: 'center', alignItems: 'center', marginTop: '1%', marginBottom: '1%' }]}>
          <Text>
            *
          </Text>
        </View>
        <Text style={[{ fontFamily: 'ArialB' }]}>
          I. Background of the Project
        </Text>
        <Text style={[{ padding: '1%' }]}>
          {formData.background}
        </Text>
        <Text style={[{ fontFamily: 'ArialB' }]}>
          II. Goals and Objectives of the Project
        </Text>
        <Text>
          Specifically, the objectives of the project are:
        </Text>
        <Text style={[{ padding: '1%', }]}>
          1. {formData.goalsAndObjectives?.length
            ? formData.goalsAndObjectives.map((gaoItem, index) => (
              <Text>
                {gaoItem.goalsAndObjectives}
              </Text>
            )) : <Text>No objectives available</Text>}
        </Text>
        <Text style={[{ fontFamily: 'ArialB' }]}>
          III. Project Component (i.e. Training Design and Content)
        </Text>
        <Text style={[{ padding: '1%' }]}>
          {formData.projectComponent}
        </Text>
        <Text style={[{ fontFamily: 'ArialB' }]}>
          IV. Project Implementation Plan and Management
        </Text>
        <Text style={[{ padding: '1%' }]}>
          A. Project Activities
        </Text>
        <View style={[{ flexDirection: 'row' }]}>
          <View style={[styles.tableColfour, { borderRight: 0, borderBottom: 0, }]}>
            <Text>
              Project Objective
            </Text>
          </View>
          <View style={[styles.tableColfour, { borderRight: 0, borderBottom: 0, }]}>
            <Text>
              Activities Involved
            </Text>
          </View>
          <View style={[styles.tableColfour, { borderRight: 0, borderBottom: 0, }]}>
            <Text>
              Target Date
            </Text>
          </View>
          <View style={[styles.tableColfour, { borderBottom: 0, }]}>
            <Text>
              Person Responsible
            </Text>
          </View>
        </View>
        <View style={[{ flexDirection: 'row' }]}>
          <View style={[styles.tableColfour, { borderRight: 0, borderBottom: 0, }]}>
            {formData.projectActivities?.length
                ? formData.projectActivities.map((activityItem, index) => (
                  <Text>
                    {activityItem.objective}
                  </Text>
                )) : 'No objectives available'
              }
          </View>
          <View style={[styles.tableColfour, { borderRight: 0, borderBottom: 0, }]}>
            {formData.projectActivities?.length
                ? formData.projectActivities.map((activityItem, index) => (
                  <Text>
                    {activityItem.involved}
                  </Text>
                )) : 'No activities involved available'
              }
          </View>
          <View style={[styles.tableColfour, { borderRight: 0, borderBottom: 0, }]}>
            {formData.projectActivities?.length
                ? formData.projectActivities.map((activityItem, index) => (
                  <Text>
                    {activityItem.targetDate}
                  </Text>
                )) : 'No target date available'
              }
          </View>
          <View style={[styles.tableColfour, { borderBottom: 0, }]}>
            {formData.projectActivities?.length
                ? formData.projectActivities.map((activityItem, index) => (
                  <Text>
                    {activityItem.personResponsible}
                  </Text>
                )) : 'No person responsible available'
              }
          </View>
        </View>
        <View style={[{ flexDirection: 'row' }]}>
          <View style={[styles.tableColfour, { borderRight: 0, }]}>
            <Text>
              *
            </Text>
          </View>
          <View style={[styles.tableColfour, { borderRight: 0, }]}>
            <Text>
              *
            </Text>
          </View>
          <View style={[styles.tableColfour, { borderRight: 0, }]}>
            <Text>
              *
            </Text>
          </View>
          <View style={styles.tableColfour}>
            <Text>
              *
            </Text>
          </View>
        </View>
        <Text style={[{ padding: '1%' }]}>
          B. Project Location and Beneficiaries
        </Text>
        <Text style={[{ padding: '1%' }]}>
          {formData.targetScope}
        </Text>
        <Text style={[{ padding: '1%' }]}>
          C. Project Management Team/Trainer
        </Text>
        <Text style={[{ padding: '1%' }]}>
          {formData.projectManagementTeam?.length
                ? formData.projectManagementTeam.map((teamItem, index) => (
                  <Text>
                    {teamItem.name}
                  </Text>
                )) : 'No person responsible available'
              }
        </Text>
        <Text style={[{ fontFamily: 'ArialB', marginBottom: '1%' }]}>
          V. Budgetary Requirements
        </Text>
        <View style={[{ flexDirection: 'row', }]}>
          <View style={[styles.tableColthree, { border: 1, borderRight: 0, borderBottom: 0, }]}>
            <Text>
              Item
            </Text>
          </View>
          <View style={[styles.tableColthree, { border: 1, borderRight: 0, borderBottom: 0, }]}>
            <Text style={[{ borderBottom: 1 }]}>
              Amount
            </Text>
            <View style={[{ flexDirection: 'row' }]}>
              <View style={[styles.tableColtwo, { borderRight: 1 }]}>
                <Text>
                  USTP
                </Text>
              </View>
              <View style={[styles.tableColtwo, {}]}>
                <Text>
                  Partner Agency
                </Text>
              </View>
            </View>
          </View>
          <View style={[styles.tableColthree, { border: 1, borderBottom: 0, }]}>
            <Text>
              Total Amount
            </Text>
          </View>
        </View>
        <View style={[{ flexDirection: 'row' }]}>
          <View style={[styles.tableColthree, { border: 1, borderRight: 0, borderBottom: 0, }]}>
            <Text>
              Honorarium
            </Text>
          </View>
          <View style={[styles.tableColthree, { border: 1, borderRight: 0, borderBottom: 0, }]}>
            <View style={[{ flexDirection: 'row' }]}>
              <View style={[styles.tableColtwo, { borderRight: 1 }]}>
                {formData.budgetRequirements?.length
                    ? formData.budgetRequirements.map((budgetItem, index) => (
                      <Text>
                        {budgetItem.ustpAmount}
                      </Text>
                    )) : ''
                  }
              </View>
              <View style={[styles.tableColtwo, {}]}>
                {formData.budgetRequirements?.length
                    ? formData.budgetRequirements.map((budgetItem, index) => (
                      <Text>
                        {budgetItem.partnerAmount}
                      </Text>
                    )) : ''
                  }
              </View>
            </View>
          </View>
          <View style={[styles.tableColthree, { border: 1, borderBottom: 0, }]}>
            {formData.budgetRequirements?.length
                ? formData.budgetRequirements.map((budgetItem, index) => (
                  <Text>
                    {budgetItem.totalAmount}
                  </Text>
                )) : ''
              }
          </View>
        </View>
        <View style={[{ flexDirection: 'row' }]}>
          <View style={[styles.tableColthree, { border: 1, borderRight: 0, borderBottom: 0, }]}>
            <Text>
              Supplies and Materials
            </Text>
          </View>
          <View style={[styles.tableColthree, { border: 1, borderRight: 0, borderBottom: 0, }]}>
            <View style={[{ flexDirection: 'row' }]}>
              <View style={[styles.tableColtwo, { borderRight: 1 }]}>
                <Text>
                  *
                </Text>
              </View>
              <View style={[styles.tableColtwo, {}]}>
                <Text>
                  *
                </Text>
              </View>
            </View>
          </View>
          <View style={[styles.tableColthree, { border: 1, borderBottom: 0, }]}>
            <Text>
              *
            </Text>
          </View>
        </View>
        <View style={[{ flexDirection: 'row' }]}>
          <View style={[styles.tableColthree, { border: 1, borderRight: 0, borderBottom: 0, }]}>
            <Text>
              Trace Allowance
            </Text>
          </View>
          <View style={[styles.tableColthree, { border: 1, borderRight: 0, borderBottom: 0, }]}>
            <View style={[{ flexDirection: 'row' }]}>
              <View style={[styles.tableColtwo, { borderRight: 1 }]}>
                <Text>
                  *
                </Text>
              </View>
              <View style={[styles.tableColtwo, {}]}>
                <Text>
                  *
                </Text>
              </View>
            </View>
          </View>
          <View style={[styles.tableColthree, { border: 1, borderBottom: 0, }]}>
            <Text>
              *
            </Text>
          </View>
        </View>
        <View style={[{ flexDirection: 'row', marginBottom: '1%' }]}>
          <View style={[styles.tableColthree, { border: 1, borderRight: 0, }]}>
            <Text>

            </Text>
          </View>
          <View style={[styles.tableColthree, { borderTop: 1, borderBottom: 1, }]}>
            <View style={[{ flexDirection: 'row' }]}>
              <View style={[styles.tableColtwo, {}]}>
                <Text>

                </Text>
              </View>
              <View style={[styles.tableColtwo, {}]}>
                <Text>
                  Total Budget
                </Text>
              </View>
            </View>
          </View>
          <View style={[styles.tableColthree, { border: 1, }]}>
            <Text>
              *
            </Text>
          </View>
        </View>
        <Text style={[{ fontFamily: 'ArialB' }]}>
          VI. Project Evaluation and Monitoring
        </Text>
        <Text>
          Log Frame for the Project
        </Text>
        <View style={[{ flexDirection: 'row', textAlign: 'center' }]}>
          <View style={[styles.tableColfive, { borderRight: 0, borderBottom: 0, }]}>
            <Text>

            </Text>
          </View>
          <View style={[styles.tableColfive, { borderRight: 0, borderBottom: 0, }]}>
            <Text>
              Project Summary
            </Text>
          </View>
          <View style={[styles.tableColfive, { borderRight: 0, borderBottom: 0, }]}>
            <Text>
              Indicators
            </Text>
          </View>
          <View style={[styles.tableColfive, { borderRight: 0, borderBottom: 0, }]}>
            <Text>
              Means of Verification
            </Text>
          </View>
          <View style={[styles.tableColfive, { borderBottom: 0, }]}>
            <Text>
              Risks/Assumptions
            </Text>
          </View>
        </View>
        <View style={[{ flexDirection: 'row' }]}>
          <View style={[styles.tableColfive, { borderRight: 0, borderBottom: 0, }]}>
            <Text>
              Goal
            </Text>
          </View>
          <View style={[styles.tableColfive, { borderRight: 0, borderBottom: 0, }]}>
            {formData.evaluationAndMonitorings?.length
                ? formData.evaluationAndMonitorings.map((evalItem, index) => (
                  evalItem.type === "Goal" && (
                    <Text key={index}>
                      {evalItem.projectSummary}
                    </Text>
                  )
                )) : ''
              }
          </View>
          <View style={[styles.tableColfive, { borderRight: 0, borderBottom: 0, }]}>
            {formData.evaluationAndMonitorings?.length
                ? formData.evaluationAndMonitorings.map((evalItem, index) => (
                  evalItem.type === "Goal" && (
                    <Text key={index}>
                      {evalItem.indicators}
                    </Text>
                  )
                )) : ''
              }
          </View>
          <View style={[styles.tableColfive, { borderRight: 0, borderBottom: 0, }]}>
            {formData.evaluationAndMonitorings?.length
                ? formData.evaluationAndMonitorings.map((evalItem, index) => (
                  evalItem.type === "Goal" && (
                    <Text key={index}>
                      {evalItem.meansOfVerification}
                    </Text>
                  )
                )) : ''
              }
          </View>
          <View style={[styles.tableColfive, { borderBottom: 0, }]}>
            {formData.evaluationAndMonitorings?.length
                ? formData.evaluationAndMonitorings.map((evalItem, index) => (
                  evalItem.type === "Goal" && (
                    <Text key={index}>
                      {evalItem.risksAssumptions}
                    </Text>
                  )
                )) : ''
              }
          </View>
        </View>
        <View style={[{ flexDirection: 'row' }]}>
          <View style={[styles.tableColfive, { borderRight: 0, borderBottom: 0, }]}>
            <Text>
              Outcome
            </Text>
          </View>
          <View style={[styles.tableColfive, { borderRight: 0, borderBottom: 0, }]}>
          {formData.evaluationAndMonitorings?.length
                ? formData.evaluationAndMonitorings.map((evalItem, index) => (
                  evalItem.type === "Outcome" && (
                    <Text key={index}>
                      {evalItem.projectSummary}
                    </Text>
                  )
                )) : ''
              }
          </View>
          <View style={[styles.tableColfive, { borderRight: 0, borderBottom: 0, }]}>
            {formData.evaluationAndMonitorings?.length
                ? formData.evaluationAndMonitorings.map((evalItem, index) => (
                  evalItem.type === "Outcome" && (
                    <Text key={index}>
                      {evalItem.indicators}
                    </Text>
                  )
                )) : ''
              }
          </View>
          <View style={[styles.tableColfive, { borderRight: 0, borderBottom: 0, }]}>
            {formData.evaluationAndMonitorings?.length
                ? formData.evaluationAndMonitorings.map((evalItem, index) => (
                  evalItem.type === "Outcome" && (
                    <Text key={index}>
                      {evalItem.meansOfVerification}
                    </Text>
                  )
                )) : ''
              }
          </View>
          <View style={[styles.tableColfive, { borderBottom: 0, }]}>
            {formData.evaluationAndMonitorings?.length
                ? formData.evaluationAndMonitorings.map((evalItem, index) => (
                  evalItem.type === "Outcome" && (
                    <Text key={index}>
                      {evalItem.risksAssumptions}
                    </Text>
                  )
                )) : ''
              }
          </View>
        </View>
        <View style={[{ flexDirection: 'row' }]}>
          <View style={[styles.tableColfive, { borderRight: 0, borderBottom: 0, }]}>
            <Text>
              Outputs
            </Text>
          </View>
          <View style={[styles.tableColfive, { borderRight: 0, borderBottom: 0, }]}>
            {formData.evaluationAndMonitorings?.length
                ? formData.evaluationAndMonitorings.map((evalItem, index) => (
                  evalItem.type === "Outputs" && (
                    <Text key={index}>
                      {evalItem.projectSummary}
                    </Text>
                  )
                )) : ''
              }
          </View>
          <View style={[styles.tableColfive, { borderRight: 0, borderBottom: 0, }]}>
            {formData.evaluationAndMonitorings?.length
                ? formData.evaluationAndMonitorings.map((evalItem, index) => (
                  evalItem.type === "Outputs" && (
                    <Text key={index}>
                      {evalItem.indicators}
                    </Text>
                  )
                )) : ''
              }
          </View>
          <View style={[styles.tableColfive, { borderRight: 0, borderBottom: 0, }]}>
           {formData.evaluationAndMonitorings?.length
                ? formData.evaluationAndMonitorings.map((evalItem, index) => (
                  evalItem.type === "Outputs" && (
                    <Text key={index}>
                      {evalItem.meansOfVerification}
                    </Text>
                  )
                )) : ''
              }
          </View>
          <View style={[styles.tableColfive, { borderBottom: 0, }]}>
            {formData.evaluationAndMonitorings?.length
                ? formData.evaluationAndMonitorings.map((evalItem, index) => (
                  evalItem.type === "Outputs" && (
                    <Text key={index}>
                      {evalItem.risksAssumptions}
                    </Text>
                  )
                )) : ''
              }
          </View>
        </View>
        <View style={[{ flexDirection: 'row' , marginBottom: 10}]}>
          <View style={[styles.tableColfive, { borderRight: 0, }]}>
            <Text>
              Activities
            </Text>
          </View>
          <View style={[styles.tableColfive, { borderRight: 0, }]}>
            {formData.evaluationAndMonitorings?.length
                ? formData.evaluationAndMonitorings.map((evalItem, index) => (
                  evalItem.type === "Activities" && (
                    <Text key={index}>
                      {evalItem.projectSummary}
                    </Text>
                  )
                )) : ''
              }
          </View>
          <View style={[styles.tableColfive, { borderRight: 0, }]}>
           {formData.evaluationAndMonitorings?.length
                ? formData.evaluationAndMonitorings.map((evalItem, index) => (
                  evalItem.type === "Activities" && (
                    <Text key={index}>
                      {evalItem.indicators}
                    </Text>
                  )
                )) : ''
              }
          </View>
          <View style={[styles.tableColfive, { borderRight: 0, }]}>
            {formData.evaluationAndMonitorings?.length
                ? formData.evaluationAndMonitorings.map((evalItem, index) => (
                  evalItem.type === "Activities" && (
                    <Text key={index}>
                      {evalItem.meansOfVerification}
                    </Text>
                  )
                )) : ''
              }
          </View>
          <View style={[styles.tableColfive, { }]}>
            {formData.evaluationAndMonitorings?.length
                ? formData.evaluationAndMonitorings.map((evalItem, index) => (
                  evalItem.type === "Activities" && (
                    <Text key={index}>
                      {evalItem.risksAssumptions}
                    </Text>
                  )
                )) : ''
              }
          </View>
        </View>
        <Text style={[{ fontFamily: 'ArialB' }]}>
          Monitoring and Plan Schedule
        </Text>
        <View style={[{ flexDirection: 'row', textAlign: 'center' }]}>
          <View style={[styles.tableColfour, { borderRight: 0, borderBottom: 0, }]}>
            <Text>
              Monitoring Phase
            </Text>
          </View>
          <View style={[styles.tableColfour, { borderRight: 0, borderBottom: 0, }]}>
            <Text>
              M & E Instrument/Approach
            </Text>
          </View>
          <View style={[styles.tableColfour, { borderRight: 0, borderBottom: 0, }]}>
            <Text>
              Format or Strategy for Data Gathering
            </Text>
          </View>
          <View style={[styles.tableColfour, { borderBottom: 0, }]}>
            <Text>
              Schedule *As agreed with community/organization partner
            </Text>
          </View>
        </View>
        <View style={[{ flexDirection: 'row' }]}>
          <View style={[styles.tableColfour, { borderRight: 0, borderBottom: 0, }]}>
            <Text>
              Before Project
            </Text>
            <Text>
              Implementation
            </Text>
          </View>
          <View style={[styles.tableColfour, { borderRight: 0, borderBottom: 0, }]}>
            {formData.monitoringPlanSchedules?.length
                ? formData.monitoringPlanSchedules.map((monitorItem, index) => (
                  monitorItem.implementationPhase === "Before Project Implementation" && (
                    <Text key={index}>
                      {monitorItem.approach}
                    </Text>
                  )
                )) : ''
              }
          </View>
          <View style={[styles.tableColfour, { borderRight: 0, borderBottom: 0, }]}>
            {formData.monitoringPlanSchedules?.length
                ? formData.monitoringPlanSchedules.map((monitorItem, index) => (
                  monitorItem.implementationPhase === "Before Project Implementation" && (
                    <Text key={index}>
                      {monitorItem.dataGatheringStrategy}
                    </Text>
                  )
                )) : ''
              }
          </View>
          <View style={[styles.tableColfour, { borderBottom: 0, }]}>
            {formData.monitoringPlanSchedules?.length
                ? formData.monitoringPlanSchedules.map((monitorItem, index) => (
                  monitorItem.implementationPhase === "Before Project Implementation" && (
                    <Text key={index}>
                      {monitorItem.schedule}
                    </Text>
                  )
                )) : ''
              }
          </View>
        </View>
        <View style={[{ flexDirection: 'row' }]}>
          <View style={[styles.tableColfour, { borderRight: 0, borderBottom: 0, }]}>
            <Text>
              During Project
            </Text>
            <Text>
              Implementation
            </Text>
          </View>
          <View style={[styles.tableColfour, { borderRight: 0, borderBottom: 0, }]}>
            {formData.monitoringPlanSchedules?.length
                ? formData.monitoringPlanSchedules.map((monitorItem, index) => (
                  monitorItem.implementationPhase === "During Project Implementation" && (
                    <Text key={index}>
                      {monitorItem.approach}
                    </Text>
                  )
                )) : ''
              }
          </View>
          <View style={[styles.tableColfour, { borderRight: 0, borderBottom: 0, }]}>
          {formData.monitoringPlanSchedules?.length
                ? formData.monitoringPlanSchedules.map((monitorItem, index) => (
                  monitorItem.implementationPhase === "During Project Implementation" && (
                    <Text key={index}>
                      {monitorItem.dataGatheringStrategy}
                    </Text>
                  )
                )) : ''
              }
          </View>
          <View style={[styles.tableColfour, { borderBottom: 0, }]}>
          {formData.monitoringPlanSchedules?.length
                ? formData.monitoringPlanSchedules.map((monitorItem, index) => (
                  monitorItem.implementationPhase === "During Project Implementation" && (
                    <Text key={index}>
                      {monitorItem.schedule}
                    </Text>
                  )
                )) : ''
              }
          </View>
        </View>
        <View style={[{ flexDirection: 'row' }]}>
          <View style={[styles.tableColfour, { borderRight: 0,}]}>
            <Text>
              After Project
            </Text>
            <Text>
              Implementation
            </Text>
          </View>
          <View style={[styles.tableColfour, { borderRight: 0,}]}>
            {formData.monitoringPlanSchedules?.length
                ? formData.monitoringPlanSchedules.map((monitorItem, index) => (
                  monitorItem.implementationPhase === "After Project Implementation" && (
                    <Text key={index}>
                      {monitorItem.approach}
                    </Text>
                  )
                )) : ''
              }
          </View>
          <View style={[styles.tableColfour, { borderRight: 0,}]}>
            {formData.monitoringPlanSchedules?.length
                ? formData.monitoringPlanSchedules.map((monitorItem, index) => (
                  monitorItem.implementationPhase === "After Project Implementation" && (
                    <Text key={index}>
                      {monitorItem.dataGatheringStrategy}
                    </Text>
                  )
                )) : ''
              }
          </View>
          <View style={[styles.tableColfour, {}]}>
            {formData.monitoringPlanSchedules?.length
                ? formData.monitoringPlanSchedules.map((monitorItem, index) => (
                  monitorItem.implementationPhase === "After Project Implementation" && (
                    <Text key={index}>
                      {monitorItem.schedule}
                    </Text>
                  )
                )) : ''
              }
          </View>
        </View>
        <Text style={[{marginTop: 10, color: '#FF0000'}]}>
          Please attach monitoring tools
        </Text>
      </Page>

      {/* Third page */}
      <Page style={styles.page}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <View style={[{ paddingRight: 5 }]}>
            <Image style={[styles.headerImage, { width: 60, height: 'auto' }]} src="/images/ustp_logo.png" />
          </View>
          <View style={{ paddingLeft: 5, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ textAlign: 'center', marginBottom: 2, fontFamily: 'Zapf', fontSize: 12 }}>
              University of Science and Technology of Southern Philippines
            </Text>
            <Text style={{ textAlign: 'center', marginBottom: 2, fontFamily: 'Zapf', fontSize: 7 }}>
              Alubijid | Cagayan de Oro | Claveria | Jasaan | Oroquieta | Panaon
            </Text>
          </View>
        </View>
        <View style={styles.right}>
          <View style={[{ width: '40%', flexDirection: 'row', border: 1, borderBottom: 0, justifyContent: 'center', backgroundColor: '#1A1851', }]}>
            <Text style={[{ color: '#fff', fontSize: 8, paddingTop: 2, paddingBottom: 2 }]}>
              Document Code No.
            </Text>
          </View>
        </View>
        <View style={styles.right}>
          <View style={[{ width: '40%', flexDirection: 'row', border: 1, borderBottom: 0, justifyContent: 'center', fontFamily: 'ArialB' }]}>
            <Text>
              FM-USTP-ECRD-01a {/* GET: Document Code No. Ex: FM-USTP-ECRD-01a*/}
            </Text>
          </View>
        </View>
        <View style={styles.right}>
          <View style={[{ width: '40%', flexDirection: 'row', border: 1, borderBottom: 0, }]}>
            <View style={[styles.tableColthree, { borderRight: 1, borderColor: '#000', justifyContent: 'center', backgroundColor: '#1A1851', }]}>
              <Text style={[{ color: '#fff', fontSize: 8, paddingTop: 2, paddingBottom: 2 }]}>
                Rev. No.
              </Text>
            </View>
            <View style={[styles.tableColthree, { borderRight: 1, borderColor: '#000', justifyContent: 'center', backgroundColor: '#1A1851', }]}>
              <Text style={[{ color: '#fff', fontSize: 8, paddingTop: 2, paddingBottom: 2 }]}>
                Effective Date
              </Text>
            </View>
            <View style={[styles.tableColthree, { justifyContent: 'center', backgroundColor: '#1A1851', }]}>
              <Text style={[{ color: '#fff', fontSize: 8, paddingTop: 2, paddingBottom: 2 }]}>
                Page No.
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.right}>
          <View style={[{ width: '40%', flexDirection: 'row', border: 1 }]}>;
            <View style={[styles.tableColthree, { borderRight: 1, borderColor: '#000', justifyContent: 'center', fontSize: 8, fontFamily: 'ArialB', paddingTop: 1, paddingBottom: 1 }]}>
              <Text>
                02  {/* GET: Revision Number */}
              </Text>
            </View>
            <View style={[styles.tableColthree, { borderRight: 1, borderColor: '#000', justifyContent: 'center', fontSize: 8, fontFamily: 'ArialB', paddingTop: 1, paddingBottom: 1 }]}>
              <Text>
                08.01.23  {/* GET: Effective Date of proposal */}
              </Text>
            </View>
            <View style={[styles.tableColthree, { justifyContent: 'center', fontSize: 8, fontFamily: 'ArialB', paddingTop: 1, paddingBottom: 1 }]}>
              <Text>
                3 {/* GET: Page number  */}
              </Text>
            </View>
          </View>
        </View>
        <View style={[{ justifyContent: 'center', alignItems: 'center', marginTop: '1%' }]}>
          <Text style={[{ fontSize: 10, fontFamily: 'ArialB' }]}>
            LOADING OF TRAINERS FOR EXTENSION SERVICES
          </Text>
        </View>
        <Text style={[{ paddingtop: '2%' }]}>
          Project Title
        </Text>
        <Text style={[{ paddingBottom: '2%' }]}>
          Partner Agency
        </Text>
        <View style={[{ flexDirection: 'row', textAlign: 'center', backgroundColor: '#DCDCDC'}]}>
          <View style={[styles.tableColfive, { borderRight: 0, borderBottom: 0, }]}>
            <Text>
              Name of Faculty
            </Text>
          </View>
          <View style={[styles.tableColfive, { borderRight: 0, borderBottom: 0, }]}>
            <Text>
              Training Load
            </Text>
          </View>
          <View style={[styles.tableColfive, { borderRight: 0, borderBottom: 0, }]}>
            <Text>
              No. of Hours
            </Text>
          </View>
          <View style={[styles.tableColfive, { borderRight: 0, borderBottom: 0, }]}>
            <Text style={[{ borderBottom: 1 }]}>
              Budget
            </Text>
            <View style={[{ flexDirection: 'row' }]}>
              <View style={[styles.tableColtwo, { borderRight: 1 }]}>
                <Text>
                  USTP
                </Text>
              </View>
              <View style={[styles.tableColtwo, {}]}>
                <Text>
                  Partner Agency
                </Text>
              </View>
            </View>
          </View>
          <View style={[styles.tableColfive, { borderBottom: 0, }]}>
            <Text>
              Total Budgetary Requirement
            </Text>
          </View>
        </View>
        <View style={[{ flexDirection: 'row' }]}>
          <View style={[styles.tableColthree, { border: 1, borderRight: 0, borderBottom: 0, }]}>
            <Text>
              
            </Text>
          </View>
          <View style={[styles.tableColthree, { border: 1, borderRight: 0, borderBottom: 0, }]}>
            <Text>
              *
            </Text>
          </View>
          <View style={[styles.tableColthree, { border: 1, borderRight: 0, borderBottom: 0, }]}>
            <Text>
              *
            </Text>
          </View>
          <View style={[styles.tableColthree, { border: 1, borderRight: 0, borderBottom: 0, }]}>
            <View style={[{ flexDirection: 'row' }]}>
              <View style={[styles.tableColtwo, { borderRight: 1 }]}>
                <Text>
                  *
                </Text>
              </View>
              <View style={[styles.tableColtwo, {}]}>
                <Text>
                  *
                </Text>
              </View>
            </View>
          </View>
          <View style={[styles.tableColthree, { border: 1, borderBottom: 0, }]}>
            <Text>
              *
            </Text>
          </View>
        </View>
        <View style={[{ flexDirection: 'row' }]}>
          <View style={[styles.tableColthree, { border: 1, borderRight: 0, borderBottom: 0, }]}>
            <Text>
              *
            </Text>
          </View>
          <View style={[styles.tableColthree, { border: 1, borderRight: 0, borderBottom: 0, }]}>
            <Text>
              *
            </Text>
          </View>
          <View style={[styles.tableColthree, { border: 1, borderRight: 0, borderBottom: 0, }]}>
            <Text>
              *
            </Text>
          </View>
          <View style={[styles.tableColthree, { border: 1, borderRight: 0, borderBottom: 0, }]}>
            <View style={[{ flexDirection: 'row' }]}>
              <View style={[styles.tableColtwo, { borderRight: 1 }]}>
                <Text>
                  *
                </Text>
              </View>
              <View style={[styles.tableColtwo, {}]}>
                <Text>
                  *
                </Text>
              </View>
            </View>
          </View>
          <View style={[styles.tableColthree, { border: 1, borderBottom: 0, }]}>
            <Text>
              *
            </Text>
          </View>
        </View>
        <View style={[{ flexDirection: 'row', marginBottom: '1%' }]}>
          <View style={[styles.tableColfive, { border: 1, borderRight: 0, }]}>
            <Text>

            </Text>
          </View>
          <View style={[styles.tableColfive, { border: 1, borderRight: 0, borderLeft: 0 }]}>
            <Text>

            </Text>
          </View>
          <View style={[styles.tableColfive, { border: 1, borderRight: 0, borderLeft: 0 }]}>
            <Text>

            </Text>
          </View>
          <View style={[styles.tableColfive, { borderTop: 1, borderBottom: 1, borderRight: 0, borderLeft: 0 }]}>
            <View style={[{ flexDirection: 'row', }]}>
              <View style={[styles.tableColtwo, {}]}>
                <Text>

                </Text>
              </View>
              <View style={[styles.tableColtwo, {}]}>
                <Text>
                  Total
                </Text>
              </View>
            </View>
          </View>
          <View style={[styles.tableColfive, { border: 1, }]}>
            <Text>
              *
            </Text>
          </View>
        </View>
        <Text style={[{ fontFamily: 'ArialB' }]}>
          Prepared by:
        </Text>
        <Text style={[{ padding: '1%' }]}>
          *
        </Text>
        <Text style={[{ padding: '1%' }]}>
          *
        </Text>
        <Text style={[{ fontFamily: 'ArialB' }]}>
          Approved:
        </Text>
        <Text style={[{ padding: '1%' }]}>
          *
        </Text>
        <Text style={[{ padding: '1%' }]}>
          College Dean
        </Text>
      </Page>
    </Document>
  );
}

export default MyDocument;
