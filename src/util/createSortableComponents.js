import SortableComponent from './SortableComponent';
export default function createSortableComponents(num) {
    const sortableComponents = [];
    for (let i = 0; i < num; i++) {
        const randDouble = Math.random() * (window.innerHeight * .65 + 1);
        const div = document.createElement("DIV");
        div.setAttribute('data-status', randDouble.toString());
        div.setAttribute("key", i + "");
        div.classList.add('sortableElement');
        sortableComponents[i] = new SortableComponent(randDouble, div);
        sortableComponents[i].setSize((window.innerWidth - window.innerWidth * .1) / (num) - 8 + "px");
    }
    return sortableComponents;
}
