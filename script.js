const randomizeBtn = document.querySelector('.randomize-btn');
const checkRandom = document.querySelector('#random');
const checkRotate = document.querySelector('#rotate');
const radioButtons = document.querySelector('.radio-buttons');
const grindList = [];
let shapingList = [];
const errorMessage = document.createElement('p');
errorMessage.style.color = 'red';
errorMessage.style.display = 'none';
errorMessage.textContent = 'Please select an option';
radioButtons.appendChild(errorMessage);

document.addEventListener('DOMContentLoaded', () => {
  // Retrieves data from db.json
  fetch('./db.json')
    .then((res) => res.json())
    .then((data) => {
      const employees = data.employees;

      // Loops over each employee
      employees.forEach((employee) => {
        if (employee.cube) { // If cube is true, add to shapingList
          shapingList.push(employee.first_name);
        } else { // Otherwise, add to grindList
          grindList.push(employee.first_name);
        }
      });
    });
});

randomizeBtn.addEventListener('click', () => {
  try {
    if (!checkRandom.checked && !checkRotate.checked) {
      throw new Error('Please select an option');
    } else {
      errorMessage.style.display = 'none'; // Hide the error message if an option is selected
      if (shapingList.length > 0) {
        if (checkRotate.checked) {
          const lastElement = shapingList.pop();
          shapingList.unshift(lastElement);
        } else if (checkRandom.checked) {
          shuffleArray(shapingList);
        }
      }
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

  } catch (error) {
    errorMessage.textContent = error.message; // Display the error message
    errorMessage.style.display = 'block';
  }
});

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
