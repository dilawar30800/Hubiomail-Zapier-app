require('should');

const zapier = require('zapier-platform-core');

const App = require('../../index');
const appTester = zapier.createAppTester(App);

describe('Trigger - all_lists', () => {
  zapier.tools.env.inject();

  it('should get an array', async () => {
    const bundle = {
      authData: {
        api_token: process.env.API_TOKEN,
        oauth_consumer_key: process.env.OAUTH_CONSUMER_KEY,
        oauth_consumer_secret: process.env.OAUTH_CONSUMER_SECRET,
        oauth_token: process.env.OAUTH_TOKEN,
        oauth_token_secret: process.env.OAUTH_TOKEN_SECRET,
      },

      inputData: {},
    };

    const results = await appTester(
      App.triggers['all_lists'].operation.perform,
      bundle
    );
    results.should.be.an.Array();
  });
});
