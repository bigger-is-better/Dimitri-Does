'use strict'



function save_username(){
    var form_el =document.getElementById('username');
    localStorage.setItem('username', form_el.value);
}