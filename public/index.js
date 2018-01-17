'use strict';

//list of truckers
//useful for ALL 5 exercises
var truckers = [{
  'id': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'name': 'les-routiers-bretons',
  'pricePerKm': 0.05,
  'pricePerVolume': 5
}, {
  'id': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'name': 'geodis',
  'pricePerKm': 0.1,
  'pricePerVolume': 8.5
}, {
  'id': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'name': 'xpo',
  'pricePerKm': 0.10,
  'pricePerVolume': 10
}];

//list of current shippings
//useful for ALL exercises
//The `price` is updated from exercice 1
//The `commission` is updated from exercice 3
//The `options` is useful from exercice 4
var deliveries = [{
  'id': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'shipper': 'bio-gourmet',
  'truckerId': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'distance': 100,
  'volume': 4,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'convargo': 0
  }
}, {
  'id': '65203b0a-a864-4dea-81e2-e389515752a8',
  'shipper': 'librairie-lu-cie',
  'truckerId': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'distance': 650,
  'volume': 12,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'convargo': 0
  }
}, {
  'id': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'shipper': 'otacos',
  'truckerId': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'distance': 1250,
  'volume': 30,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'convargo': 0
  }
}];

//list of actors for payment
//useful from exercise 5
const actors = [{
  'deliveryId': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'trucker',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'deliveryId': '65203b0a-a864-4dea-81e2-e389515752a8',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'trucker',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'deliveryId': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'trucker',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}];

window.onload = function()
{
  for(var i = 0; i < deliveries.length;i++)
  {
    //Step 1
    var truck = FindTrunk(i);

    //step 2
    var price = CalculatePrice(i, truck);

    console.log(price)
    //Step 3 and 4
    CalculateComission(i, price);

    //Step 5
    StorePriceAndCommission(i);
  }
}

function FindTrunk(index)
{
    return truckers.find(function(element) {
        return element.id == deliveries[index].truckerId;
    });
}

function CalculatePrice(index, truck)
{
  var price = 0;
  var distance_price = deliveries[index].distance * truck.pricePerKm;
  var volume_price = deliveries[index].volume * truck.pricePerVolume;
  if(deliveries[index].volume >= 5 && deliveries[index].volume < 10)
  {
    volume_price = volume_price * 0.9;
  }
  else if(deliveries[index].volume >= 10 && deliveries[index].volume < 20)
  {
    volume_price = volume_price * 0.7;
  }
  else if(deliveries[index].volume > 20)
  {
    volume_price = volume_price * 0.5;
  }
  price = distance_price + volume_price;
  deliveries[index].price = price;
  return price;
}

function CalculateComission(index, price)
{
  //step 3
  var commission_price = price *0.3;
  deliveries[index].commission.insurance = commission_price / 2;
  commission_price = commission_price / 2;
  deliveries[index].commission.treasury = deliveries[index].distance/500;
  commission_price -= deliveries[index].distance/500;
  deliveries[index].commission.convargo = commission_price;
  console.log(deliveries[index].commission)

  //Step 4
    if(deliveries[index].options.deductibleReduction)
    {
      deliveries[index].commission.convargo += deliveries[index].volume;
      deliveries[index].price += deliveries[index].volume;
    }
}

function StorePriceAndCommission(index)
{
  var actor = actors.find(function(element) {
      return element.deliveryId == deliveries[index].id;
  });
  //shipper
  actor.payment[0].amount = deliveries[index].price;
  var commission = deliveries[index].commission.insurance + deliveries[index].commission.treasury + deliveries[index].commission.convargo;
  //trucker
  actor.payment[1].amount = deliveries[index].price - commission;
  //treasury
  actor.payment[2].amount = deliveries[index].commission.treasury;
  //insurance
  actor.payment[3].amount = deliveries[index].commission.insurance;
  //convargo
  actor.payment[4].amount = deliveries[index].commission.convargo;
  console.log(actor);
}
