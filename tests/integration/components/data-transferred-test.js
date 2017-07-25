import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { manualSetup, makeNew, mockTeardown } from 'ember-data-factory-guy';
import { find } from 'ember-native-dom-helpers';

moduleForComponent('data-transferred', 'Integration | Component | data transferred', {
  integration: true,
  beforeEach() {
    manualSetup(this.container);
  },
  afterEach() {
    mockTeardown();
  }
});

test('it renders the average data transferred in bytes', function(assert) {
  this.set('timeSeries', [
    makeNew('data-transferred', {
      bytes: 100
    }),
    makeNew('data-transferred', {
      bytes: 500
    })
  ]);
  this.render(hbs`{{data-transferred timeSeries=timeSeries id="data-transferred"}}`);
  assert.equal(find('#data-transferred').textContent.trim(), '300 B');
});
