const perform = (z, bundle) => {
  var list_uid = bundle.inputData.list_uid;
  const options = {
    url: 'https://app.hubiomail.net/api/v1/lists/' + list_uid + '/add-field',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-API-TOKEN': bundle.authData.api_token,
    },
    params: {},
    body: {
      api_token: bundle.authData.api_token,
      type: bundle.inputData.type,
      label: bundle.inputData.label,
      tag: bundle.inputData.tag,
      default_value: bundle.inputData.default_value,
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
        dynamic: 'all_lists.uid.name',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'type',
        label: 'Type',
        type: 'string',
        choices: ['text', 'number', 'datetime'],
        required: true,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'label',
        label: 'Label',
        type: 'string',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'tag',
        label: 'Tag',
        type: 'string',
        helpText:
          'The tag name may have alpha-numeric characters, as well as dashes and underscores.',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'default_value',
        label: 'Default Value',
        type: 'string',
        helpText: 'Default value of the field',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
    ],
    sample: {
      status: 1,
      message: "List's field was created",
      field: {
        mail_list_id: 29,
        type: 'text',
        label: 'Consent',
        tag: 'consent',
        uid: '5eecf069e67c7',
        updated_at: '2020-06-19 17:05:45',
        created_at: '2020-06-19 17:05:45',
        id: 1264,
      },
    },
    outputFields: [
      { key: 'status' },
      { key: 'message' },
      { key: 'field__mail_list_id' },
      { key: 'field__type' },
      { key: 'field__label' },
      { key: 'field__tag' },
      { key: 'field__uid' },
      { key: 'field__updated_at' },
      { key: 'field__created_at' },
      { key: 'field__id' },
    ],
  },
  key: 'create_custom_field',
  noun: 'field',
  display: {
    label: 'Add Custom Field',
    description: 'Add custom field to a list in hubiomail',
    hidden: false,
    important: true,
  },
};
