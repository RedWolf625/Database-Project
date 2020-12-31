var express = require('express');
var mysql = require('./340_setup.js');
var CORS = require('cors');

var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('port', 31546);
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(CORS());

const getAllQuery = 'SELECT OrderHistory.orderID, orders.trackerID, orders.email, GiftCards.name, orders.amount FROM orders LEFT JOIN recipients ON orders.email = recipients.email LEFT JOIN GiftCards ON GiftCards.giftCardID = orders.giftCardID LEFT JOIN OrderHistory ON OrderHistory.orderID = orders.orderID';
const searchQuery = 'SELECT OrderHistory.orderID, orders.trackerID, orders.email, GiftCards.name, orders.amount FROM orders LEFT JOIN recipients ON orders.email = recipients.email LEFT JOIN GiftCards ON GiftCards.giftCardID = orders.giftCardID LEFT JOIN OrderHistory ON OrderHistory.orderID = orders.orderID WHERE orders.email=?';


const getAllData = (res) => {
  mysql.pool.query(getAllQuery,(err,rows,fields) => {
    if (err){
      next(err);
      return;
    }
    res.json({ rows : rows});
  });
};



app.get('/',(req,res,next) => {
  var context = {};
  var results = [];
  mysql.pool.query(getAllQuery, (err, rows, fields) => {
    if(err){
      next(err);
      return;
    }
	console.log(getAllData(res));
    getAllData(res);
  });
});

app.post('/',(req,res,next) => {
  var context = {}
  var {email} = req.body;
  mysql.pool.query(searchQuery, [email], (err, result) => {
  if(err){
    next(err);
    return;
  }
  getAllData(res);
  });
});
     
app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
