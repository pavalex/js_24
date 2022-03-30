"use strict";

let title = prompt('Как называется ваш проект?');
const screens = prompt('Какие типы экранов нужно разработать?');
const screenPrice = +prompt('Сколько будет стоить данная работа?');
const rollBack = 23;
const adaptive = confirm('Нужен ли адаптив на сайте?');
const service1 = prompt('Какой дополнительный тип услуги нужен?');
const servicePrice1 = +prompt('Сколько это будет стоить?');
const service2 = prompt('Какой дополнительный тип услуги нужен?');
const servicePrice2 = +prompt('Сколько это будет стоить?');
let allServicePrices;
let fullPrice;
let servicePercentPrice;

const showTypeOf = function(variable) {
    console.log(variable, typeof variable);
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

const getAllServicePrices = function (price1, price2) {
    return price1 + price2;
};

const getFullPrice = function (fullPrice1, fullPrice2) {
    return fullPrice1 + fullPrice2;
};

const getTitle = function (txt) {
    if (!txt) {
        return txt;
    }        

    txt = txt.trim();    

    return txt[0].toUpperCase() + txt.slice(1).toLowerCase();
};

const getServicePercentPrice = function(fullPrice, rollBack) {
    return Math.ceil(fullPrice - (fullPrice * (rollBack / 100)));
};

showTypeOf(getTitle(title));
showTypeOf(screenPrice);
showTypeOf(adaptive);

allServicePrices = getAllServicePrices(servicePrice1, servicePrice2);
fullPrice = getFullPrice(screenPrice, allServicePrices);
servicePercentPrice = getServicePercentPrice(fullPrice, rollBack);

console.log(`Вы выбрали следующие типы экранов: ${screens}`);
console.log(getRollbackMessage(fullPrice));
console.log(`Итоговая стоимость за вычетом отката посреднику: ${servicePercentPrice} рублей`);

