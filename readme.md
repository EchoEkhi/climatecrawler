# Web Crawler for Abingdon School

This is a web crawler for Abingdon School 3rd Year Environmental Service.

Data is crawled from various government or local projects and stored in a spreadsheet on a daily basis.

## Setup and Install

`npm i`

Register for a Google Service Account and set up relevant privileges for Sheets API, and obtain `creds.json` and place into project root.

Setup Crontab. Example:
`5 10 * * * node <project dir>`