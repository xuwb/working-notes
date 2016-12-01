require('core-js/fn/array/includes');

require('css/1');

require('css/2');

var src2 = require('js/testImage/testImage2/img2').src;
var src = require('js/testImage/img').src;
var src3 = require('js/testImage3/img3').src;

console.log(src)

class Cls {
    constructor() {
        this.state = {
            text: 444
        }
    }
    // static testMethod = 222
}

var c = new Cls;
console.log(c.state.text);
console.log([1,2,NaN].includes(NaN));

$(function(){
    $('#frame')[0].src='http://www.cnblogs.com/';

    var img = new Image();
    // img.src = 'src/images/11.jpg';
    // img.src = require('images/11.jpg');
    img.src = src2;
    $('body').append(img);
})

// var p = new Promise((resolve, reject) => {
//     setTimeout(resolve, 0);
// });
// p.then(() => {
//     console.log('success');
// })