/* =========================
   MOBILE MENU
========================= */

const menuButton = document.getElementById("menuButton");
const navMenu = document.getElementById("navMenu");

menuButton.addEventListener("click", function () {

    navMenu.classList.toggle("active");

});


/* CLOSE MOBILE MENU */

const navLinks = document.querySelectorAll(".nav-link, .nav-talk");

navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        navMenu.classList.remove("active");

    });

});


/* =========================
   TYPING EFFECT
========================= */

const typingText = document.getElementById("typingText");

const typingWords = [
    "Informatics Student",
    "Web Developer",
    "Mobile Developer",
    "UI/UX Enthusiast",
    "Database Learner"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;


function typingEffect() {

    const currentWord = typingWords[wordIndex];

    if (!deleting) {

        typingText.textContent =
            currentWord.substring(0, charIndex + 1);

        charIndex++;

        if (charIndex === currentWord.length) {

            deleting = true;

            setTimeout(typingEffect, 1500);

            return;
        }

    } else {

        typingText.textContent =
            currentWord.substring(0, charIndex - 1);

        charIndex--;

        if (charIndex === 0) {

            deleting = false;

            wordIndex++;

            if (wordIndex >= typingWords.length) {
                wordIndex = 0;
            }

        }

    }

    const speed = deleting ? 45 : 85;

    setTimeout(typingEffect, speed);
}


typingEffect();


/* =========================
   PROJECT SLIDER
========================= */

const sliderData = {

    skincare: 0,

    taskmaster: 0,

    topsis: 0,

    sig: 0,

    database: 0,

    uiux: 0

};


/* CHANGE SLIDE */

function changeSlide(project, direction) {

    const slider =
        document.querySelector("." + project + "-slides");

    if (!slider) {
        return;
    }

    const images =
        slider.querySelectorAll("img");

    const dots =
        document.querySelectorAll(
            "." + project + "-dots .dot"
        );

    let current =
        sliderData[project];


    images[current].classList.remove("active");

    if (dots[current]) {
        dots[current].classList.remove("active");
    }


    current += direction;


    if (current >= images.length) {
        current = 0;
    }


    if (current < 0) {
        current = images.length - 1;
    }


    images[current].classList.add("active");

    if (dots[current]) {
        dots[current].classList.add("active");
    }


    sliderData[project] = current;


    updateCounter(
        project,
        current,
        images.length
    );

}


/* GO TO SPECIFIC SLIDE */

function goToSlide(project, index) {

    const slider =
        document.querySelector("." + project + "-slides");

    if (!slider) {
        return;
    }

    const images =
        slider.querySelectorAll("img");

    const dots =
        document.querySelectorAll(
            "." + project + "-dots .dot"
        );

    const current =
        sliderData[project];


    images[current].classList.remove("active");

    if (dots[current]) {
        dots[current].classList.remove("active");
    }


    images[index].classList.add("active");

    if (dots[index]) {
        dots[index].classList.add("active");
    }


    sliderData[project] = index;


    updateCounter(
        project,
        index,
        images.length
    );

}


/* UPDATE PHOTO COUNTER */

function updateCounter(
    project,
    index,
    total
) {

    const counter =
        document.getElementById(
            project + "Counter"
        );

    if (counter) {

        counter.textContent =
            (index + 1) + " / " + total;

    }

}


/* =========================
   SCROLL REVEAL
========================= */

const revealElements =
    document.querySelectorAll(
        ".skill-card, .project-item, .education-card, .contact-link"
    );


const revealObserver =
    new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                }

            });

        },
        {
            threshold: 0.1
        }
    );


revealElements.forEach(function (element) {

    element.classList.add("reveal");

    revealObserver.observe(element);

});


/* =========================
   REVEAL STYLE
========================= */

const revealStyle =
    document.createElement("style");

revealStyle.textContent = `

.reveal {
    opacity: 0;
    transform: translateY(25px);
    transition:
        opacity 0.7s ease,
        transform 0.7s ease;
}

.reveal.show {
    opacity: 1;
    transform: translateY(0);
}

`;

document.head.appendChild(revealStyle);


/* =========================
   KEYBOARD SLIDER
========================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "ArrowRight") {

            changeSlide("skincare", 1);

        }

        if (event.key === "ArrowLeft") {

            changeSlide("skincare", -1);

        }

    }
);