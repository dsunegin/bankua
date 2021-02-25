#!/bin/sh

# 1 hours period

pm2 delete fx-bankua
pm2 start index-fx-bankua.js --name fx-bankua --cron "00 */1 * * *"
pm2 save