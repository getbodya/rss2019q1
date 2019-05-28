import Events from '../../controllers/Events';


export default class Pagination {
  constructor() {
    this.structure = {
      tag: 'div',
      className: 'pagination',
      child: [
        {
          tag: 'div',
          className: 'pagination-chip chip-first-page',
          content: '<i class="fas fa-angle-double-left"></i>',
        },
        {
          tag: 'div',
          className: 'pagination-chip chip-prev-page',
          content: '<i class="fas fa-angle-left"></i>',
        },
        {
          tag: 'div',
          className: 'pagination-chip chip-current-page',
          content: window.currentPage + 1,
        },
        {
          tag: 'div',
          className: 'pagination-chip chip-next-page',
          content: '<i class="fas fa-angle-right"></i>',
        },
      ],
    };
  }

  static createPagination(structure) {
    const createElement = param => {
      const { tag, className, content, child } = param;
      const elem = document.createElement(tag);
      elem.setAttribute('class', className);
      if (content) {
        elem.innerHTML = content;
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

  render() {
    const pagination = Pagination.createPagination(this.structure);
    document.querySelector('.app').appendChild(pagination);
    Events.nextPage();
    Events.prevPage();
    Events.firstPage();
    Events.popup();
  }

  removePagination() {
    if (document.querySelector('.pagination') !== null) {
      const pagi = document.querySelector('.pagination');
      document.querySelector('.app').removeChild(pagi);
    }
  }
}
