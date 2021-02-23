const perform = (z, bundle) => {
  var list_id = bundle.inputData.list_uid;
  if (bundle.inputData.hasOwnProperty('list_uid')) {
    // true
    delete bundle.inputData['list_uid'];
  }
  const options = {
    url:
      'https://app.hubiomail.net/api/v1/lists/' +
      list_id +
      '/subscribers/store',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    params: {
      api_token: bundle.authData.api_token,
    },
    body: bundle.inputData,
    // body:
    // {
    //   "email":bundle.inputData.email
    // }
  };

  return z.request(options).then((response) => {
    response.throwForStatus();
    const results = response.json;

    // You can do any parsing you need for results here before returning them

    return results;
  });

  //return {options:options,inputData:bundle.inputData}
};

const getInputFields = (z, bundle) => {
  // Configure a request to an endpoint of your api that
  // returns custom field meta data for the authenticated
  // user.  Don't forget to congigure authentication!
  var list_uid = bundle.inputData.list_uid;
  const options = {
    url: 'https://app.hubiomail.net/api/v1/lists/' + list_uid,
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
    params: {
      api_token: bundle.authData.api_token,
    },
    body: {},
  };

  return z.request(options).then((response) => {
    response.throwForStatus();
    const results = response.json;

    // modify your api response to return an array of Field objects
    // see https://github.com/zapier/zapier-platform/blob/master/packages/schema/docs/build/schema.md#fieldschema
    // for schema definition.

    return results.list.fields.map(function (e) {
      //delete e.label,
      delete e.type,
        delete e.tag,
        delete e.default_value,
        delete e.visible,
        //  delete e.required,
        delete e.custom_order;
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
        label: 'List Name',
        type: 'string',
        dynamic: 'all_lists.uid.name',
        required: true,
        list: false,
        altersDynamicFields: true,
      },
      getInputFields,
    ],
    sample: {
      status: 1,
      message: 'Confirmation email sent to the subscriber',
      subscriber_uid: '5ebab9bd613d8',
    },
    outputFields: [
      { key: 'status', type: 'integer' },
      { key: 'message' },
      { key: 'subscriber_uid' },
    ],
  },
  key: 'create_subscriber',
  noun: 'subscriber',
  display: {
    label: 'Create New Subscriber',
    description: 'this action will create new action in hubiomail',
    hidden: false,
    important: true,
  },
};
