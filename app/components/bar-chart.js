import Ember from 'ember';
import c3 from 'npm:c3';

const { Component } = Ember;

export default Component.extend({
  attributeBindings: ['data-test-hook'],
  didInsertElement() {
    this._chart = c3.generate({
      bindto: this.$('.chart-element').get(0),
      data: {
        x: 'Date',
        columns: [
          ['Date', new Date('2017-07-25T00:00:00Z'), new Date('2017-07-26T00:00:00Z')],
          ['Data Transferred', 300, 500]
        ],
        type: 'bar'
      },
      bar: { width: 20 },
      axis: {
        x: {
          tick: {
            format(timestamp) {
              return `Day ${timestamp}`;
            }
          }
        },
        y: {
          min: 0,
          max: 1000,
          label: { text: this.get('presenter.yLabel') }
        }
      }
    });
  },
  willDestroyElement() {
    this._chart.destroy();
  }
});
