const randomizeBtn = document.querySelector('.randomize-btn');
const grindList = [];
let shapingList = [];

document.addEventListener('DOMContentLoaded', () => {
  fetch('./db.json')
    .then((res) => res.json())
    .then((data) => {
      const employees = data.employees;

      employees.forEach((employee) => {
        if (employee.cube) {
          shapingList.push(employee.first_name);
        } else {
          grindList.push(employee.first_name);
        }
      });
    });
});

randomizeBtn.addEventListener('click', () => {
  if (shapingList.length > 0) {
    const lastElement = shapingList.pop();
    shapingList.unshift(lastElement);
  }

  const shapingCells = document.querySelectorAll('.cube-operator-name');
  shapingCells.forEach((cell, index) => {
    cell.textContent = shapingList[index];
  });

  const shuffledGrinding = shuffleArray([...grindList, shapingList[shapingList.length - 1]]);
  const grindingCells = document.querySelectorAll('.operator-name');

  grindingCells.forEach((cell, index) => {
    if (shuffledGrinding[index]) {
      cell.textContent = shuffledGrinding[index];
    }
  });
});

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
