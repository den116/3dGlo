const togglePopUp = () => {

  const popup = document.querySelector('.popup'),
        popupBtn = document.querySelectorAll('.popup-btn'),
        widthWindow = document.documentElement.clientWidth,
        form3 = popup.querySelector('#form3');
        

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
        form3.reset();
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
        // popup.style.display = 'none';
        popupCloseShow(1);
      }
    }
  });
};

export default togglePopUp;