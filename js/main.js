window.onload = function(){

    /*************************changing navigation style on scroll************************/
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


    /****************** aminate the scrolling down action when click on nav menu *********************/
    // define navOffset
    var navOffset = $("header").innerHeight();

    // click on the nav menu, add the animation to go to the corresponding section 

    $("header a[href^='#']").click(function (e) {

        e.preventDefault();
        
        // finds the position of selected link/ID
        var idPosNav = $($(this).attr("href")).offset().top - navOffset;
        
        // animates to selected section position
        $("body, html").animate({scrollTop: idPosNav}, 500, "easeInOutQuad");

    });

    /**************when scroll down to a section, the corresponsding nav menu should be active *******************/
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

    // /**************when click on the nav menu, the header ul will disappear *******************/
    $('.headerUl li').click(e => {
        document.getElementById('toggle').checked = false;
    });

    /**************** when click on the button in the intropage, scroll down to the next section ****************/

    exploreMore.addEventListener('click', function(){
        $("body, html").animate({scrollTop: introHeight}, 500, "easeOutExpo");
    });

    /**************** when click on the button in the profile section, scroll down to the next section ****************/

    viewMyWork.addEventListener('click', function(){
        
        // finds the position of selected link/ID
        var idPosNav = $('#project').offset().top - navOffset;

        $("body, html").animate({scrollTop: idPosNav}, 500, "easeOutExpo");
    });

    /**************** when click on learnmore button, display the wrapper ****************/

    learnMore.forEach((btn) => {
        btn.addEventListener('click', function(){
            theID= this.id;
            $(`.wrapper.${theID}`).show(); 
            $(`.proReviewContent`).addClass('active');    
        });
    })

    /**************** when click on exit button, close the wrapper ****************/

    exitBtn.forEach((btn) => {
        btn.addEventListener('click', function(){
            // console.log('closing button');
            $(`.wrapper.${theID}`).hide(); 
            $(`.proReviewContent`).removeClass('active');       
        });
    })

    /******************************** carousel section ********************************/
    
    const holders = document.querySelectorAll('.carousel-inner');

    // for each carousel, do the following 
    holders.forEach(holder => {
        const slides = Array.from(holder.children);
        const prevBtn = holder.nextElementSibling;
        const nextBtn = prevBtn.nextElementSibling;
        const dotsNav =  holder.parentElement.previousElementSibling;
        const dots = Array.from(dotsNav.children);

        // find out the slide width
        let slideWidth;
        if(window.innerWidth>=700){
            slideWidth = 700;
        }else {
            slideWidth = `${window.innerWidth*0.9}`;
        }        
        
        // arrange the slide to one another
        const setSlidePosition = (slide,index) => {
            slide.style.left = slideWidth*index+'px';
        }
        slides.forEach(setSlidePosition);
        
        // create move slide function
        const moveToSlide = (holder, currentSlide, targetSlide)=> {
            holder.style.transform = `translateX(-${targetSlide.style.left})`;
            currentSlide.classList.remove('active');
            targetSlide.classList.add('active');
        }

        // create updateDots function
        const updateDots = (currentDot,targetDot) => {
            targetDot.classList.add('active');
            currentDot.classList.remove('active');
        }
        

        // when click on the next or prev button

        nextBtn.addEventListener('click', e =>{
            const currentSlide = holder.querySelector('li.active');
            const nextSlide = currentSlide.nextElementSibling;
            if(currentSlide.classList.contains('slide3')){
                return;
            }
            // move the slide
            moveToSlide(holder, currentSlide,nextSlide);
            const currentDot = dotsNav.querySelector('li.active');
            const targetDot = currentDot.nextElementSibling;
            updateDots(currentDot,targetDot);

        })
        // when click on the prev button
        prevBtn.addEventListener('click', e =>{
            const currentSlide = holder.querySelector('li.active');
            const prevSlide = currentSlide.previousElementSibling;
            if(currentSlide.classList.contains('slide1')){
                return;
            }
            // move the slide
            moveToSlide(holder, currentSlide,prevSlide);

            const currentDot = dotsNav.querySelector('li.active');
            const targetDot = currentDot.previousElementSibling;
            updateDots(currentDot,targetDot);

        })
        // when click on the dots
        dotsNav.addEventListener('click', e => {
            const targetDot = e.target.closest('li');
            if(!targetDot) return;
            const currentSlide = holder.querySelector('li.active');
            const currentDot = dotsNav.querySelector('li.active');
            const targetIndex = dots.findIndex(dot => dot === targetDot);
            console.log(targetIndex);
            const targetSlide = slides[targetIndex];
            // move the slide
            moveToSlide(holder, currentSlide,targetSlide);
            updateDots(currentDot,targetDot);
            
        })
    })
    


}