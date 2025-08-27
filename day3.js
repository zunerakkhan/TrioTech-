
const student = {
  name: "Ayesha Khan",
  details: {
    marks: [85, 92, 78, 88, 95]
  }
};

const marksList = student.details.marks.map((mark, index) => {
  return `Subject ${index + 1}: ${mark}`;
});

const total = student.details.marks.reduce((sum, mark) => sum + mark, 0);

const average = total / student.details.marks.length;

const above90 = student.details.marks.filter(mark => mark > 90);


console.log("Student Marks Report");
console.log("Name:", student.name);
console.log("Marks:", marksList);
console.log("Total Marks:", total);
console.log("Avg Marks:", average.toFixed(2));
console.log("Marks above 90:", above90);
