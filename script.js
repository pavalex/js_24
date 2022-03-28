"use strict";

const title = prompt('Как называется ваш проект?');
const screens = prompt('Какие типы экранов нужно разработать?');
const screenPrice = +prompt('Сколько будет стоить данная работа?');
const rollBack = 23;
const adaptive = confirm('Нужен ли адаптив на сайте?');
const service1 = prompt('Какой дополнительный тип услуги нужен?');
const servicePrice1 = +prompt('Сколько это будет стоить?');
const service2 = prompt('Какой дополнительный тип услуги нужен?');
const servicePrice2 = +prompt('Сколько это будет стоить?');
const fullPrice = screenPrice + servicePrice1 + servicePrice2;
const servicePercentPrice = Math.ceil(fullPrice - (fullPrice * (rollBack / 100)));

if (fullPrice > 30000) {
    console.log(`Даем скидку в 10%: ${fullPrice * 10 / 100} руб`);
} else if (fullPrice > 15000 && fullPrice <= 30000) {
    console.log(`Даем скидку в 5%: ${fullPrice * 5 / 100} руб`);
} else if (fullPrice >= 0 && fullPrice <= 15000) {
    console.log('Скидка не предусмотрена');
} else {
    console.log('Что-то пошло не так');
}

console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);
console.log(screens.length);
console.log(`Стоимость верстки экранов ${screenPrice} рублей`);
console.log(`Стоимость разработки сайта ${fullPrice} рублей`);
console.log(screens.toLowerCase().split(', '));
console.log(`Процент отката посреднику за работу: ${fullPrice * (rollBack / 100)} рублей`);
console.log(`Итоговая стоимость за вычетом отката посреднику: ${servicePercentPrice} рублей`);