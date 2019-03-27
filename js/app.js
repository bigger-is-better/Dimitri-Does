'use strict'

var test_array = [];

function save_username() {
    var form_el = document.getElementById('uname');
    test_array.push(form_el.value);
    var stringy_array = JSON.stringify(test_array);
    localStorage.setItem('username', stringy_array);
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
