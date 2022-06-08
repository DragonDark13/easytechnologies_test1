const imageNodeList = document.getElementsByClassName("header__bg-block");
const controlsNodeList = document.getElementsByClassName("slider-control-item__button");
const imageArray = Array.from(imageNodeList)
const controlsArray = Array.from(controlsNodeList)
let currentSlide = 0;


let fromHideToShow = (elem) => {
    elem.classList.remove("fadeOut");
    elem.classList.add("fadeIn");
};

let fromShowToHide = (elem) => {
    elem.classList.remove("fadeIn")
    elem.classList.add("fadeOut")
}

// controlsArray[0].addEventListener('click', function () {
//     fromShowToHide(imageArray[0])
// });

function changeSlide(moveTo) {
    if (moveTo >= imageArray.length) {moveTo = 0;}
    if (moveTo < 0) {moveTo = imageArray.length - 1;}

    // imageArray[currentSlide].classList.toggle("fadeIn");
    fromShowToHide(imageArray[currentSlide]);
    controlsArray[currentSlide].classList.toggle("slider-control-item__button_active");
    // imageArray[moveTo].classList.toggle("fadeIn");
    fromHideToShow(imageArray[moveTo]);
    controlsArray[moveTo].classList.toggle("slider-control-item__button_active");

    currentSlide = moveTo;
}

document.querySelectorAll('.slider-control-item__button').forEach((bullet, bulletIndex) => {
    bullet.addEventListener('click', () => {
        if (currentSlide !== bulletIndex) {
            changeSlide(bulletIndex);
        }
    })
})