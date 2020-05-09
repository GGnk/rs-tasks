export default class Movie {
  constructor(api, swiper) {
    this.start(api, swiper);
  };
  start(api, swiper) {
    if(!api || !swiper) return console.log('Install the key OMDb Api and class Swiper !');
    this.api = api;
    this.swiper = swiper;
  };

  search(word, page = 1, loader = false) {
    if (!this.api) return console.log('Install the key!');

    // received a Promise object from Yandex Translate
    word.then((item) => {
      if (item == null) return console.log(`Не введен запрос!`);

      this.getMovie(item, page)
        .then((items) => {
          //console.log(items)
          let local = {
            word: item,
            countMovies: items.totalResults,
            page: page,
          };

          this.setLocalStorage(local);

          return loader ? this.checkMoviesForLoader(items) : this.checkMovies(items);
        })
        .then((movies)=> {
          if (!movies) return movies
          movies.forEach((movie) => {
            this.getRating(movie).then(r => this.swiper.appendSlide(this.card(r)));
          });
        });
    });

  };

  // Movie card template
  card(state) {
    let noPoster = 'assets/img/no_poster.jpg';
    return `<div class="swiper-slide">
        <input style="display: none" type="text" value="${state.imdbID}">
        <div class="card mb-4" style="border: none">
          <div class="card-name">${state.Title}</div>
          <img src="${(!state.Poster || state.Poster === 'N/A')? noPoster:state.Poster}" style="height: 400px" class="card-img-top" alt="${state.Title}">
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
                ${state.imdbRating}
              </small>
            </div>
          </div>
        </div>
      </div>`;
  };

  // Search for a movie
  async getMovie(search, page = 1) {
    const url = `https://www.omdbapi.com/?s=${search}&page=${page}&apikey=${this.api}`;

    const res = await fetch(url).catch(console.log.bind(console));
    return await res.json();
  };

  // Getting a rating
  async getRating(movie) {
    const url = `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${this.api}`;

    const res = await fetch(url).catch(console.log.bind(console));
    return await res.json();
  };

  // Checking the list for empty space
  checkMovies(list) {
    let errorObject = document.querySelector('.error');

    if (list.Response === 'False') {
      errorObject.classList.add('active');
      errorObject.innerText = `No results for "${list.Error}"`;
      return false
    }

    this.swiper.removeAllSlides();
    errorObject.classList.remove('active');
    errorObject.innerText = '';
    return list.Search.map((movie) => movie);
  }

  checkMoviesForLoader(list) {
    if (list.Response === 'False') return false;

    return list.Search.map((movie) => movie);
  }

  setLocalStorage(local) {
    localStorage.setItem('movieSearch', JSON.stringify(local));
  }

  getLocalStorage() {
    return JSON.parse(localStorage.getItem('movieSearch'))
  }

  loader() {
    let local = this.getLocalStorage();
    let promise = new Promise((resolve, reject) => {
      resolve(local.word);
    });
    this.search(promise, ++local.page, true);
  }
}
