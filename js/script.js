"use strict";

const headerTitle = document.getElementsByTagName('h1')[0];
const calculate = document.getElementsByClassName('handler_btn')[0];
const reset = document.getElementsByClassName('handler_btn')[1];
const plusButton = document.querySelector('.screen-btn');
const percent = document.querySelectorAll('.other-items.percent');
const number = document.querySelectorAll('.other-items.number');
const range = document.querySelector('.rollback input[type=range]');
const rangeValue = document.querySelector('.rollback .range-value');
const customCheckbox = document.querySelector('.main-controls__views.cms input[type=checkbox]');
const costLayout = document.getElementsByClassName('total-input')[0];
const screensQuantity = document.getElementsByClassName('total-input')[1];
const costAdditional = document.getElementsByClassName('total-input')[2];
const totalCost = document.getElementsByClassName('total-input')[3];
const costRollback = document.getElementsByClassName('total-input')[4];
const hiddenCmsVariants = document.querySelector('.hidden-cms-variants');
const otherInput = hiddenCmsVariants.querySelector('.main-controls__input');
const optionOther = document.querySelector('#cms-other-input');
const viewsSelect = document.querySelector('#cms-select');
let allScreen = document.getElementsByClassName('screen');

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
        this.addTitle();
        this.addRollBack();
        calculate.addEventListener('click', this.calculateInit.bind(this));
        reset.addEventListener('click', this.resetInit.bind(this));
        plusButton.addEventListener('click', this.addScreenBlock.bind(this));
        customCheckbox.addEventListener('change', this.cmsInit.bind(this));
        viewsSelect.addEventListener('change', this.addCmsVariants.bind(this));
    },
    addTitle: function () {
        document.title = headerTitle.textContent;
    },
    addPrices: function() {
        this.screenPrice = this.screens.reduce((sum, item) => {
            return sum + Number(item.price);
        }, 0);

        this.countScreens = this.screens.reduce((count, item) => {
            return count + Number(item.count);
        }, 0);

        for(let key in this.servicesNumber) {
            this.servicePricesNumber += this.servicesNumber[key];
        }   

        for(let key in this.servicesPercent) {
            this.servicePricesPercent += this.screenPrice * (this.servicesPercent[key] / 100);
        }

        let res = Number(this.screenPrice) + this.servicePricesNumber + this.servicePricesPercent;

        if (viewsSelect.value === '50') {
            this.fullPrice = res + res * 50 / 100;
        } else if (viewsSelect.value === 'other') {
            this.fullPrice = res + res * optionOther.value / 100;
        } else {
            this.fullPrice = res;
        }

        this.servicePercentPrice =  Math.ceil(this.fullPrice - (this.fullPrice * (this.rollBack / 100)));

    },
    showResult: function () {
        costLayout.value = this.screenPrice;
        costAdditional.value = this.servicePricesPercent + this.servicePricesNumber;
        totalCost.value = this.fullPrice;
        costRollback.value = this.servicePercentPrice;
        screensQuantity.value = this.countScreens;
        
        calculate.style.display = 'none';
        reset.style.display = 'flex';
    }, 
    addScreens: function () {        
        const screens = document.querySelectorAll('.screen');

        screens.forEach((screen, index) => {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            const selectName = select.options[select.selectedIndex].textContent;

            this.screens.push({
                id: index,
                name: selectName,
                price: +select.value * +input.value,
                count: input.value
            });

        });
    },
    addServices: function () {
        percent.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) {
                this.servicesPercent[label.textContent] = +input.value;
            }            
        });

        number.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) {
                this.servicesNumber[label.textContent] = +input.value;
            }
        });
    },
    cmsInit: function () {
        if (customCheckbox.checked) {
            hiddenCmsVariants.style.display = 'flex';
        } else {
            hiddenCmsVariants.style.display = 'none';
        }

    },
    addCmsVariants: function () {
        if (viewsSelect.value === 'other') {
            otherInput.style.display = 'flex';
        } else {
            otherInput.style.display = 'none';
        }
    },
    addScreenBlock: function () {
        const cloneScreen = allScreen[0].cloneNode(true);
        allScreen[allScreen.length-1].after(cloneScreen);
        const cloneInput = cloneScreen.querySelector('input');
        cloneInput.value = '';
    },
    addRollBack: function () {
        range.addEventListener('input', () => {
            rangeValue.textContent = `${range.value}%`;
            this.rollBack = range.value;
        });
    },
    addChangeRollBack: function () {
        range.addEventListener('input', () => {
            this.servicePercentPrice =  Math.ceil(this.fullPrice - (this.fullPrice * (range.value / 100)));
            costRollback.value = this.servicePercentPrice;
        });
    },
    calculateInit: function () {
        const inputs = [...document.querySelectorAll('.main-controls__item.screen input')];
        const selects = [...document.querySelectorAll('.main-controls__item.screen select')];
        const checkboxes = [...document.querySelectorAll('.main-controls__item.other-items input')];

        const isCheck = (item) => item.value !== '';

        if (selects.every(isCheck) && inputs.every(isCheck)) {
            inputs.forEach(input => input.disabled = true);
            selects.forEach(select => select.disabled = true);
            checkboxes.forEach(checkbox => checkbox.disabled = true);
            customCheckbox.disabled = true;
            this.start();
        }
    },
    resetInit: function () {
            const screens = [...document.querySelectorAll('.main-controls__item.screen')];
            const inputs = [...document.querySelectorAll('.main-controls__item.screen input')];
            const selects = [...document.querySelectorAll('.main-controls__item.screen select')];
            const checkboxes = [...document.querySelectorAll('.main-controls__item.other-items input')];

            calculate.style.display = 'flex';
            reset.style.display = 'none';

            inputs.forEach(input => {
                input.disabled = false;
                input.value = '';
            });
            selects.forEach(select => {
                 select.disabled = false;
                 select.value = '';
                });
            checkboxes.forEach(checkbox => {
                checkbox.disabled = false;
                checkbox.checked = false;
            });

            range.disabled = false;
            range.value = '0';
            rangeValue.textContent = '0%';
            customCheckbox.disabled = false;
            customCheckbox.checked = false;
            plusButton.disabled = false;

            costLayout.value = '';
            costAdditional.value = '';
            totalCost.value = '';
            costRollback.value = '';
            screensQuantity.value = '';
            optionOther.value = '';
            viewsSelect.value = '';

            for (let i = 0; i < screens.length-1; i++) {
                screens[i].remove();
            }

            this.screens.splice(0, this.screens.length);
            this.rollBack = 0;
            this.fullPrice = 0;

            this.servicePricesPercent = 0;
            this.servicePricesNumber = 0;
            this.servicePercentPrice = 0;

            this.servicesPercent = {};
            this.servicesNumber = {};

            hiddenCmsVariants.style.display = 'none';
            otherInput.style.display = 'none';
    },
    start: function () {
        this.addScreens();
        this.addServices();
        this.addCmsVariants();
        this.addPrices();
        this.showResult();
        this.addChangeRollBack();
    }
};

appData.init();


