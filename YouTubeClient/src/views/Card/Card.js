export default class Card {
  constructor(data) {
    this.cards = document.querySelector('.cards');
    this.data = data;
    this.structure = {
      tag: 'div',
      className: 'card',
      child: [
        {
          tag: 'a',
          className: 'card__title',
          content: 'title',
          href: 'videoLink',
        },
        {
          tag: 'img',
          className: 'card__img',
          content: 'img',
        },
        {
          tag: 'span',
          className: 'card__author',
          content: 'author',
        },
        {
          tag: 'span',
          className: 'card__date',
          content: 'date',
        },
        {
          tag: 'span',
          className: 'card__view',
          content: 'viewCount',
        },
        {
          tag: 'p',
          className: 'card__description',
          content: 'description',
        },
      ],
    };
  }

  static createCardElement(structureCard, data) {
    const {
      tag,
      className,
      content,
      href,
    } = structureCard;
    const elem = document.createElement(tag);
    elem.setAttribute('class', className);
    if (href) {
      elem.setAttribute('href', data[href]);
      elem.innerHTML = data[content];
    } else if (content === 'img') {
      elem.setAttribute('src', data[content]);
    } else {
      elem.innerHTML = data[content];
    }
    return elem;
  }

  static createCard(structure, data) {
    const { tag, className, child } = structure;
    const card = document.createElement(tag);
    card.setAttribute('class', className);
    if (child) {
      child.forEach(item => {
        card.appendChild(Card.createCardElement(item, data));
      });
    }
    return card;
  }

  render() {
    this.data.forEach(item => {
      const card = Card.createCard(this.structure, item);
      document.querySelector('.cards').appendChild(card);
    });
  }

  removeCards() {
    this.cards.innerHTML = '';
  }
}
