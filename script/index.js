const ancients = [{
    name: "Azathoth",
    green: [1,2,2],
    brown: [2,3,4],
    blue: [1,1,0]
}, {
    name: "Cthulthu",
    green: [0,1,3],
    brown: [2,3,4],
    blue: [2,0,0]
}, {
    name: "Niggurath",
    green: [1,3,2],
    brown: [2,2,4],
    blue: [1,1,0]
}, {
    name: "Sothoth",
    green: [0,2,3],
    brown: [2,3,4],
    blue: [1,1,0]
}];

const green_snow = ["green1.png", "green12.png", "green16.png", "green17.png", "green18.png"],
green_tentacles = ["green2.png", "green3.png", "green4.png", "green5.png", "green6.png"],
green_defaulth = ["green7.png", "green8.png", "green9.png", "green10.png", "green11.png", "green13.png", "green14.png", "green15.png"],

brown_snow = ["brown11.png", "brown12.png", "brown13.png", "brown14.png", "brown21.png"],
brown_tentacles = ["brown6.png", "brown7.png", "brown8.png", "brown9.png", "brown10.png"],
brown_defaulth = ["brown1.png", "brown2.png", "brown3.png", "brown4.png", "brown5.png", "brown15.png", "brown16.png", "brown17.png", "brown18.png", "brown19.png", "brown20.png"],

blue_snow = ["blue3.png", "blue4.png", "blue5.png", "blue10.png"],
blue_tentacles = ["blue1.png", "blue2.png", "blue6.png", "blue8.png"],
blue_defaulth = ["blue7.png", "blue9.png", "blue11.png", "blue12.png"];

let ancients_container = document.querySelector('.ancient-container'),
    //ancient_active = document.querySelector('.ancient-card--active'),
    diff_container = document.querySelector('.difficulty-container'),
    //diff_active = document.querySelector('.difficulty--active'),
    card_button = document.querySelector('.card-button'),
    deck = document.querySelector('.deck-cards'),
    cards_stage1 = 0,
    cards_stage2 = 0,
    cards_stage3 = 0;


ancients_container.onclick = function(e) {
    let ancient_active = document.querySelector('.ancient-card--active');
    if (!e.target.classList.contains('ancient-card--active') && !e.target.classList.contains('ancient-container')) {
        ancient_active.classList.remove('ancient-card--active');
        e.target.classList.add('ancient-card--active');
    }
    fishRemove()
    mythDeck()
}
diff_container.onclick = function(e) {
    let diff_active = document.querySelector('.difficulty--active')
    if (!e.target.classList.contains('difficulty--active')) {
        diff_active.classList.remove('difficulty--active');
        e.target.classList.add('difficulty--active');
    }
}


function mythDeck() {
    let  ancient_name = getName();
    
    function getName() {
        let ancient_active = document.querySelector('.ancient-card--active'),
            cards_green = document.querySelectorAll('.card-green'),
            cards_brown = document.querySelectorAll('.card-brown'),
            cards_blue = document.querySelectorAll('.card-blue');
            
        for (let i=0;i<=ancients.length-1;i++) {
            if (ancients[i].name === ancient_active.id) {
                cards_stage1 = ancients[i].green[0] + ancients[i].brown[0] + ancients[i].blue[0];
                cards_stage2 = ancients[i].green[1] + ancients[i].brown[1] + ancients[i].blue[1];
                cards_stage3 = ancients[i].green[2] + ancients[i].brown[2] + ancients[i].blue[2];

                cards_green[0].innerHTML = ancients[i].green[0]
                cards_green[1].innerHTML = ancients[i].green[1]
                cards_green[2].innerHTML = ancients[i].green[2]

                cards_brown[0].innerHTML = ancients[i].brown[0]
                cards_brown[1].innerHTML = ancients[i].brown[1]
                cards_brown[2].innerHTML = ancients[i].brown[2]

                cards_blue[0].innerHTML = ancients[i].blue[0]
                cards_blue[1].innerHTML = ancients[i].blue[1]
                cards_blue[2].innerHTML = ancients[i].blue[2]

                for (let f = 1;f<=cards_stage1;f++) {
                    let elem = document.createElement('div');
                    elem.classList.add('deck-cards--fish');
                    deck.appendChild(elem)
                }
            }
            
        }

    }
    return ancient_name
}
mythDeck()


function fishRemove() {
    let fish = document.querySelectorAll('.deck-cards--fish');
    for (let i=0;i<=fish.length-1;i++) {
        fish[i].remove()
    }
}

//функция собирает массив из нужных карт
function collectCards(snow, tentacles, defaulth) {
    let arr = snow.concat(tentacles,defaulth),
    massive = arr.filter(x => {return x!== undefined;})

    //ПЕРЕМЕШИВАНИЕ
    function mixarr(arr){
        return arr.map(i=>[Math.random(), i]).sort().map(i=>i[1])
    }
    massive = mixarr(massive);
    return massive
}

console.log(collectCards(green_snow))

/*function buildDeck() {

}*/