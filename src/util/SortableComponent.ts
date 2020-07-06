export default class SortableComponent {
    value: number;
    div: HTMLDivElement;
    constructor(value : number, div : HTMLDivElement) {
        this.value = value;
        this.div = div;
    }
    setSize(width: string) {
        this.div.style.height = this.value + "px";
        this.div.style.width = width;
    }
}