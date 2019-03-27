'use strict'

var test_array = [];

function save_username() {
    var form_el = document.getElementById('uname');
    test_array.push(form_el.value);
    var stringy_array = JSON.stringify(test_array);
    localStorage.setItem('username', stringy_array);
    alert (`Welcome! Click Play Game to Start.`);
};

function page_refresh() {
    if (localStorage.getItem('username')) {
        var unstringy_array = localStorage.getItem('username');
        var local_value = JSON.parse(unstringy_array);
        for (var i = 0; i < local_value.length; i++) {
            test_array.push(local_value[i]);
        }
    }
}
page_refresh();

// Code for slide down animation 
// function slideDown(){
//     var ft_el = document.getElementById('nav');
//     var pos = 0;
//     var id = setTimeout(frame, 2);
//     function frame() {
//         if(pos === 350){
//             clearTimeout(id);
//         } else {
//             pos++;
//             ft_el.style.top = pos + "px";
//         }
//     }
// };

