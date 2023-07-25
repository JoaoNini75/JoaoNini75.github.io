let seconds = 0;
let minutes = 45;
let hours = 0;

let displaySeconds = 0;
let displayMinutes = 45;
let displayHours = 0;

const display = document.querySelector("#time");
let interval = null;
let statuss = "stopped";
const startStop = document.querySelector("#startStop");
const timeIn = document.getElementById("timeIn");

timeIn.value = "00:45:00";
const sst = sessionStorage.getItem("time");
if (sst != null) {
    timeIn.value = sst;
    setTimeInValues(sst);
    setDisplayValues();
}  

let selectedAudio = document.getElementById("audioList");
let audioFileElem = document.getElementById("audioFileChooser");
let audioFile = null;

function stopWatch(isCountdown) {
    if (isCountdown) {
        seconds--;

        if (seconds == -1) { 
            seconds = 59;
            minutes--;
    
            if (minutes == -1) {
                minutes = 59;
                hours--;

                if (hours == -1)
                    endCount();
            }
        }
    } else {
        seconds++; 

        if (seconds == 60) { 
            seconds = 0;
            minutes++;
    
            if (minutes == 60) {
                minutes = 0;
                hours++;
            }
        }
    }
    
    setDisplayValues();
}

function stopOrReset() {
    window.clearInterval(interval);
    startStop.innerText = "Start";
    startStop.style.backgroundColor = "#33dd33";
    statuss = "stopped";
    display.innerText = setTimeInValues(timeIn.value); 
}

document.querySelector("#startStop").onclick = function() {
    if (statuss === "stopped") {
        let timeInVal = timeIn.value;
        if (timeInVal != "") 
            setTimeInValues(timeInVal);

        interval = window.setInterval(stopWatch, 1000, true);       
        startStop.innerText = "Stop";
        startStop.style.backgroundColor = "#ff2222";     
        statuss = "started";
    } else 
        stopOrReset();
}

document.querySelector("#reset").onclick = function() {
    stopOrReset();
    display.innerText = setTimeInValues(timeIn.value);     
}

timeIn.onchange = function() {
    const actualTime = getActualTime(timeIn.value);
    display.innerText = actualTime;
    sessionStorage.setItem("time", actualTime);
}

function setTimeInValues(timeInVal) {
    let hhmmss = timeInVal.split(":");
    hours = hhmmss[0];
    minutes = hhmmss[1];
    seconds = hhmmss[2];
    return getActualTime(timeInVal);
}

function getActualTime(timeStr) {
    const mainString = timeStr.substring(0, 7);
    const lastDigit = (parseInt(timeStr.substring(7)) - 1).toString();
    console.log(mainString + lastDigit);
    return mainString + lastDigit;
}

function setDisplayValues() {
    if (seconds < 10 && seconds.toString().length == 1)
        displaySeconds = "0" + seconds.toString();
    else
        displaySeconds = seconds;

    if (minutes < 10 && minutes.toString().length == 1)
        displayMinutes = "0" + minutes.toString();
    else
        displayMinutes = minutes;

    if (hours < 10 && hours.toString().length == 1)
        displayHours = "0" + hours.toString();
    else
        displayHours = hours;  

    display.innerText = displayHours + ":" + displayMinutes + ":" + displaySeconds;
}

audioFileElem.onchange = function() {
    readFile(audioFileElem.files[0]);
}

function readFile(file) {
    let fileType = audioFileElem.value.split(".").slice(-1)[0];
    if (fileType != "mp3") {
        alert("Only mp3 files are allowed.");
        return;
    }

    let fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file);
        fileReader.onload = function(e) {
            audioFile = e.target.result;
            console.log(("Filename: '" + file.name + "'"), ( "(" + ((Math.floor(file.size/1024/1024*100))/100) + " MB)" ));
        }
}

async function playAudioFile() {
    let context = new window.AudioContext();
    await context.decodeAudioData(audioFile, function(buffer) {
        let source = context.createBufferSource();
            source.buffer = buffer;
            source.loop = false;
            source.connect(context.destination);
            source.start(0); 
    });
}

async function endCount() {
    stopOrReset();
    const currTitle = document.title;
    document.title = "Time is over!";

    if (audioFile != null) {
        await playAudioFile();
    } else {
        let audio = new Audio(`audios/${selectedAudio.value}.mp3`);
        await audio.play();
    }
    
    alert("Pomodoro timer ended.");
    document.title = currTitle;
}
