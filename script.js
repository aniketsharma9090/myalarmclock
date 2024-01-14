// current time hour, minute, second and AM/PM
const currHour = document.getElementById("hh");
const currMin = document.getElementById("mm");
const currSec = document.getElementById("ss");
const currAmPm = document.getElementById("ampm");
// array of abject of alarm hour, minute, second and AM/PM
const alarmArray = [];

// Interval for update time every second
setInterval(()=>{
  const d = new Date();
  if(d.getHours()>12){
    currHour.textContent = String(d.getHours()%12).padStart(2, '0');
  }
  else if(d.getHours() == 00){
    currHour.textContent = String(12).padStart(2, '0');
  }
  else{
    currHour.textContent = String(d.getHours()).padStart(2, '0');
  }

  currMin.textContent = String(d.getMinutes()).padStart(2, '0');
  currSec.textContent = String(d.getSeconds()).padStart(2, '0');

  if(d.getHours() <12){
    currAmPm.textContent = "AM";
  }
  else{
    currAmPm.textContent = "PM";
  }
  // set alarm audio if alarm object of (hour, minute, second, AM/PM ) is equal to current time check every second
  for(const alarmobj of alarmArray){
    if(currHour.textContent == alarmobj.hour && currMin.textContent == alarmobj.minute && currSec.textContent == alarmobj.sec && currAmPm.textContent === alarmobj.ampm){
      // create Audio and give source of audio
      let audio = new Audio();
      audio.src = "https://commondatastorage.googleapis.com/codeskulptor-demos/pyman_assets/ateapill.ogg";
      audio.play();
    }
  }
}, 1000);

// option 60 class has 60 option (0 to 59) for select tag of  sec and minute 
const option60Class = document.getElementsByClassName("totalOption60");
for(let j=0; j<option60Class.length; j++){
  for(let i=0; i<60; i++){
    const opt = document.createElement("option");
    opt.value = String(i).padStart(2, '0');
    opt.textContent= String(i).padStart(2, '0');
    option60Class[j].appendChild(opt);
  }
}

// option 24 class has 24 option (0 to 23) for select tag of hour
const alarmHour = document.getElementById("setAlarmHour");
for(let i=1; i<=12; i++){
    const opt = document.createElement("option");
    opt.value = String(i).padStart(2, '0');
    opt.textContent= String(i).padStart(2, '0');;
    alarmHour.appendChild(opt);
}
const alarmMin = document.getElementById("setAlarmMin");
const alarmSec = document.getElementById("setAlarmSec");
const alarmAmPm = document.getElementById("setAlarmAmPm");
const setAlarmButton = document.getElementById("setAlarmButton");
const alarmListSection = document.getElementById("alarmList");

// set Event listener for set alarm button
setAlarmButton.addEventListener("click",() => {
  // creating a div of "alarmListBox" class contain a para of alarm time and a delete button
  const alarmListBox = document.createElement("div");
  alarmListBox.setAttribute("class","alarmListBox");
  
  //creating a object to store alarm time in hour, minute, sec and am/pm format 
  const obj = {};

  //creating para for showing alarm time
  const newPara = document.createElement("p");
  newPara.classList.add("alarmTime");
  newPara.textContent = alarmHour.value+":" + alarmMin.value +":"+alarmSec.value+":"+alarmAmPm.value;
  
  if(alarmHour.value == "Hour" || alarmMin.value == "Minutes" || alarmSec.value == "Second" || alarmAmPm.value == "AMPM"){
    alert("Please set alarm time");
  }
  else{  
    newPara.textContent = alarmHour.value+":" + alarmMin.value +":"+alarmSec.value+":"+alarmAmPm.value
    obj.hour = alarmHour.value;
    obj.minute = alarmMin.value;
    obj.sec = alarmSec.value;
    obj.ampm = alarmAmPm.value;

    // insert new object in alarm Array list
    alarmArray.push(obj);


    //create alarm delete button and add class "deleteButton" and textContent = "Delete"
    const alarmDeleteButton = document.createElement("button");
    alarmDeleteButton.classList.add("deleteButton");
    alarmDeleteButton.textContent = "Delete";

    // adding eventListener for delete button
    alarmDeleteButton.addEventListener("click",() => {
      var parent = alarmDeleteButton.parentNode;
      var index = Array.prototype.indexOf.call(parent.parentNode.children, parent);
      alarmArray.splice(index, 1);
      parent.remove();
    })  
    //adding para and delete button to div
    alarmListBox.appendChild(newPara);
    alarmListBox.appendChild(alarmDeleteButton);
    //adding alarmListBox to alarmListSection container
    alarmListSection.appendChild(alarmListBox);
    alert("Alarm set sucessully");

  }
})
