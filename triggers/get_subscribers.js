const perform = (z, bundle) => {
  var list_uid = bundle.inputData.list_uid;
  const options = {
    url: 'https://app.hubiomail.net/api/v1/lists/' + list_uid + '/subscribers',
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'X-API-TOKEN': bundle.authData.api_token,
    },
    params: {
      api_token: bundle.authData.api_token,
      per_page: 1000,
      page: bundle.meta.page,
    },
  };

  return z.request(options).then((response) => {
    response.throwForStatus();
    const results = response.json;

    // You can do any parsing you need for results here before returning them

    return results.map(function (e) {
      (e.id = e.uid), (e.Name = e.FIRST_NAME + ' ' + e.LAST_NAME);
      return e;
    });
  });
};

module.exports = {
  operation: {
    perform: perform,
    inputFields: [
      {
        key: 'list_uid',
        type: 'string',
        label: 'List',
        dynamic: 'all_lists.id.name',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
    ],
    canPaginate: true,
    sample: {
      uid: '5ebad8b0eeb11',
      email: 'bayevtural@gmail.com',
      status: 'subscribed',
      FIRST_NAME: '',
      LAST_NAME: '',
      consent: '',
      id: '5ebad8b0eeb11',
      Name: ' ',
    },
    outputFields: [
      { key: 'uid' },
      { key: 'email' },
      { key: 'status' },
      { key: 'FIRST_NAME' },
      { key: 'LAST_NAME' },
      { key: 'consent' },
      { key: 'id' },
      { key: 'Name' },
    ],
  },
  key: 'get_subscribers',
  noun: 'subscriber',
  display: {
    label: 'Get All Subscriber',
    description: 'Get All subscriber form hubiomail',
    hidden: true,
    important: false,
  },
};
