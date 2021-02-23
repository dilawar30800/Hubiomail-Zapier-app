module.exports = {
  operation: {
    perform: {
      url: 'https://app.hubiomail.net/api/v1/lists?',
      method: 'GET',
      params: { api_token: '{{bundle.authData.api_token}}' },
      headers: {
        Accept: 'application/json',
        API_TOKEN: '{{bundle.authData.api_token}}',
      },
      body: {},
      removeMissingValuesFrom: {},
    },
    canPaginate: false,
    sample: { id: 29, uid: '5eb7bce31aa74', name: 'test' },
    outputFields: [{ key: 'id' }, { key: 'uid' }, { key: 'name' }],
  },
  key: 'all_lists',
  noun: 'List',
  display: {
    label: 'Get ALL Lists',
    description: 'this trigger get all lists of the selected account',
    hidden: true,
    important: false,
  },
};
