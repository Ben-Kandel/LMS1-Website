let image = document.getElementById('the-gif');

let gif1 = "https://media.giphy.com/media/ND6xkVPaj8tHO/giphy.gif";
let gif2 = "https://media.giphy.com/media/epnHmbfUFaBkk/giphy.gif";
let gif3 = "https://media.giphy.com/media/11fucLQCTOdvBS/giphy.gif";

function b1Clicked(){
    image.src = gif1;
}

function b2Clicked(){
    image.src = gif2;
}

function b3Clicked(){
    image.src = gif3;
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('hello');
    image.src = gif1;
})