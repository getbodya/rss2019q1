export default class AppModel {
  constructor() {
    this.gKey = 'AIzaSyBAw16oVHPCI33-zwVfhySzWVPk3YXO2Vg';
    this.maxResult = 15;
  }

  static extractData(data) {
    const arr = [];
    data.forEach(item => {
      arr.push({
        videoLink: `https://www.youtube.com/watch?v=${item.id}`,
        title: item.snippet.title,
        author: item.snippet.channelTitle,
        date: item.snippet.publishedAt.slice(0, 10),
        viewCount: item.statistics.viewCount,
        description: item.snippet.description.slice(0, 100),
        img: item.snippet.thumbnails.medium.url,
      });
    });
    return arr;
  }

  async getSearchResult(q) {
    if (!window.q) {
      window.q = q;
    }
    let searchUrl = `https://www.googleapis.com/youtube/v3/search?type=video&part=snippet&maxResults=${this.maxResult}&key=${this.gKey}&q=${q}`;
    if (window.nextPageToken) {
      searchUrl = `https://www.googleapis.com/youtube/v3/search?type=video&pageToken=${window.nextPageToken}&part=snippet&maxResults=${this.maxResult}&key=${this.gKey}&q=${window.q}`;
    }
    const searchResponse = await fetch(searchUrl)
    const searchData = await searchResponse.json();
    window.nextPageToken = searchData.nextPageToken;
    const arrIds = [];
    for (let i = 0; i < searchData.items.length; i += 1) {
      if (searchData.items[i].id.videoId) {
        arrIds.push(searchData.items[i].id.videoId);
      }
    }
    const videoResponse = await fetch(`https://www.googleapis.com/youtube/v3/videos?key=${this.gKey}&id=${arrIds.join(',')}&part=snippet,statistics`);
    const videoData = await videoResponse.json();
    const clearData = AppModel.extractData(videoData.items);
    window.loadPage += Math.floor(clearData.length / window.cardsOnPage);
    return clearData;
  }
}
