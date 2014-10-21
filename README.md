# Helion Env Node.js

Simple Node.js app to display environment variables.

## Deploy to HP Helion
<a href="https://deploynow.hpcloud.com/?repoUrl=https://github.com/HelionDevPlatform/helion-env">
![Helion  Logo](https://a248.e.akamai.net/cdn.hpcloudsvc.com/g0bc199ab57e65f093a48d069effc0c3b/prodae1//button.png?id=6)
</a>

## Prerequisites
- If you do not have an HP Helion Development Platform Application Lifecycle
  Services Cluster available, please create one before continuing. You will also
  need to install the Helion CLI.

## Deploy the Application

Execute the following commands:

- Open the terminal
- If you are not already there, *cd* to the root directory of the sample. The
  root directory contains the manifest.yml file which helps automate deployment.
- If you have not logged in to your target environment yet, execute the following:

    `helion target https://api.example.com`

    `helion login`

    Enter your Management Console credentials

    `helion push -n`

## View and run the app
- Go to the management console (e.g. https://api.example.com)
- Check the applications link to see a list of your apps.
- Click on the name of the app you just deployed. The app name is specified in
  manifest.yml.
- Click "View App" to see your app in action.

The result when visiting the application page and clicking 'View App' should be
a page with the text "Hello World".
