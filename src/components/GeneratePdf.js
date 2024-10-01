import React from 'react';
import { Document, Page, View, Text, Image, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    fontSize: 10,
    padding: 30,
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCol: {
    width: '25%', // Adjust column width according to the number of columns
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
  },
  tableCellHeader: {
    backgroundColor: '#f2f2f2',
    padding: 5,
    fontWeight: 'bold',
  },
  tableCell: {
    padding: 5,
  },
});

const MyDocument = () => (
  <Document>
    <Page style={styles.page}>
      {/* kaning view ga contain og logo, ustp, lugar */}
      <View>
        <View>
            {/* diri ang USTP logo */}
        </View>
        <View>
          <View>
            <Text>
              University of Science and Technology of Southern Philippines
            </Text>
          </View>
          <View>
            <Text>
              Alubijid | Cagayan de Oro | Claveria | Jasaan | Oroquieta | Panaon
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.table}>

        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCellHeader}>
              Document Code No.
            </Text>
          </View> 
        </View>

        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCellHeader}>
              FM-USTP-ECRD-01a
            </Text>
          </View> 
        </View>

        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCellHeader}>
                 Rev. No.
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCellHeader}>
                 Effective Date
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCellHeader}>
                 Page No.
                </Text>
              </View>
            </View>

            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCellHeader}>
                 02
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCellHeader}>
                 08.01.23
                </Text>
              </View>
              <View style={styles.tableCol}>
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
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCellHeader}>Column 1</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCellHeader}>Column 2</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCellHeader}>Column 3</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCellHeader}>Column 4</Text>
          </View>
        </View>

        {/* Table Row */}
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Row 1, Col 1</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Row 1, Col 2</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Row 1, Col 3</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Row 1, Col 4</Text>
          </View>
        </View>

        {/* Table Row */}
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Row 2, Col 1</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Row 2, Col 2</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Row 2, Col 3</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Row 2, Col 4</Text>
          </View>
        </View>

        {/* Add more rows as needed */}
      </View>
    </Page>
  </Document>
);

export default MyDocument;
