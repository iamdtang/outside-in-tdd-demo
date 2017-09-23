import {
  create,
  visitable,
  text,
  count
} from 'ember-cli-page-object';

export default create({
  visit: visitable('/'),
  dataTransferredMetric: text('[data-test-hook="data-transferred"]'),
  yAxisLabel: text('[data-test-hook="data-transferred-chart"] .c3-axis-y-label'),
  barCount: count('.c3-axis-x .tick')
});
