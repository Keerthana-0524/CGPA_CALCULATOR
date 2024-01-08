function calculateGradePointAverage(...grades) {
  const weightedSum = grades.reduce((total, grade, i) => total + (grade * (i + 1)), 0);
  const gpa = weightedSum / (grades.length * (grades.length + 1)) / 10;
  return gpa.toFixed(2);
}

function calculateCumulativeGradePointAverage(grades, credits) {
  const totalPoints = grades.reduce((total, grade, i) => total + (grade * credits[i]), 0);
  const totalCredits = credits.reduce((total, credit) => total + credit, 0);

  if (totalCredits === 0) {
    return 'N/A';
  }

  const cgpa = totalPoints / totalCredits / 10;
  return cgpa.toFixed(2);
}

function calculateOverallCGPA(cgpas) {
  const validCGPAs = cgpas.filter(cgpa => cgpa !== 'N/A').map(Number);

  if (validCGPAs.length === 0) {
    return 'N/A'; 
  }

  const overallCGPA = validCGPAs.reduce((total, cgpa) => total + cgpa, 0) / validCGPAs.length;
  return overallCGPA.toFixed(2);
}

const semestersCount = parseInt(prompt("Enter the number of semesters:"));
const userGrades = [];
const userCredits = [];

for (let i = 0; i < semestersCount; i++) {
  const semesterGrades = [];
  const semesterCredits = [];

  for (let j = 0; j < 5; j++) {
    semesterGrades.push(parseFloat(prompt(`Enter your grade for Subject ${j + 1} in Semester ${i + 1}:`)));
    semesterCredits.push(parseFloat(prompt(`Enter the credit hours for Subject ${j + 1} in Semester ${i + 1}:`)));
  }

  userGrades.push(semesterGrades);
  userCredits.push(semesterCredits);
}

if (userGrades.some(semesterGrades => semesterGrades.some(isNaN)) || userCredits.some(semesterCredits => semesterCredits.some(isNaN))) {
  console.log("Please enter valid grades and credits for all subjects.");
} else {
  userGrades.forEach((semesterGrades, i) => {
    const calculatedGPA = calculateGradePointAverage(...semesterGrades);
    console.log(`Your GPA for Semester ${i + 1} is: ${calculatedGPA}`);
  });

  const cgpas = userGrades.map((semesterGrades, i) => {
    const semesterCredits = userCredits[i];
    return calculateCumulativeGradePointAverage(semesterGrades, semesterCredits);
  });

  userGrades.forEach((semesterGrades, i) => {
    const semesterCredits = userCredits[i];
    const calculatedCGPA = calculateCumulativeGradePointAverage(semesterGrades, semesterCredits);
    console.log(`Your CGPA for Semester ${i + 1} is: ${calculatedCGPA}`);
  });

  const overallCGPA = calculateOverallCGPA(cgpas);
  console.log(`Your Overall CGPA is: ${overallCGPA}`);
}
