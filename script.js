function createSliderFunction(){

    let sliderImages = [
        'images/photo1.jpg',
        'images/photo2.jpg',
        'images/photo3.jpg',
        'images/photo4.png',
        'images/photo5.jpg',
        'images/photo6.jpg',
        'images/photo7.jpg',
        'images/photo8.jpg'
    ]

    let currentSlideIndex = 0;
    let currentPosition = 0;
    let translateXWidth = 650;

    let slider = document.getElementById('slider');
    // let rail = document.getElementById('rail');
    let modal = document.getElementById('slide-modal');
    
    createModalErrows();
    createAnimationButton();
    createNavigation();
    createSlides();

    function createSlide(url){
        let slide = document.createElement('div');
        slide.className = 'slide';
        slide.style.backgroundImage = 'url(' + url + ')';

        slide.addEventListener('click', function(){
            modal.classList.add('visible');
            modal.querySelector('img').src = url;
            clearInterval(nextInterval);
            nextInterval = false;
        });

        return slide;
    }

    modal.addEventListener('click', function(){
        modal.classList.remove('visible');
        if(nextInterval){
            nextInterval = setInterval(next, 2000);
        }
    })
    modal.querySelector('img').addEventListener('click', function(e){
        e.stopPropagation();
    })

    function createSlides(){
        for (let i = 0; i < sliderImages.length; i++) {
            rail.appendChild(createSlide(sliderImages[i]));
        }
    }

    function next(){
        let totalWidth = document.getElementById('rail').scrollWidth;
        let lastPosition = totalWidth - window.innerWidth;

        if(currentPosition === lastPosition){
            currentPosition = 0;
        }else{
            currentPosition = Math.min(currentPosition + translateXWidth, lastPosition);
        }
        rail.style.transform = 'translateX(-' + currentPosition + 'px)';
    }

    function prev(){
        let totalWidth = document.getElementById('rail').scrollWidth;
        let lastPosition = totalWidth - window.innerWidth;

        if(currentPosition === 0 ){
            currentPosition = lastPosition;
        }else{
            currentPosition = Math.max(currentPosition - translateXWidth, 0);
        }

        rail.style.transform = 'translateX(-' + currentPosition + 'px)';
    }

    function createNavigation(){
        let nextBtn = document.createElement('button');
        nextBtn.className = 'nextBtn';
        nextBtn.innerText = 'Next>>';
        nextBtn.addEventListener('click', next);
        slider.appendChild(nextBtn);

        let prevBtn = document.createElement('button');
        prevBtn.className = 'prevBtn';
        prevBtn.innerText = '<<Prev';
        prevBtn.addEventListener('click', prev);
        slider.appendChild(prevBtn);
    }

    let nextInterval;

    function createAnimationButton(){
        let animeBtnBox = document.createElement('button');
        animeBtnBox.className = 'animeBtnBox';
        animeBtnBox.style.textDecorationLine = 'lll'
        animeBtnBox.addEventListener('click', function(){
            clearInterval(nextInterval);
            nextInterval = setInterval(next, 2000);
        });
        animeBtnBox.addEventListener('dblclick', function(){
            clearInterval(nextInterval);
        })
        slider.appendChild(animeBtnBox);

        let animeBtnAbbr = document.createElement('abbr');
        animeBtnAbbr.setAttribute("title", "Double Click For Stop");
        animeBtnBox.appendChild(animeBtnAbbr);

        let animBtn = document.createElement('button');
        animBtn.className = 'animeBtn';
        animBtn.innerText = 'Click For Auto-Scroll';
        animeBtnAbbr.appendChild(animBtn);
    }

    function createModalErrows(){
        let modalNextBtn = document.createElement('button');
        modalNextBtn.className = 'modalNextBtn';
        modalNextBtn.innerText = '>';
        modalNextBtn.addEventListener('click', function(e){
            e.stopPropagation();

            currentSlideIndex++;
            if(currentSlideIndex > sliderImages.length - 1) currentSlideIndex = 0;
            modal.querySelector('img').src = sliderImages[currentSlideIndex];
            

        });
        modal.appendChild(modalNextBtn);

        let modalPrevBtn = document.createElement('button');
        modalPrevBtn.className = 'modalPrevBtn';
        modalPrevBtn.innerText = '<';
        modalPrevBtn.addEventListener('click', function(e){
            e.stopPropagation();

            currentSlideIndex--;
            if(currentSlideIndex < 0) currentSlideIndex = sliderImages.length - 1;
            modal.querySelector('img').src = sliderImages[currentSlideIndex];
        
        });
        modal.appendChild(modalPrevBtn);
    }
}
createSliderFunction();