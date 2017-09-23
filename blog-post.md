```
ember test -s
```

![0](0.png)

## Feature 1: Data Transferred Metric

User Story: As a user, I want to see the average data transferred over 7 days. When there is no data, I want to see a dash. This metric should be shown in the appropriate unit (B, KB, MB, GB, TB).

```js
moduleForAcceptance('Acceptance | dashboard');

test('the user can see the average amount of data transferred', function(assert) {
  server.get('/api/data-transferred', function() {
    return [
      { timestamp: '2017-07-18T00:00:00Z', bytes: 100 },
      { timestamp: '2017-07-19T00:00:00Z', bytes: 200 }
    ];
  });
  page.visit();
  andThen(function() {
    assert.equal(page.dataTransferredMetric, '150 B');
  });
});
```

Write a test that you'd want to read. Running this test will force us to build up infrastructure. Once there is enough supporting code, the test will fail in a way we expect telling us what needs to be done.

![1](1.png)

```
ember g page-object dashboard
```

and fill it out:

```js
import {
  create,
  visitable,
  text
} from 'ember-cli-page-object';

export default create({
  visit: visitable('/'),
  dataTransferredMetric: text('[data-test-hook="data-transferred"]')
});
```

Import page object into acceptance test.

![2](2.png)

```
ember g route index
```

```hbs
<!-- index.hbs -->
<span data-test-hook="data-transferred"></span>
```

![3](3.png)

```js
// routes/index.js
import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  model() {
    return this.store.findAll('data-transferred');
  }
});
```

![4](4.png)

```
ember g model data-transferred
```

![5](5.png)

```
ember g adapter application
ember g adapter data-transferred
```

```js
// adapters/application.js
import DS from 'ember-data';

const { RESTAdapter } = DS;

export default RESTAdapter.extend({
  namespace: 'api'
});
```

```js
// adapters/data-transferred.js
import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  pathForType(modelName) {
    return modelName;
  }
});
```

![6](6.png)

At this point we're getting some warnings from Ember Data saying our response isn't in the correct format.

![6-1](6-1.png)

```
ember g serializer data-transferred
```

Modify it to use the JSONSerializer format since that is what we are working with.

```js
// serializers/application.js
import DS from 'ember-data';

const { JSONSerializer } = DS;

export default JSONSerializer.extend({
});
```

![6-2](6-2.png)

```js
export default JSONSerializer.extend({
  primaryKey: 'timestamp'
});
```

Back to the expected error without any warnings.

![6-3](6-3.png)

Program by wishful thinking

```hbs
<!-- templates/index.hbs -->
{{data-transferred
  timeSeries=model
  data-test-hook="data-transferred"}}
```

![7](7.png)

```
ember g component data-transferred
```

```js
// components/data-transferred.js
import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  attributeBindings: ['data-test-hook']
});
```

![8](8.png)

Opportunity to drive out some component integration tests.

```js
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
```

Sometiems use a real model, othertimes not if the data set up is complex. then mock.

![9](9.png)

```
ember g factory data-transferred
```

![10](10.png)

Failure we expect.

```hbs
<!-- templates/components/data-transferred.hbs -->
{{value}} {{unit}}
```

```js
// models/data-transferred.js
import DS from 'ember-data';

const { Model, attr } = DS;

export default Model.extend({
  bytes: attr('number')
});
```

```js
// components/data-transferred.js
import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({
  attributeBindings: ['data-test-hook'],
  value: computed(function() {
    let sum = this.get('timeSeries').reduce(function(accumulator, dataTransferred) {
      return accumulator + dataTransferred.get('bytes');
    }, 0);
    return sum / this.get('timeSeries.length');
  }),
  unit: 'B'
});
```

![11](11.png)

At this point this where I'll continue in this inner TDD loop and test the different edge cases, like showing the value in KB, MB, GB, TB, etc and showing a dash when there is no data.

And if you run the acceptance test, it passes!

![12](12.png)

## Feature 2: Data Transferred Chart

```js
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
    assert.equal(page.yAxisLabel, 'Bytes of Data Transferred');
    assert.equal(page.barCount, 2);
  });
});
```

![13](13.png)

```js
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
```

![14](14.png)
