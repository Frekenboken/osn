const fs = require('fs');

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

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

if (getCookie('username') == null) {
    window.location.href = 'hello.html';
}