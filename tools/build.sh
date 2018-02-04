#!/bin/bash

npm run clean 

npm run build-enable
npm run build-disable 

npm run add-icons 

# not working correctly for some unknown reason
# sudo npm run refresh-finder

# not working currently because of 'undefined variable acces' error in create-dmg
# npm run create-dmg
