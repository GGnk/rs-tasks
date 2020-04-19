import {config} from "./js/store/config"
import "./js/store/routes"

import categories from "./js/store/categories";

const container = document.getElementById('pageContainer');

const cards_container = document.getElementById('cardsContainer');

var game = '';

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
        this.cards = state.cards;
        config.cat = state
        config.logger(config.cat, "ShowCards - начало")
        config.logger(state, "ShowCards - state")

        config.checked(!config.play);

        this.cards.forEach(item => {
            cards_container.insertBefore(this.createElement(item),
                document.querySelector("audio"));
        })
        cards_container.style = "display: flex"
        container.style = "display: none"

        let back = document.querySelectorAll(".card");

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

class Game {
     constructor(target) {
         this.target = target
         this.count = 0;
         this.success = [];
         this.audio = document.querySelector(".audio");
         this.audio.autoplay = true;

         config.play = true

         document.querySelector(".btns")
             .childNodes.forEach(item => item.classList.add("repeat"));
         this.random()
         this.playAudio(config.cat.cards[this.count].audioSrc)

     }
     random() {

         for(let i = config.cat.cards.length - 1; i > 0; i--){
             let j = Math.floor(Math.random()*(i + 1));
             let temp = config.cat.cards[j];
             config.cat.cards[j] = config.cat.cards[i];
             config.cat.cards[i] = temp;
         }
     }
     playAudio(src){
         if(!src) return this.audio.play()
         src = "./assets/"+src;

         this.audio.src = src
         this.audio.play()
     }
     process(word) {
         if(word === config.cat.cards[this.count].word){
             config.logger("Ты угадал")
             this.count++
         }

     }

}

const MouseUp = (event) => {

    if (event.target.classList.contains('cardshow') || event.target.parentNode.classList.contains('cardshow')) {
        let card_id = event.target.parentNode.classList.contains('cardshow')
            ? event.target.parentNode.id : event.target.id

        categories.find(item => {
            if(item.id == card_id) new ShowCards(item)
        })
        config.logger(config.cat, "MouseUp - cardshow")

    } else if(event.target.classList.contains('rotate')) {
        event.target.parentNode.classList.toggle("translate");

    } else if(event.target.classList.contains('btn')) {
        if (!config.play) return game = new Game(event.target);
        else game.playAudio()
    } else if(event.target.classList.contains('front') && config.play){
        let word = event.target.textContent.replace(/\s+/g, ' ').trim()
        config.logger(word)
        game.process(word)
    }
}

document.onreadystatechange = function(){
    if(document.readyState === 'complete'){
        new CategoryCardList(categories);

        document.addEventListener('mouseup', MouseUp);
    }
}
