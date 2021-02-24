#!/bin/sh

# 6 hours period

pm2 delete fx-bankua
pm2 start index-fx-bankua.js --name fx-bankua --cron "00 */6 * * *"
pm2 save