import { BasicNode } from './basicNode';

const time = new BasicNode(undefined, 'time', undefined);
const span = new BasicNode('span', undefined, 'Time:');
const timeContent = new BasicNode('span', 'time__content', '00:00');

time.append(span, timeContent);

export { time };
