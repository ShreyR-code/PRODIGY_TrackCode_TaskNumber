let startTime, updatedTime, difference;
let timerInterval;
let running = false;

function startStopwatch() {
    if (!running) {
        startTime = new Date().getTime();
        timerInterval = setInterval(updateTime, 10);
        running = true;
    }
}

function stopStopwatch() {
    if (running) {
        clearInterval(timerInterval);
        running = false;
    }
}

function resetStopwatch() {
    clearInterval(timerInterval);
    updatedTime = "00:00:00";
    document.getElementById("display").innerHTML = updatedTime;
    running = false;
}

function updateTime() {
    updatedTime = new Date().getTime() - startTime;
    difference = new Date(updatedTime);

    let minutes = ("0" + difference.getMinutes()).slice(-2);
    let seconds = ("0" + difference.getSeconds()).slice(-2);
    let milliseconds = ("0" + Math.floor(difference.getMilliseconds() / 10)).slice(-2);

    document.getElementById("display").innerHTML = minutes + ":" + seconds + ":" + milliseconds;
}
