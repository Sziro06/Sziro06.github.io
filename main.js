let countDown = document.getElementById('countdown');
let wholePage = document.getElementById('whole_page');

// wholePage.style.display =  'none';


countDown.width = window.innerWidth;

countDown.addEventListener("ended", function() {

    countDown.style.display = 'none';
    wholePage.style.display =  'block';

})