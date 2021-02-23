const perform = (z, bundle) => {
  const options = {
    url: 'https://app.hubiomail.net/api/v1/campaigns?',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      API_TOKEN: bundle.authData.api_token,
    },
    params: {
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
  });
};

module.exports = {
  operation: {
    perform: perform,
    inputFields: [
      {
        key: 'name',
        label: 'Campaign Name',
        type: 'string',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
    ],
    sample: {
      uid: '5eb7bc996ef99',
      name: 'Untitled',
      type: 'regular',
      subject: null,
      html: null,
      plain: null,
      from_email: null,
      from_name: null,
      reply_to: null,
      status: 'new',
      delivery_at: null,
      created_at: '2020-05-10 08:34:33',
      updated_at: '2020-05-15 03:46:26',
    },
    outputFields: [
      { key: 'uid' },
      { key: 'name' },
      { key: 'type' },
      { key: 'subject' },
      { key: 'html' },
      { key: 'plain' },
      { key: 'from_email' },
      { key: 'from_name' },
      { key: 'reply_to' },
      { key: 'status' },
      { key: 'delivery_at' },
      { key: 'created_at' },
      { key: 'updated_at' },
    ],
  },
  key: 'find_campaign',
  noun: 'Campaign',
  display: {
    label: 'Find Campaign',
    description:
      'The action will use to find campaign from list of your campaign',
    hidden: false,
    important: true,
  },
};
