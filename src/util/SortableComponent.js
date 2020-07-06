export default class SortableComponent {
    constructor(value, div) {
        this.value = value;
        this.div = div;
    }
    setSize(width) {
        this.div.style.height = this.value + "px";
        this.div.style.width = width;
    }
}
