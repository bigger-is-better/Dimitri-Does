'use script';
var scores;
var player;

function tableCreate() {
  //body reference
  var body = document.getElementsByTagName('body')[0];

  // create elements <table> and a <tbody>
  var tbl = document.createElement('table');
  var tblBody = document.createElement('tbody');

  // cells creation
  for (var j = 0; j < 10; j++) {
    // table row creation
    var row = document.createElement('tr');
    for (var i = 0; i < 2; i++) {
      // create element <td> and text node
      //Make text node the contents of <td> element
      // put <td> at end of the table row
      var cell = document.createElement('td');
      //var cell1= cell[0];
      if (j===0)
      {
        if (i===0)
        {
          var cell1text= document.createTextNode('Player');
          cell.appendChild(cell1text);
        }
        else if (i===1)
        {
          var cell2text= document.createTextNode('Score');
          cell.appendChild(cell2text);

        }

      }


      row.appendChild(cell);
      cell.style.width = '150px';
      cell.style.height='25px';
      cell.align='center';
    }

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
tableCreate();





















