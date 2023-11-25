/* eslint-disable */

import axios from 'axios';

module.exports = async function () {
  axios.defaults.baseURL = process.env['COMPENDIUM_API_URL'];
  // Never throw so errors can be tested easier
  axios.defaults.validateStatus = () => true;
};
