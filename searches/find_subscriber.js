const perform = (z, bundle) => {
  const options = {
    url:
      'https://app.hubiomail.net/api/v1/subscribers/email/' +
      bundle.inputData.email,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
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

    return [results];
  });
};

module.exports = {
  operation: {
    perform: perform,
    inputFields: [
      {
        key: 'email',
        label: 'Email',
        type: 'string',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
    ],
    sample: {
      subscribers: [
        {
          uid: '5ebe11fb8bbf2',
          list_uid: '5ebab376499cb',
          email: 'g@hubio.io',
          status: 'subscribed',
          source: null,
          ip_address: null,
          FIRST_NAME: '',
          LAST_NAME: '',
        },
      ],
    },
    outputFields: [
      { key: 'subscribers[]uid' },
      { key: 'subscribers[]list_uid' },
      { key: 'subscribers[]email' },
      { key: 'subscribers[]status' },
      { key: 'subscribers[]source' },
      { key: 'subscribers[]ip_address' },
      { key: 'subscribers[]FIRST_NAME' },
      { key: 'subscribers[]LAST_NAME' },
    ],
  },
  key: 'find_subscriber',
  noun: 'Subscriber',
  display: {
    label: 'Find Subscriber',
    description: 'This will find the subscriber by email',
    hidden: false,
    important: true,
  },
};
