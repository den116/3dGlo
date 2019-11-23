window.addEventListener('DOMContentLoaded', function() {
  'use strict';

  // Тймер 
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
  timerCount('20 november 2019 23:40:00');


  // Меню
  const toggleMenu = () => {

    const btnMenu = document.querySelector('.menu'),
          menu = document.querySelector('menu'),
          closeBtn = document.querySelector('.close-btn'),
          menuItems = menu.querySelectorAll('ul>li');
    
    const handlerMenu = () => {
      // if (!menu.style.transform || menu.style.transform === `translateX(-100%)`) {
      //   menu.style.transform = `translate(0)`;
      // } else {
      //   menu.style.transform = `translateX(-100%)`;
      // }
      menu.classList.toggle('active-menu');
    };

    btnMenu.addEventListener('click', handlerMenu);
    closeBtn.addEventListener('click', handlerMenu);
    menuItems.forEach((elem) => elem.addEventListener('click', handlerMenu));
  };
  toggleMenu();


  //ПопАп (модалка)
  const togglePopUp = () => {

    const popup = document.querySelector('.popup'),
          popupBtn = document.querySelectorAll('.popup-btn'),
          popupClose = document.querySelector('.popup-close'),
          widthWindow = document.documentElement.clientWidth;
          

    popupBtn.forEach((item) => {
      item.addEventListener('click', () => {
        popup.style.display = 'block';
        if (widthWindow > 768) {
          popupOpenShow(0);
        }
      });
    });

    popupClose.addEventListener('click', () => {
      popupCloseShow(1);
    }); 

    const popupOpenShow = (step) => {

      requestAnimationFrame(() => {

        if (step < 1) {
          step += 0.05;
          popup.style.opacity = `${step}`;
          popupOpenShow(step);
        }

      });      
    };

    const popupCloseShow = (step) => {

      requestAnimationFrame(() => {

        if (step > 0) {
          step += (0.05 + '').substr(0, 4) * -1;
          popup.style.opacity = `${step}`;
          popupCloseShow(step);
        }

      });  
    };
  };
  togglePopUp();

});