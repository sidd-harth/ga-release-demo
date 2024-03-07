const core = require('@actions/core');

// Define inputs using the getInput function
const nameInput = core.getInput('name', { required: true });
const secretPhoneInput = core.getInput('phone', { required: true });
const inputCountry = core.getInput('country', { required: true });

// Check if debug mode is enabled
if (core.isDebug()) {
  core.info('This Action is running in debug mode.');
  core.debug('This Action is running in debug mode.');
}
core.info("================================================");

// Prepare a greeting message
const greeting = `Hello, ${nameInput}, your phone number is ${secretPhoneInput}`;
// Log messages using the info, notice, warning, and error functions
core.info(`Information message: ${greeting}`);
core.notice(`Notice message: ${greeting}`);
core.warning(`Warning message: ${greeting}`);
core.error(`Error message: ${greeting}`);

core.info("================================================");

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
        core.exportVariable('JS_ACTION_PHONE_VAR', "+91"+secretPhoneInput);
        break;
    case 'canada':
      //const phoneNumber = "+1" + secretPhoneInput;
      // Export a variable to the environment
      core.exportVariable('JS_ACTION_PHONE_VAR', "1"+secretPhoneInput);
        break;
    default:
      core.exportVariable('JS_ACTION_PHONE_VAR', secretPhoneInput);

  // Log a notice and summary
  core.summary(`Action greeted ${nameInput}, set the "greeting" output, and added a path and variable to the environment.`);
}
}

core.info("================================================");

// Register a secret using the setSecret function
core.info(`Received Phone Number: ${secretPhoneInput}`); 
core.setSecret(secretPhoneInput);
core.info(`MASKED Received Phone Number: ${secretPhoneInput}`);
