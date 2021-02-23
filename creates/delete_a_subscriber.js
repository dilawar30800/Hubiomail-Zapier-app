const perform = (z, bundle) => {
  var list_uid = bundle.inputData.list_uid;
  var uid = bundle.inputData.uid;
  const options = {
    url:
      'https://app.hubiomail.net/api/v1/lists/' +
      list_uid +
      '/subscribers/' +
      uid +
      '/delete',
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-API-TOKEN': bundle.authData.api_token,
    },
    params: {
      api_token: bundle.authData.api_token,
    },
    body: {
      list_uid: bundle.inputData.list_uid,
      uid: bundle.inputData.uid,
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
        altersDynamicFields: true,
      },
      {
        key: 'uid',
        label: 'SUbscriber',
        type: 'string',
        dynamic: 'get_subscribers.uid.email',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
    ],
    sample: { status: 1, message: 'Deleted' },
    outputFields: [{ key: 'status' }, { key: 'message' }],
  },
  key: 'delete_a_subscriber',
  noun: 'subscriber',
  display: {
    label: 'Delete Subscriber',
    description: 'Delete a subscriber from hubiomail system',
    hidden: false,
    important: false,
  },
};
