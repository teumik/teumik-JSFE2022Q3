import { BasicNode } from "../index";

const fieldInfo = new BasicNode(undefined, 'field-info', undefined);
const span = new BasicNode('span', undefined, 'Frame size:');
const size = new BasicNode('span', 'size', '4x4');

fieldInfo.append(span, size);

export { fieldInfo, size };
