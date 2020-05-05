import '@babel/polyfill';
import 'bootstrap';
import Movie from './js/Movie';
import Swiper from 'swiper';

const apiKey = '5e0576fa';

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
    lazy: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
    },
});

const inputSearchValue = document.querySelector('input[type=search]');
const butSearch = document.querySelector('#search');

Movie.start(apiKey, mySwiper);
Movie.search('dream');

const SEARCH = () => Movie.search(inputSearchValue.value);

async function getTranslation () {
    const url = 'https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200322T155651Z.de98a60e6a99185e.089aea4237b51c6db082c966f27a7895cd1e8b44&text= agree &lang=en-ru';
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.text);
}

document.onreadystatechange = function(){
    if(document.readyState === 'complete'){
      butSearch.addEventListener('click', SEARCH)
    }
};
