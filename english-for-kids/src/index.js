import {config} from "./js/store/config"
import "./js/store/routes"

import categories from "./js/store/categories";

const container = document.getElementById('pageContainer');

const cards_container = document.getElementById('cardsContainer');

 document.querySelector('input[name=switch]').addEventListener('change', (event) => {
    config.checked(event.target.checked)
 })

class CategoryCardList {
    constructor(state) {
        this.cats = state;

        this.cats.forEach(item => {
            container.append(this.createElement(item));
        });

        container.style = "display: flex"
        cards_container.style = "display: none"

        config.checked(!config.play)
    }

    createElement(card) {
        const cardElement = document.createElement('a');
        cardElement.className = "cardshow main-card green";
        cardElement.id = card.id
        cardElement.innerHTML =`<img src="assets/${card.img}" alt="${card.name}">${card.name}`;

        return cardElement
    }

}
class ShowCards {
    constructor(state) {
        this.cards = state;

        this.cards.forEach(item => {
            cards_container.insertBefore(this.createElement(item), document.querySelector("audio"));
        })
        cards_container.style = "display: flex"
        container.style = "display: none"

        let back = document.querySelectorAll(".card");
        config.logger(config.cat)

        back.forEach((elem)=>{
            elem.parentElement.addEventListener('click', (event)=> {
                elem.classList.remove("translate")
            })
        })

        config.checked(!config.play);
    }
    createElement(card) {
        const cardElement = document.createElement('div');
        cardElement.className = "card-container";
        cardElement.innerHTML = `
            <div class="card">
                <div class="front" style="background-image: url(assets/${card.image});">
                    <div class="card-header">${card.word}</div>
                </div>
                <div id="back" class="back" style="background-image: url(assets/${card.image});">
                    <div class="card-header">${card.translation}</div>
                </div>
                <div class="rotate"></div>
            </div>
        `;
        return cardElement
    }
}

const MouseUp = (event) => {

    if (event.target.classList.contains('cardshow') || event.target.parentNode.classList.contains('cardshow')) {
        let card_id = event.target.parentNode.classList.contains('cardshow') ? event.target.parentNode.id : event.target.id

        categories.find(item => {
            if(item.id == card_id) new ShowCards(item.cards)
            config.cat = item
        })
    } else if(event.target.classList.contains('rotate')) {
        event.target.parentNode.classList.toggle("translate");

    } else if(event.target.classList.contains('btn')) {
        config.game()
    }
}

document.onreadystatechange = function(){
    if(document.readyState === 'complete'){
        new CategoryCardList(categories);

        document.addEventListener('click', MouseUp);
    }
}
