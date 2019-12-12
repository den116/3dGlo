const timerCount = function(deadline) {
  let timerHours = document.querySelector('#timer-hours'),
      timerMinutes = document.querySelector('#timer-minutes'),
      timerSeconds = document.querySelector('#timer-seconds');
  
  function getTimeRemaining () {
    let dateStop = new Date(deadline).getTime(),
        dateNow = new Date().getTime(),
        timeRemaining = (dateStop - dateNow) / 1000,
        seconds = Math.floor(timeRemaining % 60),
        minutes = Math.floor((timeRemaining /60) % 60),
        hours = Math.floor(timeRemaining / 60 /60) % 24;
        // day = Math.floor(timeRemaining / 60 / 60 / 24); добавить в hours остаток от деления на 24 - (% 24) в конце
    return {timeRemaining, seconds, minutes, hours};
  }  

  function updateClock () {
    let timer = getTimeRemaining();

    function addZero (i) {
      if (i < 10 ) {
        i = '0' + i;
      }
      return i;
    }

    timerSeconds.textContent = addZero(timer.seconds);
    timerMinutes.textContent = addZero(timer.minutes);
    timerHours.textContent = addZero(timer.hours); 

    if (timer.timeRemaining <= 0) { 
      
      clearInterval(timerId);
      timerSeconds.textContent = '00';
      timerMinutes.textContent = '00';
      timerHours.textContent = '00'; 
    }
  }
  
  let timerId = setInterval(updateClock, 1000);
    
};

export default timerCount;