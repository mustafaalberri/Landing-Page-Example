/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
const sections = document.querySelectorAll('section'); // list of sections
const navBar = document.getElementById('navbar__list'); // navigation bar <ul> element
const fragment = document.createDocumentFragment(); // a document fragment to modify before adding to the document
let timeOut; // variable that stores the return value of setTimeOut method in the 'hideNavBar' function
/**                                                 
 * End Global Variables
 * Start Helper Functions
 * 
*/
// Fuction used to build and configure the Navigation bar elements, by creating individual 
// anchor elements for each section, then add them to a document fragment. 
function buildNavBar(){                 
    for(const section of sections){

        const listItemEl = document.createElement('li');
        const anchorEl = document.createElement('a');

        anchorEl.textContent = section.getAttribute('data-nav');
        anchorEl.classList.add('menu__link');

        listItemEl.appendChild(anchorEl);
        fragment.appendChild(listItemEl);
    }
}

// Function used in event listener to update section classes according of the active elements.
// The function also updates the corresponding links classes in the navigation bar.
function makeActive(){
    for(const section of sections){
        let navBarEl;
        for(const navBarItem of navBar.children){
            if(navBarItem.firstElementChild.textContent === section.getAttribute('data-nav')){
                navBarEl = navBarItem.firstElementChild;
            }
        }
        const sectionTopPos = section.getBoundingClientRect().top;
        if(sectionTopPos > -200 && sectionTopPos < window.innerHeight-400 && !section.classList.contains('collapsed')){
            section.classList.add('active__section');
            navBarEl.classList.add('active__link');
        }else{
            section.classList.remove('active__section');
            navBarEl.classList.remove('active__link');
        }
    }
}

// Function used in event listener that applies smooth scrolling
// to the section element corresponding to the anchor element clicked.
function smoothScrollTo(evt){             
    evt.preventDefault();               
    if(evt.target.nodeName === 'A'){
        document.querySelector('[data-nav='+CSS.escape(evt.target.textContent)+']').scrollIntoView({
            behavior: "smooth", block: "start"
        })
    }
}

// Function that controls the visibility of the navigation bar.
// If the user stopped scrolling for 5 seconds, it disappears,
// unless the mouse is hovering over it.
function hideNavBar(evt){
    if(evt.type === "mouseover"){
        clearTimeout(timeOut);
        navBar.classList.remove('inActive');
    }else if(evt.type === "mouseout"){
        timeOut = setTimeout(() => {              
            navBar.classList.add('inActive');
        }, 5000);
    }else{
        clearTimeout(timeOut);
        navBar.classList.remove('inActive');
        timeOut = setTimeout(() => {              
        navBar.classList.add('inActive');
    }, 5000);
    }
}

// Function for hiding top button when below the fold of the page
function hideTopBtn(){      
    const topBtn = document.getElementById('topBtn');
    if (document.documentElement.scrollTop > 30 || document.body.scrollTop > 30){
        topBtn.style.display = 'block';
    }else{
        topBtn.style.display = 'none';
    }
}

// Function for button element 'Scroll to top'
function scrollToTop(){      
    window.scrollTo({top: 0, behavior: "smooth"});
}

// Function to collapse the sections when the heading is clicked, for body event listener
function collapseSec(evt){      
    if(evt.target.nodeName === 'H2'){
        const p1 = evt.target.nextElementSibling;
        const p2 = evt.target.nextElementSibling.nextElementSibling;
        const section = evt.target.parentElement.parentElement;
        if(p1.classList.contains('collapsed')){
            section.classList.remove('collapsed');
            setTimeout(()=>{
                p1.classList.remove('nonExist');
                p2.classList.remove('nonExist');
                p1.classList.remove('collapsed');
                p2.classList.remove('collapsed');
                section.classList.add('active__section');
            }, 1000)
        }else{
            section.classList.remove('active__section');
            p1.classList.add('collapsed');
            p2.classList.add('collapsed');
            setTimeout(()=>{
                p1.classList.add('nonExist');
                p2.classList.add('nonExist');
                section.classList.add('collapsed');
            }, 500)
        } 
    }
}

// Function to ensure the navigation bar items have the highlight effect on touch devices
function touchHighlight(evt){
    if(evt.type == "touchstart"){
        evt.target.classList.add('touch__highlight');
    }else{
        setTimeout(() => {
            evt.target.classList.remove('touch__highlight');
        }, 1200);
    }
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav  // Build menu 
buildNavBar();
navBar.appendChild(fragment);

// Add class 'active' to section when near top of viewport // Set sections as active
window.addEventListener('scroll', (evt) => {
    makeActive();
    hideNavBar(evt);
    hideTopBtn();
});

// Scroll to section on link click event
navBar.addEventListener('click', smoothScrollTo);

// To ensure the navigation bar is visible when hovering over it
navBar.parentElement.addEventListener('mouseover', hideNavBar);
navBar.parentElement.addEventListener('mouseout', hideNavBar);

// Collapse section when the heading is pressed
document.body.addEventListener('click', collapseSec);

// In case touch support is detected, add event listeners for touch events to enable 
// highlight effect for navigation bar items
if(navigator.maxTouchPoints > 0 || window.matchMedia("(pointer: coarse)").matches){
    navBar.addEventListener("touchstart", touchHighlight);
    navBar.addEventListener('touchend', touchHighlight);
}


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to section on link click

// Set sections as active


