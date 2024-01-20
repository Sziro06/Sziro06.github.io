let countDown = document.getElementById('countdown');
let wholePage = document.getElementById('whole_page');
let body = document.querySelector('body')

wholePage.style.display =  'none';


countDown.width = window.innerWidth;

countDown.addEventListener("ended", function() {

    countDown.style.display = 'none';
    wholePage.style.display =  'block';
    wholePage.style.backgroundColor = 'rgb(135, 206, 235)';
    body.style.backgroundColor = 'rgb(135, 206, 235)';

})