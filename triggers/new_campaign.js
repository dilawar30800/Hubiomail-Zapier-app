const perform = (z, bundle) => {
  const options = {
    url: 'https://app.hubiomail.net/api/v1/campaigns',
    method: 'GET',
    headers: {
      Accept: 'application/json',
      api_token: bundle.authData.api_token,
    },
    params: {
      api_token: bundle.authData.api_token,
      per_page: 100,
      page: bundle.meta.page,
    },
  };

  return z.request(options).then((response) => {
    response.throwForStatus();
    const results = response.json;

    // You can do any parsing you need for results here before returning them

    //return results;
    return results.map(function (e) {
      e.id = e.uid;
      return e;
    });
  });
};

module.exports = {
  operation: {
    perform: perform,
    type: 'polling',
    canPaginate: true,
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
      updated_at: '2020-06-20 07:41:32',
      id: '5eb7bc996ef99',
    },
    outputFields: [
      { key: 'id' },
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
    ],
    inputFields: [],
  },
  key: 'new_campaign',
  noun: 'Campaign',
  display: {
    label: 'New Campaign',
    description: 'Triggers when new campaign created.',
    hidden: false,
    important: false,
  },
};
