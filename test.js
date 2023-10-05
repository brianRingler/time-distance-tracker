const maxWidth = 16;
const words = "This is an example of text justification.";
const lenWords = words.length;
console.log(lenWords);
console.log(words[0]);
console.log(words[lenWords - 1]);
console.log(
  `Length / 16 then roundUp give number of lines required : ${Math.ceil(
    lenWords / 16
  )}`
);

const lines = Math.ceil(lenWords / maxWidth);
console.log(`lines is ${lines}`);
// const spaces = "2".repeat(maxWidth);
const outPutArr = [];

// for (let i = 0; i < lines; i++) {
//   outPutArr.push(spaces);
// }

// const result = outPutArr.join("\n");

// console.log(result);
console.log("---------------------------");
let cnt;
let start;
let end;
for (let i = 0; i < lines; i++) {
  if (i === 0) {
    const start = 0;
    const end = start + maxWidth;
    const line = words.substring(start, end);
    outPutArr.push(line);
  } else {
    const start = i * maxWidth;
    const end = start + maxWidth;
    const line = words.substring(start, end);
    outPutArr.push(line);
  }
}

console.log(outPutArr);
