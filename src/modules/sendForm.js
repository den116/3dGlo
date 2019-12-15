const sendForm = () => {

  const errorMassage = 'Что то пошло не так...',
        loadMassage = 'Загрузка...',
        successMassage = 'Спасибо! Мы скоро с вами свяжемся.';

  const forms = document.querySelectorAll('form'),
        popup = document.querySelector('.popup');
        

  const statusMassage = document.createElement('div');
  statusMassage.style.cssText = 'font-size: 2rem; color: white';

  forms.forEach((form) => {

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      form.appendChild(statusMassage);
      statusMassage.textContent = loadMassage;

      const formData = new FormData(form);
      
      let body = {};
    
      formData.forEach((val, key) => {
        body[key] = val;
      });

      const good = (response) => {
        if (response.status !== 200) {
          throw new Error('status network not 200');  
        }
        console.log(response);
        statusMassage.style.cssText = 'color: green';
        statusMassage.textContent = successMassage;
        setTimeout (() => {
          statusMassage.remove();
          setTimeout (() => {
            popup.style.display = 'none';
          }, 2000);
        }, 2000);
      };

      const notGood = (error) => {
        console.log(error);
        statusMassage.style.cssText = 'color: red';
        statusMassage.textContent = errorMassage;
        setTimeout (() => {
          statusMassage.remove();
          setTimeout (() => {
            popup.style.display = 'none';
          }, 2000);
        }, 2000);
      };

      postData(body)
        .then(good)
        .catch(notGood);

      

      form.reset();

    });

  });

  const postData = (body) => {
    return fetch ('./server.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
      credentials: 'include' 
    });

    
  }
};

export default sendForm;