import * as AWS from 'aws-sdk';
import { Table } from 'sst/node/table';
import { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { BinaryLike } from 'crypto';
const s3 = new AWS.S3();
const bucket = 'employee-csv-bucket';
const objectkey = 'employees.csv';
const s3params = { Bucket: bucket, Key: objectkey };
import csv from "csv-parser";
const dynamoDb = new AWS.DynamoDB.DocumentClient();
type Employee = {
    employeeID: number;
    lastName: string;
    firstName: string;
    title: string;
    titleOfCourtesy: string;
    birthDate: string;
    hireDate: string;
    address: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
    homePhone: string;
    extension: string;
    photo: BinaryLike; // Hier könnte der tatsächliche Datentyp angepasst werden (z.B., Buffer für Binärdaten)
    notes: string;
    reportsTo: number | null;
    photoPath: string;
  };
  
export const main: APIGatewayProxyHandlerV2 = async (event) => {
  // Änderung: Laden der CSV-Datei
  const file = s3.getObject(s3params).createReadStream();
//   const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });

  const headers = ['employeeID', 'lastName', 'firstName', 'title', 'titleOfCourtesy', 'birthDate', 'hireDate', 'address', 'city', 'region', 'postalCode', 'country', 'homePhone', 'extension', 'photo', 'notes', 'reportsTo', 'photoPath'];

  const results: Employee[] = [];

  file
  .pipe(csv())
  .on('data', function (data) {
      results.push(data);
  })
  .on('end', () => {
      console.log(results);
    //   callback(null, results);
  });

//   const data = parse(fileContent, {
//     delimiter: ',',
//     columns: headers,
//   }, (error, result: Employee[]) => {
//     if (error) {
//       console.error(error);
//     }
//     console.log("Result", result);
//   });
//   const data = await readCSV(csvFilePath);

  const items = results.map((row) => ({
    employeeID: row.employeeID,
    lastName: row.lastName,
    firstName: row.firstName,
    title: row.title,
    titleOfCourtesy: row.titleOfCourtesy,
    birthDate: row.birthDate, // Hier könnte auch ein spezifischer Datentyp für Datum (z.B., Date) verwendet werden
    hireDate: row.hireDate, // Ebenfalls hier könnte auch ein spezifischer Datentyp für Datum (z.B., Date) verwendet werden
    address: row.address,
    city: row.city,
    region: row.region,
    postalCode: row.postalCode,
    country: row.country,
    homePhone: row.homePhone,
    extension: row.extension,
    photo: row.photo, // Annahme: Binärdaten für ein Bild
    notes: row.notes,
    reportsTo: row.reportsTo, // Annahme: Mitarbeiterberichtslinie, könnte auch einen anderen Datentyp haben
    photoPath: row.photoPath,
  }));

  // Änderung: Verarbeiten mehrerer Elemente und Batch-Schreiben
  const params = {
    RequestItems: {
      [Table.FormTable.tableName]: items.map((item) => ({
        PutRequest: {
          Item: item,
        },
      })),
    },
  };

  await dynamoDb.batchWrite(params).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(items),
  };
};

// Hilfsfunktion zum Lesen der CSV-Datei
// async function readCSV(filePath: string): Promise<any[]> {
//   const data: any[] = [];

//   // Lesen der CSV-Datei
//   await new Promise((resolve) => {
//     fs.createReadStream(filePath)
//       .pipe(csv())
//       .on('data', (row) => {
//         data.push(row);
//       })
//       .on('end', resolve);
//   });

//   return data;
// }
