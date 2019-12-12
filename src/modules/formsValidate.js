const formsValidate = () => {
  const inputs = document.querySelectorAll('form input');

  inputs.forEach((elem) => {

    elem.addEventListener('input', () => {
      
      if( elem.classList.contains('form-name') || elem.classList.contains('mess')) {
          elem.value = elem.value.replace(/[^а-я\s]+/gi, '');
      } else if (elem.classList.contains('form-phone')) {
        elem.value = elem.value.replace(/[^0-9\+]+/g, '');
      }

    });

  });

};

export default formsValidate;