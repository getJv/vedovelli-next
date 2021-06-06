import { RestSerializer, JSONAPISerializer } from 'miragejs';
const ApplicationSerializer = RestSerializer.extend({
  alwaysIncludeLinkageData: false,
});
export default {
  application: ApplicationSerializer,
  user: ApplicationSerializer.extend({
    //include: ['messages'],
    //embed: false,
  }),
};
