import SortableComponent from './SortableComponent';
export default function createSortableComponents(num : number) : SortableComponent[] {
    const sortableComponents : SortableComponent[] = []
    for(let i = 0; i < num; i++) {
        const randDouble = Math.random()*(window.innerHeight*(window.innerWidth < 500 ? .5 : .7) + 1)
        const div : HTMLDivElement = document.createElement("DIV")! as HTMLDivElement;
        div.setAttribute('data-status', randDouble.toString());
        div.setAttribute("key", i + "");
        div.classList.add('sortableElement');
        sortableComponents[i] = new SortableComponent(randDouble, div);
        sortableComponents[i].setSize((window.innerWidth - window.innerWidth * .1)/(num) - 8 + "px");
    }
    return sortableComponents;
}