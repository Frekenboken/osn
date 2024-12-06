function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;

    if (localStorage.getItem('users') === null) {
        localStorage.setItem('users', JSON.stringify([]));
    }

    const users = JSON.parse(localStorage.getItem('users'));
    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));

    alert('Регистрация успешна!');
    showLogin();
});

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    const users = JSON.parse(localStorage.getItem('users'));
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        alert('Вход успешен!');
        console.log(username);
        setCookie('username', username, 7);
    } else {
        alert('Неверное имя пользователя или пароль.');
    }
});

function showRegister() {
    document.getElementById('register').style.display = 'flex';
    document.getElementById('login').style.display = 'none';
}

function showLogin() {
    document.getElementById('register').style.display = 'none';
    document.getElementById('login').style.display = 'flex';
}
