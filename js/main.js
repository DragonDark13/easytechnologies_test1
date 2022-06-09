const imageNodeList = document.getElementsByClassName("header__bg-block");
const controlsNodeList = document.getElementsByClassName("slider-control-item__button");
const imageArray = Array.from(imageNodeList)
const controlsArray = Array.from(controlsNodeList)
let currentSlide = 0;
const timeOut = 5000;


let fromHideToShow = (elem) => {
    elem.classList.remove("fadeOut");
    elem.classList.add("fadeIn");
};

let fromShowToHide = (elem) => {
    elem.classList.remove("fadeIn")
    elem.classList.add("fadeOut")
}

function changeSlide(moveTo) {
    if (moveTo >= imageArray.length) {
        moveTo = 0;
    }
    if (moveTo < 0) {
        moveTo = imageArray.length - 1;
    }
    fromShowToHide(imageArray[currentSlide]);
    controlsArray[currentSlide].classList.toggle("slider-control-item__button_active");
    fromHideToShow(imageArray[moveTo]);
    controlsArray[moveTo].classList.toggle("slider-control-item__button_active");
    currentSlide = moveTo;
}

document.querySelectorAll('.slider-control-item__button').forEach((bullet, bulletIndex) => {
    bullet.addEventListener('click', () => {
        if (currentSlide !== bulletIndex) {
            changeSlide(bulletIndex,currentSlide);
        }
    })
})


let nextElem = (index) => {

    if (index === 0) {
        changeSlide(index)


        setTimeout(() => {
            nextElem(index + 1)
        }, timeOut)

    } else {

        changeSlide(index)

        if (index < imageArray.length - 1) {
            setTimeout(() => {
                nextElem(index + 1);

            }, timeOut)
        } else {
            setTimeout(() => {
                // to first number
                changeSlide(imageArray.length - 1);
                nextElem(0)

            }, timeOut)
        }
    }
}

nextElem(currentSlide)

class ItcAccordion {
  constructor(target, config) {
    this._el = typeof target === 'string' ? document.querySelector(target) : target;
    const defaultConfig = {
      alwaysOpen: true
    };
    this._config = Object.assign(defaultConfig, config);
    this.addEventListener();
  }
  addEventListener() {
    this._el.addEventListener('click', (e) => {
      const elHeader = e.target.closest('.job-offers-list-item__toggle-elem');
      if (!elHeader) {
        return;
      }
      if (!this._config.alwaysOpen) {
        const elOpenItem = this._el.querySelector('.job-offers-list-item_show-more');
        if (elOpenItem) {
          elOpenItem !== elHeader.closest('.job-offers-list-item') ? elOpenItem.classList.toggle('job-offers-list-item_show-more') : null;
        }
      }
      elHeader.closest('.job-offers-list-item').classList.toggle('job-offers-list-item_show-more');
    });
  }
}

new ItcAccordion(document.querySelector('.job-offers-list'), {
  alwaysOpen: false
});
