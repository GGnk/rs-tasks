export const config = {
    play: false,
    cat: [],


    logger(obj, classname) {
        if(classname) console.log("---- "+classname+" ----")
        console.log(obj)
    },

    checked(mode) {
        let pageCardsCat = document.querySelectorAll('#pageContainer > .cardshow');
        let cardsCat = document.querySelectorAll(".card-container > .card");
        let cardHeaderOrRotate = document.querySelectorAll(".card-header, .rotate");
        let btns_start = document.querySelector(".btns");
        let menu = document.querySelector(".menu")

        if(mode) {
            pageCardsCat.forEach(item => item.classList.add("green"));
            menu.classList.add("green");
            cardsCat.forEach(item => item.classList.remove("card-cover"));
            cardHeaderOrRotate.forEach(item => item.classList.remove("none"));
            if(config.cat.length !== 0) {
                btns_start.childNodes.forEach(item => item.classList.add("none"));
                btns_start.childNodes.forEach(item => item.classList.remove("repeat"));
            }
        } else {
            config.play = false;
            pageCardsCat.forEach(item => item.classList.remove("green"));
            menu.classList.remove("green");
            cardsCat.forEach(item => item.classList.add("card-cover"));
            cardHeaderOrRotate.forEach(item => item.classList.add("none")); 
            if(config.cat.length !== 0) {
                btns_start.childNodes.forEach(item => item.classList.remove("none"));
            }
        }
    }
}
