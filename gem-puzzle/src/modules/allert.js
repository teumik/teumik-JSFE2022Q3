import { BasicNode } from "../index";

const allert = new BasicNode(undefined, 'allert', undefined);
const winAllert = new BasicNode(undefined, 'allert__text', 'Solved');
const restart = new BasicNode(undefined, 'restart', 'Restart');

allert.append(winAllert, restart);

export { allert }
