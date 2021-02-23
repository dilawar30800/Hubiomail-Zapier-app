const perform = (z, bundle) => {
  const options = {
    url:
      'https://app.hubiomail.net/api/v1/lists/' +
      bundle.inputData.list_uid +
      '/subscribers',
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'X-API-ENDPOINT': bundle.authData.api_endpoint,
      'X-API-TOKEN': bundle.authData.api_token,
    },
    params: {
      api_token: bundle.authData.api_token,
    },
  };

  return z.request(options).then((response) => {
    response.throwForStatus();
    const results = response.json;

    // You can do any parsing you need for results here before returning them

    results.map(function (e) {
      e.id = e.uid;
      return e;
    });

    var result = [];
    var length = results.length;
    for (var i = 0; i < length; i++) {
      if (results[i].hasOwnProperty('status')) {
        if (results[i]['status'] == 'subscribed') {
          result.push(results[i]);
        }
      }
    }
    return result;
    //return results;
  });
};

module.exports = {
  operation: {
    perform: perform,
    canPaginate: false,
    inputFields: [
      {
        key: 'list_uid',
        type: 'string',
        label: 'Select List',
        dynamic: 'all_lists.uid.name',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
    ],
    sample: {
      uid: '5ebe11fb8bbf2',
      email: 'g@hubio.io',
      status: 'subscribed',
      FIRST_NAME: '',
      LAST_NAME: '',
      id: '5ebe11fb8bbf2',
    },
    outputFields: [
      { key: 'uid' },
      { key: 'email' },
      { key: 'status' },
      { key: 'FIRST_NAME' },
      { key: 'LAST_NAME' },
      { key: 'id' },
    ],
  },
  key: 'new_subscriber',
  noun: 'Subscriber',
  display: {
    label: 'New Subscriber',
    description: 'Triggers when new subscriber add to a list.',
    hidden: false,
    important: true,
  },
};
