const URL = require("url").URL;
const fetch = require("node-fetch");

module.exports = async (nsUrl, profileName, includeAll) => {
  let profileUrl = new URL("api/v1/profile.json", nsUrl);
  let response = await fetch(profileUrl);
  let profileData = await response.json();

  if (includeAll) {
    return profileData;
  }

  if (profileData.length === 1) {
    profileData = profileData[0];
    profileName = profileName || profileData.defaultProfile;

    if (profileData.store[profileName] === undefined) {
      throw new Error("No profile found with name " + profileName);
    }
    return profileData.store[profileName];
  } else {
    throw new Error("No profiles found");
  }
};
