import Pen from './Pen';
import VerticalMirrorPen from './VerticalMirrorPen';
import Eraser from './Eraser';
import ColorSelect from './ColorSelect';
import PaintBucket from './PaintBucket';
import Stroke from './Stroke';
import Reactangle from './Reactangle';
import Circle from './Circle';
import Bright from './Bright';


function runTools() {
  PaintBucket.run();
  ColorSelect.run();
  Eraser.run();
  VerticalMirrorPen.run();
  Pen.run();
  Stroke.run();
  Reactangle.run();
  Circle.run();
  Bright.run();
}

export default runTools;
