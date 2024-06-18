export default class Node{
    value;
    constructor(location, next = null){
        this.value=location;
        this.next=next;
    }
}
