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
}],
//array green
green_snow = ["green1.png", "green12.png", "green16.png", "green17.png", "green18.png"],
green_tentacles = ["green2.png", "green3.png", "green4.png", "green5.png", "green6.png"],
green_defaulth = ["green7.png", "green8.png", "green9.png", "green10.png", "green11.png", "green13.png", "green14.png", "green15.png"],
//array brown
brown_snow = ["brown11.png", "brown12.png", "brown13.png", "brown14.png", "brown21.png"],
brown_tentacles = ["brown6.png", "brown7.png", "brown8.png", "brown9.png", "brown10.png"],
brown_defaulth = ["brown1.png", "brown2.png", "brown3.png", "brown4.png", "brown5.png", "brown15.png", "brown16.png", "brown17.png", "brown18.png", "brown19.png", "brown20.png"],
//array blue
blue_snow = ["blue3.png", "blue4.png", "blue5.png", "blue10.png"],
blue_tentacles = ["blue1.png", "blue2.png", "blue6.png", "blue8.png"],
blue_defaulth = ["blue7.png", "blue9.png", "blue11.png", "blue12.png"];

let ancients_container = document.querySelector('.ancient-container'),
    diff_container = document.querySelector('.difficulty-container'),
    card_button = document.querySelector('.card-button'),
    deck = document.querySelector('.deck-cards'),
    cards_stage1 = 0,
    cards_stage2 = 0,
    cards_stage3 = 0,
    numbers_cards_green = 0,
    numbers_cards_brown = 0,
    numbers_cards_blue = 0,
    cards_green = document.querySelectorAll('.card-green'),
    cards_brown = document.querySelectorAll('.card-brown'),
    cards_blue = document.querySelectorAll('.card-blue'),
    build_stage1 = [],
    build_stage2 = [],
    build_stage3 = [],
    createStage2 = false,
    createStage3 = false,
    number_fish = 0;

ancients_container.onclick = function(e) {
    let ancient_active = document.querySelector('.ancient-card--active');
    if (!e.target.classList.contains('ancient-card--active') && !e.target.classList.contains('ancient-container')) {
        ancient_active.classList.remove('ancient-card--active');
        e.target.classList.add('ancient-card--active');
    }
    fishRemove()
    mythDeck()
    buildDeck()
}
diff_container.onclick = function(e) {
    let diff_active = document.querySelector('.difficulty--active')
    if (!e.target.classList.contains('difficulty--active') && e.target.classList.contains('difficulty')) {
        diff_active.classList.remove('difficulty--active');
        e.target.classList.add('difficulty--active');
    }
    buildDeck()
}

function mythDeck() {
    let  ancient_name = getName();

    function getName() {
        let ancient_active = document.querySelector('.ancient-card--active');      
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

                numbers_cards_green = ancients[i].green[0] + ancients[i].green[1] + ancients[i].green[2];
                numbers_cards_brown = ancients[i].brown[0] + ancients[i].brown[1] + ancients[i].brown[2];
                numbers_cards_blue = ancients[i].blue[0] + ancients[i].blue[1] + ancients[i].blue[2];

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
    massive = mixarr(massive);
    return massive
}
//ПЕРЕМЕШИВАНИЕ
function mixarr(arr){
    return arr.map(i=>[Math.random(), i]).sort().map(i=>i[1])
}

function buildDeck() {
    build_stage1 = [],
    build_stage2 = [],
    build_stage3 = [];
    let difficulty = document.querySelector('.difficulty--active').id,
    all_cards_green,
    all_cards_brown,
    all_cards_blue;
    createStage2 = false;
    createStage3 = false;
    switch(difficulty) {
        case 'very_light':
            all_cards_green = collectCards(green_snow);
            all_cards_brown = collectCards(brown_snow);
            all_cards_blue = collectCards(blue_snow);
            if (all_cards_green.length < numbers_cards_green) {
                //need green
                let not_enough = numbers_cards_green - all_cards_green.length;
                let green_mixed = mixarr(green_defaulth);
                for (let i=0;i<=not_enough;i++) {
                    all_cards_green.push(green_mixed[i])
                }
            }
            if (all_cards_brown.length < numbers_cards_brown) {
                //need brown
                let not_enough_brown = numbers_cards_brown - all_cards_brown.length;
                let brown_mixed = mixarr(brown_defaulth);
                for (let i=0;i<=not_enough_brown;i++) {
                    all_cards_brown.push(brown_mixed[i])
                }
            }
            break;
        case 'light':
            all_cards_green = collectCards(green_snow, green_defaulth);
            all_cards_brown = collectCards(brown_snow, brown_defaulth);
            all_cards_blue = collectCards(blue_snow, blue_defaulth);
            break;
        case 'high':
            all_cards_green = collectCards(green_tentacles, green_defaulth);
            all_cards_brown = collectCards(brown_tentacles, brown_defaulth);
            all_cards_blue = collectCards(blue_tentacles, blue_defaulth);
            break;
        case 'very_high':
            all_cards_green = collectCards(green_tentacles);
            all_cards_brown = collectCards(brown_tentacles);
            all_cards_blue = collectCards(blue_tentacles);
            if (all_cards_green.length < numbers_cards_green) {
                //need green
                let not_enough = numbers_cards_green - all_cards_green.length;
                let green_mixed = mixarr(green_defaulth);
                for (let i=0;i<=not_enough;i++) {
                    all_cards_green.push(green_mixed[i])
                }
            }
            if (all_cards_brown.length < numbers_cards_brown) {
                // need brown
                let not_enough_brown = numbers_cards_brown - all_cards_brown.length;
                let brown_mixed = mixarr(brown_defaulth);
                for (let i=0;i<=not_enough_brown;i++) {
                    all_cards_brown.push(brown_mixed[i])
                }
            }
            break;
        default:
            //middle
            all_cards_green = collectCards(green_snow, green_tentacles, green_defaulth);
            all_cards_brown = collectCards(brown_snow, brown_tentacles, brown_defaulth);
            all_cards_blue = collectCards(blue_snow, blue_tentacles, blue_defaulth);
            break;
    }
    all_cards_green =  mixarr(all_cards_green);
    all_cards_brown = mixarr(all_cards_brown);
    all_cards_blue = mixarr(all_cards_blue);

    stageDeck(build_stage1, all_cards_green, cards_green[0].textContent)
    deleteCards(all_cards_green, cards_green[0].textContent)
    stageDeck(build_stage1, all_cards_brown, cards_brown[0].textContent)
    deleteCards(all_cards_brown, cards_brown[0].textContent)
    stageDeck(build_stage1, all_cards_blue, cards_blue[0].textContent)
    deleteCards(all_cards_blue, cards_blue[0].textContent)

    stageDeck(build_stage2, all_cards_green, cards_green[1].textContent)
    deleteCards(all_cards_green, cards_green[1].textContent)
    stageDeck(build_stage2, all_cards_brown, cards_brown[1].textContent)
    deleteCards(all_cards_brown, cards_brown[1].textContent)
    stageDeck(build_stage2, all_cards_blue, cards_blue[1].textContent)
    deleteCards(all_cards_blue, cards_blue[1].textContent)

    stageDeck(build_stage3, all_cards_green, cards_green[2].textContent)
    stageDeck(build_stage3, all_cards_brown, cards_brown[2].textContent)
    stageDeck(build_stage3, all_cards_blue, cards_blue[2].textContent)
}
buildDeck()

card_button.onclick = function() {
    stageActive()
}

function stageActive() {
    if (cards_green[0].textContent == 0 && cards_brown[0].textContent == 0 && cards_blue[0].textContent == 0) {
        if (!createStage2) {
            number_fish = 0;
            fishRemove()
            createFish(build_stage2.length);
            createStage2 = true;
        }
        if (cards_green[1].textContent == 0 && cards_brown[1].textContent == 0 && cards_blue[1].textContent == 0) {
            if (!createStage3) {
                number_fish = 0;
                fishRemove()
                createFish(build_stage3.length);
                createStage3 = true;
            }
            if (cards_green[2].textContent == 0 && cards_brown[2].textContent == 0 && cards_blue[2].textContent == 0) {
                if(!alert('конец')){window.location.reload();}
            } else {
                //stage3
                document.querySelector('.deck-stage').innerHTML = 'Третья стадия';
                build_stage3 = mixarr(build_stage3)
                showCard(build_stage3, 2)
                number_fish++
            }
        } else {
            //stage2
            document.querySelector('.deck-stage').innerHTML = 'Вторая стадия';
            build_stage2 = mixarr(build_stage2)
            showCard(build_stage2, 1)
            number_fish++
        }
        
    }else {
        //stage1
        build_stage1 = mixarr(build_stage1)
        showCard(build_stage1, 0)
        number_fish++
    }
}

function stageDeck(array1, array2, number) {
    if (number != 0) {
        for (let i=0;i<=number-1;i++) {
            array1.push(array2[i]);
        }
    }
}

function showCard(arr, stage) {
    switch(arr[0].substring(0,3)) {
        case 'gre':
            cards_green[stage].innerHTML = cards_green[stage].textContent - 1;
            document.querySelectorAll('.deck-cards--fish')[number_fish].style.backgroundImage = 'url(./assets/cards/green/' + arr[0] + ')'
            break;
        case 'bro':
            cards_brown[stage].innerHTML = cards_brown[stage].textContent - 1;
            document.querySelectorAll('.deck-cards--fish')[number_fish].style.backgroundImage = 'url(./assets/cards/brown/' + arr[0] + ')';
            break;
        default:
            cards_blue[stage].innerHTML = cards_blue[stage].textContent - 1;
            document.querySelectorAll('.deck-cards--fish')[number_fish].style.backgroundImage = 'url(./assets/cards/blue/' + arr[0] + ')';
            break;
    }

    arr.shift();
}

function createFish(number) {
    for (let i = 1;i<=number;i++) {
        let elem = document.createElement('div');
        elem.classList.add('deck-cards--fish');
        deck.appendChild(elem)
    }
}

function deleteCards(arr, count) {
    for(let i=0;i<=count-1;i++) {
        arr.shift()
    }
}