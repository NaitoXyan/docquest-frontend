import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Document, Page, View, Text, Image, StyleSheet, Font } from '@react-pdf/renderer';


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
  const [projectData, setProjectData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/get_project/3/', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token 91d69e4cc1ff356353488851fa2db69efa1a1f0a',
      },
    })
    .then(response => {
      setProjectData(response.data);
    })
    .catch(error => {
      console.error("There was an error fetching the project data!", error);
    });
  }, []);

  if (!projectData) {
    return <Text>Loading...</Text>;  // Loading state
  }

  return (
    <Document>
      <Page style={styles.page}>
        {/* Header section */}
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

        {/* Example of fetched data */}
        <Text>Project Title: {projectData.projectTitle}</Text>
        <Text>Proponents: {projectData.proponents.map(p => p.proponent).join(", ")}</Text>
        <Text>Program: {projectData.program}</Text>
        <Text>Accreditation Level: {projectData.accreditationLevel}</Text>
        <Text>College: {projectData.college}</Text>
        <Text>Target Groups/Beneficiaries: {projectData.beneficiaries}</Text>
        <Text>Project Location: {projectData.projectLocationID.barangay.barangay}</Text>
        <Text>Partner Agency: {projectData.agency.map(a => a.agencyName).join(", ")}</Text>
        <Text>Target Date of Implementation: {projectData.targetImplementation}</Text>
        <Text>Total Budget: {projectData.totalBudget}</Text>

        {/* Example table for budget */}
        <View style={[{ flexDirection: 'row', border: 1, borderBottom: 0 }]}>
          <View style={[styles.tableColthree, { borderRight: 1 }]}>
            <Text>USTP Budget: {projectData.budgetaryRequirements[0]?.ustpAmount}</Text>
          </View>
          <View style={[styles.tableColthree, { borderRight: 1 }]}>
            <Text>Partner Budget: {projectData.budgetaryRequirements[0]?.partnerAmount}</Text>
          </View>
          <View style={[styles.tableColthree]}>
            <Text>Total Budget: {projectData.budgetaryRequirements[0]?.totalAmount}</Text>
          </View>
        </View>

        {/* Signature Section */}
        <View style={[{ border: 1, paddingLeft: '20%', paddingRight: '20%' }]}>
          <Text>Submitted by:</Text>
          <Text style={[{ textAlign: 'center', textDecoration: 'underline', paddingTop: 5, paddingBottom: 5 }]}>
            {projectData.proponents[0]?.proponent}
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default MyDocument;
