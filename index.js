const core = require('@actions/core');

// Define inputs using the getInput function
const nameInput = core.getInput('name', { required: true });
const secretPhoneInput = core.getInput('phone', { required: true });
const inputCountry = core.getInput('country', { required: true });

// Check if debug mode is enabled
if (core.isDebug()) {
  core.info('This Action is running in debug mode.');
}

// Prepare a greeting message
const greeting = `Hello, ${nameInput}, your phone number is ${secretPhoneInput}`;
// Log messages using the info, notice, warning, and error functions
core.info(`Information message: ${greeting}`);
core.notice(`Notice message: ${greeting}`);
core.warning(`Warning message: ${greeting}`);
core.error(`Error message: ${greeting}`);

// Set the output named `customized_greeting`
core.setOutput('customized_greeting', greeting);

// Simulate an error scenario
if (secretPhoneInput.length !== 10) {
  core.error(`Error message - provided phone number is invalid  - ${secretPhoneInput}`);
  //core.setFailed('Invalid phone number provided!');
} else {
  switch (inputCountry) {
    case 'india':
        //const phoneNumber = "+91" + secretPhoneInput;
        // Export a variable to the environment
        core.exportVariable('JS_ACTION_PHONE_VAR', "91");
        break;
    case 'canada':
      //const phoneNumber = "+1" + secretPhoneInput;
      // Export a variable to the environment
      core.exportVariable('JS_ACTION_PHONE_VAR', "1");
        break;
    default:
        console.log('Positive value other than 1 or 2');

  // Log a notice and summary
  core.notice('Action executed successfully.');
  core.summary(`Action greeted ${nameInput}, set the "greeting" output, and added a path and variable to the environment.`);
}
}
// Register a secret using the setSecret function
core.info(`Received Phone Number: ${secretPhoneInput}`); 
core.debug(`Received Phone Number: ${secretPhoneInput}`); 
core.setSecret(secretPhoneInput);
core.info(`Secret Phone Number: ${secretPhoneInput}`);
core.debug(`Secret gipy api key: ${secretPhoneInput}`); // Only visible in debug logs