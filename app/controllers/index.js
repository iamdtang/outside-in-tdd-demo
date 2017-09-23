import Ember from 'ember';
import DataTransferredChartPresenter from '../utils/presenters/data-transferred';

const { Controller, computed } = Ember;

export default Controller.extend({
  dataTransferredChartPresenter: computed(function() {
    return new DataTransferredChartPresenter(this.get('model'));
  })
});
