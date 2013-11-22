'use strict';

describe('Service: Timeservice', function () {

  // load the service's module
  beforeEach(module('nextsubApp'));

  // instantiate service
  var Timeservice;
  beforeEach(inject(function (_Timeservice_) {
    Timeservice = _Timeservice_;
  }));

  it('should do something', function () {
    expect(!!Timeservice).toBe(true);
  });

});
