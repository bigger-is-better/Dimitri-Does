'use strict';

//one color appears on 1 out of 4 quadrants
//color goes away after 1 second
//if correct user picks quadrant correctly, increment current index and push the first random color into array. If user picks incorrectly, game ends.
//store the user name and high score in local storage and append to leaderboard.

//======================================================================================================================================
//Global Variables
//======================================================================================================================================

//holds all the tile dom divs, to be used for the game
var tile_dom = [
  document.getElementById('tile1'),
  document.getElementById('tile2'),
  document.getElementById('tile3'),
  document.getElementById('tile4')
];

var tile_border = document.getElementById('tiles_blocks_container')
var start_button = document.getElementById('start-button');
var parent = document.getElementById("score");
var current_index = 0; //where the user is at; increment for every round
var score = 0; //increments after every successfull round
var user_name = '';
var color_sequence = []; //where the color sequences will be pushed
var players_and_score = {};
var user_is_clicking = false; // This determines whether the user can click tiles or not.
var tile1_sound = new sound('../sounds/simonSound1.mp3')
var tile2_sound = new sound('../sounds/simonSound2.mp3')
var tile3_sound = new sound('../sounds/simonSound3.mp3')
var tile4_sound = new sound('../sounds/simonSound4.mp3')
var fail_sound = new sound('../sounds/sad_trombone.wav')


//======================================================================================================================================
//Functions
//======================================================================================================================================

//get player name============================================================================

function get_player_name() {
  user_name = JSON.parse(localStorage.getItem('username'));
  if (!user_name) {//if not true
    user_name = 'John Doe'; //if user does not enter name
  }
  if(user_name.length > 1){
    user_name = user_name.slice(-1)[0]; //enter last user name submitted in form if multiple names were submitted
  }
  console.log(user_name);
}

//getting players and score object from local storage

function get_players_and_score_from_ls() {
  players_and_score = JSON.parse(localStorage.getItem('players_and_score'));
  if (!players_and_score) {//if not true
    players_and_score = {}; //make an empty object
  }
}

//Event Listeners; loop through quadrant ID's==================================================
function attach_event_listeners() {
  document.getElementById('start-button').addEventListener('click', start_game);

  for(var i = 0; i < tile_dom.length; i++) {
    tile_dom[i].addEventListener('click', handleClick);
  }
}

//sound constructor

function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}

//sounds for specific colors on tiles

function play_color_sound(user_input) {
  if (user_input === 'tile1'){
    tile1_sound.play();
  } else if (user_input === 'tile2'){
    tile2_sound.play();
  } else if (user_input === 'tile3'){
    tile3_sound.play();
  } else if (user_input === 'tile4'){
    tile4_sound.play();
  }
}

//Handles user's clicks========================================================================

function handleClick(event){
  if (user_is_clicking) {
    //get ID of what was clicked
    var user_input = event.target.id;
    display_color_when_click(event.target);

    //check if ID matches color_sequence element at current index
    var index_of_tile_to_be_lit = color_sequence[current_index];
    if (user_input === tile_dom[index_of_tile_to_be_lit].id) {
      play_color_sound(user_input);
      console.log('correct');
      current_index++;

      if (current_index >= color_sequence.length) {
        console.log('You got it all right! Good job');
        user_is_clicking = false;
        current_index = 0;
        score += 100;
        add_random_color_to_sequence();
        setTimeout(show_next_color_in_sequence, 1000);
        parent.textContent = `SCORE: ${score}`;
          if(score >= 500) {
            score += 150;
              if(score >= 2000){
                score += 250;
          }
        } 
      }
      console.log(`Score: ${score}`)
    }  
    //if user picks incorrectly, end game;
    else {
      console.log('Better Luck Next Time!'); 
      parent.textContent = `SCORE: ${score}`;
      parent.textContent = `SCORE: ${score} Try Again? Click Start Game!`
      end_game();
      parent.style.color = "red"
    }
  }
}

//Push color sequence into array==================================================================

function add_random_color_to_sequence() {
  var random_number = Math.floor(Math.random() * 4);
  if (random_number === 4) {
    random_number--; //rare chance, that it might be a 1
  }
  color_sequence.push(random_number)//push into color_sequence
};

// Light up a tile, then fade it back to it's original opacity; reference: stackoverflow===========

function display_color(target) {
  target.style.opacity = '1';
  // Reduce opacity on each function call
  var fade_effect = setInterval(function() {
    var opacity = parseFloat(target.style.opacity);
    if (opacity > 0.20) {
      target.style.opacity = `${opacity - 0.1}`;
    } else {
      clearInterval(fade_effect);

      // Next color in sequence
      current_index++;
      show_next_color_in_sequence();
    }
  }, 100) //milisecond number to change speed of fade
}

//light up when clicked==============================================================================

function display_color_when_click(target) {
  target.style.opacity = '1';
  // Reduce opacity on each function call
  var fade_effect = setInterval(function() {
    var opacity = parseFloat(target.style.opacity);
    if (opacity > 0.20) {
      target.style.opacity = `${opacity - 0.1}`;
    } else {
      clearInterval(fade_effect);
    }
  }, 100)
}

//Start Game=======================================================================================

function start_game() {
  start_button.disabled = true;
  parent.style.color = "green";
  parent.textContent = `SCORE: ${score}`
  add_random_color_to_sequence();
  show_next_color_in_sequence();
}

function show_next_color_in_sequence() {
  if (current_index < color_sequence.length) {
    var index_of_tile_to_be_lit = color_sequence[current_index];
    display_color(tile_dom[index_of_tile_to_be_lit]);
    play_color_sound(tile_dom[index_of_tile_to_be_lit].id);
  }

  else {
    current_index = 0;
    //entire sequence shown, allow users to click.
    user_is_clicking = true;
  }
}

//End Game==========================================================================================

function end_game() {
  user_is_clicking = false;
  start_button.disabled = false;
  color_sequence = [];
  current_index = 0;
  store_player_and_score_to_ls();
  score = 0;
  fail_sound.play();
  console.log('end_game');
}

////replace high score if current score of same user is higher

function store_player_and_score_to_ls() {
  console.log('score', score); 
  console.log('players_and_score', players_and_score[user_name]); 
  if (!players_and_score[user_name] || players_and_score[user_name] < score) { 
    players_and_score[user_name] = score
    var stringy_array = JSON.stringify(players_and_score);
    localStorage.setItem('players_and_score', stringy_array);
  }
}


attach_event_listeners();
get_player_name();
get_players_and_score_from_ls();