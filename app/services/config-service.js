'use strict';

const config = require('../configs/' + (process.env.ENV || 'dev'));


function getDBConnectionURI() {
  return config.MONGO_URI + config.MONGO_DB;
}

function getServerUrl() {
  return config.SERVER_URL;
}

function getAppSessionName() {
  return config.APP_SESSION_NAME;
}

function getAppSessionSecret() {
  return config.APP_SESSION_SECRET;
}

function getGoogleClientId() {
  return config.GOOGLE_CLIENT_ID;
}

function getGoogleClientSecret() {
  return config.GOOGLE_CLIENT_SECRET;
}

function getFacebookClientId() {
  return config.FACEBOOK_CLIENT_ID;
}

function getFacebookClientSecrect() {
  return config.FACEBOOK_CLIENT_SECRET;
}

function getGitHubClientId() {
  return config.GIT_HUB_CLIENT_ID;
}

function getGitHubClientSecrect() {
  return config.GIT_HUB_CLIENT_SECRET;
}

function getByKey(key) {
  return config[key];
}

exports.getDBConnectionURI = getDBConnectionURI;
exports.getServerUrl = getServerUrl;
exports.getAppSessionName = getAppSessionName;
exports.getAppSessionSecret = getAppSessionSecret;
exports.getGoogleClientId = getGoogleClientId;
exports.getGoogleClientSecret = getGoogleClientSecret;
exports.getFacebookClientId = getFacebookClientId;
exports.getFacebookClientSecrect = getFacebookClientSecrect;
exports.getGitHubClientId = getGitHubClientId;
exports.getGitHubClientSecrect = getGitHubClientSecrect;
exports.get = getByKey;
