const { Octokit } = require('@octokit/rest');
const Giphy = require('giphy-api');
const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
    try {
                                // Get an input using the getInput function
                                const input = core.getInput('name');

                                // Prepare a greeting message
                                const greeting = `Hello, ${input}!`;
                                core.info(greeting);

                                // Only visible in debug logs
                                core.debug(`Received Input: ${input}`); 

                                // Set the output named `greeting`
                                core.setOutput('greeting', greeting);

                                // Register a secret using the setSecret function
                                core.setSecret(giphy-api-key);
                                core.debug(`Received gipy api key: ${giphy-api-key}`); // Only visible in debug logs

                                // Log messages using the info, notice, warning, and error functions
                                core.info('Information message');
                                core.notice('Notice message');
                                core.warning('Warning message');
                                core.error('Error message');

                                // Check if debugging is enabled using the isDebug function
                                if (core.isDebug()) {
                                  core.debug('Debugging is enabled');
                                }

                                // Start a log group using the startGroup function
                                core.startGroup('testing_group_logs');

                                // Log some messages inside the group
                                core.info('Information message inside group');
                                core.notice('Notice message inside group');
                                core.warning('Warning message inside group');
                                core.error('Error message inside group');

                                // End the log group using the endGroup function
                                core.endGroup();

                                // Add a path to the environment for subsequent steps
                                core.addPath('/custom/path');

                                // Export a variable to the environment
                                core.exportVariable('MY_VAR', 'example_value');

                                // Set summary function
                                //core.summary(`Action greeted ${input}, all explored various action core functions`);
                                core.summary.addRaw(`Action greeted ${input}. Some content here :speech_balloon:`, true)



      const githubToken = core.getInput('github-token');
      const giphyApiKey = core.getInput('giphy-api-key');
  
      const octokit = new Octokit({ auth: githubToken });
      const giphy = Giphy(giphyApiKey);
  
      const context = github.context;
      const { owner, repo, number } = context.issue;

      const prComment = await giphy.random('thank you');
  
      await octokit.issues.createComment({
        owner,
        repo,
        issue_number: number,
        body: `### PR - ${number} \n ### 🎉 Thank you for the contribution! \n ![Giphy](${prComment.data.images.downsized.url}) `
      });
  
      core.setOutput('comment-url', `${prComment.data.images.downsized.url}`);
      console.log(`Giphy GIF comment added successfully! Comment URL: ${prComment.data.images.downsized.url}`);
    } catch (error) {
      // console.error('Error:', error);
    //  core.setFailed('Invalid secret provided!');
      
      // process.exit(1);
    }
  }
  run();