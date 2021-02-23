const authentication = require('./authentication');
const newCampaignTrigger = require('./triggers/new_campaign.js');
const newSubscriberTrigger = require('./triggers/new_subscriber.js');
const allListsTrigger = require('./triggers/all_lists.js');
const newListTrigger = require('./triggers/new_list.js');
const newUnsubscriberTrigger = require('./triggers/new_unsubscriber.js');
const getSubscribersTrigger = require('./triggers/get_subscribers.js');
const createSubscriberCreate = require('./creates/create_subscriber.js');
const createListCreate = require('./creates/create_list.js');
const createCustomFieldCreate = require('./creates/create_custom_field.js');
const createUnsubscribeCreate = require('./creates/create_unsubscribe.js');
const deleteASubscriberCreate = require('./creates/delete_a_subscriber.js');
const uploadNewFileCreate = require('./creates/upload_new_file.js');
const findListSearch = require('./searches/find_list.js');
const findCampaignSearch = require('./searches/find_campaign.js');
const findSubscriberSearch = require('./searches/find_subscriber.js');

module.exports = {
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,
  creates: {
    [createSubscriberCreate.key]: createSubscriberCreate,
    [createListCreate.key]: createListCreate,
    [createCustomFieldCreate.key]: createCustomFieldCreate,
    [createUnsubscribeCreate.key]: createUnsubscribeCreate,
    [deleteASubscriberCreate.key]: deleteASubscriberCreate,
    [uploadNewFileCreate.key]: uploadNewFileCreate,
  },
  authentication: authentication,
  triggers: {
    [newCampaignTrigger.key]: newCampaignTrigger,
    [newSubscriberTrigger.key]: newSubscriberTrigger,
    [allListsTrigger.key]: allListsTrigger,
    [newListTrigger.key]: newListTrigger,
    [newUnsubscriberTrigger.key]: newUnsubscriberTrigger,
    [getSubscribersTrigger.key]: getSubscribersTrigger,
  },
  searches: {
    [findListSearch.key]: findListSearch,
    [findCampaignSearch.key]: findCampaignSearch,
    [findSubscriberSearch.key]: findSubscriberSearch,
  },
  searchOrCreates: {
    find_list: {
      key: 'find_list',
      display: {
        label: 'Find or Create New List',
        description: 'This action will find list from db by its list name.',
      },
      search: 'find_list',
      create: 'create_list',
    },
  },
};
