const perform = (z, bundle) => {
  var list_uid = bundle.inputData.list_uid;
  var uid = bundle.inputData.uid;
  const options = {
    url:
      'https://app.hubiomail.net/api/v1/lists/' +
      list_uid +
      '/subscribers/' +
      uid +
      '/unsubscribe',
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-API-TOKEN': bundle.authData.api_token,
    },
    params: {},
    body: {
      api_token: bundle.authData.api_token,
    },
  };

  return z.request(options).then((response) => {
    response.throwForStatus();
    const results = response.json;

    // You can do any parsing you need for results here before returning them

    return results;
  });
};

module.exports = {
  operation: {
    perform: perform,
    inputFields: [
      {
        key: 'list_uid',
        label: 'List',
        type: 'string',
        dynamic: 'all_lists.id.name',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'uid',
        label: 'Subscriber',
        type: 'string',
        dynamic: 'get_subscribers.id.FIRST_NAME',
        required: true,
        list: false,
        altersDynamicFields: true,
      },
    ],
    sample: { status: 1, message: 'Unsubscribed' },
    outputFields: [{ key: 'status' }, { key: 'message' }],
  },
  key: 'create_unsubscribe',
  noun: 'subscriber',
  display: {
    label: 'Remove Subscriber',
    description: 'Remove a Subscriber from a list .',
    hidden: false,
    important: false,
  },
};
