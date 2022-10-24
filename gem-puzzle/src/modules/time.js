import { BasicNode } from "../index";

const time = new BasicNode(undefined, 'time', undefined);
const span = new BasicNode('span', undefined, 'Time:');
// const minutes = new BasicNode('span', 'time__minutes', '00');
// const colon = new BasicNode('span', 'time__colon', ':');
// const seconds = new BasicNode('span', 'time__seconds', '00');
const timeContent = new BasicNode('span', 'time__content', '00:00');

// time.append(span, minutes, colon, seconds);
time.append(span, timeContent);

export { time };
