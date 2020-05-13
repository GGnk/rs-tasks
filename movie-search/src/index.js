import '@babel/polyfill';
import 'bootstrap';
import Movie from './js/Movie';
import Translate from "./js/Translate";
import Swiper from 'swiper';

const apiKeyMovies = process.env.API_KEY_MOVIES;
const apiKeyTranslate = process.env.API_KEY_TRANSLATE;

const mySwiper = new Swiper('.swiper-container', {
    slidesPerView: 1,
    spaceBetween: 20,
    breakpoints: {
        // when window width is >= 480px
        480: {
            slidesPerView: 2,
            spaceBetween: 30
        },
        // when window width is >= 640px
        640: {
            slidesPerView: 3,
            spaceBetween: 40
        },
        1200: {
            slidesPerView: 4,
            spaceBetween: 40
        },
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
    },
});

const inputSearchValue = document.querySelector('input[type=search]');
const butSearch = document.querySelector('#search');

const myMovie = new Movie(apiKeyMovies, mySwiper);
const myTranslate = new Translate(apiKeyTranslate);

myMovie.search(myTranslate.checkLanguage('people'), 2);

const SEARCH = () => myMovie.search(myTranslate.checkLanguage(inputSearchValue.value), 2);

mySwiper.on('reachEnd', function () {
    myMovie.loader();
});

document.onreadystatechange = function(){
    if(document.readyState === 'complete'){
      butSearch.addEventListener('click', SEARCH)
      inputSearchValue.addEventListener('keyup', function (e) {
        if(e.keyCode === 13){
          e.preventDefault();
          SEARCH();
        }
      });
    }
};
