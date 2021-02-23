module.exports = {
  type: 'custom',
  test: {
    url: 'https://mail.hubiomail.com/api/v1/lists',
    method: 'GET',
    params: {
      api_endpoint: '{{bundle.authData.api_endpoint}}',
      api_token: '{{bundle.authData.api_token}}',
    },
    headers: {
      'X-API-ENDPOINT': '{{bundle.authData.api_endpoint}}',
      'X-API-TOKEN': '{{bundle.authData.api_token}}',
    },
    body: {},
    removeMissingValuesFrom: {},
  },
  fields: [
    {
      computed: false,
      key: 'api_token',
      required: true,
      label: 'Api Token',
      type: 'string',
      helpText:
        'Go to the [API Details](https://mail.hubiomail.com/account/api) screen from your\nWebsite Dashboard Account to find your API Key and API endpoint. ',
    },
  ],
  customConfig: {},
  connectionLabel: '{{name}} - {{type}}',
};
