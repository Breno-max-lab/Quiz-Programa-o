const quizData = [
    {
        question: "Qual a linguagem mais utilizada atualmente?",
        a: "Java",
        b: "C",
        c: "Python",
        d: "JavaScript",
        correct: "c",
    },
    {
        question: "Qual o tipo de dado mais adequado para armazenar um número com casas decimais?",
        a: "int",
        b: "char",
        c: "double",
        d: "boolean",
        correct: "c",
    },
    {
        question: "O que é uma variável?",
        a: "Um espaço na memória para armazenar dados",
        b: "Uma operação matemática",
        c: "Uma estrutura de controle",
        d: "Um tipo de função",
        correct: "a",
    },
    {
        question: "Qual operador é utilizado para realizar a divisão inteira em Phyton?",
        a: "/",
        b: "%",
        c: "//",
        d: "*",
        correct: "c",
    },
    {
        question: "Qual o resultado da expressão 5 % 2?",
        a: 2,
        b: 2.5,
        c: 1,
        d: 0,
        correct: "c",
    },
    {
        question: "Qual estrutura de controle é utilizada para repetir um bloco de código enquanto uma condição for verdadeira?",
        a: "if",
        b: "else",
        c: "while",
        d: "for",
        correct: "c",
    },
    {
        question: "Para que serve a instrução 'break' dentro de um loop?",
        a: "Inicia um novo loop",
        b: "Sai do loop atual",
        c: "Incrementa o contador do loop",
        d: "Declara uma nova variável",
        correct: "b",
    },
    {
        question: "Qual a principal característica de um array?",
        a: "Armazenar elementos de diferentes tipos de dados",
        b: "Armazenar elementos de um mesmo tipo de dado em posições consecutivas na memória",
        c: "Ser dinâmico, podendo mudar de tamanho durante a execução",
        d: "Ser utilizado apenas para armazenar números",
        correct: "b",
    },
    {
        question: "Como se acessa o primeiro elemento de um array chamado 'numeros'?",
        a: "numeros[0]",
        b: "numeros[1]",
        c: "numeros[-1]",
        d: "numeros[numeros.length]",
        correct: "a",
    },
    {
        question: "Qual a parte de uma função que especifica os dados que ela recebe?",
        a: "Corpo da função",
        b: "Nome da função",
        c: "Parâmetros",
        d: "Retorno",
        correct: "c",
    },
    {
        question: "O que é uma função recursiva?",
        a: "Uma função que chama a si mesma",
        b: "Uma função que não retorna nenhum valor",
        c: "Uma função que recebe um número infinito de parâmetros",
        d: "Uma função que é chamada apenas uma vez",
        correct: "a",
    },
    {
        question: "Qual a diferença entre uma classe e um objeto?",
        a: "Uma classe é uma instância de um objeto",
        b: "Um objeto é uma instância de uma classe",
        c: "Não há diferença entre classe e objeto",
        d: "Uma classe é um tipo de dado primitivo",
        correct: "b",
    },
    {
        question: "O que são atributos de uma classe?",
        a: "As ações que um objeto pode realizar",
        b: "As características de um objeto",
        c: "As funções de uma classe",
        d: "Os tipos de dados que uma classe pode armazenar",
        correct: "b",
    },
];

const quiz = document.getElementById('quiz');
const answerEls = document.querySelectorAll('.answer');
const questionEl = document.getElementById('question');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const submitBtn = document.getElementById('submit');
const startScreen = document.getElementById('start-screen');
const userNameInput = document.getElementById('user-name');
const startButton = document.getElementById('start-button');
let currentQuiz = 0;
let score = 0;

startButton.addEventListener('click', () => {
    const userName = userNameInput.value;

    if (!userName) {
        alert("Por favor, insira seu nome antes de começar.");
        return;
    }

    console.log(`Bem-vindo, ${userName}!`);
    startScreen.style.display = 'none';
    quiz.style.display = 'block';

    // Armazenar o nome do usuário no localStorage
    localStorage.setItem('userName', userName);

    loadQuiz();
});

function loadQuiz() {
    deselectAnswers();
    const currentQuizData = quizData[currentQuiz];
    questionEl.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;
}

function deselectAnswers() {
    answerEls.forEach(answerEl => answerEl.checked = false);
}

function getSelected() {
    let answer;
    answerEls.forEach(answerEl => {
        if (answerEl.checked) {
            answer = answerEl.id;
        }
    });
    return answer;
}

submitBtn.addEventListener('click', () => {
    const answer = getSelected();

    if (answer) {
        if (answer === quizData[currentQuiz].correct) {
            score++;
        }

        currentQuiz++;

        if (currentQuiz < quizData.length) {
            loadQuiz();
        } else {
            const userName = localStorage.getItem('userName');
            localStorage.setItem('quizResult', `${score}/${quizData.length}`);

            if (score >= 10) {
                showCelebration(userName);
            } else {
                quiz.innerHTML = `
                    <h2>${userName}, você acertou ${score}/${quizData.length} perguntas corretamente</h2>
                    <button onclick="location.reload()">Recarregar</button>
                `;
            }
        }
    }
});

function showCelebration(userName) {
    quiz.innerHTML = `
        <h2>Parabéns, ${userName}! Você acertou ${score}/${quizData.length}!</h2>
        <div class="confetti-container">
            <div class="confetti"></div>
            <div class="confetti"></div>
            <div class="confetti"></div>
            <div class="confetti"></div>
            <div class="confetti"></div>
        </div>
        <button onclick="location.reload()">Recarregar</button>
    `;

    // Adicionar a classe de animação de confete
    const confettiEls = document.querySelectorAll('.confetti');
    confettiEls.forEach(el => el.classList.add('animate-confetti'));
}
startButton.addEventListener('click', () => {
    const userName = userNameInput.value;
    
    if (!userName) {
        alert("Por favor, insira seu nome antes de começar.");
        return;
    }
    
    console.log(`Bem-vindo, ${userName}!`);
    startScreen.style.display = 'none';
    quiz.style.display = 'block';
    
    // Armazenar o nome do usuário no localStorage
    localStorage.setItem('userName', userName);
    
    loadQuiz();
});

submitBtn.addEventListener('click', () => {
    const answer = getSelected();
    
    if (answer) {
        if (answer === quizData[currentQuiz].correct) {
            score++;
        }
        
        currentQuiz++;
        
        if (currentQuiz < quizData.length) {
            loadQuiz();
        } else {
            const userName = localStorage.getItem('userName');
            // Armazenar o resultado no localStorage
            localStorage.setItem('quizResult', `${score}/${quizData.length}`);
            
            quiz.innerHTML = `
                <h2>${userName}, você acertou ${score}/${quizData.length} perguntas corretamente</h2>
                <button onclick="location.reload()">Recarregar</button>
            `;
        }
    }
});
const storedName = localStorage.getItem('userName');
const storedResult = localStorage.getItem('quizResult');

console.log(`Nome do usuário: ${storedName}`);
console.log(`Resultado do quiz: ${storedResult}`);





