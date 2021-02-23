const perform = (z, bundle) => {
  const options = {
    url: 'https://app.hubiomail.net/api/v1/lists',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-API-ENDPOINT': bundle.authData.api_endpoint,
      'X-API-TOKEN': bundle.authData.api_token,
    },
    params: {
      name: bundle.inputData.name,
      api_endpoint: bundle.authData.api_endpoint,
      api_token: bundle.authData.api_token,
    },
  };

  return z.request(options).then((response) => {
    response.throwForStatus();
    const results = response.json;

    // You can do any parsing you need for results here before returning them
    var result = [];
    var length = results.length;
    for (var i = 0; i < length; i++) {
      if (results[i]['name'] == bundle.inputData.name) {
        result.push(results[i]);
      }
    }
    return result;
    //return results;
  });
};

module.exports = {
  operation: {
    perform: perform,
    inputFields: [
      {
        key: 'name',
        label: 'List Name',
        type: 'string',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
    ],
    sample: {
      id: 34,
      uid: '5eba2ab8f32fd',
      name: 'test dilawar3',
      default_subject: '',
      from_email: 'dilawar@gesttest.com',
      from_name: 'dilawar tesgin',
      created_at: '2020-05-12 04:48:57',
      updated_at: '2020-05-12 04:48:57',
    },
    outputFields: [
      { key: 'id', type: 'number' },
      { key: 'uid' },
      { key: 'name' },
      { key: 'default_subject' },
      { key: 'from_email' },
      { key: 'from_name' },
      { key: 'created_at' },
      { key: 'updated_at' },
    ],
  },
  key: 'find_list',
  noun: 'list',
  display: {
    label: 'Find List',
    description: 'This action will find list from db by its list name.',
    hidden: false,
    important: true,
  },
};
