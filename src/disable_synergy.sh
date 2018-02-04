#!/usr/bin/env bash

# Option for enabling and disabling the Service will come in 2018
launchctl unload /Library/LaunchAgents/com.symless.synergy.synergy-service.plist

# deactivated because this does not work in final mac app because of sudo
#sudo killall synergy-core