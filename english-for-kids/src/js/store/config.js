const btns = document.querySelector(".btns");
export const config = {
    play: false,
    cat: [],


    logger(obj) {
        console.log(obj)
    },

    checked(mode) {
        let pageCardsCat = document.querySelectorAll('#pageContainer > .cardshow');
        let cardsCat = document.querySelectorAll(".card-container > .card");
        let cardHeaderOrRotate = document.querySelectorAll(".card-header, .rotate");

        let menu = document.querySelector(".menu")

        if(mode) {
            config.play = false;
            pageCardsCat.forEach(item => item.classList.add("green"));
            menu.classList.add("green");
            cardsCat.forEach(item => item.classList.remove("card-cover"));
            cardHeaderOrRotate.forEach(item => item.classList.remove("none"));
            if(config.cat.length !== 0) {
                btns.childNodes.forEach(item => item.classList.add("none"));
                btns.childNodes.forEach(item => item.classList.remove("repeat"));
            }
        } else {
            config.play = true;
            pageCardsCat.forEach(item => item.classList.remove("green"));
            menu.classList.remove("green");
            cardsCat.forEach(item => item.classList.add("card-cover"));
            cardHeaderOrRotate.forEach(item => item.classList.add("none"));
            if(config.cat.length !== 0) {
                btns.childNodes.forEach(item => item.classList.remove("none"));
            }
        }
    },

    game() {
        if(this.play === true) this.logger("Играй начилась!!")
        btns.childNodes.forEach(item => item.classList.add("repeat"));

    }
}
