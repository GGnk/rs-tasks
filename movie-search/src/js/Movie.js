export default class Movie {
  constructor() {
    this.api = '';
    this.swiper = {};

  };
  static start(api, swiper) {
    if(!api || !swiper) return console.log('Install the key/class swiper !');
    this.api = api;
    this.swiper = swiper;
  };

  static search(word) {
    if (!this.api) return console.log('Install the key!');
    if (!word) return console.log(`Не введен запрос! В строке указано: ${word}`);
    this.swiper.removeAllSlides();
    this.getMovie(word).then((item) => {
      console.log(item.Search);

      item.Search.forEach((movie) => {
        this.swiper.appendSlide(this.card(movie));
      });

    });
  };

  static card(state) {
    return `<div class="swiper-slide">
        <input style="display: none" type="text" value="${state.imdbID}">
        <div class="card mb-4" style="border: none">
          <div class="card-name">${state.Title}</div>
          <img src="${state.Poster}" style="height: 400px" class="card-img-top" alt="${state.Title}">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center">
              <small class="text-info">
                ${state.Year} year
              </small>
              <small class="text-muted">
                <svg class="bi bi-star-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor"
                     xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                </svg>
                6.6
              </small>
            </div>
          </div>
        </div>
      </div>`;
  };

  static async getMovie(search, page = 1) {
    const url = `https://www.omdbapi.com/?s=${search}&page=${page}&apikey=${this.api}`;

    const res = await fetch(url).catch(console.log.bind(console));
    return await res.json();
  };

}
