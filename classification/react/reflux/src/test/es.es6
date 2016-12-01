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

var str = "Hello World!"
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
    let newArr = [];
    for(let value of arr) {
        if(!newArr.includes(value)) {
            newArr.push(value);
        }
    }
    return newArr;
}
console.log(union(arr1));