const sendForm = () => {

  const errorMassage = 'Что то пошло не так...',
        loadMassage = 'Звгрузка...',
        successMassage = 'Спасибо! Мы скоро с вами свяжемся.';

  const forms = document.querySelectorAll('form');
        

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
        statusMassage.textContent = successMassage;
        setTimeout (() => {
          statusMassage.remove();
          setTimeout (() => {
            const popup = document.querySelector('.popup');
            popup.style.display = 'none';
          }, 2000)
        }, 2000)
      };

      const notGood = (error) => {
        console.log(error);
        statusMassage.textContent = errorMassage;
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

    // return new Promise((resolve, reject) => {
    //   const request = new XMLHttpRequest();
    //   request.addEventListener('readystatechange', () => {

    //     if (request.readyState !== 4) {
    //       return;
    //     }
    //     if (request.status === 200) {
    //       resolve();
    //     } else {
    //       reject(request.status);
    //     }

    //   });

    //   request.open('POST', './server.php');
    //   request.setRequestHeader('Content-Type', 'application/json');

    //   console.log(body)

    //   request.send(JSON.stringify(body));
    // });
  }
};

export default sendForm;