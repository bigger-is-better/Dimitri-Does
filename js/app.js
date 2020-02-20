'use strict'

var user_name = [];

function save_username() {
    var form_el = document.getElementById('uname');
    if(!form_el) {
        user_name.push('John Doe')
    }
    user_name.push(form_el.value);
    var stringy_array = JSON.stringify(user_name);
    localStorage.setItem('username', stringy_array);
    location.href = "./html/game.html";
};

function page_refresh() {
    if (localStorage.getItem('username')) {
        var unstringy_array = localStorage.getItem('username');
        var local_value = JSON.parse(unstringy_array);
        for (var i = 0; i < local_value.length; i++) {
            user_name.push(local_value[i]);
        }
    }
}

page_refresh();



