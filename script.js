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

function stopOrReset() {
    window.clearInterval(interval);
    startStop.innerText = "Start";
    startStop.style.backgroundColor = "#33dd33";
    statuss = "stopped";
    let timeInVal = timeIn.value;
    setTimeInValues(timeInVal);
    display.innerText = timeInVal; 
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
    let timeInVal = timeIn.value;
    setTimeInValues(timeInVal);
    display.innerText = timeInVal;       
}

timeIn.onchange = function() {
    display.innerText = timeIn.value;
}

function setTimeInValues(timeInVal) {
    console.log(timeInVal);
    let hhmmss = timeInVal.split(":");
    hours = hhmmss[0];
    minutes = hhmmss[1];
    seconds = hhmmss[2];
}

audioFileElem.onchange = function() {
    readFile(audioFileElem.files[0]);
}

function readFile(file) {
    var fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file);
        fileReader.onload = function(e) {
            audioFile = e.target.result;
            console.log(("Filename: '" + file.name + "'"), ( "(" + ((Math.floor(file.size/1024/1024*100))/100) + " MB)" ));
            console.log(audioFile);
        }
}

async function playAudioFile(file) {
    var context = new window.AudioContext();
        context.decodeAudioData(file, function(buffer) {
            var source = context.createBufferSource();
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

    if (audioFile != null)
        await playAudioFile(audioFile);
    else {
        let audio = new Audio('audios/default_timer_end.mp3');
        await audio.play();
    }
    
    alert("Pomodoro timer ended");
    document.title = currTitle;
}
