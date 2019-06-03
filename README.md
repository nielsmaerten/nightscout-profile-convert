## Nightscout Profile Convert
_Convert Nightscout profiles to OpenAPS format  
(so you can run Autotune on them)_

### Code example

```javascript
const nsProfileConvert = require("nightscout-profile-convert")
const fetchProfile = nsProfileConvert.fetchProfile
const convertProfile = nsProfileConvert.convertProfile

const my_nightscout_url = "https://my.ns.site"

// Load the default Profile from a Nightscout site
let profile_default = fetchProfile(my_nightscout_url)

// Load a profile by name
let profile_autotune = fetchProfile(my_nightscout_url, "autotune")

// Convert a profile to OpenAPS format
// (!) You have to provide min_5m_carbimpact yourself, 
// (!) since Nightscout profiles don't contain this value.
let openaps_profile = convertProfile(profile_default, /*min_5m_carbimpact*/ 3)
```