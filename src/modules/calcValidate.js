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

export default calcValidate;