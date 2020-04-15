import "./js/store/config"
import "./js/store/routes"
import "./js/store/categories"

const MODES = {
    train: 'train',
    play: 'play'
}

import categories from "./js/store/categories";

// const mainPage = document.getElementById('main');
// const categoryPage = document.getElementById('category');

const container = document.getElementById('pageContainer');

// const categoryList = document.getElementById('categoryList');
// const wordsList = document.getElementById('wordList');

// document.getElementById('swither').addEventListener('change', (event) => {
//     cardList.changeMode(MODES.play);
// })

class CardList {
    constructor(state) {
        this.state = state;

        this.state.forEach(item => {
            container.append(this.createElement(item.img, item.name));
        });

        // this.cards = this.state.map(singleState => {
        //     const card = new Card(singleState);
        //
        //     this.wordsList.append(card.createElement());
        //
        //     return card;
        // });
    }
    changeMode(mode) {
        this.cards.forEach(card => card.changeMode(mode));
    }
    createElement(image, name) {
        const cardElement = document.createElement('a');
        cardElement.className = "main-card green";
        cardElement.href = "#/cards";
        cardElement.innerHTML =`<img src="assets/${image}" alt="${name}">${name}`;

        return cardElement
    }
}
class Card {
    constructor(state) {
        this.state = state;
    }
    createElement() {
        const cardElement = document.createElement('a');
        cardElement.innerHTML(`<img src="${image}" alt="Action (set A)">Action (set A)`);

        return cardElement
    }
}


document.onreadystatechange = function(){
    if(document.readyState === 'complete'){
        new CardList(categories);
    }
}
