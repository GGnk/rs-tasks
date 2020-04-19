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
let btnHome = document.querySelectorAll(".home");
class ShowCards {
    constructor(state) {
        this.cards = state.cards;
        config.cat = state

        config.checked(!config.play);

        document.querySelectorAll("#cardsContainer .card-container")
            .forEach(item => item.remove());
        document.querySelector(".rating").innerHTML = "";

        btnHome.forEach(item => item.classList.remove("none_end"));

        document.querySelector(".cat-text").classList.remove("none_end");
        document.querySelector(".cat_name").textContent = state.name;

            this.cards.forEach(item => {
            cards_container.insertBefore(this.createElement(item),
                document.querySelector("audio"));
        })
        cards_container.style = "display: flex"
        container.style = "display: none"

        let back = document.querySelectorAll(".card");

        back.forEach((elem)=>{
            elem.parentElement.addEventListener('mouseleave', (event)=> {
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
let menu = document.getElementById("menu");

class CategoryCardListMenu {
    constructor(state) {
        this.cards = state;

        this.cards.forEach(item => {
            menu.insertBefore(this.createElement(item),
                null);
        })

    }
    createElement(card) {
        const cardElement = document.createElement('a');
        cardElement.className = "header-item click";
        cardElement.id = card.id
        cardElement.textContent = card.name
        return cardElement
    }
}
const audioPlay = document.querySelector(".audio");
audioPlay.autoplay = true;
class Game {
     constructor(target) {
         this.target = target
         this.count = 0;
         this.success = 0;
         this.error = 0;

         this.audio = audioPlay;
         this.effect = document.querySelector(".soundEffects");
         this.effect.autoplay = true;

         this.rat = document.querySelector(".rating");
         this.rat.classList.remove("none");

         this.gameEnd = document.querySelector(".end");

         config.play = true;

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
     playAudio(src, effect){
         if (effect) {
             switch (effect) {
                 case "success":
                     this.effect.src = "./assets/audio/correct.mp3";
                     break;
                 case "error":
                     this.effect.src = "./assets/audio/error.mp3";
                     break;
             }
             return this.effect.play();
         }
         if(!src) return this.audio.play()
         src = "./assets/"+src;

         this.audio.src = src
         this.audio.play()
     }
     process(word, target) {
         if(word === config.cat.cards[this.count].word){
             target.classList.add("inactive")
             if(config.cat.cards[++this.count]){
                 this.playAudio("", "success")
                 this.ratting("success")
                 this.success++
                 this.playAudio(config.cat.cards[this.count].audioSrc)
             } else {
                 return this.end()
             }
         } else{
             this.playAudio("", "error")
             this.ratting("error")
             this.error++
         }
     }
     ratting(answer) {
         let ratElement = document.createElement('div');
         ratElement.className = "star-"+answer;
         this.rat.appendChild(ratElement)
     }
     end(){
         config.play = false
         cards_container.style = "display: none";
         this.gameEnd.classList.remove("none_end");
         if (this.error > 0) {
             this.gameEnd.classList.add("end-failure");
            this.gameEnd.children[0].innerText = this.error+" error!";
         } else {
             this.gameEnd.classList.add("end-success");
             this.gameEnd.children[0].innerText = "Perfectly!!!"
         }
         config.checked(!config.play)
         document.querySelector("input[name=switch]").checked = true

         btnHome.forEach(item => item.classList.add("none_end"));
         document.querySelector(".cat-text").classList.add("none_end");
         setTimeout(() => {
             this.error> 0 ?
                 this.gameEnd.classList.remove("end-failure"):
                 this.gameEnd.classList.remove("end-success");

             this.gameEnd.classList.add("none_end");
             container.style = "display: flex";
             this.error = 0;
             this.success = 0;
             this.count = 0;
         },2000);

     }

}

const MouseUp = (event) => {

    if (event.target.classList.contains('cardshow') || event.target.parentNode.classList.contains('cardshow')) {
        let card_id = event.target.parentNode.classList.contains('cardshow')
            ? event.target.parentNode.id : event.target.id

        categories.find(item => {
            if(item.id == card_id) new ShowCards(item)
        })

    } else if(event.target.classList.contains('rotate')) {
        event.target.parentNode.classList.add("translate");
    } else if(event.target.classList.contains('btn')) {
        if (!config.play) return game = new Game(event.target);
        else game.playAudio()
    } else if(event.target.classList.contains('front') && document.querySelector("input[name=switch]").checked && !config.play){
        config.cat.cards.find(item => {
            if(item.word === event.target.innerText) {
                audioPlay.src = "./assets/"+item.audioSrc;
                audioPlay.play()
            }
        })

    } else if(event.target.classList.contains('front') && !event.target.classList.contains('inactive') && config.play){
        let word = event.target.innerText;

        game.process(word, event.target)
    } else {
        document.querySelector("input[type=checkbox]").checked = false
    }
}

document.onreadystatechange = function(){
    if(document.readyState === 'complete'){
        new CategoryCardList(categories);
        new CategoryCardListMenu(categories);
        document.addEventListener('mouseup', MouseUp);

        menu.addEventListener("click", (event) => {
            if(event.target.classList.contains("click")){
                let card_id = event.target.id

                categories.find(item => {
                    if(item.id == card_id) new ShowCards(item)
                })
                document.querySelector("input[type=checkbox]").checked = false
                document.querySelector(".switch-input").checked = true
            }
        })

        btnHome.forEach(item => item.addEventListener("click", () => {
            btnHome.forEach(item => item.classList.add("none_end"));
            document.querySelector(".cat-text").classList.add("none_end");
            container.style = "display: flex";
            cards_container.style = "display: none";
            })
        )
    }
}
