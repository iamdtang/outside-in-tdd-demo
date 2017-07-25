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
