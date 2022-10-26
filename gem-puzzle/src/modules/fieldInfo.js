import { BasicNode } from './basicNode';

const fieldInfo = new BasicNode(undefined, 'field-info', undefined);
const span = new BasicNode('span', undefined, 'Frame size:');
const size = new BasicNode('span', 'size', undefined);

fieldInfo.append(span, size);

export { fieldInfo, size };
