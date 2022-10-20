import { BasicNode } from "../index";
import { fieldInfo } from "../index";
import { settingsWrapper } from "../index";

const footer = new BasicNode('footer', 'bottom-wrapper', undefined);
footer.append(fieldInfo, settingsWrapper);

export { footer };
