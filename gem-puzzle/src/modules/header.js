import { BasicNode } from './basicNode';
import { buttonsWrapper } from './buttons';
import { moves } from './moves';
import { time } from './time';
import { menu } from './menu';
import { overlay } from './overlay';

const header = new BasicNode('header', 'top-wrapper', undefined);
const info = new BasicNode(undefined, 'game-info', undefined);

info.append(moves, time);
header.append(buttonsWrapper, menu, overlay, info);

export { header };
