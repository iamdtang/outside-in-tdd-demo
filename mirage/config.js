export default function() {
  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  this.namespace = 'api';
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  this.get('/data-transferred', function() {
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
}
