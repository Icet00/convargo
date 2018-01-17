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
    var price = 0;
    var truck = truckers.find(function(element) {
        return element.id == deliveries[i].truckerId;
    });
    var distance_price = deliveries[i].distance * truck.pricePerKm;
    var volume_price = deliveries[i].volume * truck.pricePerVolume;
    //Step 2
    if(deliveries[i].volume >= 5 && deliveries[i].volume < 10)
    {
      volume_price = volume_price * 0.9;
    }
    else if(deliveries[i].volume >= 10 && deliveries[i].volume < 20)
    {
      volume_price = volume_price * 0.7;
    }
    else if(deliveries[i].volume > 20)
    {
      volume_price = volume_price * 0.5;
    }
    price = distance_price + volume_price;
    console.log(price)
    //Step 3
    deliveries[i].price = price;
    var commission_price = price *0.3;
    price = price *0.7;
    deliveries[i].commission.insurance = commission_price / 2;
    commission_price = commission_price / 2;
    deliveries[i].commission.treasury = deliveries[i].distance/500;
    commission_price -= deliveries[i].distance/500;
    deliveries[i].commission.convargo = commission_price;
    console.log(deliveries[i].commission)
    //Step 4
    if(deliveries[i].options.deductibleReduction)
    {
      deliveries[i].commission.convargo += deliveries[i].volume;
      deliveries[i].price += deliveries[i].volume;
    }

    //Step 5
    /*- **the shipper** must pay the **shipping price** and the **(optional) deductible reduction**
- **the trucker** receives the **shipping price** minus the **commission**
- **the insurance** receives its part of the **commission**
- **the Treasury** receives its part of the tax **commission**
- **convargo receives** its part of the **commission**, plus the **deductible reduction***/
    var actor = actors.find(function(element) {
        return element.deliveryId == deliveries[i].id;
    });
    //shipper
    actor.payment[0].amount = deliveries[i].price;
    var commission = deliveries[i].commission.insurance + deliveries[i].commission.treasury + deliveries[i].commission.convargo;
    //trucker
    actor.payment[1].amount = deliveries[i].price - commission;
    //treasury
    actor.payment[2].amount = deliveries[i].commission.treasury;
    //insurance
    actor.payment[3].amount = deliveries[i].commission.insurance;
    //convargo
    actor.payment[4].amount = deliveries[i].commission.convargo;

    console.log(actor);
  }
}
