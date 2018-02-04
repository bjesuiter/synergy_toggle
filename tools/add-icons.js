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
        "CFBundleDisplayName": "Enable Synergy",
        "CFBundlePackageType": "APPL",
        "CFBundleIconFile": "enable",
        "CFBundleIconName": "enable"
    }
]

const disablePlist = [
    {
        "CFBundleIdentifier": "de.bjesuiter.disable-synergy",
        "CFBundleVersion": version,
        "CFBundleDisplayName": "Disable Synergy",
        "CFBundlePackageType": "APPL",
        "CFBundleIconFile": "disable",
        "CFBundleIconName": "disable"
    }
]

//write plist files
fse.writeFile(path.join(enableAppPath, 'Info.plist'), plist.build(enablePlist))
    .then(() => console.log('PList File for "Enable Synergy" App written successfully'));

fse.writeFile(path.join(disableAppPath, 'Info.plist'), plist.build(disablePlist))
    .then(() => console.log('PList File for "Disable Synergy" App written successfully'));

//create Ressource folders
Promise
    .all([
        fse.mkdirp(path.join(enableAppPath, 'Ressources')),
        fse.mkdirp(path.join(disableAppPath, 'Ressources'))
    ])
    .then(() => {
        return Promise.all([
            fse.copyFile('res/enable.icns', path.join(enableAppPath, 'Ressources')),
            fse.copyFile('res/disable.icns', path.join(disablePlist, 'Ressources'))
        ])
    })
    .then(() => console.log('Icons & PList Files successfully created'))
    .catch((err) => {
        console.error('Error while creating Icons and PList Files for Apps');
        console.error(err);
    });


