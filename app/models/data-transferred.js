import DS from 'ember-data';

const { Model, attr } = DS;

export default Model.extend({
  bytes: attr('number'),
  timestamp: attr('date')
});
