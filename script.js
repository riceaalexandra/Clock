/* function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const timeString = `${hours}:${minutes}`;
    document.getElementById('time').textContent = timeString;

    const days = ['Luni', 'Marti', 'Miercuri', 'Joi', 'Vineri', 'sambata', 'Duminica'];
    const months = [
        'Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie', 'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'
    ];
    const day = days[now.getDay()];
    const month = months[now.getMonth()];
    const date = now.getDate();
    const year = now.getFullYear();
    const dateString = `${day}, ${date} ${month}`;
    document.getElementById('date').textContent = dateString;
} 

setInterval(updateTime, 1000);
updateTime(); */

let countdownInterval;
let sessionState = 'idle'; //idle, waiting, session, finished

document.getElementById('startButton').addEventListener('click', function() {
    if (sessionState === 'idle') {
        sessionState = 'waiting';
        startCountdown(60, "Sesiunea incepe in ", "Sesiunea a inceput, mai aveti ");
    }
});

function startCountdown(duration, initialMessage, nextMessage) {
    let timer = duration, minutes, seconds;
    countdownInterval = setInterval(function () {
        minutes = Math.floor(timer / 60);
        seconds = Math.floor(timer % 60);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        document.getElementById('sessionMessage').innerHTML = initialMessage + `<span id="countdown">${minutes}:${seconds}</span>`;
		
        if (--timer < 0) {
            clearInterval(countdownInterval);
            if (sessionState === 'waiting') {
                sessionState = 'session';
                startCountdown(120, nextMessage, "Va multumim si va mai asteptam pe la noi!");
            } else if (sessionState === 'session') {
                sessionState = 'finished';
                document.getElementById('sessionMessage').textContent = "Va multumim si va mai asteptam pe la noi";
                setTimeout(function() {
                    sessionState = 'idle';
                    document.getElementById('sessionMessage').textContent = "Solar liber";
                }, 5000); 
            }
        }
    }, 1000);
}

