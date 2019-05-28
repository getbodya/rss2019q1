import Events from '../../controllers/Events';


export default class AppView {
  constructor() {
    this.structure = {
      tag: 'div',
      className: 'app',
      child: [{
        tag: 'div',
        className: 'app__search-panel',
        child: [
          {
            tag: 'input',
            className: 'search-panel__input',
            placeholder: 'SEARCH',
          },
          {
            tag: 'button',
            className: 'search-panel__btn',
            content: '<i class="fas fa-search"></i>',
          },
        ],
      },
      {
        tag: 'h1',
        className: 'app__app-label',
        content: 'YOUTUBE CLIENT',
      },
      {
        tag: 'div',
        className: 'app__search-result',
        child: [
          {
            tag: 'div',
            className: 'cards',
          },
        ],
      },

      ],
    };
  }

  static createLayout(structure) {
    const createElement = param => {
      const { tag, className, content, placeholder, child } = param;
      const elem = document.createElement(tag);
      elem.setAttribute('class', className);
      if (content) {
        elem.innerHTML = content;
      }
      if (placeholder) {
        elem.setAttribute('placeholder', placeholder);
      }
      if (child) {
        child.forEach(item => {
          elem.appendChild(createElement(item));
        });
      }
      return elem;
    };
    return createElement(structure);
  }

  renderLayout() {
    const appLayout = AppView.createLayout(this.structure);
    document.body.appendChild(appLayout);
    Events.startSearch(document.querySelector('.search-panel__input'), 'keydown');
    Events.startSearch(document.querySelector('.search-panel__btn'), 'click');
    Events.imposeSwipe();
    Events.imposeTouchSwipe();
  }
}
