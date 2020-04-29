/* Whoever reaches 100 first wins the game.*/

var scores, roundScore , activePlayer , gamePlaying , diceBefore , winningScore;
init();

document.querySelector('.btn-roll').addEventListener('click',function(){

  //function here is anonymous
  //1.Random Number
  if(gamePlaying){
    var dice1 = Math.floor(Math.random() *6)+1;
    var dice2 = Math.floor(Math.random() *6)+1;
    document.getElementById('dice-1').style.display = 'block';
    document.getElementById('dice-2').style.display = 'block';

    //2.display result
    document.getElementById('dice-1').src = 'Images/dice-'+dice1+'.png';
    document.getElementById('dice-2').src = 'Images/dice-'+dice2+'.png';

  //3.Update round score if rolled no. is not 1
      if(dice1 !== 1 && dice2 !== 1){
        //add score
        roundScore += dice1 + dice2;
        document.getElementById('current-'+ activePlayer).textContent = roundScore;
      
      } else {
        nextPlayer();
      }    
  }
  
});

document.querySelector('.btn-hold').addEventListener('click', function(){
  //add current score to global score
  if(gamePlaying){
    scores[activePlayer]+=roundScore;

    //update UI
    document.getElementById('score-'+activePlayer).textContent  = scores[activePlayer];
    
    var input = document.querySelector('.final-score').value;
    
    //undefined, 0 , null ,"" are coerced to false
    // anything else is coerced to true 
    if(input){
        winningScore = input;
    } else {
        winningScore = 100;
    }
    //check if any player have won the game
    if(scores[activePlayer] >= winningScore){
      document.getElementById('name-'+activePlayer).textContent='WINNER!';
      document.querySelector('#dice-1').style.display='none';
      document.querySelector('#dice-2').style.display='none';
      document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner'); 
      document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
      gamePlaying = false;
  
    } else {
      //Next Player
      nextPlayer();
    }
  }
   

});


function nextPlayer(){

  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;
  //when control is switched to next player the current scores that means the round scores gets 0 for both, when the dice rolled, the current changes to value equals to round score;
  document.getElementById('current-0').textContent= 0;
  document.getElementById('current-1').textContent = 0;

  //toggle adds 'active' if it is not there or removes if 'active' is there
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
  
  document.querySelector('#dice-1').style.display = 'none';
  document.querySelector('#dice-2').style.display = 'none';
 
}

//No parenthesis needed inside (eventListener) if function declaration is somewhere else
document.querySelector('.btn-new').addEventListener('click',init);

function init(){
  gamePlaying=true;
  scores = [0,0];
  activePlayer = 0;
  roundScore = 0;
  document.querySelector('.final-score').value='';
  document.querySelector('#dice-1').style.display = 'none';
  document.querySelector('#dice-2').style.display = 'none';

  //getElementById is faster than querySelector
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent='Player 1';
  document.getElementById('name-1').textContent='Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner'); 
  document.querySelector('.player-1-panel').classList.remove('winner'); 
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
}


/*
current-0 for player 1 and current-1 for player 2 , basically the activePlayer variable is being used.
put html code inside quotes while using innerhtml method.
Textcontent method only puts the text there not the html one

*/
