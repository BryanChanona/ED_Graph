
export default class Node {
    constructor(data) {
        this.value = data; // data debería ser un objeto con la propiedad node y opcionalmente weight
        this.next = null;
    }
}
