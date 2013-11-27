'use strict';

describe('Service: Trafficservice', function () {

  // load the service's module
  beforeEach(module('nextsubApp'));

  // instantiate service
  var Trafficservice;
  beforeEach(inject(function (_Trafficservice_) {
    Trafficservice = _Trafficservice_;
  }));

  it('should do something', function () {
    expect(!!Trafficservice).toBe(true);
  });

});
