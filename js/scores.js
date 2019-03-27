'use script';
var score_array = [];
var players_and_score;

function tableCreate() {
  //body reference
  var body = document.getElementsByTagName('body')[0];

  // create elements <table> and a <tbody>
  var tbl = document.createElement('table');
  var tblBody = document.createElement('tbody');

  var row = create_row_and_td('Player', 'Score');
  tblBody.appendChild(row);

  // cells creation
  for (var i = 0; i < score_array.length; i++) {
    row = create_row_and_td(score_array[i][0], score_array[i][1]);
    //row added to end of table body
    tblBody.appendChild(row);
  }
  // append the <tbody> inside the <table>
  tbl.appendChild(tblBody);
  // put <table> in the <body>
  body.appendChild(tbl);
  // tbl border attribute to
  tbl.setAttribute('border', '2');
}

//Scores to array for sorting purposes

function convert_scores_to_array_then_sort() {
  for (var name in players_and_score) {
    score_array.push([name, players_and_score[name]]);
  }
  
  score_array.sort(function(a,b) {
    return b[1] - a[1];
  })
  };
  
function get_players_and_score_from_ls() {
  players_and_score = JSON.parse(localStorage.getItem('players_and_score'));
  if (!players_and_score) {//if not true
    players_and_score = {}; //make an empty object
  }
}

function create_row_and_td(first, second) {
  var row = document.createElement('tr');

  var cell1 = document.createElement('td');
  var player_header= document.createTextNode(first);
  cell1.appendChild(player_header);

  cell2 = document.createElement('td');
  var score_header= document.createTextNode(second);
  cell2.appendChild(score_header);

  row.appendChild(cell1);
  row.appendChild(cell2);
  cell1.style.width = '150px';
  cell1.style.height='25px';
  cell1.align='center';

  cell2.style.width = '150px';
  cell2.style.height='25px';
  cell2.align='center';

  return row;
}

get_players_and_score_from_ls();
convert_scores_to_array_then_sort();
tableCreate();