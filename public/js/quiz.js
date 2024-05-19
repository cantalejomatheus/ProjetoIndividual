// Objeto para armazenar as respostas do usuário
const userAnswers = {};

// Mapeamento das respostas para os beatboxers
const answerToBeatboxer = {
    "KickDrum": "Napom",
    "Hi-Hat": "Dlow",
    "Snare": "Helium",
    "Bass": "Codfish",
    "Quando tem uma boa melodia": "Codfish",
    "Quando tem uma boa estrutura de sons": "Helium",
    "Quando tem muito drops": "Dlow",
    "Quando tem um estilo totalmente diferente do convencional": "Napom",
    "Calmo": "Codfish",
    "Agressivo": "Helium",
    "Paciente": "Dlow",
    "Observador": "Napom"
};

// Mapeamento dos beatboxers para vídeos do YouTube
const beatboxerToVideo = {
    "Napom": "https://www.youtube.com/embed/hddAPNIKb0Q",
    "Codfish": "https://www.youtube.com/embed/vZjjgw8Nc6Q",
    "Dlow": "https://www.youtube.com/embed/0I_FIPcl0dA",
    "Helium": "https://www.youtube.com/embed/Z-YzcRN3yZs"
};

// Contagem dos resultados
const beatboxerCount = {
    "Napom": 0,
    "Codfish": 0,
    "Dlow": 0,
    "Helium": 0
};

// Função para exibir a próxima pergunta
function selectOption(element, nextQuestionId) {
    const questionText = element.parentElement.previousElementSibling.innerText;
    const answerText = element.innerText;

    // Armazenar a resposta do usuário
    userAnswers[questionText] = answerText;

    // Ocultar a pergunta atual
    element.parentElement.parentElement.classList.add('hidden');

    // Exibir a próxima pergunta
    document.getElementById(nextQuestionId).classList.remove('hidden');

    // Se a próxima pergunta for o resultado, calcule e exiba o resultado
    if (nextQuestionId === 'resultado') {
        showResult();
    }
}

// Função para determinar o beatboxer recomendado
function showResult() {
    const resultElement = document.getElementById('result-text');

    // Contadores para cada beatboxer
    const beatboxers = {
        "Napom": 0,
        "Codfish": 0,
        "Dlow": 0,
        "Helium": 0
    };

    // Contar as respostas do usuário
    for (const key in userAnswers) {
        const answer = userAnswers[key];
        const beatboxer = answerToBeatboxer[answer];
        if (beatboxer) {
            beatboxers[beatboxer]++;
        }
    }

    // Determinar o beatboxer com o maior número de respostas
    let recommendedBeatboxer = '';
    let maxCount = 0;

    for (const beatboxer in beatboxers) {
        if (beatboxers[beatboxer] > maxCount) {
            maxCount = beatboxers[beatboxer];
            recommendedBeatboxer = beatboxer;
        }
    }

    // Incrementar contagem global do beatboxer
    beatboxerCount[recommendedBeatboxer]++;

    // Exibir o resultado
    resultElement.innerText = `Você se parece mais com: ${recommendedBeatboxer}`;

    // Atualizar o vídeo do YouTube
    const youtubeIframe = document.getElementById('youtube-iframe');
    youtubeIframe.src = beatboxerToVideo[recommendedBeatboxer];

    // Atualizar o gráfico
    updateChart();
}

// Inicializa o gráfico do Chart.js
let chart;

function initializeChart() {
    const ctx = document.getElementById('resultChart').getContext('2d');
    const data = {
        labels: ['Napom', 'Codfish', 'Dlow', 'Helium'],
        datasets: [{
            data: [beatboxerCount.Napom, beatboxerCount.Codfish, beatboxerCount.Dlow, beatboxerCount.Helium],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
        }]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'top'
            }
        }
    };

    chart = new Chart(ctx, {
        type: 'doughnut',
        data: data,
        options: options
    });
}

// Função para buscar os dados do gráfico da API
function fetchChartData() {
    fetch('/api/beatboxer-count')
        .then(response => response.json())
        .then(data => initializeChart(data))
        .catch(error => console.error('Erro ao buscar dados do gráfico:', error));
}

// Função para atualizar o gráfico do Chart.js
function updateChart() {
    chart.data.datasets[0].data = [beatboxerCount.Napom, beatboxerCount.Codfish, beatboxerCount.Dlow, beatboxerCount.Helium];
    chart.update();
}

// Função para mostrar a tela de perguntas e respostas quando o botão for clicado
function showQuiz() {
    // Seleciona a div com class="quiz-questions"
    var quizQuestions = document.querySelector('.quiz-questions');

    // Altera o estilo display para 'block' para mostrar a div
    quizQuestions.style.display = 'block';
}

// Inicializa o gráfico ao carregar a página
window.onload = function() {
    initializeChart();
};
