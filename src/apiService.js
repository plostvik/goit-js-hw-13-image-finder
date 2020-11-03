import { error, alert } from "../node_modules/@pnotify/core/dist/PNotify.js";
import "../node_modules/@pnotify/core/dist/PNotify.css";
import "../node_modules/@pnotify/mobile/dist/PNotifyMobile.css";
import "../node_modules/@pnotify/core/dist/BrightTheme.css";

const key = "18943342-b8026c260dd173166ae4011d3";

export default {
  searchQuery: "",
  page: 1,

  fetchImages() {
    const apiUrl = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${key}`;

    return fetch(apiUrl)
      .then((res) => res.json())
      .then(({ hits }) => {
        if (hits.length === 0) {
          alert({
            delay: 400,
            text: "No images for your query! :(",
          });
        } else {
          this.page += 1;
          return hits;
        }
      })
      .catch((error) =>
        error({
          delay: 400,
          text: "Oops, something went wrong!",
        }),
      );
  },

  resetPage() {
    this.page = 1;
  },

  set query(newQuery) {
    this.searchQuery = newQuery;
  },
};
