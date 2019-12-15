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

    calcItems.forEach((elem, i) => {
      if (i > 0) {
        if (target === elem) {
          countSum();
        }
      }
    });
  });

  

};

export default calc;