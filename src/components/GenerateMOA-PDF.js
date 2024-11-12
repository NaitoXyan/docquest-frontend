import React from 'react';
import { Document, Page, View, Text, Image, StyleSheet, Font } from '@react-pdf/renderer';

Font.register({
  family: 'TimesNR',
  src: 'fonts/tnr.TTF',
});
Font.register({
  family: 'TimesNR-B',
  src: 'fonts/tnrb.TTF',
});

const styles = StyleSheet.create({
  page: {
    fontFamily: 'TimesNR',
    fontSize: 12,
    padding: 52,
    flexDirection: 'column',
  },
  boldText: {
    fontFamily: 'TimesNR-B',
  },
  regularText: {
    fontFamily: 'TimesNR',
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

const parseText = (input) => {
  const parts = input.split(/(\*\*.*?\*\*)/g); // Split text around **bold** markers
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <Text key={index} style={styles.boldText}>
          {part.replace(/\*\*/g, '')} {/* Remove ** markers */}
        </Text>
      );
    }
    return (
      <Text key={index} style={styles.regularText}>
        {part}
      </Text>
    );
  });
};
{/* P1 Temporary datas */ }
const userInput1 = "**UNIVERSITY OF SCIENCE AND TECHNOLOGY OF SOUTHERN PHILIPPINES CAGAYAN DE ORO CAMPUS (USTP CDO)**, a state educational institution duly established under Philippine law, whose office address located at Claro M. Recto Avenue, Lapasan, Cagayan de Oro City, represented herein by its Chancellor **ATTY. DIONEL O. ALBINA**, hereafter referred to as the **FIRST PARTY**;";
const userInput2 = "DEPARTMENT OF EDUCATION DIVISION OF CAGAYAN DE ORO CITY, a state educational institution duly established under Philippine law, whose office address located at Fr. William F. Masterson Avenue, Upper Balulang, Cagayan de Oro City Misamis Oriental, represented herein by the School Divisions Superintendent ROY ANGELO E. GAZO, Ph.D., hereafter referred to as the SECOND PARTY;";
const userInput3 = "WHEREAS, the FIRST PARTY has its mission to primarily bring the world of work into the actual higher education and training of students; offer entrepreneurs the opportunity to maximize their business potentials through a gamut of services from product conceptualization to commercialization; and contribute significantly to the National Development Goals of food security and energy sufficiency through technology solutions; ";

{/* P2 Temporary datas */ }
const userInput4 = "Provide the faculty experts who will shall conduct the training on journalism.";
const userInput5 = "Either of the parties may terminate this agreement based on a valid ground and after giving 30-day notice to the other party.";

const MyDocument = () => (
  <Document>
    {/* first page */}
    <Page style={styles.page}>
      <View style={[{ alignItems: 'center' }]}>
        <Text style={[{ marginBottom: 15, fontFamily: 'TimesNR-B', }]}>
          MEMORANDUM OF AGREEMENT
        </Text>
      </View>
      <View style={[{ alignItems: 'start' }]}>
        <Text style={[{ marginBottom: 15, fontFamily: 'TimesNR-B', }]}>
          KNOW ALL MEN BY THESE PRESENTS:
        </Text>
      </View>
      <View style={[{ alignItems: 'center' }]}>
        <Text style={[{ marginBottom: 15, fontFamily: 'TimesNR', }]}>
          This Memorandum of Agreement executed and entered into by and between:
        </Text>
      </View>
      <View style={[{ alignItems: 'center' }]}>
        <Text style={[{ textAlign: 'justify', marginBottom: 0, fontFamily: 'TimesNR', }]}>
          {"\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"}{parseText(userInput1)}
        </Text>
      </View>
      <View style={[{ alignItems: 'center' }]}>
        <Text style={[{ marginBottom: 15, fontFamily: 'TimesNR', }]}>
          -and-
        </Text>
      </View>
      <View style={[{ alignItems: 'start' }]}>
        <Text style={[{ textAlign: 'justify', marginBottom: 15, fontFamily: 'TimesNR', }]}>
          {"\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"}{parseText(userInput2)}
        </Text>
      </View>
      <View style={[{ alignItems: 'center' }]}>
        <Text style={[{ marginBottom: 15, fontFamily: 'TimesNR-B', }]}>
          WITNESSETH THAT:
        </Text>
      </View>
      <View style={[{ alignItems: 'start' }]}>
        <Text style={[{ textAlign: 'justify', marginBottom: 15, fontFamily: 'TimesNR', }]}>
          {"\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"}{parseText(userInput3)}
        </Text>
      </View>
    </Page>

    {/* second page */}
    <Page style={styles.page}>
      <View style={[{ alignItems: 'start' }]}>
        <Text style={[{ marginBottom: 1, fontFamily: 'TimesNR-B', }]}>
          OBLIGATIONS AND RESPONSIBILITIES of the FIRST PARTY:
        </Text>
      </View>
      <View style={[{ marginLeft: 20, alignItems: 'start' }]}>
        <Text style={[{ marginBottom: 15, fontFamily: 'TimesNR', }]}>
          1.  {parseText(userInput4)}
        </Text>
      </View>
      <View style={[{ alignItems: 'start' }]}>
        <Text style={[{ marginBottom: 1, fontFamily: 'TimesNR-B', }]}>
          OBLIGATIONS AND RESPONSIBILITIES of the SECOND PARTY:
        </Text>
      </View>
      <View style={[{ marginLeft: 20, alignItems: 'start' }]}>
        <Text style={[{ marginBottom: 15, fontFamily: 'TimesNR', }]}>
          1.  {parseText(userInput4)}
        </Text>
      </View>
      <View style={[{ marginLeft: 20, alignItems: 'start' }]}>
        <Text style={[{ marginBottom: 15, fontFamily: 'TimesNR', }]}>
          Coordination between the Parties shall be maintained for the success of the program.
        </Text>
      </View>
      <View style={[{ alignItems: 'start' }]}>
        <Text style={[{ marginBottom: 1, fontFamily: 'TimesNR-B', }]}>
          EFFECTIVITY
        </Text>
      </View>
      <View style={[{ alignItems: 'start' }]}>
        <Text style={[{ marginBottom: 15, fontFamily: 'TimesNR', }]}>
          1. {parseText(userInput4)}
        </Text>
      </View>
      <View style={[{ alignItems: 'start' }]}>
        <Text style={[{ marginBottom: 1, fontFamily: 'TimesNR-B', }]}>
          TERMINATION
        </Text>
      </View>
      <View style={[{ alignItems: 'center' }]}>
        <Text style={[{ marginBottom: 0, fontFamily: 'TimesNR', }]}>
          {"\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"}{parseText(userInput5)}
        </Text>
      </View>
    </Page>

    {/* third page */}
    <Page style={styles.page}>
      <View style={[{ alignItems: 'start' }]}>
        <Text style={[{ marginBottom: 20, fontFamily: 'TimesNR-B', }]}>
          IN WITNESS WHEREOF, the PARTIES have hereunto signed this Contract this __ day of ______ 2024.
        </Text>
      </View>
      <View style={[{ marginBottom: 20, flexDirection: 'row', fontFamily: 'TimesNR-B' }]}>
        <View style={[styles.tableColtwo, {}]}>
          <Text>
            FIRST PARTY:
          </Text>
        </View>
        <View style={[styles.tableColtwo, {}]}>
          <Text>
            SECOND PARTY:
          </Text>
        </View>
      </View>
      <View style={[{ marginBottom: 20, flexDirection: 'row', fontFamily: 'TimesNR-B' }]}>
        <View style={[styles.tableColtwo, {}]}>
          <Text>
            ATTY. DIONEL O ALBINA
          </Text>
          <Text style={[{ fontFamily: 'TimesNR' }]}>
            Chancellor, USTP CDO
          </Text>
        </View>
        <View style={[styles.tableColtwo, {}]}>
          <Text>
            ATTY. DIONEL O ALBINA
          </Text>
          <Text style={[{ fontFamily: 'TimesNR' }]}>
            Chancellor, USTP CDO
          </Text>
        </View>
      </View>
      <View style={[{ alignItems: 'center' }]}>
        <Text style={[{ marginBottom: 20, fontFamily: 'TimesNR-B', }]}>
          WITNESSES:
        </Text>
      </View>
      <View style={[{ marginBottom: 20, flexDirection: 'row', fontFamily: 'TimesNR-B' }]}>
        <View style={[styles.tableColtwo, {}]}>
          <Text>
            ATTY. DIONEL O ALBINA
          </Text>
          <Text style={[{ fontFamily: 'TimesNR' }]}>
            Chancellor, USTP CDO
          </Text>
        </View>
        <View style={[styles.tableColtwo, {}]}>
          <Text>
            ATTY. DIONEL O ALBINA
          </Text>
          <Text style={[{ fontFamily: 'TimesNR' }]}>
            Chancellor, USTP CDO
          </Text>
        </View>
      </View>
    </Page>

    {/* forth page */}
    <Page style={styles.page}>
      <View style={[{ alignItems: 'center' }]}>
        <Text style={[{ marginBottom: 20, fontFamily: 'TimesNR-B', }]}>
          ACKNOWLEDGEMENT
        </Text>
      </View>
      <View style={[{ alignItems: 'start' }]}>
        <Text style={[{ fontFamily: 'TimesNR', }]}>
          Republic of the Philippines      )
        </Text>
      </View>
      <View style={[{ alignItems: 'start' }]}>
        <Text style={[{ marginBottom: 40, fontFamily: 'TimesNR', }]}>
          City of Cagayan de Oro            )     S. S.
        </Text>
      </View>
      <View style={[{ alignItems: 'center' }]}>
        <Text style={[{ marginBottom: 20, fontFamily: 'TimesNR', }]}>
          {"\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"}BEFORE ME, a NOTARY PUBLIC for and in ___________________________________ Philippines this _______ day of _________ 2024, personally appeared:
        </Text>
      </View>
      <View style={styles.rowNormal}>
        <View style={[{ justifyContent: 'center', textAlign: 'center', width: '40%', paddingHorizontal: 2, borderRight: 1, borderStyle: 'solid' }]}>
          <Text>Name</Text>
        </View>
        <View style={[{ justifyContent: 'center', textAlign: 'center', width: '30%', paddingHorizontal: 2, borderRight: 1, borderStyle: 'solid' }]}>
          <Text>Competent Evidence of Identity</Text>
        </View>
        <View style={[{ justifyContent: 'center', textAlign: 'center', width: '30%', paddingHorizontal: 2 }]}>
          <Text>Date and Place of Issue</Text>
        </View>
      </View>
      <View style={[styles.rowNormal, { borderTop: 0, marginBottom: 20 }]}>
        <View style={[{ justifyContent: 'center', textAlign: 'center', width: '40%', paddingHorizontal: 2, borderRight: 1, borderStyle: 'solid' }]}>
          <Text>*</Text>
        </View>
        <View style={[{ justifyContent: 'center', textAlign: 'center', width: '30%', paddingHorizontal: 2, borderRight: 1, borderStyle: 'solid' }]}>
          <Text>*</Text>
        </View>
        <View style={[{ justifyContent: 'center', textAlign: 'center', width: '30%', paddingHorizontal: 2 }]}>
          <Text>*</Text>
        </View>
      </View>
      <View style={[{}]}>
        <Text style={[{ textAlign: 'justify', marginBottom: 20, fontFamily: 'TimesNR', }]}>
          Known to me to be the same persons who executed the foregoing MEMORANDUM OF AGREEMENT consisting of four pages, including the pages wherein this Acknowledgement is written, signed by the parties and their respective witnesses on each and every page hereof, and they acknowledge to me that the same is their free and voluntary act and deed, as well as those of the entities they respectively represent.
        </Text>
      </View>
      <View style={[{ alignItems: 'flex-end' }]}>
        <Text style={[{ marginBottom: 20, fontFamily: 'TimesNR', }]}>
          WITNESS MY HAND AND NOTARIAL SEAL on the date and place first above written.
        </Text>
      </View>
      <View style={[{ alignItems: 'flex-end' }]}>
        <Text style={[{ marginBottom: 20, fontFamily: 'TimesNR-B', marginRight: 80 }]}>
          NOTARY PUBLIC
        </Text>
      </View>
      <View style={{ position: 'absolute', bottom: 100, left: 52 }}>
        <Text style={{ fontFamily: 'TimesNR', fontSize: 12 }}>
          Doc. No. _____;
        </Text>
        <Text style={{ fontFamily: 'TimesNR', fontSize: 12 }}>
          Page No. _____;
        </Text>
        <Text style={{ fontFamily: 'TimesNR', fontSize: 12 }}>
          Book No._____;
        </Text>
        <Text style={{ fontFamily: 'TimesNR', fontSize: 12 }}>
          Series of 2024.
        </Text>
      </View>

    </Page>
  </Document>
);

export default MyDocument;
