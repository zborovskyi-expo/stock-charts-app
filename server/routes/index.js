const express = require('express'),
      path = require('path'),
      googleFinance = require('google-finance'),
      yahooFinance = require('yahoo-finance'),
      router = express.Router();


var time_from = '2017-12-01';
var time_to = '2018-02-28';

var symbol = 'NASDAQ:AAPL'
var symbols = ['NASDAQ:GOOGL', 'NASDAQ:YHOO']

// googleFinance.companyNews({
//   symbol: symbol
// }, (err, news) => {
//   if(err) console.log(err)
//   else console.log(news)
// })

// googleFinance.historical({
//   //symbol: symbol,
//   symbols: symbols,
//   from: time_from,
//   to: time_to
// }, (err, quotes) => {
//   if(err) console.log(err)
//   else console.log(quotes)
// })


var symbol = 'GOOGL'
var symbols = ['GOOGL', 'YHOO']


// Post Index
router.get('/stocks', (req, res, next) => {

  yahooFinance.historical({
    symbol: req.query.symbol,
    //symbols: symbols,
    from: time_from,
    to: time_to
  }, (err, quotes) => {
    try {
      quotes.reverse();
      res.send({data: quotes});
    } catch(err) {
      console.log(err)
    }
  })

});


// Get Index
router.get('*', (req, res, next) => {
  console.log("SLKDJF:LKJSD:LKJF:LSDKJF:LSKJD:FLKJ:LKFJ:DSLKJF:LKSDJF:LKJDSF")
  res.sendFile(path.join(__dirname, '../../app/client/dist/index.html'));
});

module.exports = router;
