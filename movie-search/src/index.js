import '@babel/polyfill';
import 'bootstrap';
import Movie from './js/Movie';
import Translate from "./js/Translate";
import Swiper from 'swiper';

const apiKeyMovies = '5e0576fa';
const apiKeyTranslate = 'trnsl.1.1.20190221T052313Z.158d4792ab8f3f79.243113d71b405e2ea3fb9ccbbd1c4a6f0bbf1e56';

const mySwiper = new Swiper('.swiper-container', {
    slidesPerView: 1,
    spaceBetween: 20,
    breakpoints: {
        // when window width is >= 320px
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
