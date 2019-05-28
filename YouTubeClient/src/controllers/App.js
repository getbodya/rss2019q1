import AppView from '../views/AppView';
import Events from './Events';


export default class App {
  constructor() {
    this.cardsOnPage = {
      cardsOnMaxWidth: 4,
      cardsOnMidWidth: 2,
      cardsOnMinWidth: 1,
    };
    this.widthPoint = {
      maxPoint: 951,
      minPoint: 501,
    };
  }

  static checkWidth(width, point, cards) {
    const { cardsOnMaxWidth, cardsOnMidWidth, cardsOnMinWidth } = cards;
    const { maxPoint, minPoint } = point;
    if (width >= maxPoint) {
      window.cardsOnPage = cardsOnMaxWidth;
    } else if (width >= minPoint
      && width < maxPoint) {
      window.cardsOnPage = cardsOnMidWidth;
    } else if (width < minPoint) {
      window.cardsOnPage = cardsOnMinWidth;
    }
  }

  run() {
    App.checkWidth(document.body.offsetWidth, this.widthPoint, this.cardsOnPage);
    Events.appWidthWatcher();
    const view = new AppView();
    view.renderLayout();
  }
}
