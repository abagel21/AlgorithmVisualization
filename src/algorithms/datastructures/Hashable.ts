export default interface Hashable {
    hash():number;
    equals(val:Hashable):boolean;
}