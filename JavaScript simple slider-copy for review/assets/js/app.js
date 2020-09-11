
    /*  */
    const items = [
        {
            path: './assets/images/1.jpg',
            name: 'cake item'
        },
        {
            path: './assets/images/2.png',
            name: 'cake item 2'
        },
        {
            path: './assets/images/3.jpg',
            name: 'cake item 3'
        }
    ];


    let setAttributes = (element, attributes) => {
        for(let attribute in attributes){
            element.setAttribute(attribute, attributes[attribute]);
        }
    }

    let createSlider = (data) => {
        let sliderWrap = document.querySelector('.sliderWrapper');
        
        let slider = document.createElement('div');
        setAttributes(slider, {class: 'slides'});

        let prevButton = document.createElement('button');
        prevButton.innerHTML = '&#10094;';
        setAttributes(prevButton, {class: 'prevSlide slider-arrow', onclick: "slidesMove(-1)"});

        let nextButton = document.createElement('button');
        nextButton.innerHTML = '&#10095;';
        setAttributes(nextButton, {class: 'nextSlide slider-arrow', onclick: "slidesMove(1)"});
        

        data.forEach(element => {
            let wrap = document.createElement('div');
            setAttributes(wrap, {class: 'slide fade'});

            let img = document.createElement('img');
            setAttributes(img, {src: element.path, alt: element.name});
            
            wrap.appendChild(img);
            slider.appendChild(wrap);

        });

        sliderWrap.appendChild(slider);
        sliderWrap.appendChild(prevButton);
        sliderWrap.appendChild(nextButton);
    }

    let slideIndex = 1;
    let showSlides = (num) => {
        let slides = document.getElementsByClassName("slide");
        if (num > slides.length) {slideIndex = 1}    
        if (num < 1) {slideIndex = slides.length}
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";  
        }
        slides[slideIndex-1].style.display = "block";  
    }
    let slidesMove = (num) => {
        showSlides(slideIndex += num);
    }
    createSlider(items);
    showSlides(slideIndex);
