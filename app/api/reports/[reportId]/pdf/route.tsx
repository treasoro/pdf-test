import { Page, Text, View, Document, StyleSheet, renderToStream } from '@react-pdf/renderer';
import { NextResponse } from 'next/server';

const styles = StyleSheet.create({
  page: { 
    display: 'flex',
    justifyContent: 'space-between',
    padding: 50
  },
  section: {
    marginBottom: 40
  },
  header: {
    fontSize: 18,
    marginBottom: 8
  },
  text: {
    fontSize: 14,
    marginBottom: 6
  },
  title: {
    fontSize: 22,
    marginBottom: 6,
  },
  date: {
    fontSize: 14,
    marginBottom: 8
  },
  status: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    width: 50,
    color: 'white',
    fontSize: 12,
    paddingHorizontal: 4,
    paddingVertical: 4,
    backgroundColor: 'blue',
    borderRadius: 99,
  },
  value: {
    fontSize: 26,
    marginBottom: 10
  }
});

interface ReportProps {
    report: {
      id: number;
      name: string;
      dateCreated: number;
      value: number;
      description: string;
      status: string;
      customer: {
        name: string;
        email: string;
      }
    };
  }

const Report = ({ report }: ReportProps) => {
  return (
    <Document>
      <Page style={styles.page}>
        <View>
          <View style={styles.section}>
            <Text style={styles.title}>Invoice { report.id }</Text>
            <Text style={styles.date}>{ new Date(report.dateCreated).toLocaleDateString() }</Text>
            <Text style={styles.status}>{ report.status.toUpperCase() }</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.value}>${ report.value / 100 }</Text>
            <Text style={styles.text}>{ report.description }</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.header}>Billed To</Text>
            <Text style={styles.text}>Name: { report.customer.name }</Text>
            <Text style={styles.text}>Email: { report.customer.email }</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.header}>Payment Details</Text>
            <Text style={styles.text}>Bank of the Universe</Text>
            <Text style={styles.text}>1234567890</Text>
            <Text style={styles.text}>0987654321</Text>
          </View>
        </View>
        <View>
          <Text style={styles.text}>Colby Fayock</Text>
          <Text style={styles.text}>hello@colbyfayock.com</Text>
        </View>
      </Page>
    </Document>
  )
}

export async function GET(request: Request, { params }: { params: { invoiceId: string; }}) {
  const report = {
    id: 1,
    name: 'Sample Invoice',
    dateCreated: Date.now(),
    value: 1234,
    description: 'This is a sample invoice.',
    status: 'open',
    customer: {
      name: 'John Smith',
      email: 'john@smith.com'
    }
  };
  const stream = await renderToStream(<Report report={report} />);
  return new NextResponse(stream as unknown as ReadableStream)
}