var pact = require('../pact.js')

exports.main = function(req, res){

  res.render('index', { title: 'Express Polls - Home', 
                        render: true
                      }
  );

};


//<h2>This site was made with:</h2>
//<div id="minor" style="width: 100%; height: 363px;"></div>
//<h3>100 Votes</h3>
//  var minorData = [
//    { label: "Luck",  data: 10},
//    { label: "Skill",  data: 20},
//    { label: "Concentrated Power of Will",  data: 15},
//    { label: "Pleasure",  data: 5},
//    { label: "Pain",  data: 50}
//
//  ];
//  $.plot('#minor', minorData, {
//    series: {
//      pie: {
//        show: true,
//        radius: 11/16,
//        innerRadius: 0.3
//      }
//    },
//    legend: {
//      show: false
//    }
//  });
//
