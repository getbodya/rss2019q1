import './modules/services/state';
import './modules/canvas/figure';
import './modules/colorPanel/colors';
import './modules/toolsPanel/paint-bucket';
import './modules/toolsPanel/transform';
import './modules/toolsPanel/choose-color';
import './modules/toolsPanel/move';
import { loadColors, loadCanvas } from './modules/services/tools';
import './modules/services/hot-keys';
import Frames from './modules/frames/Frames';
import Preview from './modules/preview/Preview';

loadCanvas();
loadColors();
Frames.run();
Preview.run();
