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

const questions = [
    {
        type: 'checkbox',
        question: 'Предмет для подготовки:',
        options: [
            'Русский язык',
            'Литература',
            'История',
            'Обществознание',
            'Математика (базовая)',
            'Математика (профильная)',
            'Физика',
            'Химия',
            'Биология',
            'Информатика',
            'География'
        ]
    },
    // {
    //     type: 'text',
    //     question: 'Какая профессия осваивается:'
    // },
    {
        type: 'checkbox',
        question: 'Опыт преподавателя:',
        options: [
            '1-3 года',
            '3-5 лет',
            '5-7 лет',
            '7 и более'
        ]
    },
    {
        type: 'text',
        question: 'Желаемые баллы для поступления (минимальный и максимальный порог, например, 60-70):'
    },
    {
        type: 'checkbox',
        question: 'Приоритет в обучении:',
        options: [
            'Высокий балл',
            'Общее развитие',
            'Психологический комфорт',
            'Крепкие теоретические знания',
            'Разнообразие практического материала'
        ]
    },
    {
        type: 'radio',
        question: 'Вид запоминания информации:',
        options: [
            'Образное (визуал)',
            'Двигательное (кинестетик)',
            'Эмоциональное',
            'Словесно-логическое (аудиал/дигитал)',
            'Я не знаю (пройти тестирование)'
        ]
    },
    {
        type: 'radio',
        question: 'Стиль обучения:',
        options: [
            'Деятель',
            'Мыслитель',
            'Теоретик',
            'Прагматик',
            'Я не знаю (пройти тестирование)'
        ]
    },
    {
        type: 'radio',
        question: 'Темперамент:',
        options: [
            'Холерик',
            'Сангвиник',
            'Меланхолик',
            'Флегматик',
            'Я не знаю (пройти тестирование)'
        ]
    },
    {
        type: 'checkbox',
        question: 'Личностные качества (выбрать 3 качества):',
        options: [
            'Коммуникабельность',
            'Отзывчивость',
            'Пунктуальность',
            'Решимость',
            'Самокритичность',
            'Смелость',
            'Справедливость',
            'Толерантность',
            'Трудолюбие',
            'Уважение к другим',
            'Уверенность',
            'Упорство',
            'Честность',
            'Чувство собственного достоинства',
            'Чувство юмора',
            'Щедрость'
        ]
    },
    {
        type: 'checkbox',
        question: 'Увлечения:',
        options: [
            'Спорт',
            'Художественное искусство',
            'Музыкальное искусство',
            'Прикладное искусство',
            'Киноискусство/мультипликация',
            'Танцы',
            'Моделирование и программирование',
            'Биологические исследования',
            'Медицина',
            'Зоология',
            'Космос',
            'Мода',
            'Бизнес',
            'Менеджмент и управление'
        ]
    }
];

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
    fetch('http://127.0.0.1:8001/forms', {
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
