'use strict';

import '@babel/polyfill';
import 'nodelist-foreach-polyfill';
import elementClosest from 'element-closest';
elementClosest(window);
import 'formdata-polyfill';
import 'es6-promise';
import 'fetch-polyfill';

import timerCount from './modules/timerCount';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import tabs from './modules/tabs';
import slider from './modules/slider';
import replaceImg from './modules/replaceImg';
import calcValidate from './modules/calcValidate';
import calc from './modules/calc';
import sendForm from './modules/sendForm';
import formsValidate from './modules/formsValidate';



// Тймер 
timerCount('01 January 2020 00:00:00');
// Меню
toggleMenu();
//ПопАп (модалка)
togglePopUp();
//Табы 
tabs();
// Слайдер
slider();
// Замена фото в блоке "Наши сотрудники" 
replaceImg();
// Валидация калькулятора
calcValidate();
// Калькулятор стоимости
calc(100);
//Send-ajax-form
sendForm();
//Forms-validate
formsValidate();