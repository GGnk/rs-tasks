import '@babel/polyfill';
const app = document.getElementById('app');
const div = [];
let wordData = '';

function createDiv([...constants], parent) {
    constants.forEach((item) => {
        let name = parent ? `${parent}-${item.name}`: item.name;
        div[name] = document.createElement(item.element);
        div[name].className += item.class;

        if(item.text !== undefined) div[name].innerText = item.text;

        //console.log(`Был создан элемент ${item.element} с переменной div[${name}]`)
        if (!parent) return app.append(div[name]);
        return div[parent].append(div[name]);

    })
}
createDiv([{name: 'container', element: 'div', class: 'container'}],null);
createDiv(
    [
        {name: 'res', element: 'div', class: 'res'},
        {name: 'images', element: 'div', class: 'images'},
        {name: 'items', element: 'div', class: 'items'},
        {name: 'btns', element: 'div', class: 'btns'}
    ],'container');
createDiv(
    [
        {name: 'points', element: 'ul', class: 'points'},
        {name: 'score', element: 'div', class: 'score'}
    ],'container-res');
createDiv(
    [
        {name: 'img', element: 'img', class: 'img'},
        {name: 'translation', element: 'p', class: 'translation'},
        {name: 'input', element: 'input', class: 'input none'}
    ],'container-images');

createDiv(
    [
        {name: 'btn-restart', element: 'a', class: "btn restart", text: 'Restart'},
        {name: 'btn-speak', element: 'a', class: "btn voice user-speach voice-active", text: 'Speak please'},
        {name: 'btn-result', element: 'a', class: "btn result", text: 'Results'}
    ],'container-btns');

createDiv(
    [
        {name: 'point1', element: 'li', class: "point activePoint"},
        {name: 'point2', element: 'li', class: "point"},
        {name: 'point3', element: 'li', class: "point"},
        {name: 'point4', element: 'li', class: "point"},
        {name: 'point5', element: 'li', class: "point"},
        {name: 'point6', element: 'li', class: "point"},
    ],'container-res-points');

div['container-images-img'].src = 'assets/img/blank.jpg';
div['container-images-input'].type = 'text';
div['container-images-input'].readOnly = true;

class Cards {
    constructor(state) {
        this.state = state;

        console.log(state);
        this.state.forEach((item) => {
            div['container-items'].append(this.card(item.word, item.transcription, 'lol'))
        });
    }

    card(I_word, I_transcription, I_translation) {
        let item = document.createElement('div');
        item.className = 'item';
        let span = document.createElement('span');
        span.className = 'audio-icon';
        let word = document.createElement('p');
        word.className = 'word';
        word.innerText = I_word;
        let transcription = document.createElement('p');
        transcription.className = 'transcription';
        transcription.innerText = I_transcription;
        let translation = document.createElement('p');
        translation.className = 'translation';
        translation.innerText = I_translation;

        return item.append(span, word, transcription, translation);
    }
}
console.log(div);


const getWords = async (page, group) => {
    const url = `https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${group}`;
    const res = await fetch(url);
    const json = await res.json();
    console.log(JSON.stringify(json, null, 1));
};

async function getTranslation () {
    const url = 'https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200322T155651Z.de98a60e6a99185e.089aea4237b51c6db082c966f27a7895cd1e8b44&text= agree &lang=en-ru';
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.text);
}
document.onreadystatechange = function(){
    if(document.readyState === 'complete'){
        new Cards(getWords(0, 0));
        /*new CategoryCardList(categories);
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
        )*/
    }
}
