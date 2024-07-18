document.addEventListener('DOMContentLoaded', () => {
    const textToType = document.getElementById('text-to-type').innerText.split(' ');
    const typedText = document.getElementById('typed-text');
    const submitButton = document.getElementById('submit-button');
    const restartButton = document.getElementById('restart-button');
    let startTime, endTime, timerInterval;

    typedText.addEventListener('input', () => {
        if (!startTime) {
            startTime = new Date().getTime();
            startTimer();
        }
    });

    submitButton.addEventListener('click', calculateResults);
    restartButton.addEventListener('click', restartTest);

    function startTimer() {
        timerInterval = setInterval(() => {
            const currentTime = new Date().getTime();
            const totalTime = ((currentTime - startTime) / 1000).toFixed(2);
            document.getElementById('timer').innerText = `Time Taken: ${totalTime}s`;
        }, 100);
    }

    function stopTimer() {
        clearInterval(timerInterval);
    }

    function calculateResults() {
        endTime = new Date().getTime();
        stopTimer();
        const totalTime = (endTime - startTime) / 1000;
        const typedWordsArray = typedText.value.trim().split(/\s+/);
        const correctWords = typedWordsArray.filter((word, index) => word === textToType[index]).length;
        const wrongWords = typedWordsArray.length - correctWords;
        const netSpeed = (correctWords / totalTime) * 60;
        const accuracy = (correctWords / typedWordsArray.length) * 100;

        document.getElementById('timer').innerText = `Time Taken: ${totalTime.toFixed(2)}s`;
        document.getElementById('typed-words').innerText = `Typed Words: ${typedWordsArray.length}`;
        document.getElementById('correct-words').innerText = `Correct Words: ${correctWords}`;
        document.getElementById('wrong-words').innerText = `Wrong Words: ${wrongWords}`;
        document.getElementById('net-speed').innerText = `Net Speed WPM: ${netSpeed.toFixed(2)}`;
        document.getElementById('accuracy').innerText = `Speed Accuracy: ${accuracy.toFixed(2)}%`;
    }

    function restartTest() {
        typedText.value = '';
        startTime = null;
        endTime = null;
        stopTimer();
        document.getElementById('timer').innerText = 'Time Taken: 0s';
        document.getElementById('typed-words').innerText = 'Typed Words: 0';
        document.getElementById('correct-words').innerText = 'Correct Words: 0';
        document.getElementById('wrong-words').innerText = 'Wrong Words: 0';
        document.getElementById('net-speed').innerText = 'Net Speed WPM: 0';
        document.getElementById('accuracy').innerText = 'Speed Accuracy: 0%';
    }
});
