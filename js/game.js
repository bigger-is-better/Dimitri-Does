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

var tile_border = document.getElementById('tile-blocks-container')
var start_button = document.getElementById('start-button');
var parent = document.getElementById("score");
var correct_clicks_from_user = 0; //where the user is at; increment for every round
var score = 0; //increments after every successfull round
var user_name = '';
var color_sequence = []; //where the color sequences will be pushed
var players_and_score = {};
var user_clicking = false; // This determines whether the user can click tiles or not.
var tile1_sound = new sound('../sounds/simonSound1.mp3')
var tile2_sound = new sound('../sounds/simonSound2.mp3')
var tile3_sound = new sound('../sounds/simonSound3.mp3')
var tile4_sound = new sound('../sounds/simonSound4.mp3')
var fail_sound = new sound('../sounds/sad_trombone.wav')
fail_sound.volume = 0.2;
var level = -1; //basic mode
var level_classes = [
  'shake', //0 hard
  'spin', //1 harder
  'grow', //2 hardest
];

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
  document.getElementById('easier').addEventListener('click', change_level);
  document.getElementById('harder').addEventListener('click', change_level);

  for(var i = 0; i < tile_dom.length; i++) {
    tile_dom[i].addEventListener('click', handleClick);
  }
}

//sound constructor; 

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
    this.sound.load();
  }
}

//sounds for specific colors on tiles

function play_color_sound(user_response) {
  if (user_response === 'tile1'){
    tile1_sound.play();
  } else if (user_response === 'tile2'){
    tile2_sound.play();
  } else if (user_response === 'tile3'){
    tile3_sound.play();
  } else if (user_response === 'tile4'){
    tile4_sound.play();
  }
}

//Handles user's clicks========================================================================

function handleClick(event){
  if (user_clicking) {
    //we need to know what was clicked
    
    var user_response = event.target.id;
    display_color_when_click(event.target);

    //check if the user correctly clicked colors; increment correct clicks from user 
    
    var tile_to_be_lit = color_sequence[correct_clicks_from_user];
    if (user_response === tile_dom[tile_to_be_lit].id) {
      play_color_sound(user_response); //play sound on which color was picked by user
      console.log('correct');
      correct_clicks_from_user++;
      
      //give user score if correct clicks matched color sequence; increment color sequence by one
      //call random color function then push to color_sequence
      
      if (correct_clicks_from_user >= color_sequence.length) {
        console.log('You got it all right! Good job');
        user_clicking = false;
        correct_clicks_from_user = 0;
        score += 100;
        random_color_to_sequence();
        setTimeout(show_next_color_sequence, 1000); //1 second timer between color change sequence
        parent.textContent = `PLAYER: ${user_name} SCORE: ${score}`;
      }
      console.log(`Score: ${score}`)
    }  
    //user picks wrong color; call function to stop game; gives total score then reset score and user clicks to 0;
    else {
      console.log('Better Luck Next Time!'); 
      parent.textContent = `Nice try ${user_name}! SCORE: ${score} Try Again? Start Game!`
      parent.style.color = "red"
      end_game();
    }
  }
}

//Push color sequence into array==============================================================

function random_color_to_sequence() {
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
      correct_clicks_from_user++;
      show_next_color_sequence();
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
  parent.textContent = `Player: ${user_name}`
  parent.textContent = `${user_name} SCORE: ${score}`
  random_color_to_sequence();
  show_next_color_sequence();
  fail_sound.stop();
}

//show next color in sequence if user picks correctly; user clicks back to 0 if the user picks incorrectly

function show_next_color_sequence() {
  if (correct_clicks_from_user < color_sequence.length) {
    var tile_to_be_lit = color_sequence[correct_clicks_from_user];
    display_color(tile_dom[tile_to_be_lit]);
    play_color_sound(tile_dom[tile_to_be_lit].id);
  }

  else {
    correct_clicks_from_user = 0; 
    //entire sequence shown, allow users to click.
    user_clicking = true;
  }
}

//End Game==========================================================================================

function end_game() {
  user_clicking = false;
  start_button.disabled = false;
  color_sequence = [];
  correct_clicks_from_user = 0;
  store_player_and_score_to_ls();
  score = 0;
  fail_sound.play();
  fail_sound.volume = 0.2;
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

//harder levels; go up or down a level; change classes with DOM

function change_level(event) {
  if (event.target.id === 'easier') {
    level--;
    tile_border.className = level_classes[level];
  }
  else if (event.target.id === 'harder') {
    level++;
    tile_border.className = level_classes[level];
  }
  if (level < 0) {
    document.getElementById('easier').disabled = true;
  } else if (level >= level_classes.length - 1) {
    document.getElementById('harder').disabled = true;
  } else {
    document.getElementById('easier').disabled = false;
    document.getElementById('harder').disabled = false;
  }
}

attach_event_listeners();
get_player_name();
get_players_and_score_from_ls();