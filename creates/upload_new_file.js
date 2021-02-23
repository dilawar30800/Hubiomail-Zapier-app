const perform = (z, bundle) => {
  var files;
  if (
    bundle.inputData.subdirectory == null ||
    bundle.inputData.subdirectory == ''
  ) {
    files =
      '[{"url":"' +
      bundle.inputData.url +
      '","subdirectory":"path/' +
      bundle.inputData.subdirectory +
      '"}]';
  } else {
    files =
      '[{"url":"' +
      bundle.inputData.url +
      '","subdirectory":"path/' +
      bundle.inputData.subdirectory +
      '"}]';
  }
  const options = {
    url: 'https://app.hubiomail.net/api/v1/file/upload',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-API-TOKEN': bundle.authData.api_token,
    },
    params: {
      api_token: bundle.authData.api_token,
    },
    body: {
      files: files,
    },
  };

  return z.request(options).then((response) => {
    response.throwForStatus();
    const results = response.json;

    // You can do any parsing you need for results here before returning them

    return results[0];
  });
};

module.exports = {
  operation: {
    perform: perform,
    inputFields: [
      {
        key: 'url',
        label: 'URL',
        type: 'string',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'subdirectory',
        label: 'Subdirectory',
        type: 'string',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
    ],
    sample: {
      file:
        'http://www.addurlguide.com/wp-content/uploads/2019/08/C0079-41.jpg',
      status: 0,
      message: 'The same file name already exists',
    },
    outputFields: [{ key: 'file' }, { key: 'status' }, { key: 'message' }],
  },
  key: 'upload_new_file',
  noun: 'file',
  display: {
    label: 'Upload File',
    description:
      'Upload file to a specific Direcotry by default it will go to root folder',
    hidden: false,
    important: false,
  },
};
