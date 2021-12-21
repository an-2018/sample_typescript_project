enum DevType {
  Training,
  Junior,
  Pleno,
  Senior
}

let dev: DevType = DevType.Senior;
console.log(DevType[dev]);

let x: unknown = 1;
x = 'string';
x = true;

if(typeof x === 'string') {
  console.log('x is string', x.toUpperCase());
}else{
  console.log('x is not string', x);
}