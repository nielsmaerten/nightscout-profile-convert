import test from "ava";
const nsToOpenAPS = require("../index");

const fetchProfile = nsToOpenAPS.fetchProfile;
const convertProfile = nsToOpenAPS.convertProfile;

const NIGHTSCOUT_TEST_URL = "https://my-nightscout-url";

test("Load Nightscout profile by name", async t => {
  let profile = await fetchProfile(NIGHTSCOUT_TEST_URL, "Backup");
  t.true(Array.isArray(profile.basal));
  t.is(profile.basal[0].value, "0.8");
});

test("Load default profile from Nightscout", async t => {
  let profile = await fetchProfile(NIGHTSCOUT_TEST_URL);
  t.true(Array.isArray(profile.basal));
  t.is(profile.basal[0].value, "0.71");
});

test("Convert a Nightscout profile to OpenAPS format", async t => {
  let nsProfile = await fetchProfile(NIGHTSCOUT_TEST_URL);
  let profile = convertProfile(nsProfile, 10);
  t.log(profile);

  t.true(!isNaN(profile.dia));
  t.true(!isNaN(profile.min_5m_carbimpact));
  t.true(typeof profile.timezone === "string");
  t.assert(profile.timezone.length > 1);

  t.true(profile.store === undefined);
});
