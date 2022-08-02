const cards = document.querySelectorAll('.card');

let hasFlipCard = false;
let firstCard, secondCard;
let lockBoard = false;
let score = 0;


//função que embaralha as cartas
(
  function Embaralhar(){
    cards.forEach((card) =>{
      let randowPosition = Math.floor(Math.random() * 12);
      card.style.order = randowPosition;// ordem do css
    })
})();


//função para virar carta
function flipCard(){
  if(lockBoard) return;//travar tabuleiro quando escolhe duas cartas
  if(this == firstCard) return//não vai acontecer nada ao duploClique

  this.classList.add('flip')

  if(hasFlipCard === false){
    hasFlipCard = true;
    firstCard = this;
    return;
  }
  secondCard = this;
  
  hasFlipCard = false;
  checkForMath();
}

//funcao se a carta for igual
function checkForMath(){
  if(firstCard.dataset.card === secondCard.dataset.card){
    disibleCards();// SE FOR IGUAL A CARTA FICA VIRADA
    score++;
    createButton();
    return;
  }

  else{
    unflipCards();//SE FOR DIFERENTE DESVIRA
  }

}

function disibleCards(){
  firstCard.removeEventListener('click', flipCard)
  secondCard.removeEventListener('click', flipCard)  

  
  resetBoard();
}

function unflipCards(){
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flip'); //desvira carta
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard(){
  [hasFlipCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null]
}

//função que verifica se o jogo acabou
function createButton()
{
     var input  = document.createElement("input");
     input.type = 'button';  
     input.value = 'Fim de Jogo!!Reiniciar?';     
     
     if(score == 6){
     input.onclick = function(){

       document.location.reload(true);
  
       };  
      
       document.body.appendChild(input);
      }

}

//adiciona evento de clique na carta
cards.forEach((card)=> {
  card.addEventListener('click', flipCard)
});


 
