export class Tabs {

  constructor(tab) {

    this.container = tab;

  }

  /* 
  Метод возвращающий элементы принадлежащие конкретно этому экземпляру
  табов, для возможности применения вложенности, используется в _define() 
  */

  _includeFlag(elements) {

    this.includedTabs = this.container.querySelector('.js-tabs');
   
    if (!this.includedTabs) return elements;

    this.includedTabsChilds = this.includedTabs.querySelectorAll('*');


    return [...elements].filter(elem => {
      return Array.from(this.includedTabsChilds).indexOf(elem) === -1;
    });

  }

  _define() {

    this.controls = this._includeFlag(this.container.querySelectorAll(".js-tabs-btn"));
    this.controlsContainer = this.container.querySelector(".js-tabs-controls");
    this.tabsWrapper = this.container.querySelector(".js-tabs-content");
    this.tabsItems = this._includeFlag(this.container.querySelectorAll(".js-tabs-item"));

  }

  /* 
    Метод возвращаюший активный в данный момент таб
  */

  _detectActiveTab() {
    
    return [...this.tabsItems].find(tab => tab.classList.contains("active"));

  }

  /* 
    Метод для деактивации всех табов
  */

  _clearAll() {

    this.controls.forEach(control => control.classList.remove("active"));
    this.tabsItems.forEach(item => item.classList.remove("active"));

  }

  /* 
    Метод возвращающий высоту активного таба
  */

  _calculateHeight() {
    
    return this._detectActiveTab().getBoundingClientRect().height;
    
  }

  /* 
    Слушатель всех изменений геометрических параметров табов
  */

  _resizeObserver() {

    return new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (entry.target.classList.contains('active')) {
          this._setHeight();
        }
      }
    });

  }

  /* 
    Инициализация слушателя
  */

  _resizeObserverInit() {

    this.tabsItems.forEach(item => {
      this._resizeObserver().observe(item);
    });

  }

  /* 
    Установка высоты контейнера табов
  */

  _setHeight() {
    let wrapperStyles = window.getComputedStyle(this.tabsWrapper);
    let paddings = parseInt(wrapperStyles.paddingTop) + parseInt(wrapperStyles.paddingBottom);
    
    this.tabsWrapper.style.height = this._calculateHeight() + paddings + "px";
    
  }

  /* 
    Сделать таб активным
  */

  makeActive(btn, tab) {

    this._clearAll();
    tab.classList.add("active");
    btn.classList.add("active");
    this._setHeight();

  }

  /* 
   Слушатель кликов по кнопкам табов
  */

  _clickListener() {

    this.controlsContainer.addEventListener('click', (evt) => {
      const indicator =  evt.target.closest('.js-tabs-btn'); 
      
      if (!indicator) return;

      const btnNumber = [...this.controls].indexOf(indicator, 0);
      this.makeActive(indicator, this.tabsItems[btnNumber]);

    });
    
  }

  init() {

    this._define();
    
    this._setHeight();

    this._resizeObserverInit();

    this._clickListener();
    
  }
}