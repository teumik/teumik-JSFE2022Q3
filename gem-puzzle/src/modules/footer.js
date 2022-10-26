import { BasicNode } from './basicNode';
import { fieldInfo } from './fieldInfo';

const footer = new BasicNode('footer', 'bottom-wrapper', undefined);
footer.append(fieldInfo);

export { footer };
