import { BasicNode } from "../index";

const moves = new BasicNode(undefined, 'moves', undefined);
const span = new BasicNode('span', undefined, 'Moves:');
const count = new BasicNode('span', 'moves__count', '0');

moves.append(span, count);

export { moves };
