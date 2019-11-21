let now = new Date(),
    hrs = now.getHours(),
    msg = '',
    timerDay;


if (hrs < 12) {
  msg = "Доброе утро"; 
} else if (hrs >= 12) {
  msg = "Добрый день";
} else if (hrs >= 17) {
  msg = "добрый вечер";  
}  

console.log(msg);
console.log('Сегодня: ' + now.toLocaleString('ru', {weekday: 'long'}));
console.log('Текущее время:' + ' ' + now.toLocaleTimeString('en'));

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