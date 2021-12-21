"use strict";
var DevType;
(function (DevType) {
    DevType[DevType["Training"] = 0] = "Training";
    DevType[DevType["Junior"] = 1] = "Junior";
    DevType[DevType["Pleno"] = 2] = "Pleno";
    DevType[DevType["Senior"] = 3] = "Senior";
})(DevType || (DevType = {}));
let dev = DevType.Senior;
console.log(DevType[dev]);
let x = 1;
x = 'string';
x = true;
if (typeof x === 'string') {
    console.log('x is string', x.toUpperCase());
}
else {
    console.log('x is not string', x);
}
