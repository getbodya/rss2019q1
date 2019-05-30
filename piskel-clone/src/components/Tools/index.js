import Pen from './Pen';
import VerticalMirrorPen from './VerticalMirrorPen';
import Eraser from './Eraser';
import ColorSelect from './ColorSelect';
import PaintBucket from './PaintBucket';
import Stroke from './Stroke';


function runTools() {
  PaintBucket.run();
  ColorSelect.run();
  Eraser.run();
  VerticalMirrorPen.run();
  Pen.run();
  Stroke.run();
}

export default runTools;
