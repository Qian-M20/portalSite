window.onload = function(){


$(document).ready(function(){
    $('.slider').slick({
        dots:true,
        infinite:true,
        fade:true,
        cssEase:'linear',
        autoplay:true,
        autoplaySpeed:5000,
        arrows:false,
    });
});

$("body, html").animate({scrollTop: 0}, 300, "easeInSine");
// changing navigation style on scroll
const header = document.querySelector('header');
const headerUl = document.querySelector('.headerUl');
const introPage = document.querySelector('#introPage');
const exploreMore = document.querySelector('#exploreMore');
const wrapper = document.querySelector('.wrapper');
const learnMore = Array.from(document.querySelectorAll('.learnMore'));

const exitBtn = document.querySelector('.exitBtn');

const viewMyWork = document.querySelector('#viewMyWork');
const introHeight = $("#introPage").innerHeight() - $(header).innerHeight();

const introPageOptions = {
    rootMargin:"-150px 0px 0px 0px"
};

const observer = new IntersectionObserver(function(entries, observer){
    entries.forEach(entry => {
        if(!entry.isIntersecting) {
            header.classList.add("dropDown");
            headerUl.classList.add("dropDown");
            // header.classList.remove("slidUp");
        }else {
            // header.classList.add("slidUp");
            header.classList.remove("dropDown");
            headerUl.classList.remove("dropDown");
        }
    })
}, introPageOptions);

observer.observe(introPage);


// aminate the scrolling down action when click on nav menu
// define navOffset
var navOffset = $("header").innerHeight();

// click on the nav menu, add the animation to go to the corresponding section 

$("header a[href^='#']").click(function (e) {

    e.preventDefault();
    
    // finds the position of selected link/ID
    var idPosNav = $($(this).attr("href")).offset().top - navOffset;
    
    // animates to selected section position
    $("body, html").animate({scrollTop: idPosNav}, 800, "easeInOutQuad");

});

// when scroll down to a section, the corresponsding nav menu should be active 
$(window).scroll(function(){
        
    var topContentPos =$(window).scrollTop()+navOffset;
    
    $("section").each(function(){
        var secTopPos = $(this).offset().top-30;
        var secBotPos = secTopPos + $(this).innerHeight()-30;
        var secID= $(this).attr("id");
        
        if(topContentPos >= secTopPos && topContentPos <= secBotPos) 
        {
            $("header li a[href='#"+ secID+ "']").addClass("active");
            // console.log(secID);
        }
        else 
        {
            $("header li a[href='#"+ secID+ "']").removeClass("active"); 
            // console.log('class removed');
        }
    });
});

// when click on the button in the intropage, scroll down to the next section

exploreMore.addEventListener('click', function(){
    $("body, html").animate({scrollTop: introHeight}, 500, "easeOutExpo");
});


viewMyWork.addEventListener('click', function(){
    
    // finds the position of selected link/ID
    var idPosNav = $('#project').offset().top - navOffset;

    $("body, html").animate({scrollTop: idPosNav}, 500, "easeOutExpo");
});

// when click on the learn more button, display the wrapper 

learnMore.forEach((btn) => {
    btn.addEventListener('click', function(){
        wrapper.style.display= 'block';    
    });
})

// when click on the exit button, close the wrapper 

exitBtn.addEventListener('click', function(){
    wrapper.style.display= 'none';    
});


}