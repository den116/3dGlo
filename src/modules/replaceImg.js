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

export default replaceImg;