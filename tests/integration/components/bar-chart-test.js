import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { find } from 'ember-native-dom-helpers';

moduleForComponent('bar-chart', 'Integration | Component | bar chart', {
  integration: true
});

test('it renders the y-axis', function(assert) {
  this.set('presenter', {
    yLabel: 'the y label'
  });
  this.render(hbs`{{bar-chart presenter=presenter}}`);
  assert.equal(find('.c3-axis-y-label').textContent.trim(), 'the y label');
});
