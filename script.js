"use strict";

let title;
let screens;
let screenPrice;
const rollBack = 23;
let adaptive;
let allServicePrices;
let fullPrice;
let servicePercentPrice;
let service1;
let service2;

const showTypeOf = function(variable) {
    console.log(variable, typeof variable);
};

const getTitle = function (txt) {
    if (!txt || !txt.trim()) {
        return txt;
    }        

    txt = txt.trim();    

    return txt[0].toUpperCase() + txt.slice(1).toLowerCase();
};


const isNumber = function(num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
};

const asking = function () {
    title = prompt('Как называется ваш проект?');
    screens = prompt('Какие типы экранов нужно разработать?');

    do {
        screenPrice = prompt('Сколько будет стоить данная работа?');
    } while (!isNumber(screenPrice));

    adaptive = confirm('Нужен ли адаптив на сайте?');

    showTypeOf(getTitle(title));
    showTypeOf(Number(screenPrice));
    showTypeOf(adaptive);
};

const getRollbackMessage = function(price) {
    if (price > 30000) {
        return `Даем скидку в 10%: ${price * 10 / 100} руб`;
    } else if (price > 15000) {
        return `Даем скидку в 5%: ${price * 5 / 100} руб`;
    } else if (price >= 0) {
        return 'Скидка не предусмотрена';
    } else {
        return 'Что-то пошло не так';
    }
};

const getAllServicePrices = function () {
    let answer;
    let result = 0;

    for (let i = 0; i < 2; i++) {
        
        if (i === 0) {
            service1 = prompt('Какой дополнительный тип услуги нужен?');
        } else if (i === 1) {
            service2 = prompt('Какой дополнительный тип услуги нужен?');
        }

        do {
            answer = prompt('Сколько это будет стоить?');
        } while (!isNumber(answer));

        result += Number(answer);
    }
    return result;
};

const getFullPrice = function (fullPrice1, fullPrice2) {
    return fullPrice1 + fullPrice2;
};

const getServicePercentPrice = function(fullPrice, rollBack) {
    return Math.ceil(fullPrice - (fullPrice * (rollBack / 100)));
};

asking();
allServicePrices = getAllServicePrices();
fullPrice = getFullPrice(Number(screenPrice), allServicePrices);
servicePercentPrice = getServicePercentPrice(fullPrice, rollBack);

console.log('screenPrice', Number(screenPrice));
console.log('allServicePrices', allServicePrices);
console.log(`Вы выбрали следующие типы экранов: ${screens}`);
console.log(getRollbackMessage(fullPrice));
console.log(`Итоговая стоимость за вычетом отката посреднику: ${servicePercentPrice} рублей`);

