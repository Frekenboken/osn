const burger = document.getElementById('burger');
const navLinks = document.querySelector('.nav-links');
const anketa1 = document.getElementById('anketa1');
const anketa2 = document.getElementById('anketa2');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// anketa1.addEventListener('click', () => {
//     navLinks.classList.toggle('active');
// });

// anketa2.addEventListener('click', () => {
//     navLinks.classList.toggle('active');
// });
