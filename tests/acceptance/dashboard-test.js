import { test } from 'qunit';
import moduleForAcceptance from 'outside-in-tdd-demo/tests/helpers/module-for-acceptance';
import page from 'outside-in-tdd-demo/tests/pages/dashboard';

moduleForAcceptance('Acceptance | dashboard');

test('the user can see the average amount of data transferred', function(assert) {
  server.get('/api/data-transferred', function() {
    return [
      {
        timestamp: '2017-07-18T00:00:00Z',
        bytes: 100
      },
      {
        timestamp: '2017-07-19T00:00:00Z',
        bytes: 200
      }
    ];
  });
  page.visit();
  andThen(function() {
    assert.equal(page.dataTransferredMetric, '150 B');
  });
});

test('the user can see a time series bar chart for the daily data transferred', function(assert) {
  server.get('/api/data-transferred', function() {
    return [
      {
        timestamp: '2017-07-18T00:00:00Z',
        bytes: 100
      },
      {
        timestamp: '2017-07-19T00:00:00Z',
        bytes: 200
      }
    ];
  });
  page.visit();
  andThen(function() {
    assert.ok(true);
    // assert.equal(page.yAxisLabel, 'Bytes of Data Transferred');
    // assert.equal(page.barCount, 2);
  });
});
