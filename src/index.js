import css from "./css/style.css";
import "../node_modules/basiclightbox/dist/basicLightbox.min.css";
import imageTemplate from "./imageTemplate.hbs";
import apiService from "./apiService.js";
var debounce = require("lodash.debounce");
const basicLightbox = require("basiclightbox");

const inputRef = document.querySelector("form > input");
const gallery = document.querySelector(".gallery");
const spinnerRef = document.querySelector(".spinner");

const updateMarkup = function (markup) {
  setTimeout(() => {
    gallery.insertAdjacentHTML("beforeend", imageTemplate(markup));
    spinnerRef.classList.add("is-hidden");
    document.documentElement.scrollTop > 100
      ? window.scrollTo({
          top:
            document.documentElement.scrollTop +
            document.documentElement.clientHeight -
            30,
          behavior: "smooth",
        })
      : "";
  }, 500);
};

const renderGallery = function (event) {
  event.preventDefault();
  gallery.innerHTML = "";
  spinnerRef.classList.remove("is-hidden");

  if (event.target.value !== "") {
    apiService.query = event.target.value;

    apiService.resetPage();
    apiService.fetchImages().then((hits) => {
      updateMarkup(hits);
    });
  }
};

inputRef.addEventListener("input", debounce(renderGallery, 500));

window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (clientHeight + scrollTop >= scrollHeight) {
    apiService.fetchImages().then((hits) => updateMarkup(hits));
    spinnerRef.classList.remove("is-hidden");
  }
});

gallery.addEventListener("click", (event) => {
  event.path.forEach((el) => {
    if (el.nodeName === "LI") {
      const instance = basicLightbox.create(`
    <img src=${el.dataset.link}>
`);
      instance.show();
    }
  });
});

// loadMoreBtn.addEventListener("click", () => {
//   apiService.fetchImages().then((hits) => updateMarkup(hits));
//   window.scrollTo({
//     top: document.documentElement.offsetHeight,
//     behavior: "smooth",
//   });
// });
