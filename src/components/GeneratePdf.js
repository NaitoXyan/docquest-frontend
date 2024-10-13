import React from 'react';
import { Document, Page, View, Text, Image, StyleSheet } from '@react-pdf/renderer';

// fonts: Arial, Zapf Calligraphic // #a4b494 #1A1851
const styles = StyleSheet.create({
  page: {
    fontSize: 10,
    padding: 60,
    flexDirection: 'column',
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
  rowNormal:{
    flexDirection: 'row',
    border: 'solid',
    borderWidth: 1,
  },
  tableNormal: {
    display: 'table',
    width: 'auto',
    borderColor: '#bfbfbf',
  },
  tableColone: {
    width: '',
  },
  tableColtwo: {
    width: '50%',
  },
  tableColthree: {
    width: '33.3%',
  },
  tableColfour: {
    width: '25%',
  },
  tableColfive: {
    width: '20%',
  },
  tableColsix: {
    width: '16.6',
  },



  header1: {
    textAlign: 'center',
  },
  rowright: {
    flex: 'row',
    justifyContent: 'flex-end',
  },
  table: {
    display: 'table',
    width: 'auto',
    border: 'solid',
    borderWidth: '1',
    borderColor: '#bfbfbf',
  },
  table1: {
    display: 'table',
    width: 'auto',

    borderColor: '#bfbfbf',
  },
  
  header2: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    display: 'table',
    width: 'auto',
    borderColor: '#bfbfbf',
  },
  tableRow: {
    flexDirection: 'row',
    border: 'solid',
    borderWidth: 1,
  },
  tableCol: {
    width: '25%', // Adjust column width according to the number of columns
  },
  tableCol1: {
    width: '100%', // Adjust column width according to the number of columns

  },
  tableCol2: {
    width: '50%', // Adjust column width according to the number of columns
  },
  tableCol3: {
    width: '33.3%', // Adjust column width according to the number of columns
  },
  tableCol4: {
    width: '40%', // Adjust column width according to the number of columns
  },
  tableCol5: {
    width: '66.55%', // Adjust column width according to the number of columns
  },
  tableCol6: {
    width: '20%', // Adjust column width according to the number of columns
  },
  tableCellHeader: {
    backgroundColor: '#f2f2f2',
    fontWeight: 'bold',
  },
  tableCell: {
    padding: 5,
  },
});

const MyDocument = () => (
  <Document>
    {/* first page */}
    <Page style={styles.page}>
      {/* kaning view ga contain og logo, ustp, lugar */}
      <View>
        <View>
            {/* diri ang USTP logo */}
        </View>
        <View>
          <View>
            <Text style={styles.header1}>
              University of Science and Technology of Southern Philippines
            </Text>
          </View>
          <View>
            <Text style={styles.header1}>
              Alubijid | Cagayan de Oro | Claveria | Jasaan | Oroquieta | Panaon
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.tableNormal}>
        <View style={styles.right}>
          <View style={styles.rowNormal}>
            <View style={styles.tableColthree}>
              <Text style={styles.textCenter}>
                Document Code No.
              </Text>
            </View>
          </View> 
        </View>
        <View style={styles.right}>
        <View style={styles.rowNormal}>
          <View style={styles.tableColthree}>
            <Text style={styles.textCenter}>
              FM-USTP-ECRD-01a
            </Text>
          </View>
          </View>
        </View>
        <View style={styles.right}>
          <View style={styles.tableColthree}>
            <View style={styles.rowNormal}>
              <View style={styles.tableColthree}>
                <Text style={styles.textCenter}>
                 Rev. No.
                </Text>
              </View>
              <View style={styles.tableColthree}>
                <Text style={styles.textCenter}>
                 Effective Date
                </Text>
              </View>
              <View style={styles.tableColthree}>
                <Text style={styles.textCenter}>
                 Page No.
                </Text>
              </View>
            </View>

            <View style={styles.tableRow}>
              <View style={styles.tableCol3}>
                <Text style={styles.tableCellHeader}>
                 02
                </Text>
              </View>
              <View style={styles.tableCol3}>
                <Text style={styles.tableCellHeader}>
                 08.01.23
                </Text>
              </View>
              <View style={styles.tableCol3}>
                <Text style={styles.tableCellHeader}>
                 01
                </Text>
              </View>
            </View>
          </View>
        </View>

      </View>

      <View style={styles.table}>
        {/* Table Header */}


        {/* Table Row */}
        <View style={styles.tableRow}>
          <View style={styles.tableCol1}>
            <Text>Program Category under USTP CARES: I-Share I-Help I-Support</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableCol1}>
            <Text>Project Title:</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableCol1}>
            <Text>TYPE OF PROJECT:          New Project          Continuing Project</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableCol1}>
            <Text>PROJECT CATEGORY: Skills Training/Capacity Building     Training Needs Survey     Techical Advice/Consultancy     Monitoring and Evaluation</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableCol1}>
            <Text>*TITLE OF RESEARCH: </Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableCol2}>
            <Text>PROPONENTS: </Text>
          </View>
          <View style={styles.tableCol2}>
            <Text>PROGRAM: </Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableCol2}>
            <Text> </Text>
          </View>
          <View style={styles.tableCol2}>
            <Text>ACCREDITATION LEVEL: </Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableCol2}>
            <Text> </Text>
          </View>
          <View style={styles.tableCol2}>
            <Text>COLLEGE: </Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableCol1}>
            <Text>TARGET GROUPS/BENEFICIARIES:</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableCol1}>
            <Text>PROJECT LOCATION:</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableCol1}>
            <Text>PARTNER AGENCY:</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableCol1}>
            <Text>BUDGET REQUIREMENT:</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableCol1}>
            <Text>USTP</Text>
          </View>
          <View style={styles.tableCol1}>
            <Text>Partner Agency</Text>
          </View>
          <View style={styles.tableCol1}>
            <Text>Total</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableCol1}>
            <Text>{/* USTP BUDGET */}</Text>
          </View>
          <View style={styles.tableCol1}>
            <Text>{/* PARTNER AGENCY BUDGET */}</Text>
          </View>
          <View style={styles.tableCol1}>
          <Text>{/* TOTAL BUDGET */} </Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableCol1}>
            <Text>TARGET DATE OF IMPLEMENTATION:</Text>
          </View>
          <View style={styles.tableCol1}>
            <Text>TOTAL NUMBER OF HOURS</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableCol1}>
            <Text> </Text>
          </View>
          <View style={styles.tableCol1}>
            <Text> </Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableCol1}>
            <Text>Submitted by: </Text>
            <Text>Main Proponent/Project Leader </Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableCol1}>
            <Text>Endorsed by: </Text>
            <Text> </Text>
            <Text>Program Chair                   College Dean</Text>
          </View>
        </View>

        <View style={styles.tableRow}>
          <View style={styles.tableCol1}>
            <Text> Recommending Approval: </Text>
            <Text>MARIA TERESA M. FRAJARDO. Ed.D. </Text>
            <Text>Director, Extension & Community Relations</Text>
            <Text> </Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableCol2}>
              <Text>JOCELYN B. BARBOSA</Text>
              <Text>Vice - Chancellor for Accademic Affairs</Text>
            </View>
            <View style={styles.tableCol2}>
              <Text>JOCELYN B. BARBOSA</Text>
              <Text>Vice - Chancellor for Research and Innovation</Text>
            </View>
        </View>

        <View style={styles.tableRow}>
          <View style={styles.tableCol1}>
            <Text> Funds Available: </Text>
            <Text> </Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableCol2}>
              <Text>CHERRY ANN S. VILLARTE. CPA</Text>
              <Text>Accountant III</Text>
            </View>
            <View style={styles.tableCol2}>
              <Text>ATTY. DIONEL 0. ALBINA</Text>
              <Text>Chancellor, USTP CDO</Text>
            </View>
        </View>

        

        {/* Add more rows as needed */}
      </View>
    </Page>

    {/* second page */}
    <Page style={styles.page}>
      {/* kaning view ga contain og logo, ustp, lugar */}
      <View>
        <View>
            {/* diri ang USTP logo */}
        </View>
        <View>
          <View>
            <Text style={styles.header1}>
              University of Science and Technology of Southern Philippines
            </Text>
          </View>
          <View>
            <Text style={styles.header1}>
              Alubijid | Cagayan de Oro | Claveria | Jasaan | Oroquieta | Panaon
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.table1}>
        <View style={styles.header2}>
          <View style={styles.tableCol3}>
            <Text style={styles.tableCellHeader}>
              Document Code No.
            </Text>
          </View> 
        </View>

        <View style={styles.header2}>
          <View style={styles.tableCol3}>
            <Text style={styles.tableCellHeader}>
              FM-USTP-ECRD-01a
            </Text>
          </View> 
        </View>

        <View style={styles.header2}>
          <View style={styles.tableCol3}>
            <View style={styles.tableRow}>
              <View style={styles.tableCol3}>
                <Text style={styles.tableCellHeader}>
                 Rev. No.
                </Text>
              </View>
              <View style={styles.tableCol3}>
                <Text style={styles.tableCellHeader}>
                 Effective Date
                </Text>
              </View>
              <View style={styles.tableCol3}>
                <Text style={styles.tableCellHeader}>
                 Page No.
                </Text>
              </View>
            </View>

            <View style={styles.tableRow}>
              <View style={styles.tableCol3}>
                <Text style={styles.tableCellHeader}>
                 02
                </Text>
              </View>
              <View style={styles.tableCol3}>
                <Text style={styles.tableCellHeader}>
                 08.01.23
                </Text>
              </View>
              <View style={styles.tableCol3}>
                <Text style={styles.tableCellHeader}>
                 01
                </Text>
              </View>
            </View>
          </View>
        </View>

      </View>

      <View style={styles.table}>
        {/* Table Header */}


        {/* Table Row */}
        <View style={styles.header1}>
          <View style={styles.tableCol1}>
            <Text>
              Extension Project Proposal
            </Text>
            <Text>
              *Project Tile
            </Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableCol1}>
            <Text>I. Background of the Project</Text>
            <Text> </Text>
            <Text> </Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableCol1}>
            <Text>II. Goals and Objectives of the Project</Text>
            <Text>Specifically, the objectives of the project are:</Text>
            <Text>1. </Text>
            <Text> </Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableCol1}>
            <Text>III. Project Component(i.e. Training Design and Content)</Text>
            <Text> </Text>
            <Text> </Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableCol1}>
            <Text>IV. Project Implementation Plan and Management</Text>
            <Text>A. Project Activities</Text>
            <Text> </Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text>Project Objective </Text>
          </View>
          <View style={styles.tableCol}>
            <Text>Activities Involved </Text>
          </View>
          <View style={styles.tableCol}>
            <Text>Target Date</Text>
          </View>
          <View style={styles.tableCol}>
            <Text>Person Responsible</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text>* </Text>
          </View>
          <View style={styles.tableCol}>
            <Text>* </Text>
          </View>
          <View style={styles.tableCol}>
            <Text>*</Text>
          </View>
          <View style={styles.tableCol}>
            <Text>*</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableCol1}>
            <Text>B. Project Location and Beneficiaries</Text>
            <Text>*</Text>
            <Text> </Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableCol1}>
            <Text>C. Project Management Team/Trainers</Text>
            <Text>*</Text>
            <Text> </Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableCol1}>
            <Text>V. Budgetary Requirements</Text>
            <Text> </Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableCol3}>
            <Text>Item </Text>
          </View>
          <View style={styles.tableCol3}>
            <View style={styles.tableRow}>
              <Text>Amount </Text>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol2}>
                <Text>USTP</Text>
              </View>
              <View style={styles.tableCol2}>
                <Text>Partner Agency</Text>
              </View>
            </View>
          </View>
          <View style={styles.tableCol3}>
            <Text>Total Amount</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableCol3}>
            <Text>Honorarium</Text>
          </View>
          <View style={styles.tableCol3}>
            <View style={styles.tableRow}>
              <View style={styles.tableCol2}>
                <Text>*</Text>
              </View>
              <View style={styles.tableCol2}>
                <Text>*</Text>
              </View>
            </View>
          </View>
          <View style={styles.tableCol3}>
            <Text>*</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableCol3}>
            <Text>Supplies and Materials</Text>
          </View>
          <View style={styles.tableCol3}>
            <View style={styles.tableRow}>
              <View style={styles.tableCol2}>
                <Text>*</Text>
              </View>
              <View style={styles.tableCol2}>
                <Text>*</Text>
              </View>
            </View>
          </View>
          <View style={styles.tableCol3}>
            <Text>*</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableCol3}>
            <Text>Travel Allowance</Text>
          </View>
          <View style={styles.tableCol3}>
            <View style={styles.tableRow}>
              <View style={styles.tableCol2}>
                <Text>*</Text>
              </View>
              <View style={styles.tableCol2}>
                <Text>*</Text>
              </View>
            </View>
          </View>
          <View style={styles.tableCol3}>
            <Text>*</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableCol5}>
            <Text>Total Budget</Text>
          </View>
          <View style={styles.tableCol3}>
            <Text>*</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableCol1}>
            <Text>VI. Project Evaluation and Monitoring</Text>
            <Text>log Frame for the Project</Text>
            <Text> </Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableCol6}>
            <Text> </Text>
          </View>
          <View style={styles.tableCol6}>
            <Text>Project Summary</Text>
          </View>
          <View style={styles.tableCol6}>
            <Text>Indicators</Text>
          </View>
          <View style={styles.tableCol6}>
            <Text>Means of Verification</Text>
          </View>
          <View style={styles.tableCol6}>
            <Text>Risks/Assumptions</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableCol6}>
            <Text>Goal</Text>
          </View>
          <View style={styles.tableCol6}>
            <Text>*</Text>
          </View>
          <View style={styles.tableCol6}>
            <Text>*</Text>
          </View>
          <View style={styles.tableCol6}>
            <Text>*</Text>
          </View>
          <View style={styles.tableCol6}>
            <Text>*</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableCol6}>
            <Text>Outcome</Text>
          </View>
          <View style={styles.tableCol6}>
            <Text></Text>
          </View>
          <View style={styles.tableCol6}>
            <Text></Text>
          </View>
          <View style={styles.tableCol6}>
            <Text></Text>
          </View>
          <View style={styles.tableCol6}>
            <Text> </Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableCol6}>
            <Text>Outputs</Text>
          </View>
          <View style={styles.tableCol6}>
            <Text></Text>
          </View>
          <View style={styles.tableCol6}>
            <Text></Text>
          </View>
          <View style={styles.tableCol6}>
            <Text></Text>
          </View>
          <View style={styles.tableCol6}>
            <Text> </Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableCol6}>
            <Text>Activiies</Text>
          </View>
          <View style={styles.tableCol6}>
            <Text></Text>
          </View>
          <View style={styles.tableCol6}>
            <Text></Text>
          </View>
          <View style={styles.tableCol6}>
            <Text></Text>
          </View>
          <View style={styles.tableCol6}>
            <Text> </Text>
          </View>
        </View>

        

        {/* Add more rows as needed */}
      </View>
    </Page>
    
    {/* Third page */}
    <Page style={styles.page}>
      {/* kaning view ga contain og logo, ustp, lugar */}
      <View>
        <View>
            {/* diri ang USTP logo */}
        </View>
        <View>
          <View>
            <Text style={styles.headerUSTP}>
              University of Science and Technology of Southern Philippines
            </Text>
          </View>
          <View>
            <Text style={styles.headerCampus}>
              Alubijid | Cagayan de Oro | Claveria | Jasaan | Oroquieta | Panaon
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.table1}>
        <View style={styles.header2}>
          <View style={styles.tableCol3}>
            <Text style={styles.tableCellHeader}>
              Document Code No.
            </Text>
          </View> 
        </View>

        <View style={styles.header2}>
          <View style={styles.tableCol3}>
            <Text style={styles.tableCellHeader}>
              FM-USTP-ECRD-01a
            </Text>
          </View> 
        </View>

        <View style={styles.header2}>
          <View style={styles.tableCol3}>
            <View style={styles.tableRow}>
              <View style={styles.tableCol3}>
                <Text style={styles.tableCellHeader}>
                 Rev. No.
                </Text>
              </View>
              <View style={styles.tableCol3}>
                <Text style={styles.tableCellHeader}>
                 Effective Date
                </Text>
              </View>
              <View style={styles.tableCol3}>
                <Text style={styles.tableCellHeader}>
                 Page No.
                </Text>
              </View>
            </View>

            <View style={styles.tableRow}>
              <View style={styles.tableCol3}>
                <Text style={styles.tableCellHeader}>
                 02
                </Text>
              </View>
              <View style={styles.tableCol3}>
                <Text style={styles.tableCellHeader}>
                 08.01.23
                </Text>
              </View>
              <View style={styles.tableCol3}>
                <Text style={styles.tableCellHeader}>
                 01
                </Text>
              </View>
            </View>
          </View>
        </View>

      </View>

        <View style={styles.tableRow}>
          <View style={styles.tableCol1}>
            <Text> </Text>
            <Text>Monitoring Plan and Schedule</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableCol4}>
            <Text>Monitoring Phase</Text>
          </View>
          <View style={styles.tableCol4}>
            <Text>M & E</Text>
            <Text>Instrument/Approach</Text>
          </View>
          <View style={styles.tableCol4}>
            <Text>Format or Strategy for Data Gathering</Text>
          </View>
          <View style={styles.tableCol4}>
            <Text>Schedule</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableCol4}>
            <Text>Before Project Implementation</Text>
          </View>
          <View style={styles.tableCol4}>
            <Text>*</Text>
          </View>
          <View style={styles.tableCol4}>
            <Text>*</Text>
          </View>
          <View style={styles.tableCol4}>
            <Text>*</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableCol4}>
            <Text>During Project Implementation</Text>
          </View>
          <View style={styles.tableCol4}>
            <Text>*</Text>
          </View>
          <View style={styles.tableCol4}>
            <Text>*</Text>
          </View>
          <View style={styles.tableCol4}>
            <Text>*</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableCol4}>
            <Text>After Project Implementation</Text>
          </View>
          <View style={styles.tableCol4}>
            <Text>*</Text>
          </View>
          <View style={styles.tableCol4}>
            <Text>*</Text>
          </View>
          <View style={styles.tableCol4}>
            <Text>*</Text>
          </View>
        </View>
    </Page>

    {/* forth page */}
    <Page style={styles.page}>
      {/* kaning view ga contain og logo, ustp, lugar */}
      <View>
        <View>
            {/* diri ang USTP logo */}
        </View>
        <View>
          <View>
            <Text style={styles.header1}>
              University of Science and Technology of Southern Philippines
            </Text>
          </View>
          <View>
            <Text style={styles.header1}>
              Alubijid | Cagayan de Oro | Claveria | Jasaan | Oroquieta | Panaon
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.table1}>
        <View style={styles.header2}>
          <View style={styles.tableCol3}>
            <Text style={styles.tableCellHeader}>
              Document Code No.
            </Text>
          </View> 
        </View>

        <View style={styles.header2}>
          <View style={styles.tableCol3}>
            <Text style={styles.tableCellHeader}>
              FM-USTP-ECRD-01a
            </Text>
          </View> 
        </View>

        <View style={styles.header2}>
          <View style={styles.tableCol3}>
            <View style={styles.tableRow}>
              <View style={styles.tableCol3}>
                <Text style={styles.tableCellHeader}>
                 Rev. No.
                </Text>
              </View>
              <View style={styles.tableCol3}>
                <Text style={styles.tableCellHeader}>
                 Effective Date
                </Text>
              </View>
              <View style={styles.tableCol3}>
                <Text style={styles.tableCellHeader}>
                 Page No.
                </Text>
              </View>
            </View>

            <View style={styles.tableRow}>
              <View style={styles.tableCol3}>
                <Text style={styles.tableCellHeader}>
                 02
                </Text>
              </View>
              <View style={styles.tableCol3}>
                <Text style={styles.tableCellHeader}>
                 08.01.23
                </Text>
              </View>
              <View style={styles.tableCol3}>
                <Text style={styles.tableCellHeader}>
                 01
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>

        <View style={styles.tableRow}>
          <View style={styles.tableCol1}>
            <Text> </Text>
            <Text>LOADING OF TRAINERS FOR EXTENSION SERVICES</Text>
            <Text>Project Title:</Text>
            <Text>Partner Agency: </Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableCol4}>
            <Text>Name of Faculty</Text>
          </View>
          <View style={styles.tableCol4}>
            <Text>Training Load</Text>
          </View>
          <View style={styles.tableCol4}>
            <Text>Number of Hours</Text>
          </View>
          <View style={styles.tableCol4}>
            <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
            <Text>Number of Hours</Text>
          </View>
            </View>
            <View style={styles.tableRow}>
            <View style={styles.tableCol2}>
            <Text>Number of Hours</Text>
          </View>
          <View style={styles.tableCol2}>
            <Text>Number of Hours</Text>
          </View>
            </View>
          </View>
          <View style={styles.tableCol4}>
            <Text>Schedule</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableCol4}>
            <Text>*</Text>
          </View>
          <View style={styles.tableCol4}>
            <Text>*</Text>
          </View>
          <View style={styles.tableCol4}>
            <Text>*</Text>
          </View>
          <View style={styles.tableCol4}>
            <View style={styles.tableRow}>
              <View style={styles.tableCol2}>
                <Text>*</Text>
              </View>
              <View style={styles.tableCol2}>
                <Text>*</Text>
              </View>
            </View>
          </View>
          <View style={styles.tableCol4}>
            <Text>*</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableCol1}>
            <Text>Total</Text>
          </View>
          <View style={styles.tableCol}>
            <Text>*</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableCol1}>
            <Text> </Text>
            <Text>Prepared By: </Text>
            <Text>* </Text>
            <Text>Approved: </Text>
            <Text>* </Text>
          </View>
        </View> 
    </Page>
  </Document>
);

export default MyDocument;
