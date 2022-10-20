import { BasicNode } from "../index";

const time = new BasicNode(undefined, 'time', undefined);
const span = new BasicNode('span', undefined, 'Time:');
const minutes = new BasicNode('span', 'time__minutes', '10');
const colon = new BasicNode('span', 'time__colon', ':');
const seconds = new BasicNode('span', 'time__seconds', '56');

time.append(span, minutes, colon, seconds);

export { time };
