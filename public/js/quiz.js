/*     const userAnswers = {};
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
    const beatboxerToVideo = {
        "Napom": "https://www.youtube.com/embed/hddAPNIKb0Q",
        "Codfish": "https://www.youtube.com/embed/vZjjgw8Nc6Q",
        "Dlow": "https://www.youtube.com/embed/0I_FIPcl0dA",
        "Helium": "https://www.youtube.com/embed/Z-YzcRN3yZs"
    };
    const beatboxerCount = {
        "Napom": 0,
        "Codfish": 0,
        "Dlow": 0,
        "Helium": 0
    };
    let chart;

    function selectOption(element, nextQuestionId) {
        const questionText = element.parentElement.previousElementSibling.innerText;
        const answerText = element.innerText;
        userAnswers[questionText] = answerText;
        element.parentElement.parentElement.classList.add('hidden');
        document.getElementById(nextQuestionId).classList.remove('hidden');
        if (nextQuestionId === 'resultado') {
            showResult();
        }
    }

    function showResult() {
        const resultElement = document.getElementById('result-text');
        const beatboxers = {"Napom": 0, "Codfish": 0, "Dlow": 0, "Helium": 0};
        for (const key in userAnswers) {
            const answer = userAnswers[key];
            const beatboxer = answerToBeatboxer[answer];
            if (beatboxer) {
                beatboxers[beatboxer]++;
            }
        }
        let recommendedBeatboxer = '';
        let maxCount = 0;
        for (const beatboxer in beatboxers) {
            if (beatboxers[beatboxer] > maxCount) {
                maxCount = beatboxers[beatboxer];
                recommendedBeatboxer = beatboxer;
            }
        }
        beatboxerCount[recommendedBeatboxer]++;
        resultElement.innerText = `Você se parece mais com: ${recommendedBeatboxer}`;
        const youtubeIframe = document.getElementById('youtube-iframe');
        youtubeIframe.src = beatboxerToVideo[recommendedBeatboxer];
        updateChart();
        toggleButton();
    }

    function initializeChart(data) {
        const ctx = document.getElementById('resultChart').getContext('2d');
        const chartData = {
            labels: ['Napom', 'Codfish', 'Dlow', 'Helium'],
            datasets: [{
                data: data,
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
        if (chart) {
            chart.destroy();
        }
        chart = new Chart(ctx, {
            type: 'doughnut',
            data: chartData,
            options: options
        });
    }

    function fetchChartData() {
        fetch('/usuarios/beatboxer-count')
            .then(response => response.json())
            .then(data => {
                const chartData = [data.Napom, data.Codfish, data.Dlow, data.Helium];
                initializeChart(chartData);
            })
            .catch(error => console.error('Erro ao buscar dados do gráfico:', error));
    }

    function updateChart() {
        chart.data.datasets[0].data = [beatboxerCount.Napom, beatboxerCount.Codfish, beatboxerCount.Dlow, beatboxerCount.Helium];
        chart.update();
    }

    function toggleQuiz() {
        const button = document.getElementById('quiz-button');
        const quizQuestions = document.querySelector('.quiz-questions');
        if (quizQuestions.style.display === 'none') {
            quizQuestions.style.display = 'block';
            button.innerText = 'Encerrar Quiz';
        } else {
            resetQuiz();
        }
    }

    function toggleButton() {
        const button = document.getElementById('quiz-button');
        button.innerText = 'Encerrar Quiz';
        button.onclick = resetQuiz;
    }

    function resetQuiz() {
        const quizQuestions = document.querySelector('.quiz-questions');
        const questions = document.querySelectorAll('.question');
        questions.forEach(question => question.classList.add('hidden'));
        document.querySelector('.question').classList.remove('hidden');
        quizQuestions.style.display = 'none';
        const button = document.getElementById('quiz-button');
        button.innerText = 'Começar Quiz';
        button.onclick = toggleQuiz;
        userAnswers = {};
        chart.destroy();
        fetchChartData();
    }

    window.onload = function() {
        fetchChartData();
    };
 */