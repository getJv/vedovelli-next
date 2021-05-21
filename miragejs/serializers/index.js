/*
 * Mirage JS guide on Models: https://miragejs.com/docs/data-layer/models
 */

import { RestSerializer, JSONAPISerializer } from 'miragejs';

/*
 *
 *
 * Mirage JS guide on Serializors: https://miragejs.com/docs/main-concepts/serializers/
 */

const ApplicationSerializer = RestSerializer.extend({
  alwaysIncludeLinkageData: false,
});

export default {
  application: ApplicationSerializer,

  /**
   * Set which resource will be completed.
   * 1º Set the global config to false.
   * 2º Use the bellow template to info mirage which Model will be tottaly loaded
   */
  user: ApplicationSerializer.extend({
    //include: ['messages'],
    //embed: false,
  }),
};
