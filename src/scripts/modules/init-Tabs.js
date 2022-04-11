import { Tabs } from "./Tabs";
import { TabsAjax } from "./TabsAjax";

export const initTabs = () => {

  const tabsContainers = document.querySelectorAll(".js-tabs");

  tabsContainers?.forEach(tab => {
    let tabInstanse;
    tab.dataset.ajax === "true" ? tabInstanse = new TabsAjax(tab) : tabInstanse = new Tabs(tab);

    tabInstanse.init();
  });
};