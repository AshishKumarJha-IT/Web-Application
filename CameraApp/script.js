let video = document.querySelector("video");
let recordBtnCont = document.querySelector(".record-btn-cont");
let captureBtnCont = document.querySelector(".capture-btn-cont");
let recordBtn = document.querySelector(".record-btn");
let captureBtn = document.querySelector(".capture-btn");
let recordFlag = false;
let transparentcolor = "transparent";

let recorder;
let chunks = [];

let constraints = {
    video: true,
    audio:true
}
//navigator global object (window obj) it give browser info
navigator.mediaDevices.getUserMedia(constraints)
.then((strem) =>{
    video.srcObject = strem;

    recorder = new MediaRecorder(strem);   //api
    //Store chunks to video form.
    recorder.addEventListener("start", (e)=>{
        chunks = [];
    })
    recorder.addEventListener("dataavailable",(e)=>{
        chunks.push(e.data);
    });
    recorder.addEventListener("stop", (e)=>{
        //Conversion of media chunks to video
        let blob = new Blob(chunks, {type: "video/mp4"}); //api
        let videoURL = window.URL.createObjectURL(blob);

        let a = document.createElement("a");
        a.href = videoURL;
        a.download = "strem.mp4";
        a.click();
    })
})

recordBtnCont.addEventListener("click", (e)=>{
    if(!recorder) return;

    recordFlag = !recordFlag
    if(recordFlag){ //start
        recorder.start();
        recordBtn.classList.add("scale-record");
        startTimer();
    }else{ //stop
        recorder.stop();
        recordBtn.classList.remove("scale-record");
        stopTimer();
    }
})

//Canvas is browser api used for drawing graphic(major 2D graphic)
captureBtnCont.addEventListener("click", (e)=>{

    let canvas = document.createElement("canvas");
    canvas.width = video.width;
    canvas.height = video.height;

    let tool = canvas.getContext("2d");
    tool.drawImage(video, 0, 0, canvas.width, canvas.height);

    //Add filter to strem
    tool.fillStyle = transparentcolor
    tool.fillRect(0, 0, canvas.width, canvas.height);
    let imageURL = canvas.toDataURL();

    let a = document.createElement("a");
    a.href = imageURL;
    a.download = "image.jpg";
    a.click();
})


let timerID;
let counter = 0; //Represent total second
let timer = document.querySelector(".timer");
function startTimer(){
    timer.style.display = "block";
    function displayTimer(){
        let totalSeconds = counter;

        let hr = Number.parseInt(totalSeconds/3600);
        totalSeconds = totalSeconds % 3600;

        let min = Number.parseInt(totalSeconds/60);
        totalSeconds = totalSeconds % 60;

        let sec = totalSeconds;

        //For making two digits timer
        hr = (hr < 10)? `0${hr}`: hr;
        min = (min < 10)? `0${min}`: min;
        sec = (sec < 10)? `0${sec}`: sec;

        timer.innerText = `${hr}:${min}:${sec}`;

        counter++;
    }
    timerID = setInterval(displayTimer, 1000)
}
function stopTimer(){
    timer.style.display = "none";
    clearInterval(timerID);
    timer.innerText = "00:00:00";
}

//filtering 
let filterLayer = document.querySelector(".filter-layer");
let allFilters = document.querySelectorAll(".filter");
allFilters.forEach((filterEle)=>{
    filterEle.addEventListener("click", (e)=>{
       transparentcolor =  getComputedStyle(filterEle).getPropertyValue("background-color");
       filterLayer.style.backgroundColor = transparentcolor;
    })
})
