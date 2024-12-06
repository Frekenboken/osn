const fs = require('fs');
const Handlebars = require('handlebars');

const burger = document.getElementById('burger');
const navLinks = document.querySelector('.nav-links');
const anketa1 = document.getElementById('anketa1');
const anketa2 = document.getElementById('anketa2');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Чтение файла настроек
const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));

// Использование настроек
console.log(`Title: ${config.title}`);
console.log(`Description: ${config.description}`);
console.log(`Author: ${config.author}`);
console.log(`Base URL: ${config.baseUrl}`);