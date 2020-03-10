window.onload = function(){

$("body, html").animate({scrollTop: 0}, 300, "easeInSine");
// changing navigation style on scroll
const header = document.querySelector('header');
const headerUl = document.querySelector('.headerUl');
const introPage = document.querySelector('#introPage');
const exploreMore = document.querySelector('#exploreMore');
const learnMore = Array.from(document.querySelectorAll('.learnMore'));
const exitBtn = Array.from(document.querySelectorAll('.exitBtn'));

const viewMyWork = document.querySelector('#viewMyWork');

const introHeight = $("#introPage").innerHeight() - $(header).innerHeight();
let theID;

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
        theID= this.id;
        $(`.wrapper.${theID}`).show(); 
        $(`.proReviewContent`).addClass('active');       
    });
})

// create the clicking function on carousel indicators  

$('.carousel-indicators').on("click",function(){

    $holder = $( ".carousel-item.active" );
    $holder.next( "div" ).addClass("active");  
    if($holder.hasClass('slider3'))
    {
        $holder.removeClass("active");
        $(".carousel-item.slider1").addClass("active");
    }
    $holder.removeClass("active");

});

// when click on the exit button, close the wrapper 

exitBtn.forEach((btn) => {
    btn.addEventListener('click', function(){
        // console.log('closing button');
        $(`.wrapper.${theID}`).hide(); 
        $(`.proReviewContent`).removeClass('active');       
    });
})


}