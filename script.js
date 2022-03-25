"use strict";

const title = 'My first project';
const screens = 'Простые, Сложные, Интерактивные';
const screenPrice = 1979;
const rollBack = 23;
const fullPrice = 50000;
const adaptive = true;

console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);
console.log(screens.length);
console.log(`Стоимость верстки экранов ${screenPrice} рублей`);
console.log(`Стоимость разработки сайта ${fullPrice} рублей`);
console.log(screens.toLowerCase().split(', '));
console.log(`Процент отката посреднику за работу: ${fullPrice * (rollBack / 100)} рублей`);