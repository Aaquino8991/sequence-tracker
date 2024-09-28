const randomizeBtn = document.querySelector('.randomize-btn')
const grindList = [];
const cubeList = [];

document.addEventListener('DOMContentLoaded', () => {
  fetch('./db.json')
  .then(res => res.json())
  .then(data => {
    const employees = data.employees;

    employees.forEach(employee => {
      
      if (employee.cube) {
        cubeList.push(employee.first_name)
      }
      // create an algorithm to rotate cube operators and use splice() or ...rest method to add trailing operator to grinding.
    });
  });

  randomizeBtn.addEventListener('click', () => {
    const shuffledGrinding = shuffleArray([...grindList]);
    const operatorCells = document.querySelectorAll('.operator-name');

    operatorCells.forEach((cell, index) => {
      if (shuffledGrinding[index]) {
        cell.textContent = shuffledGrinding[index];
      }
    })
  });

});

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}