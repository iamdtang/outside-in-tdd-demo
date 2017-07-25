import { moduleForModel, test } from 'ember-qunit';

moduleForModel('data-transferred', 'Unit | Serializer | data transferred', {
  // Specify the other units that are required for this test.
  needs: ['serializer:data-transferred']
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
