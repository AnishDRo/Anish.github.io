document.addEventListener('DOMContentLoaded', () => {
    const textToType = document.getElementById('text-to-type').innerText.split(' ');
    const typedText = document.getElementById('typed-text');
    const submitButton = document.getElementById('submit-button');
    const restartButton = document.getElementById('restart-button');
    const resultsForm = document.getElementById('results-form');
    let startTime, endTime, timerInterval, countdownInterval;
    let timeLeft = 15 * 60; // 15 minutes in seconds

    typedText.addEventListener('input', () => {
        if (!startTime) {
            startTime = new Date().getTime();
            startTimer();
            startCountdown();
        }
    });

    submitButton.addEventListener('click', calculateResults);
    restartButton.addEventListener('click', restartTest);

    function startTimer() {
        timerInterval = setInterval(() => {
            const currentTime = new Date().getTime();
            const totalTime = ((currentTime - startTime) / 1000).toFixed(2);
            document.getElementById('time-taken').innerText = `Time Taken: ${totalTime}s`;
        }, 100);
    }

    function startCountdown() {
        countdownInterval = setInterval(() => {
            if (timeLeft <= 0) {
                clearInterval(countdownInterval);
                calculateResults();
            } else {
                timeLeft--;
                const minutes = Math.floor(timeLeft / 60);
                const seconds = timeLeft % 60;
                document.getElementById('timer').innerText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            }
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timerInterval);
    }

    function calculateResults() {
        endTime = new Date().getTime();
        stopTimer();
        clearInterval(countdownInterval);
        const totalTime = (endTime - startTime) / 1000;
        const typedWordsArray = typedText.value.trim().split(/\s+/);
        const correctWords = typedWordsArray.filter((word, index) => word === textToType[index]).length;
        const wrongWords = typedWordsArray.length - correctWords;
        const netSpeed = (correctWords / totalTime) * 60;
        const accuracy = (correctWords / typedWordsArray.length) * 100;

        // Set form values
        document.getElementById('timeTaken').value = totalTime.toFixed(2);
        document.getElementById('typedWords').value = typedWordsArray.length;
        document.getElementById('correctWords').value = correctWords;
        document.getElementById('wrongWords').value = wrongWords;
        document.getElementById('netSpeed').value = netSpeed.toFixed(2);
        document.getElementById('accuracy').value = accuracy.toFixed(2);

        // Submit the form
        resultsForm.submit();
    }

    function restartTest() {
        typedText.value = '';
        startTime = null;
        endTime = null;
        stopTimer();
        clearInterval(countdownInterval);
        timeLeft = 15 * 60; // Reset the countdown
        document.getElementById('timer').innerText = '15:00';
        document.getElementById('time-taken').innerText = 'Time Taken: 0s';
        document.getElementById('typed-words').innerText = 'Typed Words: 0';
        document.getElementById('correct-words').innerText = 'Correct Words: 0';
        document.getElementById('wrong-words').innerText = 'Wrong Words: 0';
        document.getElementById('net-speed').innerText = 'Net Speed WPM: 0';
        document.getElementById('accuracy').innerText = 'Speed Accuracy: 0%';
    }
});
