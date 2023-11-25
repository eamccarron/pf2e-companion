import axios from 'axios';

/* eslint-disable */
var __TEARDOWN_MESSAGE__: string;

module.exports = async function () {
  // Start services that that the app needs to run (e.g. database, docker-compose, etc.).
  console.log('\nSetting up...\n');

  let apiReady = false;

  while (!apiReady) {
    try {
      await axios.get(process.env['COMPENDIUM_API_URL']);
      apiReady = true;
      break;
    } catch (err) {
      console.log('Failed to connect to compendium-api, retrying...');
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  console.log(
    'Successfully connected to compendium-api at: ',
    process.env['COMPENDIUM_API_URL']
  );

  globalThis.__TEARDOWN_MESSAGE__ = '\nTearing down...\n';
};
