"use strict";

const headerTitle = document.getElementsByTagName('h1')[0];
const calculate = document.getElementsByClassName('handler_btn')[0];
const reset = document.getElementsByClassName('handler_btn')[1];
const plusButton = document.querySelector('.screen-btn');
const percent = document.querySelectorAll('.other-items.percent');
const number = document.querySelectorAll('.other-items.number');
const range = document.querySelector('.rollback input[type=range]');
const rangeValue = document.querySelector('.rollback .range-value');
const costLayout = document.getElementsByClassName('total-input')[0];
const screensQuantity = document.getElementsByClassName('total-input')[1];
const costAdditional = document.getElementsByClassName('total-input')[2];
const totalCost = document.getElementsByClassName('total-input')[3];
const costRollback = document.getElementsByClassName('total-input')[4];
let allScreen = document.querySelectorAll('.screen');

const appData = {
    title: '',
    screens: [],
    screenPrice: 0,
    rollBack: 0,
    adaptive: true,
    servicePricesPercent: 0,
    servicePricesNumber: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    servicesPercent: {},
    servicesNumber: {},
    init: function () {
        appData.addTitle();
        appData.addRollBack();
        calculate.addEventListener('click', appData.calculateInit);
        plusButton.addEventListener('click', appData.addScreenBlock);
    },
    addTitle: function () {
        document.title = headerTitle.textContent;
    },
    addPrices: function() {
        appData.screenPrice = appData.screens.reduce(function (sum, item) {
            return sum + Number(item.price);
        }, 0);

        appData.countScreens = appData.screens.reduce(function (count, item) {
            return count + Number(item.count);
        }, 0);

        for(let key in appData.servicesNumber) {
            appData.servicePricesNumber += appData.servicesNumber[key];
        }   

        for(let key in appData.servicesPercent) {
            appData.servicePricesPercent += appData.screenPrice * (appData.servicesPercent[key] / 100);
        }   
        
        appData.fullPrice = Number(appData.screenPrice) + appData.servicePricesNumber + appData.servicePricesPercent;

        appData.servicePercentPrice =  Math.ceil(appData.fullPrice - (appData.fullPrice * (appData.rollBack / 100)));
    },
    showResult: function () {
        costLayout.value = appData.screenPrice;
        costAdditional.value = appData.servicePricesPercent + appData.servicePricesNumber;
        totalCost.value = appData.fullPrice;
        costRollback.value = appData.servicePercentPrice;
        screensQuantity.value = appData.countScreens;
        
        calculate.disabled = true;
    }, 
    addScreens: function () {        
        allScreen = document.querySelectorAll('.screen');

        allScreen.forEach(function (screen, index) {            
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            const selectName = select.options[select.selectedIndex].textContent;

            appData.screens.push({
                id: index, 
                name: selectName,
                price: +select.value * +input.value,
                count: input.value
            });

        });
              
    },
    addServices: function () {
        percent.forEach(function (item) {
            const check = item.querySelector('input[type=checkbox');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text');

            if (check.checked) {
                appData.servicesPercent[label.textContent] = +input.value;
            }            
        });

        number.forEach(function (item) {
            const check = item.querySelector('input[type=checkbox');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text');

            if (check.checked) {
                appData.servicesNumber[label.textContent] = +input.value;
            }            
        });        
    },
    addScreenBlock: function () {
        const cloneScreen = allScreen[0].cloneNode(true);
        allScreen[allScreen.length - 1].after(cloneScreen);
    },
    addRollBack: function () {
        range.addEventListener('input', function () {
            rangeValue.textContent = `${range.value}%`;
            appData.rollBack = range.value;            
        });
    },
    addChangeRollBack: function () {
        range.addEventListener('input', function () {
            appData.servicePercentPrice =  Math.ceil(appData.fullPrice - (appData.fullPrice * (range.value / 100)));
            costRollback.value = appData.servicePercentPrice;
        });
    },
    calculateInit: function () {
        const inputs = [...document.querySelectorAll('.main-controls__item.screen input')];
        const selects = [... document.querySelectorAll('.main-controls__item.screen select')];
               
        const isCheck = function (item) {
            return item.value !== '';
        };

        if (selects.every(isCheck) && inputs.every(isCheck)) {
            appData.start();   
        }     
    },
    start: function () {        
        appData.addScreens();
        appData.addServices();
        appData.addPrices();     
        appData.showResult();
        appData.addChangeRollBack();
    }
};

appData.init();


