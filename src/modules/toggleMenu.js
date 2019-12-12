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

export default toggleMenu;