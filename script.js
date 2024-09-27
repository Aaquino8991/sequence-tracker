const randomizeBtn = document.querySelector('.randomize-btn');

randomizeBtn.addEventListener('click', () => {
  fetch('./db.json')
    .then(res => res.json())
    .then(data => console.log(data.employees))
  
})