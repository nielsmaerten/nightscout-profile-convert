// Forked from https://github.com/peterleimbach/tune4autotune/
// Copyright: Peter Leimbach

module.exports = (inputProfile, min_5m_carbimpact) => {
  // Clone the profile
  let jsonProfile = Object.assign({}, inputProfile);

  // min_5m_carbimpact is not in NS and needs to be provided by the user
  jsonProfile.min_5m_carbimpact = min_5m_carbimpact;
  if (!min_5m_carbimpact) {
    throw new Error("min_5m_carbimpact not provided");
  }

  // convert the string from NS into a number
  jsonProfile.dia = parseInt(jsonProfile.dia);

  // drop some unnecessary fields
  delete jsonProfile.units;
  delete jsonProfile.startDate;
  delete jsonProfile.target_high;
  delete jsonProfile.target_low;
  delete jsonProfile.carbs_hr;
  delete jsonProfile.delay;

  // Set safe autosens limits so autotune will make many small adjustments,
  // rather than one big leap
  jsonProfile.autosens_min = 0.7;
  jsonProfile.autosens_max = 1.2;

  // rename field basal into basalprofile
  jsonProfile.basalprofile = jsonProfile.basal;
  // drop the field basal
  delete jsonProfile.basal;

  // for all basalprofile entries rename and recalculate fields
  for (i = 0; i < jsonProfile.basalprofile.length; i++) {
    jsonProfile.basalprofile[i].start =
      jsonProfile.basalprofile[i].time + ":00";
    delete jsonProfile.basalprofile[i].time;
    jsonProfile.basalprofile[i].minutes =
      jsonProfile.basalprofile[i].timeAsSeconds / 60;
    delete jsonProfile.basalprofile[i].timeAsSeconds;
    jsonProfile.basalprofile[i].rate = jsonProfile.basalprofile[i].value;
    delete jsonProfile.basalprofile[i].value;
  }

  // rename carb_ratio into carbratio and move field in structure
  jsonProfile.carb_ratio = jsonProfile.carbratio[0].value * 1;
  delete jsonProfile.carbratio;

  // create isfProfile
  jsonProfile.isfProfile = {};
  jsonProfile.isfProfile.sensitivities = [{}];
  jsonProfile.isfProfile.sensitivities[0].i = 0;
  jsonProfile.isfProfile.sensitivities[0].start = "00:00:00";
  jsonProfile.isfProfile.sensitivities[0].sensitivity =
    jsonProfile.sens[0].value * 1;
  jsonProfile.isfProfile.sensitivities[0].offset = 0;
  jsonProfile.isfProfile.sensitivities[0].x = 0;
  jsonProfile.isfProfile.sensitivities[0].endOffset = 1440;
  delete jsonProfile.sens;

  return jsonProfile;
};
