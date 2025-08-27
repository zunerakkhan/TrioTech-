const marks = [22, 92, 88, 54, 85, 56, 99];
let highestMark = marks[0];  

for (let i = 1; i < marks.length; i++) 
    {
  if (marks[i] > highestMark) 
    {
    highestMark = marks[i];
  }
}

console.log("Highest Mark:", highestMark);
