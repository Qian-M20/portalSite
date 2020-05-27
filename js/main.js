window.onload = function(){

    /*************************changing navigation style on scroll************************/
    const header = document.querySelector('header');
    const headerUl = document.querySelector('.headerUl');
    const introPage = document.querySelector('#introPage');
    const exploreMore = document.querySelector('#exploreMore');
    const emailLink = Array.from(document.querySelectorAll('.emailLink'));
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

    /**************when scroll down to a section, do the following animation *******************/
    $(window).scroll(function(){
            
        var topContentPos =$(window).scrollTop()+navOffset;
        // the corresponding nav section should be active
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

        // the corresponding section should be animated on
        $(".reveal-ele").each(function(){
            var botEle =$(this).offset().top + $(this).innerHeight();
            var botWin = topContentPos+$(window).height()+75;
            if(botEle<botWin)
            {
                $(this).addClass('animated');
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

    emailLink.forEach(email => email.addEventListener('click', function(){
        // finds the position of selected link/ID
        var idPosNav = $('#contact').offset().top - navOffset;

        $("body, html").animate({scrollTop: idPosNav}, 500, "easeOutExpo");
    }));
    




    /**************** when click on learnmore button, display the wrapper ****************/

    learnMore.forEach((btn) => {
        btn.addEventListener('click', function(){
            theID= this.id;
            $(`.wrapper.${theID}`).show(); 
            $(`.proReviewContent`).addClass('active');  
            $('html').addClass('stop-scrolling')
        });
    })

    /**************** when click on exit button, close the wrapper ****************/

    exitBtn.forEach((btn) => {
        btn.addEventListener('click', function(){
            // console.log('closing button');
            $(`.wrapper.${theID}`).hide(); 
            $(`.proReviewContent`).removeClass('active');    
            $('html').removeClass('stop-scrolling');
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

    /******************************** form submit section ********************************/
    $('.contactForm').on('submit', function(e){
        e.preventDefault();
        let nameErr = '';
        let emailErr = '';
        let messageErr = '';

        let ms_name = $('#ms_name').val();
        let ms_email = $('#ms_email').val();
        let emailMessage = $('#emailMessage').val();
        const regName = /^[a-zA-Z ]+$/;
        const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        // validate the name input field
        if(ms_name === ''){
            nameErr = 'Name is required';
        }else {
            if (!regName.test(ms_name)){
                nameErr = '*Only letters and white spaces allowed';
            }
        }

        // validate the email input field
        if(ms_email === ''){
            emailErr = '*Email is required';
        }else {
            if (!regEmail.test(ms_email)){
                emailErr = '*Invalid email format';
            }
        }
        // validate the message input field
        if(emailMessage === ''){
            messageErr = '*Please leave your message';
        }

        // output the error messages
        $('#nameErr').html(nameErr);
        $('#emailErr').html(emailErr);
        $('#messageErr').html(messageErr);


        if(nameErr === '' && emailErr === '' && messageErr === ''){

            $.ajax({
                type: 'POST',
                url: "services/form.php",
                data: new FormData(this),
                dataType: "json",
                contentType: false,
                cache: false,
                processData: false,
    
                success: function (data) {
                    // reset empty value 
                    $('#ms_name').val('');
                    $('#ms_email').val('');
                    $('#emailMessage').val('');
                    $('#success').html('Message sent, thank you for contacting us!');
                }
            });
        }
    })
    
    


}