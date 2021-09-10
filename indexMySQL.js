var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');

var apiversion='/api/v1';


//MYSQL Connection
var db = require('./config/db.config');


var port = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.json());
app.use(cors());

//get
app.get(apiversion + '/customers',  function (_req, res)  {  

  res.setHeader('Content-Type', 'application/json');
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  db.query('SELECT * FROM customers', function (error, results, _fields) {
      if (error) throw error;
      return res.send({ error: false, message: 'customers list', data: results });
  });


});
//put customers
app.put(apiversion + '/customer/:customerId',  function (req, res)  {  

  var customerId = req.body.customerId;
  var customerName = req.body.customerName;
  var customerAddress = req.body.customerAddress;
  var customerAge = req.body.customerAge;
  var customerPicture = req.body.customerPicture;
  


  res.setHeader('Content-Type', 'application/json');
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");


  db.query(`UPDATE customers
            Set
               customerId = ${customerId},
               customerName = '${customerName}',
               customerAddress = '${customerAddress}',
               customerAge = '${customerAge}',
               customerPicture = '${customerPicture}'
  
            where customerId='${customerId}';`,function (error, _results, _fields) {
    if (error) throw error;
    return res.send({ error: false, message: ' customer' });
   });

});

//Delete customers
app.delete(apiversion + '/customer/:customerId',  function (req, res)  {  

  var customerId = req.params.customerId;

  res.setHeader('Content-Type', 'application/json');
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");


  db.query(`DELETE from customers WHERE customerId =${customerId};`,function (error, _results, _fields) {
      if (error) throw error;
      return res.send({ error: false, message: ' Dalete' });
  });



});



app.listen(port, function () {
    console.log("Server is up and running...");
});
