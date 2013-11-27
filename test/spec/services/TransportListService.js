'use strict';

describe('Service: Transportlistservice', function () {

  // load the service's module
  beforeEach(module('nextsubApp'));

  // instantiate service
  var Transportlistservice;
  beforeEach(inject(function (_Transportlistservice_) {
    Transportlistservice = _Transportlistservice_;
  }));

  it('should do something', function () {
    expect(!!Transportlistservice).toBe(true);
  });

});
