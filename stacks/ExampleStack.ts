import { Api, Table, StaticSite, StackContext, Cognito, Function, Bucket } from "sst/constructs";

export function ExampleStack({ stack }: StackContext) {
  // Create the table
  const table = new Table(stack, "Counter", {
    fields: {
      counter: "string",
    },
    primaryIndex: { partitionKey: "counter" },
  });

  const formTable = new Table(stack, "FormTable", {
    fields: 
    {
      id: "string",  
      name: "string",
      birth: "string",
      hobby: "string"
    },
    primaryIndex: { partitionKey: "id", sortKey: "name" },
  });

  const northwindTable = new Table(stack, "NorthwindTable", {
    fields: {
      employeeID: "number",
      lastName: "string",
      firstName: "string",
      title: "string",
      titleOfCourtesy: "string",
      birthDate: "string", // Hier könnte auch ein spezifischer Datentyp für Datum (z.B., Date) verwendet werden
      hireDate: "string", // Ebenfalls hier könnte auch ein spezifischer Datentyp für Datum (z.B., Date) verwendet werden
      address: "string",
      city: "string",
      region: "string",
      postalCode: "string",
      country: "string",
      homePhone: "string",
      extension: "string",
      photo: "binary", // Annahme: Binärdaten für ein Bild
      notes: "string",
      reportsTo: "number", // Annahme: Mitarbeiterberichtslinie, könnte auch einen anderen Datentyp haben
      photoPath: "string",
    },
    primaryIndex: { partitionKey: "employeeID", sortKey: "lastName" }
  });

//  const employeesBucket = new Bucket(stack, "employee-bucket", {
//    name: "employee-csv-bucket"

//  });

  // Create the HTTP API
  const api = new Api(stack, "Api", {
    defaults: {
      function: {
        // Bind the table name to our API
        bind: [table, formTable, northwindTable],
      }
    },
    routes: {
      "POST /": "packages/functions/src/counter.main",
      "POST /form": "packages/functions/src/postContact.main",
      "GET /form": "packages/functions/src/getContact.main",
      "DELETE /form/{id}": "packages/functions/src/deleteContact.main",
      "GET /northwind" : "packages/functions/src/getEmployees.main"
    },
  });

  // Deploy our React app
  const site = new StaticSite(stack, "ReactSite", {
    path: "packages/frontend",
    buildCommand: "npm run build",
    buildOutput: "build",
    environment: {
      REACT_APP_API_URL: api.url,
      REACT_APP_REGION: stack.region,
      // NORTHWIND_TABLE_NAME: northwindTable.tableName
    },
  });

  // Show the URLs in the output
  stack.addOutputs({
    SiteUrl: site.url,
    ApiEndpoint: api.url,
  });
}
