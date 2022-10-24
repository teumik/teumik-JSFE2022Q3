import { BasicNode, settings } from "../index";

const fieldInfo = new BasicNode(undefined, 'field-info', undefined);
const span = new BasicNode('span', undefined, 'Frame size:');
const size = new BasicNode('span', 'size', `${settings.field}x${settings.field}`);

fieldInfo.append(span, size);

export { fieldInfo, size };
