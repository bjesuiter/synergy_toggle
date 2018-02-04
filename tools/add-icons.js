const plist = require('plist');
const fse = require('fs-extra');
const version = require('project-version');
const path = require('path');

const enableAppPath = 'dist/Enable Synergy.app/Contents';
const disableAppPath = 'dist/Disable Synergy.app/Contents';

const enablePlist = [
    {
        "CFBundleIdentifier": "de.bjesuiter.enable-synergy",
        "CFBundleVersion": version,
        "CFBundleShortVersionString": version,
        "CFBundleName": "Enable Synergy",
        "CFBundleDisplayName": "Enable Synergy",
        "CFBundlePackageType": "APPL",
        "CFBundleIconFile": "AppIcon",
        "CFBundleIconName": "AppIcon"
    }
]

const disablePlist = [
    {
        "CFBundleIdentifier": "de.bjesuiter.disable-synergy",
        "CFBundleVersion": version,
        "CFBundleShortVersionString": version,
        "CFBundleName": "Disable Synergy",
        "CFBundleDisplayName": "Disable Synergy",
        "CFBundlePackageType": "APPL",
        "CFBundleIconFile": "AppIcon",
        "CFBundleIconName": "AppIcon"
    }
]

//write plist files
const enablePromise = fse.writeFile(path.join(enableAppPath, 'Info.plist'), plist.build(enablePlist))
    .then(() => console.log('PList File for "Enable Synergy" App written successfully'));

const disablePromise = fse.writeFile(path.join(disableAppPath, 'Info.plist'), plist.build(disablePlist))
    .then(() => console.log('PList File for "Disable Synergy" App written successfully'));
    
//create Ressource folders
Promise
    .all([
        enablePromise,
        disablePromise,
        fse.mkdirp(path.join(enableAppPath, 'Resources')),
        fse.mkdirp(path.join(disableAppPath, 'Resources'))
    ])
    .then(() => {
        return Promise.all([
            fse.copyFile('res/enable.icns', path.join(enableAppPath, 'Resources', 'AppIcon.icns')),
            fse.copyFile('res/disable.icns', path.join(disableAppPath, 'Resources', 'AppIcon.icns'))
        ])
    })
    .then(() => console.log('Icons & PList Files successfully created'))
    .catch((err) => {
        console.error('Error while creating Icons and PList Files for Apps:');
        console.error(err);
    });


