// 변수 var, let
// 상수 const

var num1 = 10;
var num2 = 20;

console.log(num1 + num2);

// 호이스팅: 메모리 참조 이전에 선언이 무조건 먼저 일어나는 현상
console.log(num1 + num3);
var num3 = 40;  //상수니까 건들지마
console.log(num3);
var num3 = "안녕";
console.log(num3);

// let은 호이스팅 x
// console.log(num4);
let num4 = 10;
num4 = 20;
console.log(num4);

// 상수
const num5 = 30;
// num5 = 40;
console.log(num5);
