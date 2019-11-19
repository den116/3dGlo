let now = new Date(),
    hrs = now.getHours(),
    minutes = now.getMinutes(),
    seconds = now.getSeconds(),
    day = now.getDay(),
    msg = '',
    dayOfWeeck = '',
    amPm = '',
    hours,
    timerDay;


if (hrs < 12) {
  msg = "Доброе утро"; 
} else if (hrs >= 12) {
  msg = "Добрый день";
} else if (hrs >= 17) {
  msg = "добрый вечер";  
}  

console.log(msg);

if (day == 1) {
  day = "Понедельник"; 
} else if (day == 2) {
  day = "Вторник"; 
} else if (day == 3) {
  day = "Среда";
} else if (day == 4) {
  day = "Четверг";
} else if (day == 5) {
  day = "Пятница";
} else if (day == 6) {
  day = "Суббота";
} else if (day == 7) {
  day = "Восскресенье";
}

console.log('Сегодня: ' + day);



if (minutes < 10) {
  minutes = '0' + minutes;
} 
if (seconds < 10) {
  seconds = '0' + seconds;
} 
if (hrs < 10) {
  hrs = '0' + hrs;
} 

if (hrs >= 12) {
  amPm = 'pm';
  hours = hrs - 12;
  console.log(hours);
} else if (hrs < 12) {
    amPm = 'am';
    hours = hrs;
}




 
console.log('Текущее время:' + ' ' + hours + ':' + minutes + ':' + seconds + ' ' + amPm);

let timerCount = function(deadline) {
  
  function getTimeRemaining () {
    let dateStop = new Date(deadline).getTime(),
        dateNow = new Date().getTime(),
        timeRemaining = (dateStop - dateNow) / 1000,
        day = Math.floor(timeRemaining / 60 / 60 / 24);
    return day;
  }  
  timerDay = getTimeRemaining();    
};

timerCount('01 January 2020 00:00:00');
console.log('До нового года осталось:' + ' ' + timerDay + ' ' + 'дней');