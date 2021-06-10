var currentTimeSpan = document.createElement("span");
var totalTimeSpan = document.createElement("span");
currentTimeSpan.className = "currentTimeSpan";
totalTimeSpan.className = "totalTimeSpan";

var timeDiv = document.createElement("div");
timeDiv.style.float = "right";
timeDiv.style.display = "inline-block";
timeDiv.appendChild(currentTimeSpan);
timeDiv.appendChild(totalTimeSpan);

var progressBar = document.createElement("div");
progressBar.id = "progressBar";
var progress = document.createElement("div");
progress.id = "progress";
progressBar.appendChild(progress);

var titleElement;
var time;
var totalTime;
var currentTimeElement;
var streamTitle;
var duration;

var titleCheck = setInterval(() => {
    videoElement = document.querySelector("video");
    
    if(videoElement?.duration > 0) {
        clearInterval(titleCheck);

        titleElement = document.querySelector("#info-contents").getElementsByTagName("yt-formatted-string")[1];
        titleElement.appendChild(timeDiv);

        streamTitle = titleElement.textContent;
        
        document.querySelector("#primary-inner #player").insertAdjacentElement("afterend", progressBar);

        getElements();

        setInterval(() => {
            titleElement = document.querySelector("#info-contents").getElementsByTagName("yt-formatted-string")[1];
            var tempTitle = titleElement.textContent.substring(0, titleElement.textContent.length - currentTimeSpan.textContent.length - totalTimeSpan.textContent.length);
            if (streamTitle != tempTitle) {
                streamTitle = tempTitle;
                getElements();
            }
            
        }, 1000);
        
        setInterval(() => {
            updateCurrentTime();
        }, 500);
    }
}, 1000);

function getElements() {
    videoElement = document.querySelector("video");
    duration = videoElement.duration;

    totalTimeSpan.textContent = " / " + getTimeString(duration);

    updateCurrentTime();
}

function updateCurrentTime() {
    var currentTimeSeconds = videoElement.currentTime;
    currentTimeSpan.textContent = getTimeString(currentTimeSeconds);

    progress.style.width = "" + (currentTimeSeconds * 100 / duration) + "%";
}

function getTimeString(time) {
    var hours =  Math.floor(time / 3600);
    var res = "" + hours + ":" + getTwoDigitNumber(Math.floor((time - hours * 3600) / 60)) + ":" + getTwoDigitNumber(Math.floor(time % 60));
    return res;
}

function getTwoDigitNumber(n) {
    return n > 9 ? "" + n : "0" + n;
}