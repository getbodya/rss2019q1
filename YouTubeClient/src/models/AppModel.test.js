import AppModel from './AppModel';

describe('AppModel.extractData', () => {
  it('should be an instance of function', () => {
    expect(AppModel.extractData).toBeInstanceOf(Function);
  });
  it('should return array', () => {
    const data = [
      {
        id: '1',
        snippet: {
          title: 'title1',
          channelTitle: 'Author1',
          publishedAt: '11-11-1111-1111111',
          description: 'description1',
          thumbnails: {
            medium: {
              url: 'url1',
            },
          },
        },
        statistics: {
          viewCount: '123123',
        },
      },
      {
        id: '2',
        snippet: {
          title: 'title2',
          channelTitle: 'Author2',
          publishedAt: '22-22-2222-2222222',
          description: 'description2',
          thumbnails: {
            medium: {
              url: 'url2',
            },
          },
        },
        statistics: {
          viewCount: '123123',
        },
      },
      {
        id: '3',
        snippet: {
          title: 'title3',
          channelTitle: 'Author3',
          publishedAt: '33-33-3333-333333',
          description: 'description3',
          thumbnails: {
            medium: {
              url: 'url3',
            },
          },
        },
        statistics: {
          viewCount: '123123',
        },
      },
    ];
    const result = AppModel.extractData(data);
    expect(result).toEqual([
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
    ]);
  });
});
describe('AppModel.prototype.getSearchResult', () => {
  it('should be an instance of function', () => {
    expect(AppModel.prototype.getSearchResult).toBeInstanceOf(Function);
  });
  it('shold return Array', () => {
    AppModel.prototype.getSearchResult('w').then(data => {
      expect(data).toBeInstanceOf(Array);
    });
  });
});
