import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { PDFViewer } from '@react-pdf/renderer';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

Font.register({
  family: 'TimesNR',
  src: '/fonts/tnr.TTF',
});
Font.register({
  family: 'TimesNR-B',
  src: '/fonts/tnrb.TTF',
});
const styles = StyleSheet.create({
  page: {
    fontFamily: 'TimesNR',
    fontSize: 12,
    padding: 52,
    flexDirection: 'column',
  },
  rowNormal: {
    flexDirection: 'row',
    border: 'solid',
    borderWidth: 1,
  },
  footer: {
    position: 'absolute',
    bottom: 50,
    right: 60,
    fontFamily: 'TimesNR',
    fontSize: 12,
  },
  centered: {
    alignItems: 'center',
  },
  start: {
    alignItems: 'start',
  },
  boldCenter: {
    marginBottom: 15,
    fontFamily: 'TimesNR-B',
    textAlign: 'center',
  },
  boldStart: {
    marginBottom: 15,
    fontFamily: 'TimesNR-B',
  },
  regularCenter: {
    marginBottom: 15,
    fontFamily: 'TimesNR',
    textAlign: 'center',
  },
  justifiedIndent: {
    textAlign: 'justify',
    marginBottom: 15,
    fontFamily: 'TimesNR',
    textIndent: 39,
  },
  signatureSplit: {
    marginBottom: 20,
    flexDirection: 'row',
    fontFamily: 'TimesNR-B',
  },
});

const parseText = (text) => {
  // Check if text is null or undefined
  if (!text) {
    return null; // or return an empty array, or handle it as appropriate for your use case
  }

  const parts = text.split(/(\*\*.*?\*\*)/); // Matches text enclosed in ** **    
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      // Render bold text       
      return (
        <Text key={index} style={{ fontFamily: 'TimesNR-B' }}>
          {part.slice(2, -2)} {/* Remove the ** markers */}
        </Text>
      );
    }
    // Render regular text     
    return <Text key={index}>{part}</Text>;
  });
};



const CustomPage = ({ children }) => (
  <Page style={styles.page}>
    {children}
    <View style={styles.footer}>
      <Text render={({ pageNumber }) => `${pageNumber}`} />
    </View>
  </Page>
);

// MOA Document Component
const MOADocument = ({ data }) => {
  if (!data) return null;

  const {
    partyADescription,
    partyBDescription,
    partyCDescription,
    coverageAndEffectivity,
    confidentialityClause,
    termination,
    witnesseth,
    partyObligation,
    firstParty,
    secondParty,
    thirdParty,
    witnesses
  } = data;

  const chunkArray = (array, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const witnessChunks = chunkArray(witnesses, 2);

  const numberToWords = (num) => {
    const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
    const teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];

    if (num < 10) return ones[num];
    if (num < 20) return teens[num - 10];
    return tens[Math.floor(num / 10)] + (num % 10 ? '-' + ones[num % 10] : '');
  };

  return (
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
        <View style={[]}>
          <Text style={[{ textAlign: 'justify', marginBottom: 15, fontFamily: 'TimesNR', textIndent: 39 }]}>
            ☐{parseText(partyADescription)}
          </Text>
        </View>
        <Text style={[{ textAlign: 'center', marginBottom: 15, fontFamily: 'TimesNR' }]}>
          -and-
        </Text>
        <View style={[]}>
          <Text style={[{ textAlign: 'justify', marginBottom: 15, fontFamily: 'TimesNR', textIndent: 39 }]}>
            ☐{parseText(partyBDescription)}
          </Text>
        </View>
        {partyCDescription && (
          <View>
            <Text style={[{ textAlign: 'center', marginBottom: 15, fontFamily: 'TimesNR' }]}>
              -and-
            </Text>
            <View style={[]}>
              <Text style={[{ textAlign: 'justify', marginBottom: 15, fontFamily: 'TimesNR', textIndent: 39 }]}>
                ☐{parseText(partyCDescription)}
              </Text>
            </View>
          </View>
        )}
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
          {witnesseth.map((item, index) => (
            <Text key={index} style={[{ textAlign: 'justify', marginBottom: 15, fontFamily: 'TimesNR', textIndent: 39 }]}>
              {item.whereas}
            </Text>
          ))}
        </View>
      </CustomPage>

      {/* second page */}
      <CustomPage style={styles.page}>
        <View style={[{ alignItems: 'start' }]}>
          <Text style={[{ marginBottom: 15, fontFamily: 'TimesNR', }]}>
            {parseText('**NOW THEREFORE**, for and in consideration of the above premises, the **PARTIES** hereby agree to the following:')}

          </Text>
        </View>
        {partyObligation.length > 0 && (
          <>
            {/* Render Party A Obligations */}
            <View style={[{ alignItems: 'start' }]}>
              <Text style={[{ marginBottom: 15, fontFamily: 'TimesNR-B', }]}>
                OBLIGATIONS AND RESPONSIBILITIES of the FIRST PARTY:
              </Text>
            </View>

            {partyObligation
              .filter((obligation) => obligation.party === "party A")
              .map((obligation, index) => (
                <Text
                  key={obligation.poID}
                  style={{
                    marginBottom: 2,
                    fontFamily: 'TimesNR',
                    textAlign: 'justify',
                    paddingHorizontal: 20
                  }}
                >
                  {index === 0 && <Text></Text>}
                  {index + 1}.  {obligation.obligation}
                </Text>
              ))}
            <View style={[{ marginBottom: 15 }]}></View>

            <View style={[{ alignItems: 'start' }]}>
              <Text style={[{ marginBottom: 15, fontFamily: 'TimesNR-B', }]}>
                OBLIGATIONS AND RESPONSIBILITIES of the SECOND PARTY:
              </Text>
            </View>

            {partyObligation
              .filter((obligation) => obligation.party === "party B")
              .map((obligation, index) => (
                <Text
                  key={obligation.poID}
                  style={{
                    marginBottom: 2,
                    fontFamily: 'TimesNR',
                    textAlign: 'justify',
                    paddingHorizontal: 20
                  }}
                >
                  {index === 0 && <Text></Text>}
                  {index + 1}.  {obligation.obligation}
                </Text>
              ))}
            <View style={[{ marginBottom: 15 }]}></View>
            {partyCDescription && (
              <View>
                <View style={[{ alignItems: 'start' }]}>
                  <Text style={[{ marginBottom: 15, fontFamily: 'TimesNR-B', }]}>
                    OBLIGATIONS AND RESPONSIBILITIES of the THIRD PARTY:
                  </Text>
                </View>
                {partyObligation
                  .filter((obligation) => obligation.party === "party C")
                  .map((obligation, index) => (
                    <Text
                      key={obligation.poID}
                      style={{
                        marginBottom: 2,
                        fontFamily: 'TimesNR',
                        textAlign: 'justify',
                        paddingHorizontal: 20
                      }}
                    >
                      {index === 0 && <Text></Text>}
                      {index + 1}.  {obligation.obligation}
                    </Text>
                  ))}
                <View style={[{ marginBottom: 15 }]}></View>
              </View>
            )}
          </>
        )}
        <View style={[{ alignItems: 'start' }]}>
          <Text style={[{ marginBottom: 15, fontFamily: 'TimesNR-B', }]}>
            COVERAGE and EFFECTIVITY
          </Text>
        </View>
        <View style={[{ alignItems: 'start' }]}>
          <Text style={[{ marginBottom: 15, fontFamily: 'TimesNR', textIndent: 39, textAlign: 'justify' }]}>
            {coverageAndEffectivity}
          </Text>
        </View>
        <View style={[{ alignItems: 'start' }]}>
          <Text style={[{ marginBottom: 15, fontFamily: 'TimesNR-B', }]}>
            CONFIDENTIALITY CLAUSE
          </Text>
        </View>
        <View style={[{ alignItems: 'start' }]}>
          <Text style={[{ marginBottom: 15, fontFamily: 'TimesNR', textIndent: 35, textAlign: 'justify' }]}>
            {confidentialityClause}
          </Text>
        </View>
        <View style={[{ alignItems: 'start' }]}>
          <Text style={[{ marginBottom: 1, fontFamily: 'TimesNR-B', }]}>
            TERMINATION
          </Text>
        </View>
        <View style={[{}]}>
          <Text style={[{ marginBottom: 0, fontFamily: 'TimesNR', textIndent: 39, textAlign: 'justify' }]}>
            {termination}
          </Text>
        </View>
      </CustomPage>

      {/* third page */}
      <CustomPage style={styles.page}>
        <View style={[{ alignItems: 'start' }]}>
          <Text style={[{ marginBottom: 20, textIndent: 39 }]}>
            ☐{parseText('**IN WITNESS WHEREOF**, the parties have hereunto signed this Contract this __ day of ________ 2024 at ________________________, Philippines.')}
          </Text>
        </View>
        <View style={[{ marginBottom: 12, flexDirection: 'row', fontFamily: 'TimesNR-B' }]}>
          <View style={[{ width: '50%' }]}>
            <Text>
              FIRST PARTY:
            </Text>
          </View>
          <View style={[{ width: '50%' }]}>
            <Text>
              SECOND PARTY:
            </Text>
          </View>
        </View>
        <View style={[{ marginBottom: 20, flexDirection: 'row' }]}>
          <View style={[{ width: '50%' }]}>
            {firstParty.map((party, index) => (
              <View key={index}>
                <Text style={[{ fontFamily: 'TimesNR-B' }]}>{party.name}</Text>
                <Text>{party.title}</Text>
              </View>
            ))}
          </View>
          <View style={[{ width: '50%' }]}>
            {secondParty.map((party, index) => (
              <View key={index}>
                <Text style={[{ fontFamily: 'TimesNR-B' }]}>{party.name}</Text>
                <Text>{party.title}</Text>
              </View>
            ))}
          </View>
        </View>

        {partyCDescription && (
          <View>
            <View style={[{ marginBottom: 12, flexDirection: 'row', fontFamily: 'TimesNR-B' }]}>
              <Text>
                THIRD PARTY:
              </Text>
            </View>
            <View style={[{ marginBottom: 20, flexDirection: 'row' }]}>
              <View style={[{ width: '50%' }]}>
                {thirdParty.map((party, index) => (
                  <View key={index}>
                    <Text style={[{ fontFamily: 'TimesNR-B' }]}>{party.name}</Text>
                    <Text>{party.title}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        )}
        <View style={[{ alignItems: 'center' }]}>
          <Text style={[{ marginBottom: 20, fontFamily: 'TimesNR-B', }]}>
            WITNESSES:
          </Text>
        </View>
        <View style={{ marginBottom: 20, fontFamily: 'TimesNR-B' }}>
          {witnessChunks.map((chunk, rowIndex) => (
            <View
              key={rowIndex}
              style={{
                flexDirection: 'row',
                marginBottom: 10, // Adjust spacing between rows
              }}
            >
              {chunk.map((witness, index) => (
                <View
                  key={index}
                  style={{
                    width: '50%', // Each witness takes 50% of the row width
                  }}
                >
                  <Text style={[{ fontFamily: 'TimesNR' }]}>{witness.name}</Text>
                  <Text>{witness.title}</Text>
                </View>
              ))}
            </View>
          ))}
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
        <View style={[styles.rowNormal, { borderTop: 0, height: 30, fontFamily: 'TimesNR-B' }]}>
          <View style={[{ justifyContent: 'center', width: '40%', paddingHorizontal: 4, borderRight: 1, borderStyle: 'solid' }]}>
            {firstParty.map((party, index) => (
              <View key={index}>
                <Text>{party.name}</Text>
              </View>
            ))}
          </View>
          <View style={[{ justifyContent: 'center', textAlign: 'center', width: '30%', paddingHorizontal: 2, borderRight: 1, borderStyle: 'solid' }]}>
            <Text></Text>
          </View>
          <View style={[{ justifyContent: 'center', textAlign: 'center', width: '30%', paddingHorizontal: 2 }]}>
            <Text></Text>
          </View>
        </View>
        <View style={[styles.rowNormal, { borderTop: 0, height: 30, fontFamily: 'TimesNR-B' }]}>
          <View style={[{ justifyContent: 'center', width: '40%', paddingHorizontal: 4, borderRight: 1, borderStyle: 'solid' }]}>
            {secondParty.map((party, index) => (
              <View key={index}>
                <Text>{party.name}</Text>
              </View>
            ))}
          </View>
          <View style={[{ justifyContent: 'center', textAlign: 'center', width: '30%', paddingHorizontal: 2, borderRight: 1, borderStyle: 'solid' }]}>
            <Text></Text>
          </View>
          <View style={[{ justifyContent: 'center', textAlign: 'center', width: '30%', paddingHorizontal: 2 }]}>
            <Text></Text>
          </View>
        </View>
        {partyCDescription && (
          <View style={[styles.rowNormal, { borderTop: 0, height: 30, fontFamily: 'TimesNR-B' }]}>
            <View style={[{ justifyContent: 'center', width: '40%', paddingHorizontal: 4, borderRight: 1, borderStyle: 'solid' }]}>
              {thirdParty.map((party, index) => (
                <View key={index}>
                  <Text>{party.name}</Text>
                </View>
              ))}
            </View>
            <View style={[{ justifyContent: 'center', textAlign: 'center', width: '30%', paddingHorizontal: 2, borderRight: 1, borderStyle: 'solid' }]}>
              <Text></Text>
            </View>
            <View style={[{ justifyContent: 'center', textAlign: 'center', width: '30%', paddingHorizontal: 2 }]}>
              <Text></Text>
            </View>
          </View>
        )}
        <View style={[{marginBottom: 20}]}></View>
        <View style={[{}]}>
          <Text
            style={[{ textAlign: 'justify', marginBottom: 20, fontFamily: 'TimesNR' }]}
            render={({ pageNumber }) => {
              const content = `Known to me to be the same persons who executed the foregoing MEMORANDUM OF AGREEMENT consisting of **${numberToWords(pageNumber)} (${pageNumber}) pages**, including the pages wherein this Acknowledgement is written, signed by the parties and their respective witnesses on each and every page hereof, and they acknowledge to me that the same is their free and voluntary act and deed, as well as those of the entities they respectively represent.`;
              return parseText(content);
            }}
          />
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
            Series of {new Date().getFullYear()}.
          </Text>

        </View>

      </CustomPage>
    </Document>
  );
};

// Main Component
const ProjLeadViewMoa = () => {
  const { moaID } = useParams();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get token from localStorage or wherever you store it
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data using moaID:", moaID);
        const response = await axios({
          method: 'get',
          url: `http://127.0.0.1:8000/get_moa/${moaID}/`,
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
          }
        });
        console.log("Fetched data:", response.data);
        setFormData(response.data);
        setLoading(false);
        console.log("form data:", formData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [moaID, token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!formData) {
    return <div>No MOA data found</div>;
  }

  return (
    <PDFViewer style={{ width: '100%', height: '100vh' }}>
      <MOADocument data={formData} />
    </PDFViewer>
  );
};

export default ProjLeadViewMoa;