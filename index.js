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
const greeting = `Hello ${nameInput}, your phone number is ${secretPhoneInput}`;
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
        // Export a variable to the environment
        core.exportVariable('JS_ACTION_PHONE_VAR', "+91"+secretPhoneInput);
        break;
    case 'canada':
        core.exportVariable('JS_ACTION_PHONE_VAR', "+1"+secretPhoneInput);
        break;
    default:
        core.exportVariable('JS_ACTION_PHONE_VAR', secretPhoneInput);
  }
}

core.info("================================================");

// Register a secret using the setSecret function
core.info(`Received Phone Number: ${secretPhoneInput}`); 
core.setSecret(secretPhoneInput);
core.info(`MASKED Received Phone Number: ${secretPhoneInput}`);

function generateTestResults() {
  // ... your logic here ...
  return 'Test results go here';
}

core.summary
  .addHeading('Test Results')
  .addCodeBlock(generateTestResults(), 'js')
  .addTable([
    [{ data: 'File', header: true }, { data: 'Result', header: true }],
    ['foo.js', 'Pass'],
    ['bar.js', 'Fail'],
    ['test.js', 'Pass']
  ])
  .addLink('View staging deployment!', '[7](https://github.com)')
  .write();