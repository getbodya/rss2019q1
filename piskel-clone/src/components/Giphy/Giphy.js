var giphy = require('giphy-api')('tjYWbXROqLYrjI8kxtShYFRp5s5eb5LY');

console.log(giphy)
giphy.search('qweqwe').then(function (res) {
  console.log(res)
});
