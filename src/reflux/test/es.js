"use strict";

// var func = a => console.log(a);
// func(22);

// var promise = function(ready) {
//     return new Promise((resolve, reject) => {
//         if(ready)
//             resolve('ok');
//         else
//             reject('error');
//     });
// }
// promise(true)
//     .then(value => {console.log(value)})
//     .catch(value => {console.log(value)});

// console.log("\u{41}\u{42}\u{43}");

// let s = "𠮷a";
// console.log(s.codePointAt(0));
// for (let i of s) {
//   alert(i);
// }
// alert(s.chartAt(0))

var str = "Hello World!";
// console.log(str.startsWith('Hello'), str.includes('o'), str.endsWith('d!'));
// console.log(str.repeat(3));
// console.log('x'.padEnd(5, 'ab'))

// console.log(`
//   There are <b>${str}</b> items
//    in your basket, </em>
//   are on sale!
// `)

var arr1 = [2, 3, 4, 5, 6, 3, 6, 2, 8, 9];
function union(arr) {
    var newArr = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = arr[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var value = _step.value;

            if (!newArr.includes(value)) {
                newArr.push(value);
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    return newArr;
}
console.log(union(arr1));