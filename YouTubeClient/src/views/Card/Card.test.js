import Card from './Card';


const structure = {
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
describe('Card.createCardElement', () => {
  it('should return HTML element', () => {
    const data = [
      {
        author: 'Author1',
        date: '11-11-1111',
        description: 'description1',
        img: 'url1',
        title: 'title1',
        videoLink: 'https://www.youtube.com/watch?v=1',
        viewCount: '123123',
      },
      {
        author: 'Author2',
        date: '22-22-2222',
        description: 'description2',
        img: 'url2',
        title: 'title2',
        videoLink: 'https://www.youtube.com/watch?v=2',
        viewCount: '123123',
      },
      {
        author: 'Author3',
        date: '33-33-3333',
        description: 'description3',
        img: 'url3',
        title: 'title3',
        videoLink: 'https://www.youtube.com/watch?v=3',
        viewCount: '123123',
      },
    ];
    const res = Card.createCardElement(structure, data);
    expect(res).toBeInstanceOf(HTMLElement);
  });
});
