import { BasicNode } from "../index";
import { buttonsWrapper } from "../index";
import { moves } from "../index";
import { time } from "../index";

const header = new BasicNode('header', 'top-wrapper', undefined);
const info = new BasicNode(undefined, 'game-info', undefined);

info.append(moves, time);
header.append(buttonsWrapper, info);

export { header };
