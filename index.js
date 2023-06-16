


/*===========================================
============== Clock section=================
==========================================*/

const hr = document.querySelector("#hr");
const mn = document.querySelector("#mn");
const sc = document.querySelector("#sc");

setInterval(() => {

    /***** analog-clock*****/
    let day = new Date();
    let hh = day.getHours() * 30;
    let mm = day.getMinutes() * 6;
    let ss = day.getSeconds() * 6;
    ss -= 180;
    hr.style.transform = `rotateZ(${hh + (mm / 12)}deg)`;
    mn.style.transform = `rotateZ(${mm}deg)`;
    sc.style.transform = `rotateZ(${ss}deg)`;


    /***** .digital-clock*****/

    let hou = document.querySelector("#hou");
    let min = document.querySelector("#min");
    let sec = document.querySelector("#sec");
    let ampm = document.querySelector("#ampm");

    let h = new Date().getHours();
    let m = new Date().getMinutes();
    let s = new Date().getSeconds();
    let am = "AM";

    if (h > 12) {
        h -= 12;
        am = "PM";
    }
    h = (h < 12) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;

    hou.innerHTML = h + ":";
    min.innerHTML = m + ":";
    sec.innerHTML = s;
    ampm.innerHTML = am;
})


/*===========================================
============== Alarm section =================
==========================================*/

let alarmDigitalTime = document.querySelector("#alarm-time");
let alarmSelect = document.querySelectorAll(".alarm-select");
let alarmSet = document.querySelector(".alarm-set");
let alarmStop = document.querySelector(".alarm-stop");
let alarmListUl = document.querySelector("#upcoming-alarms-list");

const ringtone = new Audio(`audio/Alarm-ringtone.mp3`);

setInterval(() => {
    /******* digital clock ********/
    let alarmDigital = document.querySelector("#hou");

    let ah = new Date().getHours();
    let am = new Date().getMinutes();
    let as = new Date().getSeconds();
    let aam = "AM";

    if (ah > 12) {
        ah -= 12;
        aam = "PM";
    }
    ah = (ah < 12) ? "0" + ah : ah;
    am = (am < 10) ? "0" + am : am;
    as = (as < 10) ? "0" + as : as;
    currentTime = `${ah} : ${am} : ${as}`;
    alarmDigitalTime.innerHTML = `${ah} : ${am} : ${as}  ${aam}`;

    // if (alarmListArr.includes(currentTime)) {
    //     Ring(currentTime);
    // }
})


/************alarm select menu section****************/

for (let i = 12; i > 0; i--) {
    i = i < 10 ? "0" + i : i;
    let alarmHoueOption = `<option value="${i}">${i}</option>`;
    alarmSelect[0].firstElementChild.insertAdjacentHTML("afterend", alarmHoueOption)
}

for (let i = 59; i >= 0; i--) {
    i = i < 10 ? "0" + i : i;
    let alarmMinuteOption = `<option value ="${i}">${i}</opton>`;
    alarmSelect[1].firstElementChild.insertAdjacentHTML("afterend", alarmMinuteOption);
}
for (let i = 59; i > 0; i--) {
    i = i < 10 ? "0" + i : i;
    let alarmSecondOption = `<option value"${i}">${i}</option>`;
    alarmSelect[2].firstElementChild.insertAdjacentHTML("afterend", alarmSecondOption);
}
for (let i = 2; i > 0; i--) {
    let ampm = i == 1 ? "AM" : "PM";
    let alarmAmPmOption = `<option value"${ampm}">${ampm}</option>`;
    alarmSelect[3].firstElementChild.insertAdjacentHTML("afterend", alarmAmPmOption);
}


function Ring(Time) {
    audio.play();
    audio.loop = true;
    alert(`It's ${Time}`);
}

checkAlarms=()=>{
    let alarmListArr=[];
    const isPresent = localStorage.getItem("alarms");
    if (isPresent) {
        alarmListArr = JSON.parse(isPresent); 
    }
    return alarmListArr;
}
fetch = ()=>{
    const alarms =checkAlarms();
    alarms.forEach(element => {
        setAlarm(element ,true);
        
    });
}
saveAlarms=(time)=>{
    const alarms = checkAlarms();
    alarms.push(time);
    localStorage.setItem("alarms",JSON.stringify(alarms));
}
deleteAlarm = (event, time , intervaild)=>{
    audio.pause();
    const self = event.target;
    clearInterval(intervaild);
    const alarm = self.parentElement;
    deleteAlarmFromLocal(time);
    alarm.remove();
}
deleteAlarmFromLocal=(time)=>{
    const alarms = checkAlarms();
    const index = alarms.indexOf(time);
    alarms.splice(index,1);
    localStorage.setItem("alarms",JSON.stringify(alarms));
}

getAlarm= ()=>{
    let hourValue = alarmSelect[0].value;
    let minuteValue = alarmSelect[1].value;
    let secondValue = alarmSelect[2].value;
    let AmPmValue = alarmSelect[3].value;

    const alarmSetTime = convertTotime(hourValue,minuteValue,secondValue,AmPmValue);
    setAlarm(alarmSetTime);
}

convertTotime = (hour , minute,second, ampm)=>{
    return `${parseInt(hour)}:${minute}:${second} ${ampm}`;
}

alarmSet.addEventListener("click", getAlarm );

/*===========================================
============== StopWatch section =================
==========================================*/

const playButton = document.querySelector("#start-stopwatch");
const lapButton = document.querySelector("#lap-stopwatch");
const resetButton = document.querySelector("#reset-stopwatch");
const clrButton = document.querySelector(".lap-clr");
const sec = document.querySelector(".se");
const min = document.querySelector(".mi");
const hou = document.querySelector(".ho");
const miliSec = document.querySelector(".mili");
const laps = document.getElementsByClassName("laps")[0];

let isPlay = false;
let isReset = false;
let se;
let miliSe;
let mi;

let secondCounter = 00;
let miliCounter = 00;
let minCounter = 00;
let hourCounter = 00;
let itemnumber = 0;


const togglebutton = () => {
    lapButton.classList.remove("hidden");
    resetButton.classList.remove("hidden");
}

const play = () => {

    if (!isPlay) {
        playButton.innerHTML = "Pause";
        miliSe = setInterval(() => {
            miliCounter++
            miliCounter = miliCounter < 10 ? "0" + miliCounter : miliCounter;

            if (miliCounter == 100) {
                miliCounter = "00";
                ++secondCounter;
                secondCounter = secondCounter < 10 ? "0" + secondCounter : secondCounter;
            }

            if (secondCounter == 60) {
                secondCounter = "00";
                ++minCounter;
                minCounter = minCounter < 10 ? "0" + minCounter : minCounter;
            }
            if (minCounter == 60) {
                minCounter = "00";
                ++hourCounter;
                hourCounter = hourCounter < 10 ? "0" + hourCounter : hourCounter;
            }
            if (hourCounter >= 24) {
                clearInterval(miliSe);
                alert("Out of time And Please RESET StopWatch ");
            }
            putValue();
        }, 10);
        isPlay = true;
    }
    else {
        playButton.innerHTML = "Play";
        clearInterval(se);
        clearInterval(miliSe);
        isPlay = false;

    }
    togglebutton();
}

const reset = () => {
    playButton.innerHTML = "Play  ";
    clearInterval(se);
    clearInterval(miliSe);
    lapButton.classList.add("hidden");
    resetButton.classList.add("hidden");
    secondCounter = "00 ";
    miliCounter = "00";
    minCounter = "00";

    putValue();
    isPlay = false;
}

const lapfun = () => {
    // console.log(secondCounter);
    const li = document.createElement("li");
    const number = document.createElement("span");
    const timeStamp = document.createElement("span");

    li.setAttribute("class", "lap-item");
    number.setAttribute("class", "number");
    timeStamp.setAttribute("class", "time-stamp");
    number.innerText = `#${++itemnumber}`
    timeStamp.innerHTML = `${minCounter} : ${secondCounter} : ${miliCounter}`;
    li.append(number, timeStamp);
    laps.append(li);
}

putValue = () => {
    miliSec.innerHTML = `${miliCounter}`;
    sec.innerHTML = `${secondCounter} :`
    min.innerHTML = `${minCounter} :`
}

const clearAll = () => {
    itemnumber = 0;
    laps.innerHTML = "";
}

playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
resetButton.addEventListener("click", clearAll);
lapButton.addEventListener("click", lapfun);
clrButton.addEventListener("click", clearAll);

/*===========================================
============== Timer section =================
==========================================*/


const selectMenu = document.querySelectorAll(".timer-select");
const timerTime = document.querySelector("#timertime");
const seconds = document.querySelector("#se");
const minutes = document.querySelector("#mi");
const hours = document.querySelector("#ho");
const timerStartButton = document.querySelector("#start-timerwatch");
const timerResetButton = document.querySelector("#reset-timerwatch");


let ring = new Audio("audio/Alarm-ringtone.mp3");
let dec;


for (let i = 24; i >= 0; i--) {
    i = i < 10 ? "0" + i : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}
for (let i = 59; i >= 0; i--) {
    i = i < 10 ? "0" + i : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}
for (let i = 59; i > 0; i--) {
    i = i < 10 ? "0" + i : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

isTimer = true;
let hourTimer;
let minuteTimer;
let secondTimer;
startTimer = () => {

    var timerNow = `${selectMenu[0].value} : ${selectMenu[1].value} : ${selectMenu[2].value}`;
    if (timerNow.includes("Hours") || timerNow.includes("Minute") || timerNow.includes("Second")) {
        return alert("Please, Select a valid time")
    }
    else {

        // if (isTimer) {
        // timerStartButton.innerHTML="Stop";
        hourTimer = selectMenu[0].value;
        minuteTimer = selectMenu[1].value;
        secondTimer = selectMenu[2].value;
        valueTimer(hourTimer, minuteTimer, secondTimer);
        decreaseTimer(hourTimer, minuteTimer, secondTimer);
        // isTimer = false;
        // }
        //for Stop
        // else{
        //     timerStartButton.innerHTML="Start";
        //     hourTimer = selectMenu[0].value;
        //     minuteTimer = selectMenu[1].value;
        //     secondTimer = selectMenu[2].value;
        //     valueTimer(hourTimer,minuteTimer,secondTimer);
        //     decreaseTimer(hourTimer,minuteTimer,secondTimer);
        //     isTimer = true;
        // }

    }

}


decreaseTimer = (hr, min, sec) => {
    dec = setInterval(() => {
        sec--;
        sec = sec < 10 ? "0" + sec : sec;
        if (sec == 0) {
            sec = 59;
            min--;
            min = min < 10 ? "0" + min : min;
        }
        if (min == 60) {
            min = 59;
            hr--;
            hr = hr < 10 ? "0" + hr : hr;
        }
        if (hr == 00 && sec <= 01 && min == 0) {

            let resetAuto = confirm("done");
            --sec;
            if (resetAuto || !resetAuto) {
                resetTimer();
            }

        }

        valueTimer(hr, min, sec);

    }, 1000);

}

valueTimer = (hr, min, sec) => {

    hours.innerHTML = hr + " :";
    minutes.innerHTML = min + " :";
    seconds.innerHTML = sec;
}

resetTimer = () => {
    clearInterval(dec);
    hourTimer = "00";
    minuteTimer = "00";
    secondTimer = "00";
    valueTimer(hourTimer, minuteTimer, secondTimer);
    // timerStartButton.innerHTML="Start";
    // isTimer = true;
}


timerStartButton.addEventListener("click", startTimer)
timerResetButton.addEventListener("click", resetTimer)

