import React, { useEffect, useState } from 'react';
import { Document, Page, View, Text, Image, StyleSheet, Font } from '@react-pdf/renderer';
import axios from 'axios';

Font.register({
  family: 'Arial',
  src: '/fonts/arial.TTF',
});
Font.register({
  family: 'ArialB',
  src: '/fonts/arialb.TTF',
});
Font.register({
  family: 'Zapf',
  src: '/fonts/zapf.ttf',
});

const InlineHeaderProjectProposal = ({ dateCreated, documentCode = 'FM-USTP-ECRD-01a', revisionNo = '02' }) => {
  return (
    <>
      <View style={[{ position: 'fixed', top: 0 }]}>
        {/* Main Header */}
        <View style={[styles.headerContainer]}>
          <View style={[styles.logoContainer, { width: 60 }]}>
            <Image style={styles.logo} src="/images/ustp_logo.png" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.universityName}>
              University of Science and Technology of Southern Philippines
            </Text>
            <Text style={styles.campuses}>
              Alubijid | Balubal | Cagayan de Oro | Claveria | Jasaan | Oroquieta | Panaon | Villanueva
            </Text>
          </View>
        </View>
        {/* Document Code Section */}
        <View style={styles.right}>
          <View
            style={[
              {
                width: '40%',
                flexDirection: 'row',
                border: 1,
                borderBottom: 0,
                justifyContent: 'center',
                backgroundColor: '#1A1851',
              },
            ]}
          >
            <Text style={[{ color: '#fff', fontSize: 8, paddingTop: 2, paddingBottom: 2 }]}>
              Document Code No.
            </Text>
          </View>
        </View>
        <View style={styles.right}>
          <View
            style={[
              {
                width: '40%',
                flexDirection: 'row',
                border: 1,
                borderBottom: 0,
                justifyContent: 'center',
                fontFamily: 'ArialB',
              },
            ]}
          >
            <Text>{documentCode}</Text>
          </View>
        </View>
        {/* Revision and Effective Date Section */}
        <View style={styles.right}>
          <View
            style={[
              {
                width: '40%',
                flexDirection: 'row',
                border: 1,
                borderBottom: 0,
              },
            ]}
          >
            <View
              style={[
                styles.tableColthree,
                {
                  borderRight: 1,
                  borderColor: '#000',
                  justifyContent: 'center',
                  backgroundColor: '#1A1851',
                },
              ]}
            >
              <Text style={[{ color: '#fff', fontSize: 8, paddingTop: 2, paddingBottom: 2 }]}>
                Rev. No.
              </Text>
            </View>
            <View
              style={[
                styles.tableColthree,
                {
                  borderRight: 1,
                  borderColor: '#000',
                  justifyContent: 'center',
                  backgroundColor: '#1A1851',
                },
              ]}
            >
              <Text style={[{ color: '#fff', fontSize: 8, paddingTop: 2, paddingBottom: 2 }]}>
                Effective Date
              </Text>
            </View>
            <View
              style={[
                styles.tableColthree,
                {
                  justifyContent: 'center',
                  backgroundColor: '#1A1851',
                },
              ]}
            >
              <Text style={[{ color: '#fff', fontSize: 8, paddingTop: 2, paddingBottom: 2 }]}>
                Page No.
              </Text>
            </View>
          </View>
        </View>
        {/* Revision Number, Effective Date, and Pagination */}
        <View style={styles.right}>
          <View
            style={[
              {
                width: '40%',
                flexDirection: 'row',
                border: 1,
              },
            ]}
          >
            <View
              style={[
                styles.tableColthree,
                {
                  borderRight: 1,
                  borderColor: '#000',
                  justifyContent: 'center',
                  fontSize: 8,
                  fontFamily: 'ArialB',
                  paddingTop: 1,
                  paddingBottom: 1,
                },
              ]}
            >
              <Text>{revisionNo}</Text>
            </View>
            <View
              style={[
                styles.tableColthree,
                {
                  borderRight: 1,
                  borderColor: '#000',
                  justifyContent: 'center',
                  fontSize: 8,
                  fontFamily: 'ArialB',
                  paddingTop: 1,
                  paddingBottom: 1,
                },
              ]}
            >
              {/* <Text>{dateCreated.substring(0, 10)}</Text> */}
              <Text>08.01.23</Text>
            </View>
            <View
              style={[
                styles.tableColthree,
                {
                  justifyContent: 'center',
                  fontSize: 8,
                  fontFamily: 'ArialB',
                  paddingTop: 1,
                  paddingBottom: 1,
                },
              ]}
            >
              <Text render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages - 1}`} />
            </View>
          </View>
        </View>
      </View>

    </>
  );
};

const InlineHeaderLoadingofTrainers = ({ dateCreated, documentCode = 'FM-USTP-ECRD-02', revisionNo = '02' }) => {
  return (
    <>
      {/* Main Header */}
      <View style={styles.headerContainer}>
        <View style={[styles.logoContainer, { width: 60 }]}>
          <Image style={styles.logo} src="/images/ustp_logo.png" />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.universityName}>
            University of Science and Technology of Southern Philippines
          </Text>
          <Text style={styles.campuses}>
            Alubijid | Balubal | Cagayan de Oro | Claveria | Jasaan | Oroquieta | Panaon | Villanueva
          </Text>
        </View>
      </View>
      {/* Document Code Section */}
      <View style={styles.right}>
        <View
          style={[
            {
              width: '40%',
              flexDirection: 'row',
              border: 1,
              borderBottom: 0,
              justifyContent: 'center',
              backgroundColor: '#1A1851',
            },
          ]}
        >
          <Text style={[{ color: '#fff', fontSize: 8, paddingTop: 2, paddingBottom: 2 }]}>
            Document Code No.
          </Text>
        </View>
      </View>
      <View style={styles.right}>
        <View
          style={[
            {
              width: '40%',
              flexDirection: 'row',
              border: 1,
              borderBottom: 0,
              justifyContent: 'center',
              fontFamily: 'ArialB',
            },
          ]}
        >
          <Text>{documentCode}</Text>
        </View>
      </View>

      {/* Revision and Effective Date Section */}
      <View style={styles.right}>
        <View
          style={[
            {
              width: '40%',
              flexDirection: 'row',
              border: 1,
              borderBottom: 0,
            },
          ]}
        >
          <View
            style={[
              styles.tableColthree,
              {
                borderRight: 1,
                borderColor: '#000',
                justifyContent: 'center',
                backgroundColor: '#1A1851',
              },
            ]}
          >
            <Text style={[{ color: '#fff', fontSize: 8, paddingTop: 2, paddingBottom: 2 }]}>
              Rev. No.
            </Text>
          </View>
          <View
            style={[
              styles.tableColthree,
              {
                borderRight: 1,
                borderColor: '#000',
                justifyContent: 'center',
                backgroundColor: '#1A1851',
              },
            ]}
          >
            <Text style={[{ color: '#fff', fontSize: 8, paddingTop: 2, paddingBottom: 2 }]}>
              Effective Date
            </Text>
          </View>
          <View
            style={[
              styles.tableColthree,
              {
                justifyContent: 'center',
                backgroundColor: '#1A1851',
              },
            ]}
          >
            <Text style={[{ color: '#fff', fontSize: 8, paddingTop: 2, paddingBottom: 2 }]}>
              Page No.
            </Text>
          </View>
        </View>
      </View>

      {/* Revision Number, Effective Date, and Pagination */}
      <View style={styles.right}>
        <View
          style={[
            {
              width: '40%',
              flexDirection: 'row',
              border: 1,
            },
          ]}
        >
          <View
            style={[
              styles.tableColthree,
              {
                borderRight: 1,
                borderColor: '#000',
                justifyContent: 'center',
                fontSize: 8,
                fontFamily: 'ArialB',
                paddingTop: 1,
                paddingBottom: 1,
              },
            ]}
          >
            <Text>{revisionNo}</Text>
          </View>
          <View
            style={[
              styles.tableColthree,
              {
                borderRight: 1,
                borderColor: '#000',
                justifyContent: 'center',
                fontSize: 8,
                fontFamily: 'ArialB',
                paddingTop: 1,
                paddingBottom: 1,
              },
            ]}
          >
            {/* <Text>{dateCreated.substring(0, 10)}</Text> */}
            <Text>08.01.23</Text>
          </View>
          <View
            style={[
              styles.tableColthree,
              {
                justifyContent: 'center',
                fontSize: 8,
                fontFamily: 'ArialB',
                paddingTop: 1,
                paddingBottom: 1,
              },
            ]}
          >
            <Text render={({ pageNumber, totalPages }) => `Page ${pageNumber - pageNumber + 1} of ${totalPages - totalPages + 1}`} />
          </View>
        </View>
      </View>
    </>
  );
};


// fonts: Arial, Zapf Calligraphic // color #a4b494 #1A1851
const styles = StyleSheet.create({
  headerContainer: { flexDirection: 'row', alignItems: 'center', padding: 5 },
  logoContainer: { paddingRight: 5 },
  logo: { width: 60, height: 'auto' },
  textContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  universityName: { textAlign: 'center', fontSize: 12, fontFamily: 'Zapf', marginBottom: 2 },
  campuses: { textAlign: 'center', fontSize: 7, fontFamily: 'Zapf' },
  infoRow: { flexDirection: 'row', borderWidth: 1, justifyContent: 'space-between', padding: 2 },
  infoBox: { width: '40%', justifyContent: 'center', alignItems: 'center', borderWidth: 1 },
  darkBox: { backgroundColor: '#1A1851' },
  whiteText: { color: '#fff', fontSize: 8 },
  page: {
    fontFamily: 'Arial',
    fontSize: 10,
    paddingTop: 20,
    paddingBottom: 60,
    paddingHorizontal: 60,
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
  tableColfive1: {
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
  header: {
    position: 'fixed', // Ensure the header is independent of content flow
    top: 0,
    left: 0,
    right: 0,
  },
  content: {
    marginTop: 10, // Add enough margin to avoid overlap with the header
  },
});

const unselected = '/images/unselected.png';
const selected = '/images/selected.png';


const MyDocument = ({ projectID }) => {
  const [signatories, setSignatories] = useState([]);
  const [roles, setRoles] = useState([]);
  const token = localStorage.getItem('token');
  const [formData, setFormData] = useState({
    userID: {
      userID: null,
      firstname: "",
      lastname: ""
    },
    programCategory: [],
    projectTitle: "",
    projectType: "",
    projectCategory: [],
    researchTitle: "",
    program: [],
    accreditationLevel: "",
    beneficiaries: "",
    targetStartDateImplementation: "",
    totalHours: null,
    background: "",
    projectComponent: "",
    targetScope: "",
    ustpBudget: null,
    partnerAgencyBudget: null,
    totalBudget: null,
    proponents: [],
    nonUserProponents: [],
    projectLocationID: {
      addressID: null,
      street: "",
      barangay: {
        barangayID: null,
        barangay: "",
        city: {
          cityID: null,
          city: "",
          postalCode: null,
          province: {
            provinceID: null,
            province: "",
            region: {
              regionID: null,
              region: ""
            }
          }
        }
      }
    },
    agency: [],
    goalsAndObjectives: [],
    projectActivities: [],
    projectManagementTeam: [],
    budgetRequirements: [],
    evaluationAndMonitorings: [],
    monitoringPlanSchedules: [],
    loadingOfTrainers: [],
    signatories: [],
    dateCreated: "",
    status: ""
  });

  const { loadingOfTrainers } = formData;

  const fetchData = async () => {
    try {
      console.log("Fetching data using projectID:", projectID);
      const response = await axios({
        method: 'get',
        url: `https://web-production-4b16.up.railway.app/get_project/${projectID}/`,
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log("Fetched data:", response.data);
      setFormData(response.data); // Set the fetched data
      console.log("form data:", formData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [projectID])

  useEffect(() => {
    const storedRoles = JSON.parse(localStorage.getItem('roles'));
    if (storedRoles) {
      setRoles(storedRoles);
    }
  }, []);

  const formatRoles = (roles) => {
    return roles.map((role) => {
      if (role === 'rglr') {
        return 'Project Leader';
      } else if (role === 'prch') {
        return 'Program Chair';
      } else if (role === 'cldn') {
        return 'College Dean';
      } else if (role === 'ecrd') {
        return 'Director, Extension & Community Relations';
      } else if (role === 'vcaa') {
        return 'Vice - Chancellor for Academic Affairs';
      } else if (role === 'vcri') {
        return 'Vice - Chancellor for Research and Innovation';
      } else if (role === 'acnt') {
        return 'Accountant II';
      } else if (role === 'cclr') {
        return 'Chancellor, USTP CDO';
      } else {
        return role;
      }
    }).join(', ');
  };

  const totalBudgetaryRequirement = formData.loadingOfTrainers
    ? formData.loadingOfTrainers.reduce((sum, trainer) => {
      const ustpBudget = Number(trainer.ustpBudget || 0); // Ensure ustpBudget is a number
      const agencyBudget = Number(trainer.agencyBudget || 0); // Ensure agencyBudget is a number
      return sum + ustpBudget + agencyBudget; // Add both budgets to the total sum
    }, 0) // Initial value for the total is 0
    : 0; // Default to 0 if formData.loadingOfTrainers is not available

  // Collect colleges within your component
  const programColleges = (formData.program || [])
    .map((prog) => prog.college?.abbreviation)
    .filter(Boolean);

  const proponentColleges = (formData.proponents || [])
    .map((proponent) => proponent.college?.abbreviation)
    .filter(Boolean);

  const nonUserProponentColleges = (formData.nonUserProponents || [])
    .map((proponent) => proponent.college?.abbreviation)
    .filter(Boolean);

  const allColleges = [...new Set([...programColleges, ...proponentColleges, ...nonUserProponentColleges])];

  // Combine proponents
  const allProponents = [
    ...(formData.proponents || []),
    ...(formData.nonUserProponents || []),
  ];

  // Define this function in your component file
  const formatNumber = (number) => {
    return parseFloat(number).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <Document
      title={`${formData.projectTitle} - ${formData.dateCreated} - ${new Date().toLocaleString()}`}
      style={styles.document}>

      {/* first page */}
      <Page style={styles.page}>
        <View style={styles.header} fixed>
          <InlineHeaderProjectProposal dateCreated={formData.dateCreated} />
        </View>
        <View>
          <Text style={[{ border: 1, width: '30%', padding: '1%', textAlign: 'center', marginBottom: 2, justifyContent: 'center', fontFamily: 'ArialB', }]}>
            Extension Project Proposal
          </Text>
          <View style={[styles.tableColone, { flexDirection: 'row', border: 1, borderBottom: 0, paddingLeft: '1%', paddingRight: '1%', fontFamily: 'ArialB', }]}>
            <Text>
              Program Category under USTP CARES:
            </Text>
            <Image
              src={
                formData.programCategory.some(program => program.title === 'I-Share')
                  ? selected
                  : unselected
              }
              style={{ marginHorizontal: 3, marginTop: 2, width: 7, height: 7 }}
            />
            <Text style={[{ paddingRight: 5 }]}>
              I-Share
            </Text>
            <Image
              src={
                formData.programCategory.some(program => program.title === 'I-Help')
                  ? selected
                  : unselected
              }
              style={{ marginHorizontal: 3, marginTop: 2, width: 7, height: 7 }}
            />
            <Text style={[{ paddingRight: 5 }]}>
              I-Help
            </Text>
            <Image
              src={
                formData.programCategory.some(program => program.title === 'I-Support')
                  ? selected
                  : unselected
              }
              style={{ marginHorizontal: 3, marginTop: 2, width: 7, height: 7 }}
            />
            <Text>
              I-Support
            </Text>
          </View>
          <View style={[styles.tableColone, { flexDirection: 'row', border: 1, borderBottom: 0, paddingLeft: '1%', paddingRight: '1%', fontFamily: 'ArialB', }]}>
            <Text>
              Project Title: {formData.projectTitle}
            </Text>
          </View>
          <View style={[styles.tableColone, { flexDirection: 'row', border: 1, borderBottom: 0, paddingLeft: '1%', paddingRight: '1%', backgroundColor: '#a4b494', fontFamily: 'ArialB', }]}>
            <Text style={[{ paddingRight: 20 }]}>
              TYPE OF PROJECT:
            </Text>
            <Image
              src={formData.projectType === 'New Project' ? selected : unselected}
              style={{ marginHorizontal: 3, marginTop: 2, width: 7, height: 7 }}
            />
            <Text style={[{ paddingRight: 70 }]}>
              New Project
            </Text>
            <Image
              src={formData.projectType === 'Continuing Project' ? selected : unselected}
              style={{ marginHorizontal: 3, marginTop: 2, width: 7, height: 7 }}
            />
            <Text>
              Continuing Project
            </Text>
          </View>
          <View
            style={[
              styles.tableColone,
              {
                flexDirection: 'row',
                flexWrap: 'wrap', // Allow wrapping to the next line
                borderWidth: 1,
                borderBottomWidth: 0,
                paddingLeft: '1%',
                paddingRight: '1%',
                backgroundColor: '#a4b494',
                fontFamily: 'ArialB',
              }
            ]}
          >
            <Text>PROJECT CATEGORY: </Text>
            {formData.projectCategory?.length
              ? formData.projectCategory.map((projectCategory, index) => (
                <View style={[{ flexDirection: 'row' }]}>
                  <Text style={{ paddingRight: 2, paddingLeft: 5, flexShrink: 1 }} key={index}>
                    <Image
                      src={selected}
                      style={{
                        marginTop: 2,
                        width: 7,
                        height: 7,
                      }}
                    />

                  </Text>
                  <Text>
                    {projectCategory.title}
                  </Text>
                </View>

              ))
              : 'No agencies available'}
          </View>
          <View style={[styles.tableColone, { flexDirection: 'row', border: 1, borderBottom: 0, paddingLeft: '1%', paddingRight: '1%', backgroundColor: '#a4b494', fontFamily: 'ArialB', }]}>
            <Text>
              TITLE OF RESEARCH: {formData.researchTitle}
            </Text>
          </View>
          <View style={[{ flexDirection: 'row', border: 1, borderBottom: 0, backgroundColor: '#a4b494', }]}>
            <View style={[styles.tableColtwo, { flexDirection: 'row', borderRight: 1, paddingLeft: '1%', paddingRight: '1%', fontFamily: 'ArialB', }]}>
              <Text>
                PROPONENTS: {/* GET: Proponents */}
              </Text>
            </View>
            <View style={[styles.tableColtwo, { flexDirection: 'row', paddingLeft: '1%', paddingRight: '1%', fontFamily: 'ArialB', }]}>
              <Text>
                PROGRAM:
                {formData.program.length === 1 ?
                  formData.program[0].abbreviation :
                  formData.program.map((prog, index) => {
                    return (
                      <React.Fragment key={prog.programID}>
                        {prog.abbreviation}
                        {/* Add a comma after each abbreviation except the last one */}
                        {index < formData.program.length - 1 && ' and '}
                      </React.Fragment>
                    );
                  })
                }
              </Text>
            </View>
          </View>
          <View style={[{ flexDirection: 'row', border: 1, borderBottom: 0 }]}>
            <View
              style={[
                styles.tableColtwo,
                {
                  flexDirection: 'column', // Arrange rows vertically
                  borderRight: 1,
                  paddingLeft: '1%',
                  paddingRight: '1%',
                  fontFamily: 'ArialB',
                },
              ]}
            >
              {allProponents.length > 0 ? (
                allProponents
                  .map((item) => `${item.firstname || ''} ${item.lastname || ''}`.trim())
                  .reduce((rows, name, index) => {
                    if (index % 2 === 0) rows.push([name]);
                    else rows[rows.length - 1].push(name);
                    return rows;
                  }, [])
                  .map((row, rowIndex) => (
                    <View
                      key={rowIndex}
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginBottom: 1,
                      }}
                    >
                      {row.map((name, colIndex) => (
                        <Text
                          key={colIndex}
                          style={{
                            fontSize: 9,
                            textAlign: 'center', // Center text within the cell
                            flex: 1, // Ensure even spacing
                          }}
                        >
                          {name}
                        </Text>
                      ))}
                    </View>
                  ))
              ) : (
                <Text style={{ fontSize: 9, textAlign: 'center' }}>None</Text>
              )}
            </View>
            <View style={[styles.tableColtwo, { flexDirection: 'col', fontFamily: 'ArialB', backgroundColor: '#a4b494' }]}>
              <View style={[{ paddingLeft: '1%', paddingRight: '1%', borderBottom: 1 }]}>
                <Text>
                  ACCREDITATION LEVEL: {formData.accreditationLevel}
                </Text>
              </View>
              <View style={[{ paddingLeft: '1%', paddingRight: '1%', }]}>
                <Text>
                  COLLEGE: {
                    formData.program && formData.program.length > 0 ? (
                      [...new Set(
                        formData.program
                          .map((prog) => prog.college?.abbreviation)
                          .filter(Boolean)
                      )].join(', ')
                    ) : 'N/A'
                  }
                </Text>

              </View>
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
              PARTNER AGENCY: {formData.agency?.length
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
          <View style={[{ flexDirection: 'row', border: 1, borderBottom: 0 }]}>
            <View
              style={[
                styles.tableColthree,
                {
                  borderRight: 1,
                  paddingLeft: '1%',
                  paddingRight: '1%',
                  justifyContent: 'center',
                },
              ]}
            >
              <Text>{formatNumber(formData.ustpBudget)}</Text>
            </View>
            <View
              style={[
                styles.tableColthree,
                {
                  borderRight: 1,
                  paddingLeft: '1%',
                  paddingRight: '1%',
                  justifyContent: 'center',
                },
              ]}
            >
              <Text>{formatNumber(formData.partnerAgencyBudget)}</Text>
            </View>
            <View
              style={[
                styles.tableColthree,
                {
                  paddingLeft: '1%',
                  paddingRight: '1%',
                  justifyContent: 'center',
                },
              ]}
            >
              <Text>{formatNumber(formData.totalBudget)}</Text>
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
          <View style={[{ flexDirection: 'row', border: 1, borderBottom: 0, textAlign: 'center' }]}>
            <View style={[{ width: '60%', borderRight: 1, paddingLeft: '1%', paddingRight: '1%', justifyContent: 'center' }]}>
              <Text>
                {formData.targetStartDateImplementation
                  ? new Date(formData.targetStartDateImplementation).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
                  : 'None'}
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
            <Text style={[{ textAlign: 'center', paddingTop: 20, textDecoration: 'underline', }]}>
              {`${formData.userID?.firstname} ${formData.userID?.lastname}`}
            </Text>
            <Text style={[{ textAlign: 'center', fontFamily: 'Arial', paddingBottom: 5 }]}>
              {roles.length > 0 ? formatRoles(roles) : 'No roles available'}
            </Text>
          </View>
          <View style={[{ border: 1, borderBottom: 0, paddingLeft: '1%', paddingRight: '1%', fontFamily: 'ArialB' }]}>
            <Text>Endorsed by:</Text>

            {/* Render rows with a maximum of two signatories */}
            <View style={[{ flexDirection: 'column', paddingTop: 20 }]}>
              {formData.signatories && formData.signatories.length > 0 &&
                formData.signatories
                  .filter(signatory =>
                    signatory.title.includes('Program Chair') || signatory.title.includes('College Dean')
                  )
                  .reduce((rows, signatory, index) => {
                    if (index % 2 === 0) rows.push([]); // Start a new row every two items
                    rows[rows.length - 1].push(signatory);
                    return rows;
                  }, [])
                  .map((row, rowIndex) => (
                    <View key={`row-${rowIndex}`} style={[{ flexDirection: 'row', paddingBottom: '1%' }]}>
                      {row.map((signatory, colIndex) => (
                        <View key={`col-${colIndex}`} style={[{ width: '50%' }]}>
                          <Text style={[{ textAlign: 'center', textDecoration: 'underline' }]}>{signatory.name}</Text>
                          <Text style={[{ textAlign: 'center', fontFamily: 'Arial' }]}>{signatory.title}</Text>
                        </View>
                      ))}
                    </View>
                  ))}
            </View>
          </View>
          <View style={[{ border: 1, borderBottom: 0, paddingLeft: '1%', paddingRight: '1%' }]}>
            <Text style={{ fontFamily: 'ArialB', }}>
              Recommending Approval:
            </Text>
            <Text style={[{ textAlign: 'center', textDecoration: 'underline', paddingTop: 20, fontFamily: 'ArialB', }]}>
              {formData.signatories && formData.signatories.length > 0 &&
                formData.signatories.find(signatory => signatory.title === 'Director, Extension & Community Relations')?.name}
            </Text>
            <Text style={[{ textAlign: 'center', }]}>
              {formData.signatories && formData.signatories.length > 0 &&
                formData.signatories.find(signatory => signatory.title === 'Director, Extension & Community Relations')?.title}
            </Text>
            <View style={[{ flexDirection: 'row', }]}>
              <Text style={[{ flexDirection: 'row', width: '50%', textAlign: 'center', textDecoration: 'underline', paddingTop: 25, fontFamily: 'ArialB', }]}>
                {formData.signatories && formData.signatories.length > 0 &&
                  formData.signatories.find(signatory => signatory.title === 'Vice - Chancellor for Academic Affairs')?.name}
              </Text>
              <Text style={[{ flexDirection: 'row', width: '50%', textAlign: 'center', textDecoration: 'underline', paddingTop: 30, fontFamily: 'ArialB', }]}>
                {formData.signatories && formData.signatories.length > 0 &&
                  formData.signatories.find(signatory => signatory.title === 'Vice - Chancellor for Research and Innovation')?.name}
              </Text>
            </View>
            <View style={[{ flexDirection: 'row', paddingBottom: '2%' }]}>
              <Text style={[{ flexDirection: 'row', width: '50%', textAlign: 'center', }]}>
                {formData.signatories && formData.signatories.length > 0 &&
                  formData.signatories.find(signatory => signatory.title === 'Vice - Chancellor for Academic Affairs')?.title}
              </Text>
              <Text style={[{ flexDirection: 'row', width: '50%', textAlign: 'center', }]}>
                {formData.signatories && formData.signatories.length > 0 &&
                  formData.signatories.find(signatory => signatory.title === 'Vice - Chancellor for Research and Innovation')?.title}
              </Text>
            </View>
          </View>
          <View style={[{ border: 1, paddingLeft: '1%', paddingRight: '1%' }]}>
            <Text style={[{ fontFamily: 'ArialB', }]}>
              Funds Available:
            </Text>
            <View style={[{ flexDirection: 'row', paddingTop: 25 }]}>
              <Text style={[{ flexDirection: 'row', width: '50%', textAlign: 'center', textDecoration: 'underline', fontFamily: 'ArialB', }]}>
                {formData.signatories && formData.signatories.length > 0 &&
                  formData.signatories.find(signatory => signatory.title.includes('Accountant'))?.name}
              </Text>
              <Text style={[{ flexDirection: 'row', width: '50%', textAlign: 'center', textDecoration: 'underline', fontFamily: 'ArialB', }]}>
                {formData.signatories && formData.signatories.length > 0 &&
                  formData.signatories.find(signatory => signatory.title === 'Chancellor, USTP CDO')?.name}
              </Text>
            </View>
            <View style={[{ flexDirection: 'row', paddingBottom: '2%' }]}>
              <Text style={[{ flexDirection: 'row', width: '50%', textAlign: 'center', }]}>
                {formData.signatories && formData.signatories.length > 0 &&
                  formData.signatories.find(signatory => signatory.title.includes('Accountant'))?.title}
              </Text>
              <Text style={[{ flexDirection: 'row', width: '50%', textAlign: 'center', }]}>
                {formData.signatories && formData.signatories.length > 0 &&
                  formData.signatories.find(signatory => signatory.title === 'Chancellor, USTP CDO')?.title}
              </Text>
            </View>
          </View>
        </View>
      </Page>
      {/* second page */}
      <Page style={styles.page}>
        <View style={styles.header} fixed>
          <InlineHeaderProjectProposal dateCreated={formData.dateCreated} />
        </View>
        <View>
          <View wrap={false}>
            <View style={[{ justifyContent: 'center', alignItems: 'center', marginTop: '2%' }]}>
              <Text style={[{ fontSize: 13 }]}>
                Extension Project Proposal
              </Text>
            </View>
            <View style={[{ justifyContent: 'center', alignItems: 'center', marginTop: '1%', marginBottom: '1%' }]}>
              <Text style={[{ fontSize: 12, fontFamily: 'ArialB' }]}>
                {formData.projectTitle}
              </Text>
            </View>
            <Text style={[{ fontFamily: 'ArialB' }]}>
              I. Background of the Project
            </Text>
            <Text style={[{ paddingTop: '1%', paddingBottom: '4%', textIndent: 39 }]}>
              {formData.background}
            </Text>
            <Text style={[{ fontFamily: 'ArialB' }]}>
              II. Goals and Objectives of the Project
            </Text>
            <Text>
              Specifically, the objectives of the project are:
            </Text>
            <Text style={[{ paddingTop: '1%', paddingBottom: '4%', marginHorizontal: 39 }]}>
              {formData.goalsAndObjectives?.length ? (
                formData.goalsAndObjectives.map((gaoItem, index) => (
                  <Text key={index}>
                    {gaoItem.goalsAndObjectives}
                    {"\n"}
                    {"\n"}
                  </Text>
                ))
              ) : (
                <Text>No objectives available</Text>
              )}
            </Text>
            <View style={[{ flexDirection: 'row' }]}>
              <Text style={[{ fontFamily: 'ArialB' }]}>
                III. Project Component
              </Text>
              <Text style={[{ paddingLeft: 3 }]}>
                (i.e. Training Design and Content)
              </Text>
            </View>

            <Text style={[{ paddingTop: '1%', paddingBottom: '4%', textIndent: 39 }]}>
              {formData.projectComponent}
            </Text>
          </View>
          <View wrap={false} style={[{ paddingBottom: '4%', }]}>
            <Text style={[{ fontFamily: 'ArialB' }]}>
              IV. Project Implementation Plan and Management
            </Text>
            <Text style={[{ padding: '1%' }]}>
              A. Project Activities
            </Text>
            <View style={[{ flexDirection: 'row', borderBottom: 1 }]}>
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
            <View style={{ flexDirection: 'column' }}>
              {formData.projectActivities?.length ? (
                formData.projectActivities.map((activityItem, index) => (
                  <View
                    key={index}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'stretch', // Ensures columns stretch to the height of the tallest item
                    }}
                  >
                    {/* Column for Project Objective */}
                    <View style={[styles.tableColfour, { width: '25%', padding: 1, borderTop: 0, borderRight: 0, }]}>
                      <Text style={[{ textAlign: 'justify', padding: 3 }]}>
                        {activityItem.objective}
                      </Text>
                    </View>

                    {/* Column for Activities Involved */}
                    <View style={[styles.tableColfour, { width: '25%', padding: 1, borderTop: 0, borderRight: 0, }]}>
                      <Text style={[{ textAlign: 'start', padding: 3 }]}>
                        {activityItem.involved}
                      </Text>
                    </View>

                    {/* Column for Target Date */}
                    <View style={[styles.tableColfour, { width: '25%', padding: 1, borderRight: 0, borderTop: 0, padding: 3 }]}>
                      <Text
                        style={{
                          overflow: 'hidden',
                          maxWidth: '100%',
                          flexWrap: 'wrap'
                        }}
                      >
                        {activityItem.targetDate}
                      </Text>
                    </View>

                    {/* Column for Person Responsible */}
                    <View style={[styles.tableColfour, { width: '25%', padding: 1, borderTop: 0, padding: 3 }]}>
                      <Text
                        style={{
                          overflow: 'hidden',
                          maxWidth: '100%',
                          flexWrap: 'wrap'
                        }}
                      >
                        {activityItem.personResponsible}
                      </Text>
                    </View>
                  </View>
                ))
              ) : (
                <Text>No project activities available</Text>
              )}
            </View>
          </View>

          <View wrap={false} style={[{ paddingBottom: '4%', }]}>
            <View>
              <Text style={[{ padding: '1%' }]}>
                B. Project Location and Beneficiaries
              </Text>
              <Text style={[{ paddingHorizontal: '3.5%' }]}>
                {formData.targetScope}
              </Text>
            </View>
          </View>
          <View wrap={false}>
            <Text style={[{ padding: '1%' }]}>
              C. Project Management Team/Trainer
            </Text>
            <View style={[{ paddingHorizontal: '3.5%', paddingBottom: '3%', }]}>
              {formData.projectManagementTeam?.length
                ? [...formData.projectManagementTeam]
                  .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
                  .map((teamItem, index) => {
                    const label = String.fromCharCode(97 + index); // generates a, b, c, d, etc.
                    return (
                      <Text key={index} style={[{ paddingBottom: '1%', textIndent: 20 }]}>
                        {`${label}. ${teamItem.name}`}
                      </Text>
                    );
                  }) : (
                  <Text>No person responsible available</Text>
                )
              }
            </View>
            <Text style={[{ padding: '1%' }]}>

            </Text>
          </View>
          <View wrap={false} style={[{ paddingBottom: '4%' }]}>
            <Text style={[{ fontFamily: 'ArialB', marginBottom: '1%', justifyContent: 'center' }]}>
              V. Budgetary Requirements
            </Text>
            <View>
              {/* Header Row */}
              <View style={[{ flexDirection: 'row' }]}>
                <View style={[styles.tableColthree, { border: 1, borderRight: 0, borderBottom: 0, justifyContent: 'center' }]}>
                  <Text style={[{ justifyContent: 'center' }]}>Item</Text>
                </View>
                <View style={[styles.tableColthree, { border: 1, borderRight: 0, borderBottom: 0 }]}>
                  <Text style={[{ borderBottom: 1 }]}>Amount</Text>
                  <View style={[{ flexDirection: 'row' }]}>
                    <View style={[styles.tableColtwo, { borderRight: 1 }]}>
                      <Text>USTP</Text>
                    </View>
                    <View style={[styles.tableColtwo]}>
                      <Text>Partner Agency</Text>
                    </View>
                  </View>
                </View>
                <View style={[styles.tableColthree, { border: 1, borderBottom: 0, justifyContent: 'center' }]}>
                  <Text style={[{ fontFamily: 'ArialB', justifyContent: 'center' }]}>Total Amount</Text>
                </View>
              </View>

              {/* Dynamic Items Rows */}
              {formData.budgetRequirements?.map((item, index) => (
                <View key={index} style={[{ flexDirection: 'row' }]}>
                  <View style={[styles.tableColthree, { border: 1, borderRight: 0, borderBottom: 0 }]}>
                    <Text>{item.itemName}</Text>
                  </View>
                  <View style={[styles.tableColthree, { border: 1, borderRight: 0, borderBottom: 0 }]}>
                    <View style={[{ flexDirection: 'row' }]}>
                      <View style={[styles.tableColtwo, { borderRight: 1 }]}>
                        <Text>{formatNumber(item.ustpAmount)}</Text>
                      </View>
                      <View style={[styles.tableColtwo]}>
                        <Text>{formatNumber(item.partnerAmount)}</Text>
                      </View>
                    </View>
                  </View>
                  <View style={[styles.tableColthree, { border: 1, borderBottom: 0 }]}>
                    <Text>{formatNumber(item.totalAmount)}</Text>
                  </View>
                </View>
              ))}

              {/* Total Budget Row */}
              <View style={[{ flexDirection: 'row', marginBottom: '1%' }]}>
                <View style={[styles.tableColthree, { border: 1, borderRight: 0 }]}>
                  <Text></Text>
                </View>
                <View style={[styles.tableColthree, { borderTop: 1, borderBottom: 1 }]}>
                  <View style={[{ flexDirection: 'row' }]}>
                    <View style={[styles.tableColtwo]}>
                      <Text></Text>
                    </View>
                    <View style={[styles.tableColtwo]}>
                      <Text style={[{ fontFamily: 'ArialB' }]} >Total Budget</Text>
                    </View>
                  </View>
                </View>
                <View style={[styles.tableColthree, { border: 1 }]}>
                  <Text style={[{ fontFamily: 'ArialB' }]}>
                    {formData.budgetRequirements?.reduce((total, item) =>
                      total + (formatNumber(item.totalAmount) || ''), '') || ''}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View wrap={false} style={[{ paddingBottom: '4%' }]}>
            <Text style={[{ fontFamily: 'ArialB', }]}>
              VI. Project Evaluation and Monitoring
            </Text>
            <Text style={[{ marginLeft: 5 }]}>
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
              <View style={[styles.tableColfive, { borderRight: 0, borderBottom: 0 }]}>
                <Text style={[{ marginLeft: 5 }]}>Goal</Text>
              </View>
              <View style={[styles.tableColfive, { borderRight: 0, borderBottom: 0, paddingHorizontal: '1%' }]}>
                {formData.evaluationAndMonitorings?.filter(item => item.type.toLowerCase() === "goal")
                  .map((evalItem, index) => (
                    <Text key={index}>{evalItem.projectSummary}</Text>
                  ))
                }
              </View>
              <View style={[styles.tableColfive, { borderRight: 0, borderBottom: 0, paddingHorizontal: '1%' }]}>
                {formData.evaluationAndMonitorings?.filter(item => item.type.toLowerCase() === "goal")
                  .map((evalItem, index) => (
                    <Text key={index}>{evalItem.indicators}</Text>
                  ))
                }
              </View>
              <View style={[styles.tableColfive, { borderRight: 0, borderBottom: 0, paddingHorizontal: '1%' }]}>
                {formData.evaluationAndMonitorings?.filter(item => item.type.toLowerCase() === "goal")
                  .map((evalItem, index) => (
                    <Text key={index}>{evalItem.meansOfVerification}</Text>
                  ))
                }
              </View>
              <View style={[styles.tableColfive, { borderBottom: 0, paddingHorizontal: '1%' }]}>
                {formData.evaluationAndMonitorings?.filter(item => item.type.toLowerCase() === "goal")
                  .map((evalItem, index) => (
                    <Text key={index}>{evalItem.risksAssumptions}</Text>
                  ))
                }
              </View>
            </View>
            <View style={[{ flexDirection: 'row' }]}>
              <View style={[styles.tableColfive, { borderRight: 0, borderBottom: 0 }]}>
                <Text style={[{ marginLeft: 5 }]}>Outcome</Text>
              </View>
              <View style={[styles.tableColfive, { borderRight: 0, borderBottom: 0, paddingHorizontal: '1%' }]}>
                {formData.evaluationAndMonitorings?.filter(item => item.type.toLowerCase() === "outcome")
                  .map((evalItem, index) => (
                    <Text key={index}>{evalItem.projectSummary}</Text>
                  ))
                }
              </View>
              <View style={[styles.tableColfive, { borderRight: 0, borderBottom: 0, paddingHorizontal: '1%' }]}>
                {formData.evaluationAndMonitorings?.filter(item => item.type.toLowerCase() === "outcome")
                  .map((evalItem, index) => (
                    <Text key={index}>{evalItem.indicators}</Text>
                  ))
                }
              </View>
              <View style={[styles.tableColfive, { borderRight: 0, borderBottom: 0, paddingHorizontal: '1%' }]}>
                {formData.evaluationAndMonitorings?.filter(item => item.type.toLowerCase() === "outcome")
                  .map((evalItem, index) => (
                    <Text key={index}>{evalItem.meansOfVerification}</Text>
                  ))
                }
              </View>
              <View style={[styles.tableColfive, { borderBottom: 0, paddingHorizontal: '1%' }]}>
                {formData.evaluationAndMonitorings?.filter(item => item.type.toLowerCase() === "outcome")
                  .map((evalItem, index) => (
                    <Text key={index}>{evalItem.risksAssumptions}</Text>
                  ))
                }
              </View>
            </View>
            <View style={[{ flexDirection: 'row' }]}>
              <View style={[styles.tableColfive, { borderRight: 0, borderBottom: 0 }]}>
                <Text style={[{ marginLeft: 5 }]}>Outputs</Text>
              </View>
              <View style={[styles.tableColfive, { borderRight: 0, borderBottom: 0, paddingHorizontal: '1%' }]}>
                {formData.evaluationAndMonitorings?.filter(item => item.type.toLowerCase() === "outputs")
                  .map((evalItem, index) => (
                    <Text key={index}>{evalItem.projectSummary}</Text>
                  ))
                }
              </View>
              <View style={[styles.tableColfive, { borderRight: 0, borderBottom: 0, paddingHorizontal: '1%' }]}>
                {formData.evaluationAndMonitorings?.filter(item => item.type.toLowerCase() === "outputs")
                  .map((evalItem, index) => (
                    <Text key={index}>{evalItem.indicators}</Text>
                  ))
                }
              </View>
              <View style={[styles.tableColfive, { borderRight: 0, borderBottom: 0, paddingHorizontal: '1%' }]}>
                {formData.evaluationAndMonitorings?.filter(item => item.type.toLowerCase() === "outputs")
                  .map((evalItem, index) => (
                    <Text key={index}>{evalItem.meansOfVerification}</Text>
                  ))
                }
              </View>
              <View style={[styles.tableColfive, { borderBottom: 0, paddingHorizontal: '1%' }]}>
                {formData.evaluationAndMonitorings?.filter(item => item.type.toLowerCase() === "outputs")
                  .map((evalItem, index) => (
                    <Text key={index}>{evalItem.risksAssumptions}</Text>
                  ))
                }
              </View>
            </View>
            <View style={[{ flexDirection: 'row', paddingBottom: '1%' }]}>
              <View style={[styles.tableColfive, { borderRight: 0, }]}>
                <Text style={[{ marginLeft: 5 }]}>Activities</Text>
              </View>
              <View style={[styles.tableColfive, { borderRight: 0, paddingHorizontal: '1%' }]}>
                {formData.evaluationAndMonitorings?.filter(item => item.type.toLowerCase() === "activities")
                  .map((evalItem, index) => (
                    <Text key={index}>{evalItem.projectSummary}</Text>
                  ))
                }
              </View>
              <View style={[styles.tableColfive, { borderRight: 0, paddingHorizontal: '1%' }]}>
                {formData.evaluationAndMonitorings?.filter(item => item.type.toLowerCase() === "activities")
                  .map((evalItem, index) => (
                    <Text key={index}>{evalItem.indicators}</Text>
                  ))
                }
              </View>
              <View style={[styles.tableColfive, { borderRight: 0, paddingHorizontal: '1%' }]}>
                {formData.evaluationAndMonitorings?.filter(item => item.type.toLowerCase() === "activities")
                  .map((evalItem, index) => (
                    <Text key={index}>{evalItem.meansOfVerification}</Text>
                  ))
                }
              </View>
              <View style={[styles.tableColfive, { paddingHorizontal: '1%' }]}>
                {formData.evaluationAndMonitorings?.filter(item => item.type.toLowerCase() === "activities")
                  .map((evalItem, index) => (
                    <Text key={index}>{evalItem.risksAssumptions}</Text>
                  ))
                }
              </View>
            </View>
          </View>
          <View wrap={false}>
            <Text style={[{ fontFamily: 'ArialB' }]}>
              Monitoring and Plan Schedule
            </Text>
            <View style={[{ flexDirection: 'row', textAlign: 'center' }]}>
              <View style={[styles.tableColfour, { borderRight: 0, borderBottom: 0, justifyContent: 'center' }]}>
                <Text>
                  Monitoring Phase
                </Text>
              </View>
              <View style={[styles.tableColfour, { borderRight: 0, borderBottom: 0, justifyContent: 'center' }]}>
                <Text>
                  M & E Instrument/{'\n'}Approach
                </Text>
              </View>
              <View style={[styles.tableColfour, { borderRight: 0, borderBottom: 0, justifyContent: 'center' }]}>
                <Text>
                  Format or Strategy for Data Gathering
                </Text>
              </View>
              <View style={[styles.tableColfour, { borderBottom: 0, justifyContent: 'center', padding: 5 }]}>
                <Text>
                  Schedule *As agreed with community/{'\n'}organization partner
                </Text>
              </View>
            </View>
            <View style={[{ flexDirection: 'row' }]}>
              <View style={[styles.tableColfour, { borderRight: 0, borderBottom: 0, paddingHorizontal: '1%' }]}>
                <Text style={[{ textAlign: 'start' }]}>
                  Before Project
                </Text>
                <Text style={[{ textAlign: 'start' }]}>
                  Implementation
                </Text>
              </View>
              <View style={[styles.tableColfour, { borderRight: 0, borderBottom: 0, paddingHorizontal: '1%' }]}>
                {formData.monitoringPlanSchedules?.length
                  ? formData.monitoringPlanSchedules.map((monitorItem, index) => (
                    monitorItem.implementationPhase === "Before Implementation Phase" && (
                      <Text key={index} style={[{ textAlign: 'start' }]}>
                        {monitorItem.approach}
                      </Text>
                    )
                  )) : ''
                }
              </View>
              <View style={[styles.tableColfour, { borderRight: 0, borderBottom: 0, paddingHorizontal: '1%' }]}>
                {formData.monitoringPlanSchedules?.length
                  ? formData.monitoringPlanSchedules.map((monitorItem, index) => (
                    monitorItem.implementationPhase === "Before Implementation Phase" && (
                      <Text key={index} style={[{ textAlign: 'start' }]}>
                        {monitorItem.dataGatheringStrategy}
                      </Text>
                    )
                  )) : ''
                }
              </View>
              <View style={[styles.tableColfour, { borderBottom: 0, paddingHorizontal: '1%' }]}>
                {formData.monitoringPlanSchedules?.length
                  ? formData.monitoringPlanSchedules.map((monitorItem, index) => (
                    monitorItem.implementationPhase === "Before Implementation Phase" && (
                      <Text key={index} style={[{ textAlign: 'start' }]}>
                        {monitorItem.schedule}
                      </Text>
                    )
                  )) : ''
                }
              </View>
            </View>
            <View style={[{ flexDirection: 'row' }]}>
              <View style={[styles.tableColfour, { borderRight: 0, borderBottom: 0, paddingHorizontal: '1%' }]}>
                <Text style={[{ textAlign: 'start' }]}>
                  During Project
                </Text>
                <Text style={[{ textAlign: 'start' }]}>
                  Implementation
                </Text>
              </View>
              <View style={[styles.tableColfour, { borderRight: 0, borderBottom: 0, paddingHorizontal: '1%' }]}>
                {formData.monitoringPlanSchedules?.length
                  ? formData.monitoringPlanSchedules.map((monitorItem, index) => (
                    monitorItem.implementationPhase === "During Project Implementation" && (
                      <Text key={index} style={[{ textAlign: 'start' }]}>
                        {monitorItem.approach}
                      </Text>
                    )
                  )) : ''
                }
              </View>
              <View style={[styles.tableColfour, { borderRight: 0, borderBottom: 0, paddingHorizontal: '1%' }]}>
                {formData.monitoringPlanSchedules?.length
                  ? formData.monitoringPlanSchedules.map((monitorItem, index) => (
                    monitorItem.implementationPhase === "During Project Implementation" && (
                      <Text key={index} style={[{ textAlign: 'start' }]}>
                        {monitorItem.dataGatheringStrategy}
                      </Text>
                    )
                  )) : ''
                }
              </View>
              <View style={[styles.tableColfour, { borderBottom: 0, paddingHorizontal: '1%' }]}>
                {formData.monitoringPlanSchedules?.length
                  ? formData.monitoringPlanSchedules.map((monitorItem, index) => (
                    monitorItem.implementationPhase === "During Project Implementation" && (
                      <Text key={index} style={[{ textAlign: 'start' }]}>
                        {monitorItem.schedule}
                      </Text>
                    )
                  )) : ''
                }
              </View>
            </View>
            <View style={[{ flexDirection: 'row' }]}>
              <View style={[styles.tableColfour, { borderRight: 0, paddingHorizontal: '1%' }]}>
                <Text style={[{ textAlign: 'start' }]}>
                  After Project
                </Text>
                <Text style={[{ textAlign: 'start' }]}>
                  Implementation
                </Text>
              </View>
              <View style={[styles.tableColfour, { borderRight: 0, paddingHorizontal: '1%' }]}>
                {formData.monitoringPlanSchedules?.length
                  ? formData.monitoringPlanSchedules.map((monitorItem, index) => (
                    monitorItem.implementationPhase === "After Project Implementation" && (
                      <Text key={index} style={[{ textAlign: 'start' }]}>
                        {monitorItem.approach}
                      </Text>
                    )
                  )) : ''
                }
              </View>
              <View style={[styles.tableColfour, { borderRight: 0, paddingHorizontal: '1%' }]}>
                {formData.monitoringPlanSchedules?.length
                  ? formData.monitoringPlanSchedules.map((monitorItem, index) => (
                    monitorItem.implementationPhase === "After Project Implementation" && (
                      <Text key={index} style={[{ textAlign: 'start' }]}>
                        {monitorItem.dataGatheringStrategy}
                      </Text>
                    )
                  )) : ''
                }
              </View>
              <View style={[styles.tableColfour, { paddingHorizontal: '1%' }]}>
                {formData.monitoringPlanSchedules?.length
                  ? formData.monitoringPlanSchedules.map((monitorItem, index) => (
                    monitorItem.implementationPhase === "After Project Implementation" && (
                      <Text key={index} style={[{ textAlign: 'start' }]}>
                        {monitorItem.schedule}
                      </Text>
                    )
                  )) : ''
                }
              </View>
            </View>
            <Text style={[{ marginTop: 10, color: '#FF0000' }]}>
              Please attach monitoring tools
            </Text>
          </View>
        </View>
      </Page>


      {
        loadingOfTrainers && Array.isArray(loadingOfTrainers) && loadingOfTrainers.length > 0
        && (
          // Third Page Content
          <Page style={styles.page}>
            <InlineHeaderLoadingofTrainers dateCreated={formData.dateCreated} />
            <View style={[{ justifyContent: 'center', alignItems: 'center', marginVertical: '4%' }]}>
              <Text style={[{ fontSize: 10, fontFamily: 'ArialB' }]}>
                LOADING OF TRAINERS FOR EXTENSION SERVICES
              </Text>
            </View>
            <Text>
              Project Title: <Text style={{ fontFamily: 'ArialB' }}>
                {formData.projectTitle}
              </Text>
            </Text>
            <Text style={[{ paddingBottom: '2%' }]}>
              Partner Agency: {formData.agency?.length
                ? formData.agency.map((agencyItem, index) => (
                  <Text style={[{ fontFamily: 'ArialB' }]} key={index}>
                    {agencyItem.agencyName}
                  </Text>
                ))
                : 'No agencies available'}
            </Text>
            <View style={[{ flexDirection: 'row', textAlign: 'center', backgroundColor: '#DCDCDC', borderBottom: 1 }]}>
              {/* Table Headers */}
              <View style={[styles.tableColfive1, { borderRight: 0, borderBottom: 0, justifyContent: 'center', width: '15%' }]}>
                <Text>
                  Name of
                  {'\n'}
                  Faculty
                </Text>
              </View>
              <View style={[styles.tableColfive1, { borderRight: 0, borderBottom: 0, justifyContent: 'center', width: '30%' }]}>
                <Text>
                  Training Load
                </Text>
              </View>
              <View style={[styles.tableColfive1, { borderRight: 0, borderBottom: 0, justifyContent: 'center', width: '10%' }]}>
                <Text>
                  No. of Hours
                </Text>
              </View>
              <View style={[styles.tableColfive1, { borderRight: 0, borderBottom: 0, justifyContent: 'center', width: '30%' }]}>
                <Text style={[{ borderBottom: 1 }]}>
                  Budget
                </Text>
                <View style={[{ flexDirection: 'row', }]}>
                  <View style={[styles.tableColtwo, { borderRight: 1, justifyContent: 'center', paddingVertical: 5 }]}>
                    <Text>
                      USTP
                    </Text>
                  </View>
                  <View style={[styles.tableColtwo, { justifyContent: 'center' }]}>
                    <Text>
                      Partner{'\n'}Agency
                    </Text>
                  </View>
                </View>
              </View>
              <View style={[styles.tableColfive1, { borderBottom: 0, justifyContent: 'center', width: '15%' }]}>
                <Text>
                  Total{'\n'}Budgetary{'\n'}Requirement
                </Text>

              </View>
            </View>
            {loadingOfTrainers && loadingOfTrainers.length > 0 ? (
              <>
                {loadingOfTrainers.map((trainer, index) => (
                  <View key={index} style={{ flexDirection: 'row' }}>
                    {/* Faculty Name */}
                    <View style={[styles.tableColthree, { padding: 1, borderLeft: 1, borderBottom: 1, width: '15%' }]}>
                      <Text>{trainer.faculty}</Text>
                    </View>
                    {/* Training Load */}
                    <View style={[styles.tableColthree, { borderLeft: 1, borderBottom: 1, width: '30%' }]}>
                      <Text>{trainer.trainingLoad}</Text>
                    </View>
                    {/* Hours */}
                    <View style={[styles.tableColthree, { borderLeft: 1, borderBottom: 1, width: '10%', alignItems: 'center', justifyContent: 'center' }]}>
                      <Text>{trainer.hours}</Text>
                    </View>
                    {/* Budget */}
                    <View style={[styles.tableColthree, { flexDirection: 'row', borderLeft: 1, borderBottom: 1, width: '30%' }]}>
                      <View style={{ flexDirection: 'row', width: '50%', borderRight: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text>{formatNumber(trainer.ustpBudget)}</Text>
                      </View>
                      <View style={{ flexDirection: 'row', width: '50%', alignItems: 'center', justifyContent: 'center' }}>
                        <Text>{formatNumber(trainer.agencyBudget)}</Text>
                      </View>

                    </View>
                    {/* Row Total */}
                    <View style={[styles.tableColthree, { border: 1, borderTop: 0, width: '15%', alignItems: 'center', justifyContent: 'center' }]}>
                      <Text>
                        {formatNumber(Number(trainer.ustpBudget || 0) + Number(trainer.agencyBudget || 0))}
                      </Text>
                    </View>
                  </View>
                ))}
                {/* Total Row */}
                <View style={[{ flexDirection: 'row', marginBottom: '1%' }]}>
                  <View style={[styles.tableColfive1, { border: 1, borderRight: 0, borderTop: 0, width: '15%' }]}>
                    <Text></Text>
                  </View>
                  <View style={[styles.tableColfive1, { border: 1, borderRight: 0, borderLeft: 0, borderTop: 0, width: '30%' }]}>
                    <Text></Text>
                  </View>
                  <View style={[styles.tableColfive1, { border: 1, borderRight: 0, borderLeft: 0, borderTop: 0, width: '10%' }]}>
                    <Text></Text>
                  </View>
                  <View style={[styles.tableColfive1, { borderTop: 0, borderBottom: 1, borderRight: 0, borderLeft: 0, width: '30%' }]}>
                    <View style={[{ flexDirection: 'row' }]}>
                      <View style={[styles.tableColtwo, {}]}>
                        <Text></Text>
                      </View>
                      <View style={[styles.tableColtwo, {}]}>
                        <Text style={[{ fontFamily: 'ArialB' }]}>TOTAL</Text>
                      </View>
                    </View>
                  </View>
                  <View style={[styles.tableColfive1, { border: 1, borderTop: 0, width: '15%' }]}>
                    <Text style={[{ textAlign: 'center', fontFamily: 'ArialB' }]}>
                      {formatNumber(totalBudgetaryRequirement)}
                    </Text>
                  </View>
                </View>
              </>
            ) : (
              <Text>No trainers available</Text>
            )}

            <Text style={[{ fontFamily: 'ArialB', paddingTop: 25 }]}>
              Prepared by:
            </Text>
            <Text style={[{ textDecoration: 'underline', fontFamily: 'ArialB', marginTop: 20 }]}>
              {`${formData.userID?.firstname} ${formData.userID?.lastname}`}
            </Text>
            <Text style={[{ paddingBottom: 40 }]}>
              {roles.length > 0 ? formatRoles(roles) : ''}
            </Text>
            <Text style={[{ fontFamily: 'ArialB' }]}>
              Approved:
            </Text>
            {formData.signatories && formData.signatories.length > 0 && (
              <>
                {formData.signatories
                  .filter(signatory => signatory.title.includes('College Dean'))
                  .map((dean, index) => (
                    <View key={index} style={{ paddingTop: index === 0 ? 20 : 30 }}>
                      <Text style={{ fontFamily: 'ArialB', textDecoration: 'underline' }}>
                        {dean.name}
                      </Text>
                      <Text>
                        {dean.title}
                      </Text>
                    </View>
                  ))}
              </>
            )}

          </Page>
        )
      }

    </Document>
  );
}

export default MyDocument;