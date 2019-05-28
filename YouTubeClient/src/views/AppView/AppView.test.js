import AppView from './AppView';

const structure = {
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
describe('AppView.createLayout', () => {
  it('should return HTML element', () => {
    const res = AppView.createLayout(structure);
    expect(res).toBeInstanceOf(HTMLElement);
  });
});
describe('AppView.prototype.renderLayout', () => {
  it('should be renderLayout correctly', () => {
    const state = {
      structure,
    };
    AppView.prototype.renderLayout.call(state);
    expect(document.body.innerHTML).toMatchSnapshot();
  });
});
