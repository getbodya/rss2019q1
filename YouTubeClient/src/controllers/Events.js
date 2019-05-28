import AppModel from '../models/AppModel';
import Card from '../views/Card';
import Pagination from '../views/Pagination';

const Events = {
  widthPoint : {
    maxPoint: 951,
    minPoint: 501,
  },
  minDistanceToSwipe: 50,

  appWidthWatcher() {
    const { maxPoint, minPoint } = this.widthPoint;
    const { body } = document;
    body.onresize = e => {
      const bodyWidth = e.target.innerWidth;
      if (bodyWidth >= maxPoint) {
        if (window.cardsOnPage !== 4) {
          if (window.cardsOnPage === 2) {
            window.currentPage = Math.floor(window.currentPage / 2);
            window.loadPage = Math.floor(window.loadPage / 2);
          } else if (window.cardsOnPage === 1) {
            window.currentPage = Math.floor(window.currentPage / 4);
            window.loadPage = Math.floor(window.loadPage / 4);
          }
          window.cardsOnPage = 4;
        }
      } else if (bodyWidth >= minPoint
        && bodyWidth < maxPoint) {
        if (window.cardsOnPage !== 2) {
          if (window.cardsOnPage === 1) {
            window.currentPage = Math.floor(window.currentPage / 2);
            window.loadPage = Math.floor(window.loadPage / 2);
          } else if (window.cardsOnPage === 4) {
            window.currentPage = Math.floor(window.currentPage * 2);
            window.loadPage = Math.floor(window.loadPage * 2);
          }
          window.cardsOnPage = 4;
        }
        window.cardsOnPage = 2;
      } else if (bodyWidth < minPoint) {
        if (window.cardsOnPage !== 1) {
          if (window.cardsOnPage === 2) {
            window.currentPage = Math.floor(window.currentPage * 2);
            window.loadPage = Math.floor(window.loadPage * 4);
          } else if (window.cardsOnPage === 4) {
            window.currentPage = Math.floor(window.currentPage * 4);
            window.loadPage = Math.floor(window.loadPage * 4);
          }
          window.cardsOnPage = 4;
        }
        window.cardsOnPage = 1;
      }
      if (document.querySelector('.cards').firstChild) {
        const cards = document.querySelector('.cards');
        const swipeStep = document.body.offsetWidth * 0.90;
        cards.style.transform = `translateX(${-window.currentPage * swipeStep}px)`;
      }
      document.querySelector('.chip-current-page').innerHTML = window.currentPage + 1;
    };
  },

  translateRigth() {
    if (window.currentPage < window.loadPage - 1) {
      window.currentPage += 1;
      if (window.currentPage === window.loadPage - 1) {
        const appLabel = document.querySelector('.app__app-label');
        appLabel.classList.add('loading');
        const model = new AppModel();
        model.getSearchResult().then(newCards => {
          appLabel.classList.remove('loading');
          const card = new Card(newCards);
          card.render();
        });
      }
    }
    const cards = document.querySelector('.cards');
    const swipeStep = document.body.offsetWidth * 0.90;
    cards.style.transform = `translateX(${-window.currentPage * swipeStep}px)`;
    if (window.currentPage > 0) {

      const prevPageChip = document.querySelector('.chip-prev-page')
      if(prevPageChip.classList.contains('hidden-chip')){
        prevPageChip.classList.remove('hidden-chip')
      }
      prevPageChip.classList.add('show-chip')

    }
    if (window.currentPage > 1) {

      const firstPageChip = document.querySelector('.chip-first-page')
      if(firstPageChip.classList.contains('hidden-chip')){
        firstPageChip.classList.remove('hidden-chip')
      }
      firstPageChip.classList.add('show-chip')
    }
    document.querySelector('.chip-current-page').innerHTML = window.currentPage + 1;
  },

  translateLeft() {
    const cards = document.querySelector('.cards');
    const swipeStep = document.body.offsetWidth * 0.90;
    if (window.currentPage > 0) {
      window.currentPage -= 1;
      cards.style.transform = `translateX(${-window.currentPage * swipeStep}px)`;
    }
    if (window.currentPage === 1) {
      const firstPageChip = document.querySelector('.chip-first-page')
      if(firstPageChip.classList.contains('show-chip')){
        firstPageChip.classList.remove('show-chip')
      }
      firstPageChip.classList.add('hidden-chip')
    }
    if (window.currentPage === 0) {
      const prevPageChip = document.querySelector('.chip-prev-page')
      if(prevPageChip.classList.contains('show-chip')){
        prevPageChip.classList.remove('show-chip')
      }
      prevPageChip.classList.add('hidden-chip')

    }
    document.querySelector('.chip-current-page').innerHTML = window.currentPage + 1;
  },

  imposeSwipe() {
    const { body } = document;
    const cards = document.querySelector('.cards');
    let startMove;
    let isDown = false;
    body.addEventListener('mousedown', e => {
      document.querySelector('.app__search-result').style.cursor = 'grabbing';
      startMove = e.clientX;
      isDown = true;
    });
    body.addEventListener('mousemove', e => {
      e.preventDefault();
      if (!isDown) return;
      const swipeStep = document.body.offsetWidth * 0.90;
      const deltaPull = e.clientX - startMove;
      cards.style.transform = `translateX(${-window.currentPage * swipeStep + deltaPull}px)`;
      cards.style.transition = '0s';
    });
    body.addEventListener('mouseup', e => {
      isDown = false;
      document.querySelector('.app__search-result').style.cursor = 'grab';
      const swipeStep = document.body.offsetWidth * 0.90;
      cards.style.transition = '.6s';
      cards.style.transform = `translateX(${-window.currentPage * swipeStep}px)`;
      document.body.onmousemove = null;
      const deltaMove = startMove - e.clientX;
      if (deltaMove < -this.minDistanceToSwipe) {
        this.translateLeft();
      } else if (deltaMove > this.minDistanceToSwipe) {
        this.translateRigth();
      }
    });
  },

  imposeTouchSwipe() {
    const { body } = document;
    let isDown = false;
    let startMove;
    const cards = document.querySelector('.cards');
    body.addEventListener('touchstart', e => {
      isDown = true;
      startMove = e.changedTouches[0].clientX;
    });
    body.addEventListener('touchmove', e => {
      e.preventDefault();
      if (!isDown) return;
      const swipeStep = document.body.offsetWidth * 0.90;
      const deltaPull = e.changedTouches[0].clientX - startMove;
      cards.style.transform = `translateX(${-window.currentPage * swipeStep + deltaPull}px)`;
      cards.style.transition = '0s';
    });
    body.addEventListener('touchend', e => {
      isDown = false;
      const swipeStep = document.body.offsetWidth * 0.90;
      const deltaMove = startMove - e.changedTouches[0].clientX;
      cards.style.transition = '.6s';
      cards.style.transform = `translateX(${-window.currentPage * swipeStep}px)`;
      if (deltaMove < -this.minDistanceToSwipe) {
        this.translateLeft();
      } else if (deltaMove > this.minDistanceToSwipe) {
        this.translateRigth();
      }
    });
  },

  firstPage() {
    const chip = document.querySelector('.chip-first-page');
    chip.addEventListener('click', () => {
      window.currentPage = 0;
      document.querySelector('.chip-current-page').innerHTML = window.currentPage + 1;
      document.querySelector('.cards').style.transform = 'translateX(0px)';

      const prevPageChip = document.querySelector('.chip-prev-page')
      if(prevPageChip.classList.contains('show-chip')){
        prevPageChip.classList.remove('show-chip')
      }
      prevPageChip.classList.add('hidden-chip')

      const firstPageChip = document.querySelector('.chip-first-page')
      if(firstPageChip.classList.contains('show-chip')){
        firstPageChip.classList.remove('show-chip')
      }
      firstPageChip.classList.add('hidden-chip')

    });
  },

  prevPage() {
    const chip = document.querySelector('.chip-prev-page');
    chip.addEventListener('click', () => {
      this.translateLeft();
    });
  },

  nextPage() {
    const chip = document.querySelector('.chip-next-page');
    chip.addEventListener('click', () => {
      this.translateRigth();
    });
  },

  popup() {
    const chips = document.querySelectorAll('.pagination-chip');
    const popUp = document.createElement('div');
    popUp.setAttribute('class', 'pop-up');
    chips.forEach(chip=>{
      if(!chip.classList.contains('chip-current-page')){
        chip.addEventListener('mousedown', () => {
          if (chip.classList[1] === 'chip-first-page') {
            popUp.innerHTML = 1;
            chip.appendChild(popUp);
          } else if (chip.classList[1] === 'chip-prev-page') {
            popUp.innerHTML = window.currentPage;
            chip.appendChild(popUp);
          } else if (chip.classList[1] === 'chip-next-page') {
            popUp.innerHTML = window.currentPage + 2;
            chip.appendChild(popUp);
          }
        });
        chip.addEventListener('mouseup', () => {
          chip.removeChild(popUp);
        });
      }
    })
  },
  renderError(err){
    const errBox = document.createElement('div');
    errBox.setAttribute('class','error-box')
    const errTitle = document.createElement('h1');
    errTitle.innerHTML = 'Houston, we have a problem'
    const errMessage = document.createElement('p');
    errMessage.innerHTML = err;
    errBox.appendChild(errTitle);
    errBox.appendChild(errMessage);
    document.querySelector('.app').appendChild(errBox);
  },
  startSearch(elem, eventName) {
    elem.addEventListener(eventName, e => {
      const input = document.querySelector('.search-panel__input');
      const KeyboardEventEnter = 13;
      window.loadPage = 0;
      window.currentPage = 0;
      window.nextPageToken = undefined;
      const errBox = document.querySelector('.error-box')
      if(errBox){
        document.querySelector('.app').removeChild(errBox);
      }
      if (eventName === 'keydown') {
        if (e.keyCode === KeyboardEventEnter) {
          document.querySelector('.cards').style.transform = 'translateX(0px)';
          document.querySelector('.app__app-label').classList.add('loading');
          const model = new AppModel(this.state);
          model.getSearchResult(input.value)
          .then(data => {
            input.value = '';
            document.querySelector('.app__app-label').classList.remove('loading');
            const card = new Card(data);
            card.removeCards();
            card.render();
            const pagi = new Pagination();
            pagi.removePagination();
            pagi.render();
          })
          .catch(err=>{
            this.renderError(err)
          });
        }
      }
      if (eventName === 'click') {
        document.querySelector('.cards').style.transform = 'translateX(0px)';
        document.querySelector('.app__app-label').classList.add('loading');
        const model = new AppModel();
        model.getSearchResult(input.value).then(data => {
          input.value = '';
          document.querySelector('.app__app-label').classList.remove('loading');
          const card = new Card(data);
          card.removeCards();
          card.render();
          const pagi = new Pagination();
          pagi.removePagination();
          pagi.render();
        })
        .catch(err=>{
          this.renderError(err)
        });
      }
    });
  },
};

export default Events;
