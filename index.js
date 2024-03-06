const { Octokit } = require('@octokit/rest');
const Giphy = require('giphy-api');
const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
    try {
                                // Get an input using the getInput function
                                const input = core.getInput('name');
                                core.info(`Input received: ${input}`);

                                // Set an output using the setOutput function
                                core.setOutput('output_name', 'output_value');

                                // Export a variable using the exportVariable function
                                core.exportVariable('variable_name', 'variable_value');

                                // Add a path using the addPath function
                                core.addPath('/path/to/tool');

                                // Register a secret using the setSecret function
                                core.setSecret('secret_name');

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
                                core.startGroup('group_name');

                                // Log some messages inside the group
                                core.info('Information message inside group');
                                core.notice('Notice message inside group');
                                core.warning('Warning message inside group');
                                core.error('Error message inside group');

                                // End the log group using the endGroup function
                                core.endGroup();


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
      console.error('Error:', error);
      process.exit(1);
    }
  }
  run();