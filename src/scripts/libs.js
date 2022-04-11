import "./init-functions";
import {togglePassword} from "./modules/togglePassword";
import {selectsInit} from "./modules/choisesSelects";
import {
	phoneMaskInit
} from "./modules/masks";
import "regenerator-runtime/runtime.js";
import {initTabs} from "./modules/init-Tabs.js";
import { UrlScripts } from "./modules/UrlScripts";

document.addEventListener("DOMContentLoaded", () => {

  UrlScripts.getSearchParams();

  selectsInit();
  togglePassword();
  phoneMaskInit();
  initTabs();

});