// secretManager.js
//const { SecretManagerServiceClient } = require("@google-cloud/secret-manager");
//require("dotenv").config();

//const client = new SecretManagerServiceClient();

//async function getSecret(name) {
//  const [version] = await client.accessSecretVersion({
//    name: `projects/${process.env.GCP_PROJECT_ID}/secrets/${name}/versions/latest`,
//    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
//  });
//  return version.payload.data.toString("utf8");
//}

//module.exports = { getSecret };

const { SecretManagerServiceClient } = require("@google-cloud/secret-manager");
require("dotenv").config();

let client;

async function initializeSecretManagerClient() {
  const secretsClient = new SecretManagerServiceClient();

  // Fetch the service account JSON key from Secret Manager
  const [version] = await secretsClient.accessSecretVersion({
    name: `projects/${process.env.GCP_PROJECT_ID}/secrets/${process.env.SERVICE_ACCOUNT_SECRET_NAME}/versions/latest`,
  });

  const serviceAccountJson = version.payload.data.toString("utf8");

  // Initialize the Secret Manager client with the service account key
  client = new SecretManagerServiceClient({
    credentials: JSON.parse(serviceAccountJson),
  });
}

async function getSecret(name) {
  if (!client) {
    await initializeSecretManagerClient();
  }

  const [version] = await client.accessSecretVersion({
    name: `projects/${process.env.GCP_PROJECT_ID}/secrets/${name}/versions/latest`,
  });
  return version.payload.data.toString("utf8");
}

module.exports = { getSecret };
