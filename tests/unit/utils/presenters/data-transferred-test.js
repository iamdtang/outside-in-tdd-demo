import DataTransferredPresenter from 'outside-in-tdd-demo/utils/presenters/data-transferred';
import { module, test } from 'qunit';

module('Unit | Utility | presenters/data transferred');

test('the y-axis label shows "B" when the highest value is in bytes', function(assert) {
  let presenter = new DataTransferredPresenter([
    // ...
  ]);
  assert.equal(presenter.get('yLabel'), 'Bytes of Data Transferred');
});

test('the y-axis label shows "KB" when the highest value is in Kilobytes', function(assert) {
  let presenter = new DataTransferredPresenter([
    // ...
  ]);
  assert.equal(presenter.get('yLabel'), 'Kilobytes of Data Transferred');
});

// ...
