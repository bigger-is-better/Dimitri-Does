'use strict'

var test_array = [];

function save_username(){
    if(localStorage.getItem('username')){
        var unstringy_array = localStorage.getItem('username');
        var test_array = JSON.parse(unstringy_array);   
    }
    test_array = [];
    var form_el =document.getElementById('uname');
    test_array.push(form_el.value);
    var stringy_array = JSON.stringify(test_array);
    localStorage.setItem('username', stringy_array);
};