"use strict";

const headerTitle = document.getElementsByTagName('h1')[0];
const calculate = document.getElementsByClassName('handler_btn')[0];
const reset = document.getElementsByClassName('handler_btn')[1];
const plusButton = document.querySelector('.screen-btn');
const percent = document.querySelectorAll('.other-items + .percent');
const number = document.querySelectorAll('.other-items + .number');
const range = document.querySelector('.rollback input[type=range]');
const rangeValue = document.querySelector('.rollback .range-value');
const totalInput = document.getElementsByClassName('total-input')[0];
const totalInput1 = document.getElementsByClassName('total-input')[1];
const totalInput2 = document.getElementsByClassName('total-input')[2];
const totalInput3 = document.getElementsByClassName('total-input')[3];
const totalInput4 = document.getElementsByClassName('total-input')[4];
const allScreen = document.querySelectorAll('.screen');

const appData = {
    title: '',
    screens: [],
    screenPrice: 0,
    rollBack: 23,
    adaptive: true,
    allServicePrices: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    services: {},
    asking: function () {
        do {
            appData.title = prompt('Как называется ваш проект?');
        } while (!appData.isString(appData.title));
      
        for (let i = 0; i < 2; i++) {
            let name = '';
            let price = 0;
            do {
                name  = prompt('Какие типы экранов нужно разработать?');
            } while (!appData.isString(name));
     
            do {
                price = prompt('Сколько будет стоить данная работа?');
            } while (!appData.isNumber(price));

           appData.screens.push({id: i, name: name, price: price});
        }  

        for (let i = 0; i < 2; i++) {
            let name = '';
            let answer = 0;  
            

            do {
                name = prompt('Какой дополнительный тип услуги нужен?');
            } while (!appData.isString(name));            

            do {
                answer = prompt('Сколько это будет стоить?');
            } while (!appData.isNumber(answer));
            
            appData.services[name + i] = Number(answer);
        }
    
        appData.adaptive = confirm('Нужен ли адаптив на сайте?');
    },
    addPrices: function() {
        appData.screenPrice = appData.screens.reduce(function (sum, item) {
            return sum + Number(item.price);
        }, 0);

        for(let key in appData.services) {
            appData.allServicePrices += appData.services[key];
        }   
    },
    isNumber: function(num) {
        if (num !== null && num.length > num.trim().length) {
            return false;
        }
        
        return !isNaN(parseFloat(num)) && isFinite(num);
    },
    isString: function(txt) {    
        if (txt !== null && txt.length > txt.trim().length) {
            return false;
        }

        if (txt !== null && txt !== '' && txt.search(/^\d+$/)) {
            return true;
        }        
    },
    getRollbackMessage: function(price) {
        if (price > 30000) {
            return `Даем скидку в 10%: ${price * 10 / 100} руб`;
        } else if (price > 15000) {
            return `Даем скидку в 5%: ${price * 5 / 100} руб`;
        } else if (price >= 0) {
            return 'Скидка не предусмотрена';
        } else {
            return 'Что-то пошло не так';
        }
    },
    getFullPrice: function () {
        appData.fullPrice = Number(appData.screenPrice) + appData.allServicePrices;
    },
    getServicePercentPrice: function() {
        appData.servicePercentPrice =  Math.ceil(appData.fullPrice - (appData.fullPrice * (appData.rollBack / 100)));
    },
    getTitle: function () {
        if (!appData.title || !appData.title.trim()) {
            return appData.title;
        }        
    
        appData.title = appData.title.trim();    
    
        appData.title =  appData.title[0].toUpperCase() + appData.title.slice(1).toLowerCase();
    },
    logger: function() {
        console.log('screenPrice', Number(appData.screenPrice));
        console.log('allServicePrices', appData.allServicePrices);
        console.log(`Вы выбрали следующие типы экранов: ${appData.screens}`);
        console.log(appData.getRollbackMessage(appData.fullPrice));
        console.log(`Итоговая стоимость за вычетом отката посреднику: ${appData.servicePercentPrice} рублей`);
        console.log(appData.screens);

        for (let key in appData) {
            console.log(`Ключ: ${key} Значение: ${appData[key]}`);
        }
    },
    start: function () {
        appData.asking();
        appData.addPrices();
        appData.getFullPrice();
        appData.getServicePercentPrice();
        appData.getTitle();
        appData.logger();
    }
};

appData.start();


