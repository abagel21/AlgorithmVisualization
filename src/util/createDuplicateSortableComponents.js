import SortableComponent from './SortableComponent';
export default function createDuplicateSortableComponents(num) {
    const sortableComponents = [];
    for (let i = 0; i < num; i++) {
        const randDouble = Math.random() * (window.innerHeight * (window.innerWidth < 500 ? .5 : .6) + 1);
        const div = document.createElement("DIV");
        div.setAttribute('data-status', randDouble.toString());
        div.setAttribute("key", i + "");
        div.classList.add('sortableElement');
        if (i > 0 && Math.floor(Math.random() * 3) + 1 === 1) {
            sortableComponents[i] = new SortableComponent(sortableComponents[i - 1].value, div);
        }
        else {
            sortableComponents[i] = new SortableComponent(randDouble, div);
        }
        sortableComponents[i].setSize((window.innerWidth - window.innerWidth * .1) / (num) - 8 + "px");
    }
    console.log(sortableComponents);
    return sortableComponents;
}
