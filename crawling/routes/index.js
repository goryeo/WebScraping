var express = require('express');
var router = express.Router();
 
var cheerio = require('cheerio');
var request = require('request');
var Iconv = require('iconv').Iconv;
var iconv = new Iconv('CP949', 'utf-8//translit//ignore');
 
router.get("/crawlingTest", function(req, res, next){
  var url = "http://movie.naver.com/movie/sdb/rank/rmovie.nhn";
 
  request({url, encoding: null}, function(error, response, body){
    var htmlDoc = iconv.convert(body).toString();
    let resultArr = [];
 
    const $ = cheerio.load(htmlDoc);
    let colArr = $(".tit3")
    for(let i = 0; i < colArr.length; i++){
      resultArr.push(colArr[i].children[1].attribs.title)
    }
 
    res.json(resultArr)
  });
})

module.exports = router;
