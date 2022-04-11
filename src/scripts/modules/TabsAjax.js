import { Tabs } from "./Tabs";

/* 
На случай, если resizeObserver в наследуемом классе Tabs
недостаточно
*/

export class TabsAjax extends Tabs {

  _mutationObserver() {
    return new MutationObserver(mutations => {

      for (let mutation of mutations) {

        if (mutation.target.closest('.tabs__item')?.classList.contains('active')) {
          console.log(mutation.target);
          this._setHeight();
        }
      }     
    });
  }

  _mutationObserverInit() {
    this._mutationObserver().observe(this.container, {
      childList: true,
      subtree: true
    });
  }

  init() {
    super.init();

    this._mutationObserverInit();
  }

}