#!/bin/sh

# 1 hours period

pm2 delete fx-bankua-tomorrow
PERIOD=tomorrow pm2 start index-fx-bankua.js --name fx-bankua-tomorrow --cron "00 */1 * * *"
pm2 save