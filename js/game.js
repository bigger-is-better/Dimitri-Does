'use strict';

//one color appears on 1 out of 4 quadrants
//color goes away after 1 second
//user picks a quadrant; if correct, increment current index and push the first random color into array. If user picks incorrectly, game ends.

//======================================================================================================================================
//Global Variables
//======================================================================================================================================

var top_left = document.getElementById('tile1'); //DOM for id's from 4 quadrants
var top_right = document.getElementById('tile2');
var bottom_left = document.getElementById('tile3');
var bottom_right = document.getElementById('tile4');
var user_input = ''; //what the user clicks on
var current_index = 0; //where the user is at; increment for every round
var score = 0; //increments after every successfull round
var random_color = Math.floor(Math.random() * 4)//pick 1 out of 4 quadrants
var color_sequnce = []; //where the color sequences will be pushed
var high_score = []; //where the high score will be pushed in to

var game = {
  count: 0,
  possibilities: [top_left, top_right, bottom_left, bottom_right],
  player: [],

}

//======================================================================================================================================
//Functions
//======================================================================================================================================
top_left.addEventListener('click', test);
top_right.addEventListener('click', test);
bottom_left.addEventListener('click', test);
bottom_right.addEventListener('click', test);

//handles user's clicks

function test(event){
//get ID of what was clicked

//check if ID matches color_sequence element at current index

//if it does increment current index

//if not end game
};

//push color sequence into array

function add_random_color_to_sequence(){
game.push(possibilities[random_color])//push into color_sequence
};