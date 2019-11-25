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
          menu = document.querySelector('menu');
          
    const handlerMenu = () => {
      menu.classList.toggle('active-menu');
    };

    btnMenu.addEventListener('click', handlerMenu);
    menu.addEventListener('click', () => {

      if  (event.target.tagName === 'A' || event.target.className === 'CLOSE-BTN') {
        handlerMenu();
      }

      let target = event.target;
      console.log(target);
      
    });


  };
  toggleMenu();


  //ПопАп (модалка)
  const togglePopUp = () => {

    const popup = document.querySelector('.popup'),
          popupBtn = document.querySelectorAll('.popup-btn'),
          widthWindow = document.documentElement.clientWidth;
          

    popupBtn.forEach((item) => {
      item.addEventListener('click', () => {
        popup.style.display = 'block';
        if (widthWindow > 768) {
          popupOpenShow(0);
        }
      });
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
          if (step > 0.05) {
            step -= 0.05;
          } else {
            step = 0;
          }
          
          popup.style.opacity = `${step}`;
          popupCloseShow(step);
        } else if (step === 0) {
          popup.style.display = 'none';
        }

      });  
    };

    popup.addEventListener('click', (event) => {
      let target = event.target;

      if (target.classList.contains('popup-close')) {
        popupCloseShow(1);
      } else {
        target = target.closest('.popup-content');
        if (!target) {
          popup.style.display = 'none';
        }
      }
    });
  };
  togglePopUp();


  //Табы 
  const tabs = () => {

    const tabHeader = document.querySelector('.service-header'),
          tab = tabHeader.querySelectorAll('.service-header-tab'),
          tabContent = document.querySelectorAll('.service-tab');

    const toggleTabContent = (index) => {
      for (let i = 0; i < tabContent.length; i++) {
        if (index === i) {
          tab[i].classList.add('active');
          tabContent[i].classList.remove('d-none');
        } else {
          tab[i].classList.remove('active');
          tabContent[i].classList.add('d-none');
        }
      }
    };
    
    tabHeader.addEventListener('click', (event) => {

      let target = event.target;
          target = target.closest('.service-header-tab');
      
        if (target) {
          tab.forEach((item, i) => {
            if (item === target) {
              toggleTabContent(i);
            }
          });
        }
    });

  };
  tabs();

  // Слайдер
  const slider = () => {

    const slider = document.querySelector('.portfolio-content'),
          slide = document.querySelectorAll('.portfolio-item'),
          btn = document.querySelectorAll('.portfolio-btn'),
          parentDot = document.querySelector('.portfolio-dots');
      let dot = document.querySelectorAll('.dot');
          console.log(dot);

    const addDot = () => {

      let newDot = document.createElement('li');
          newDot.classList.add('dot');

        if (slide.length > dot.length) {
          
          parentDot.appendChild(newDot);
          dot = document.querySelectorAll('.dot');
          addDot();
        }
   };
    addDot();

    let currentSlide = 0,
        interval;

    const prevSlide = (elem, index, strClass) => {
      elem[index].classList.remove(strClass);
    };

    const nextSlide = (elem, index, strClass) => {
      elem[index].classList.add(strClass);
    };

    const autoPlaySlide = () => {

      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');
      currentSlide++;
      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');

    };

    const startSlide = (time = 3000) => {
      interval = setInterval(autoPlaySlide, time);
    };

    const stopSlide = () => {
      clearInterval(interval);
    };

    slider.addEventListener('click', (event) => {
      event.preventDefault();

      let target = event.target;

      if (!target.matches('.portfolio-btn, .dot')) {
        return;
      }

      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');

      if (target.matches('#arrow-right')) {
        currentSlide++;
      } else if (target.matches('#arrow-left')) {
        currentSlide--;
      } else if (target.matches('.dot')) {
        dot.forEach((elem, index) => {
          if (elem === target) {
            currentSlide = index;
          }
        });
      }

      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }
      if (currentSlide < 0 ) {
        currentSlide = slide.length - 1;
      }

      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');

    });

    slider.addEventListener('mouseover', (event) => {
      if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
        stopSlide();
      }
    });

    slider.addEventListener('mouseout', (event) => {
      if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
        startSlide(1500);
      }
    });

    startSlide(1500);

  };
  slider();

});