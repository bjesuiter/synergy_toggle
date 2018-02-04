#!/bin/bash

touch 'dist/Disable Synergy.app'
touch 'dist/Enable Synergy.app'

sudo killall Finder
sudo killall Dock