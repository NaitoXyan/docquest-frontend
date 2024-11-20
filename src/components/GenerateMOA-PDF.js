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
  footer: {
    position: 'absolute',
    bottom: 3,
    right: 3,
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

const CustomPage = ({ children }) => (
  <Page style={styles.page}>
    {children} {/* Render the page content */}
    <View style={styles.footer}>
      <Text render={({ pageNumber }) => `${pageNumber}`} />
    </View>
  </Page>
);

{/* P1 Temporary datas */ }
const userInput1 = "**UNIVERSITY OF SCIENCE AND TECHNOLOGY OF SOUTHERN PHILIPPINES CAGAYAN DE ORO CAMPUS (USTP CDO)**, a state educational institution duly established under Philippine law, whose office address located at Claro M. Recto Avenue, Lapasan, Cagayan de Oro City, represented herein by its Chancellor **ATTY. DIONEL O. ALBINA**, hereafter referred to as the **FIRST PARTY**;";
const userInput2 = "DEPARTMENT OF EDUCATION DIVISION OF CAGAYAN DE ORO CITY, a state educational institution duly established under Philippine law, whose office address located at Fr. William F. Masterson Avenue, Upper Balulang, Cagayan de Oro City Misamis Oriental, represented herein by the School Divisions Superintendent ROY ANGELO E. GAZO, Ph.D., hereafter referred to as the SECOND PARTY;";
const userInput3 = "WHEREAS, the FIRST PARTY has its mission to primarily bring the world of work into the actual higher education and training of students; offer entrepreneurs the opportunity to maximize their business potentials through a gamut of services from product conceptualization to commercialization; and contribute significantly to the National Development Goals of food security and energy sufficiency through technology solutions; ";

{/* P2 Temporary datas */ }
const userInput4 = "Provide the faculty experts who will shall conduct the training on journalism.";
const userInput5 = "Provide the faculty experts who will shall conduct the training on journalism.";
const userInput6 = "This Agreement shall cover CY 2024-2025 and take effect upon the date it is signed by the parties until the completion of the training and research collaboration program.";
const userInput7 = "The parties mutually agree to process personal information and sensitive personal information in conformity with the provisions of Republic Act No. 10173 (Data Privacy Act of 2012) and all other applicable laws and regulations of all the parties regarding data privacy protection laws.Both parties shall ensure that appropriate organizational, physical, and technical measures are in place to maintain the confidentiality, integrity and security of personal information and sensitive personal information that may come to their knowledge or possession by reason of any provision of this MOA and that their employees, agents, representatives, or any person under their authority shall hold said information under strict confidentiality at all times";
const userInput8 = "Either of the parties may terminate this agreement based on a valid ground and after giving 30-day notice to the other party.";

const MyDocument = () => (
  <Document>
    {/* first page */}
    <CustomPage style={styles.page}>
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
        <Text style={[{ textAlign: 'justify', marginBottom: 15, fontFamily: 'TimesNR', textIndent: 39 }]}>
          ☐{parseText(userInput1)}
        </Text>
      </View>
      <View style={[{ alignItems: 'center' }]}>
        <Text style={[{ marginBottom: 15, fontFamily: 'TimesNR', }]}>
          -and-
        </Text>
      </View>
      <View style={[{ alignItems: 'start' }]}>
        <Text style={[{ textAlign: 'justify', marginBottom: 15, fontFamily: 'TimesNR', textIndent: 39 }]}>
          ☐{parseText(userInput2)}
        </Text>
      </View>
      <View style={[{ alignItems: 'center' }]}>
        <Text style={[{ marginBottom: 15, fontFamily: 'TimesNR', }]}>
          Collectively herein referred to as the “PARTIES”
        </Text>
      </View>
      <View style={[{ alignItems: 'center' }]}>
        <Text style={[{ marginBottom: 15, fontFamily: 'TimesNR-B', }]}>
          WITNESSETH THAT:
        </Text>
      </View>
      <View style={[{ alignItems: 'start' }]}>
        <Text style={[{ textAlign: 'justify', marginBottom: 15, fontFamily: 'TimesNR', textIndent: 39 }]}>
          ☐{parseText(userInput3)}
        </Text>
      </View>
    </CustomPage>

    {/* second page */}
    <CustomPage style={styles.page}>
      <View style={[{ alignItems: 'start' }]}>
        <Text style={[{ marginBottom: 15, fontFamily: 'TimesNR-B', }]}>
          {parseText('**NOW THEREFORE**, for and in consideration of the above premises, the **PARTIES** hereby agree to the following:')}

        </Text>
      </View>
      <View style={[{ alignItems: 'start' }]}>
        <Text style={[{ marginBottom: 15, fontFamily: 'TimesNR-B', }]}>
          OBLIGATIONS AND RESPONSIBILITIES of the FIRST PARTY:
        </Text>
      </View>
      <View style={[{ marginLeft: 20, alignItems: 'start' }]}>
        <Text style={[{ marginBottom: 15, fontFamily: 'TimesNR', textAlign: 'justify'}]}>
          1.  {parseText(userInput4)}
        </Text>
      </View>
      <View style={[{ alignItems: 'start' }]}>
        <Text style={[{ marginBottom: 15, fontFamily: 'TimesNR-B', }]}>
          OBLIGATIONS AND RESPONSIBILITIES of the SECOND PARTY:
        </Text>
      </View>
      <View style={[{ marginLeft: 20, alignItems: 'start' }]}>
        <Text style={[{ marginBottom: 15, fontFamily: 'TimesNR', textAlign: 'justify'}]}>
          1.  {parseText(userInput5)}
        </Text>
      </View>
      <View style={[{ alignItems: 'start' }]}>
        <Text style={[{ marginBottom: 15, fontFamily: 'TimesNR-B', }]}>
          COVERAGE and EFFECTIVITY
        </Text>
      </View>
      <View style={[{ alignItems: 'start' }]}>
        <Text style={[{ marginBottom: 15, fontFamily: 'TimesNR', textIndent: 39, textAlign: 'justify'}]}>
          ☐{parseText(userInput6)}
        </Text>
      </View>
      <View style={[{ alignItems: 'start' }]}>
        <Text style={[{ marginBottom: 15, fontFamily: 'TimesNR-B', }]}>
          CONFIDENTIALITY CLAUSE
        </Text>
      </View>
      <View style={[{ alignItems: 'start' }]}>
        <Text style={[{ marginBottom: 15, fontFamily: 'TimesNR', textIndent: 35, textAlign: 'justify'}]}>
          ☐{parseText(userInput7)}
        </Text>
      </View>
      <View style={[{ alignItems: 'start' }]}>
        <Text style={[{ marginBottom: 1, fontFamily: 'TimesNR-B', }]}>
          TERMINATION
        </Text>
      </View>
      <View style={[{}]}>
        <Text style={[{ marginBottom: 0, fontFamily: 'TimesNR', textIndent: 39, textAlign: 'justify'}]}>
          ☐{parseText(userInput8)}
        </Text>
      </View>
    </CustomPage>

    {/* third page */}
    <CustomPage style={styles.page}>
      <View style={[{ alignItems: 'start' }]}>
        <Text style={[{ marginBottom: 20, fontFamily: 'TimesNR-B', textIndent: 39 }]}>
          ☐{parseText('**IN WITNESS WHEREOF**, the parties have hereunto signed this Contract this __ day of ________ 2024 at ________________________, Philippines.')}
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
    </CustomPage>

    {/* forth page */}
    <CustomPage style={styles.page}>
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
      <View style={[{}]}>
        <Text style={[{ marginBottom: 20, fontFamily: 'TimesNR', textIndent: 39 }]}>
          BEFORE ME, a NOTARY PUBLIC for and in ___________________________________ Philippines this _______ day of _________ 2024, personally appeared:
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
        <Text style={[{ marginBottom: 60, fontFamily: 'TimesNR', }]}>
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

    </CustomPage>
  </Document>
);

export default MyDocument;
