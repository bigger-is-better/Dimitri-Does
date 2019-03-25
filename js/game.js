'use strict';

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
var random_color = Math.floor(Math.random() * 4) + 1 //pick 1 out of 4 quadrants
var color_sequnce = []; //where the color sequences will be pushed
var high_score = []; //where the high score will be pushed in to

//======================================================================================================================================
//Functions
//======================================================================================================================================

//random color on quadrants

function random_color_quadrant(){
  top_left = random_color;
  top_right = random_color;
  bottom_left = random_color;
  bottom_right = random_color;
}

//handles user's clicks

function handle_click(event){
//get ID of what was clicked
//check if ID matches color_sequence element at current index
//if it does increment current index
//if not end game
}

//push color sequence into array

function add_random_color_to_sequence(){
color_sequnce.push(Math.floor(Math.random() * 4) + 1)//push into color_sequence
};
