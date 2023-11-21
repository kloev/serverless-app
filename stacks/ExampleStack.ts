import { Api, Table, StaticSite, StackContext, Cognito } from "sst/constructs";

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
  })

  // Create the HTTP API
  const api = new Api(stack, "Api", {
    defaults: {
      function: {
        // Bind the table name to our API
        bind: [table, formTable],
      },
      authorizer: "iam"
    },
    routes: {
      "POST /": {
        function: "packages/functions/src/counter.main",
        authorizer: "none"
      },
      "POST /form": "packages/functions/src/post.main",
      "GET /form": "packages/functions/src/get.main",
      "DELETE /form/{id}": "packages/functions/src/delete.main",
    },
  });

  // Create auth provider
  const auth = new Cognito(stack, "Auth", {
    login: ["email"],

  });

  // Allow authenticated users invoke API
  auth.attachPermissionsForAuthUsers(stack, [api]);

  // Deploy our React app
  const site = new StaticSite(stack, "ReactSite", {
    path: "packages/frontend",
    buildCommand: "npm run build",
    buildOutput: "build",
    environment: {
      REACT_APP_API_URL: api.url,
      REACT_APP_USER_POOL_ID: auth.userPoolId,
      REACT_APP_IDENTITY_POOL_ID: auth.cognitoIdentityPoolId || "",
      REACT_APP_USER_POOL_CLIENT_ID: auth.userPoolClientId,
      REACT_APP_REGION: stack.region
    },
  });

  // Show the URLs in the output
  stack.addOutputs({
    SiteUrl: site.url,
    ApiEndpoint: api.url,
  });
}
