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

let currentQuestionIndex = 0;
let answers = {};

const questionTitle = document.getElementById('question-title');
const questionContent = document.getElementById('question-content');
const nextButton = document.getElementById('next-button');
const progress = document.getElementById('progress');
const questionHeader = document.querySelector('.question-header');

function renderQuestion() {
    const question = questions[currentQuestionIndex];
    questionContent.innerHTML = '';
    questionTitle.innerText = question.question;

    if (question.type === 'radio' || question.type === 'checkbox') {
        question.options.forEach((option, index) => {
            const optionContainer = document.createElement('div');
            optionContainer.className = 'option-container';

            const input = document.createElement('input');
            input.type = question.type;
            input.name = `question-${currentQuestionIndex}`;
            input.value = option;
            input.id = `option-${currentQuestionIndex}-${index}`;

            const label = document.createElement('label');
            label.htmlFor = `option-${currentQuestionIndex}-${index}`;
            label.innerText = option;

            optionContainer.appendChild(input);
            optionContainer.appendChild(label);
            questionContent.appendChild(optionContainer);
        });
    } else if (question.type === 'text') {
        const input = document.createElement('input');
        input.type = 'text';
        input.name = `question-${currentQuestionIndex}`;
        questionContent.appendChild(input);
    }

    progress.innerText = `Вопрос ${currentQuestionIndex + 1} из ${questions.length}`;
}

function nextQuestion() {
    const question = questions[currentQuestionIndex];
    const inputs = document.querySelectorAll(`input[name="question-${currentQuestionIndex}"]`);
    let isAnswered = false;
    let answer = null;

    // Обрабатываем для типа 'radio' или 'checkbox'
    if (question.type === 'radio' || question.type === 'checkbox') {
        answer = [];
        inputs.forEach(input => {
            if (input.checked) {
                answer.push(input.value);  // Добавляем в массив все выбранные ответы (для checkbox)
            }
        });
        // Если для radio выбрался один ответ или для checkbox есть хотя бы один, помечаем как ответ
        if (answer.length > 0) {
            isAnswered = true;
        }
    }

    // Обрабатываем для текстового поля
    if (question.type === 'text') {
        const input = inputs[0];  // Для текстового поля только один input
        answer = [];  // Получаем введенный текст и убираем пробелы
        answer.push(input.value.trim())
        if (answer !== '') {
            isAnswered = true;
        }
    }

    // Если вопрос был отвечен, сохраняем ответ и переходим к следующему вопросу
    if (isAnswered) {
        answers[currentQuestionIndex] = answer;  // Сохраняем ответ (массив для checkbox, строка для text)
        currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {
            renderQuestion();
        } else {
            // Скрываем вопрос и показываем кнопку "Завершить заполнение"
            questionHeader.style.display = 'none';
            questionContent.style.display = 'none';
            progress.style.display = 'none';
            nextButton.innerText = 'Завершить заполнение';
            nextButton.onclick = finishSurvey;
        }
    } else {
        alert('Пожалуйста, ответьте на вопрос.');
    }
}


function finishSurvey() {
    // Собираем все ответы в JSON
    const surveyAnswers = {};
    questions.forEach((question, index) => {
        surveyAnswers[question.question] = answers[index];
    });

    // Формируем данные для отправки на сервер
    const dataToSend = {
        username: getCookie('username'),
        answers: surveyAnswers
    };
    console.log(dataToSend);

    // Отправляем данные на сервер
    fetch('http://192.168.0.2:8001/forms', {
        method: 'POST',
        // mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
    })
        .then(response => response.json())
        .then(data => {
            alert('Анкета успешно отправлена!');
            console.log('Success:', data);
        })
        .catch((error) => {
            alert('Ошибка при отправке анкеты.');
            console.error('Error:', error);
        });
}

nextButton.onclick = nextQuestion;
renderQuestion();
