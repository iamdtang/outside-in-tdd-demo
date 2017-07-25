import {
  create,
  visitable,
  text
} from 'ember-cli-page-object';

export default create({
  visit: visitable('/'),
  dataTransferredMetric: text('[data-test-hook="data-transferred"]')
});
