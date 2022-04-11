
import "./libs";
import {
	initGallery,
} from "./modules/popup-gallery";
import {spoilerInit} from "./modules/spoilers";
import {sliderInit} from "./modules/slider";

document.addEventListener("DOMContentLoaded", () => {
	spoilerInit();
	initGallery();
	sliderInit();

});