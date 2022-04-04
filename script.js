"use strict";

const appData = {
    title: '',
    screens: '',
    screenPrice: 0,
    rollBack: 23,
    adaptive: true,
    allServicePrices: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    service1: '',
    service2: '',
    asking: function () {
        appData.title = prompt('Как называется ваш проект?');
        appData.screens = prompt('Какие типы экранов нужно разработать?');
    
        do {
            appData.screenPrice = prompt('Сколько будет стоить данная работа?');
        } while (!appData.isNumber(appData.screenPrice));
    
        appData.adaptive = confirm('Нужен ли адаптив на сайте?');
    },
    isNumber: function(num) {
        if (num !== null && num.length > num.trim().length) {
            return false;
        }
        
        return !isNaN(parseFloat(num)) && isFinite(num);
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
    getAllServicePrices: function () {
        let answer;
        let result = 0;
    
        for (let i = 0; i < 2; i++) {
            
            if (i === 0) {
                appData.service1 = prompt('Какой дополнительный тип услуги нужен?');
            } else if (i === 1) {
                appData.service2 = prompt('Какой дополнительный тип услуги нужен?');
            }
    
            do {
                answer = prompt('Сколько это будет стоить?');
            } while (!appData.isNumber(answer));
    
            result += Number(answer);
        }
        return result;
    },
    getFullPrice: function (fullPrice1, fullPrice2) {
        return fullPrice1 + fullPrice2;
    },
    getServicePercentPrice: function(fullPrice, rollBack) {
        return Math.ceil(fullPrice - (fullPrice * (rollBack / 100)));
    },
    logger: function() {
        appData.allServicePrices = appData.getAllServicePrices();
        appData.fullPrice = appData.getFullPrice(Number(appData.screenPrice), appData.allServicePrices);
        appData.servicePercentPrice = appData.getServicePercentPrice(appData.fullPrice, appData.rollBack);

        console.log('screenPrice', Number(appData.screenPrice));
        console.log('allServicePrices', appData.allServicePrices);
        console.log(`Вы выбрали следующие типы экранов: ${appData.screens}`);
        console.log(appData.getRollbackMessage(appData.fullPrice));
        console.log(`Итоговая стоимость за вычетом отката посреднику: ${appData.servicePercentPrice} рублей`);

        for (let key in appData) {
            console.log(`Ключ: ${key} Значение: ${appData[key]}`);
        }
    },
    start: function () {
        appData.asking();
        appData.logger();
    }
};

appData.start();


