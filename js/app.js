'use strict'



function save_username(){
    var form_el =document.getElementById('uname');
    localStorage.setItem('username', form_el.value);
}
