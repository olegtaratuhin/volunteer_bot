# Volunteer Bot template

This repo contains basic volunteer bot implementation that uses Google Spreadsheets as backend to store everything.

In order to setup the bot you need to get the following values and input them into `src/secrets.ts`:

1. Telegram bot token
2. Google Apps webapp link
3. Spreadsheet id
4. (optional) admin telegram id for debugging

## Spreadsheet layout

Bot uses sheets with specific names and specific headers.

1. Requests - contains data for requested items by volunteers.
2. Logs - contains logs for all user interactions.

