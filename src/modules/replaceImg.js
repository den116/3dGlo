const replaceImg = () => {

  let img = document.querySelectorAll('.command__photo');

  img.forEach((elem) => {
    let src = elem.getAttribute('src');
        
    elem.addEventListener('mouseenter', (event) => {
      event.target.src = event.target.dataset.img;
    });

    elem.addEventListener('mouseleave', (event) => {
      event.target.src = src;
    });

  });

};

export default replaceImg;