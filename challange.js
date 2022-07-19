const ages = [5, 2, 4, 1, 15, 8, 3];

//Using For loop but it will be long
// const HumanAge = [];
// const calcAverageHumanAge = function (data) {
//   for (const age of data) {
//     if (age <= 2) {
//       HumanAge.push(2 * age);
//     } else {
//       HumanAge.push(16 + age * 4);
//     }
//   }
// };
// calcAverageHumanAge(ages);
// console.log(HumanAge);

const HumanAges = ages.map(data => (data < 2 ? 2 * data : 16 + data * 4));
console.log('Using Map Method');
console.log(HumanAges);

const NewAge = HumanAges.filter(data => data > 18);
console.log(NewAge);

const sumOfAdult = NewAge.reduce((acc, curr, i, arr) => acc + curr);
const ans = sumOfAdult / NewAge.length;
console.log(ans);
