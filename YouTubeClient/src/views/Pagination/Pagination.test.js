import Pagination from './Pagination';


describe('Pagination.createPagination', () => {
  it('should return HTML element', () => {
    const structure = {
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
          content: '1',
        },
        {
          tag: 'div',
          className: 'pagination-chip chip-next-page',
          content: '<i class="fas fa-angle-right"></i>',
        },
      ],
    };
    const res = Pagination.createPagination(structure);
    // AppView.prototype.renderLayout(structure);
    // expect(document.body.innerHTML).toMatchSnapshot();
    expect(res).toBeInstanceOf(HTMLElement);
  });
});
