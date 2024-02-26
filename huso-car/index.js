var _ = require('lodash');
var xray = require('x-ray');

exports.is = function(carPlate, cb) {
  xray('http://www.samgongustofa.is/umferd/okutaeki/okutaekjaskra/uppfletting?vq=' + carPlate)
    .select([{
      $root: '.vehicleinfo ul',
      type: 'li:nth-child(1) span',
      subType: 'li:nth-child(1) span',
      color: 'li:nth-child(1) span',
      registryNumber: 'li:nth-child(2) span',
      number: 'li:nth-child(3) span',
      factoryNumber: 'li:nth-child(4) span',
      registeredAt: 'li:nth-child(5) span',
      pollution: 'li:nth-child(6) span',
      weight: 'li:nth-child(7) span',
      status: 'li:nth-child(8) span',
      nextCheck: 'li:nth-child(9) span'
    }])
    .run(function(err, array) {
      var cleaned = _.map(array, function(car) {
        car.type = car.type.substring(0,car.type.indexOf('-')-1);
        car.subType = car.subType.substring(car.subType.indexOf('-')+2,car.subType.indexOf('(')-1);
        car.color = car.color.substring(car.color.indexOf('(')+1,car.color.indexOf(')'));
       return car;
      });
      return cb(err, cleaned);
    });
};
