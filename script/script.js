window.addEventListener('DOMContentLoaded', function() {
  'use strict';

  let timerCount = function(deadline) {
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

      // function addZero (i) {
      //   if (i < 10 ) {
      //     i = '0' + i;
      //     return i;
      //   }
      // }
      // console.log(addZero(timer.seconds));

      // addZero(timer.seconds);
      // addZero(timer.minutes);
      // addZero(timer.hours);

      if (timer.seconds < 10) {
        timer.seconds = '0' + timer.seconds;
      }
      if (timer.minutes < 10) {
        timer.minutes = '0' + timer.minutes;
      }
      if (timer.hours < 10) {
        timer.hours = '0' + timer.hours;
      }


      
      timerSeconds.textContent = timer.seconds;
      timerMinutes.textContent = timer.minutes;
      timerHours.textContent = timer.hours; 

      
      let timerId = 0;
      if (timer.timeRemaining > 0) { 
        timerId = setInterval(updateClock, 1000);
      } else {
        clearInterval(timerId);
        timerSeconds.textContent = '00';
        timerMinutes.textContent = '00';
        timerHours.textContent = '00'; 
      }
    }

       updateClock();  
  };
  console.log('привет');

  timerCount('19 november 2019 22:49:00');

});