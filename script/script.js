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
  timerCount('01 January 2020 00:00:00');


  // Меню
  const toggleMenu = () => {

    const btnMenu = document.querySelector('.menu'),
          menu = document.querySelector('menu');
          
    const handlerMenu = () => {
      menu.classList.toggle('active-menu');
    };

    btnMenu.addEventListener('click', handlerMenu);
    menu.addEventListener('click', (event) => {

      if  (event.target.tagName === 'A' || event.target.classList.contains('close-btn')) {
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

  // Замена фото в блоке "Наши сотрудники" 
  const replaceImg = () => {

    let img = document.querySelectorAll('.command__photo');

    img.forEach((elem) => {
      let src = elem.getAttribute('src');
          
      elem.addEventListener('mouseenter', (e) => {
        event.target.src = event.target.dataset.img;
      });

      elem.addEventListener('mouseleave', (e) => {
        event.target.src = src;
      });

    });

    
    
    // const change = (step) => {
    //   requestAnimationFrame(() => {
    //     if (step < 10) {
    //       step++;

    //     }
    //   });
    // }

  };
  replaceImg();

  // Валидация калькулятора
  const calcValidate = () => {
    const calcBlock = document.querySelector('.calc-block'),
          inputs = calcBlock.querySelectorAll('input');

    calcBlock.addEventListener('input', (event) => {
      const target = event.target;

      inputs.forEach((elem) => {
        if (elem === target) {
          elem.value = elem.value.replace(/\D/g, '');
        }
      });

    });

  };
  calcValidate();

  // Калькулятор стоимости
  const calc = (price = 100) => {
    const calcBlock = document.querySelector('.calc-block'),
          calcType = document.querySelector('.calc-type'),
          calcSquare = document.querySelector('.calc-square'),
          calcCount = document.querySelector('.calc-count'),
          calcDay = document.querySelector('.calc-day'),
          totalValue = document.getElementById('total'),
          calcItems = document.querySelectorAll('.calc-item');

    const countSum = () => {
      let total = 0,
          countValue = 1,
          dayValue = 1;
      const typeValue = calcType.options[calcType.selectedIndex].value,
            squareValue = calcSquare.value;

      if (calcCount.value > 1) {
        countValue += (calcCount.value - 1) / 10;
      }

      if (calcDay.value && calcDay.value < 5) {
        dayValue *= 2;
      } else if (calcDay.value && calcDay.value < 10) {
        dayValue *= 1.5;
      }

      if (typeValue && squareValue) {
        total = Math.round(price * typeValue * squareValue * countValue * dayValue);
      } 

      // totalValue.textContent = total;
      let count = 0;

      const totalAnimate = () => {
        requestAnimationFrame(() => {
          
          
          if (count < total || count < 300) {
            count += 10;
            totalValue.textContent = count;
            totalAnimate();
          } 
          console.log(count);
        });
      };

      totalAnimate();
      
    };

    calcBlock.addEventListener('change', (event) => {
      const target = event.target;

      calcItems.forEach((elem) => {
        if (target === elem) {
          countSum();
        }
      });
    });

    

  };
  calc(100);

  //Send-ajax-form
  const sendForm = () => {

    const errorMassage = 'Что то пошло не так...',
          loadMassage = 'Звгрузка...',
          successMassage = 'Спасибо! Мы скоро с вами свяжемся.';

    const forms = document.querySelectorAll('form');
          

    const statusMassage = document.createElement('div');
    statusMassage.style.cssText = 'font-size: 2rem; color: white';

    forms.forEach((form) => {

      form.addEventListener('input', (event) => {
        
        const target = event.target,
              inputs = form.querySelectorAll('input');
              

        inputs.forEach((elem) => {
          
          if( elem.classList.contains('user_name') === target) {

              console.log(elem);
              elem.value = elem.value.replace(/[A-z]\d\S/g, '');
            
          }

        });

      });

      form.addEventListener('submit', (event) => {
        event.preventDefault();
        form.appendChild(statusMassage);
        statusMassage.textContent = loadMassage;

        const formData = new FormData(form);
        
        let body = {};
      
        formData.forEach((val, key) => {
          body[key] = val;
        });

        postData(body, 
          () => {
          statusMassage.textContent = successMassage;
          }, 
          (error) => {
          console.log(error);
          statusMassage.textContent = errorMassage;
          }
        );

        form.reset();
  
      });

    });

    const postData = (body, outputData, errorData) => {
      const request = new XMLHttpRequest();
      request.addEventListener('readystatechange', () => {

        if (request.readyState !== 4) {
          return;
        }
        if (request.status === 200) {
          outputData();
        } else {
          errorData(request.status);
        }

      });

      request.open('POST', './server.php');
      request.setRequestHeader('Content-Type', 'application/json');

      console.log(body)

      request.send(JSON.stringify(body));

    }
  };
  sendForm();
});