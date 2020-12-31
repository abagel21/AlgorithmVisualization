export default class HexMap {
    constructor(width, height) {
        /** array of the hex map contents where -1=wall, 0=empty, 1=visited, 100 = target */
        this.contents = [];
        this.width = width;
        this.height = height;
        for (let i = 0; i < height; i++) {
            let temparr = Array.apply(0, Array(width)).map(function () { return 0; });
            this.contents.push(temparr);
        }
        if (height % 2 != 0) {
            this.odd = true;
        }
        else {
            this.odd = false;
        }
    }
    addWall(c, r) {
        let height = this.convertToHeight(c, r);
        this.contents[c][height] = -1;
    }
    visit(c, r) {
        let height = this.convertToHeight(c, r);
        this.contents[c][height] = 1;
    }
    hexInfo(c, height) {
        if (c < 0 || height < 0)
            return -2;
        // check the edges if the top level is irregular then check if the hex is out of bounds or a rock for odd cols
        if (this.odd && c % 2 != 0 && (c >= this.contents.length || height >= this.contents[0].length - 1)) {
            return -2;
        }
        // if the top level is not irregular or if the top level is irregular but we are looking at even column
        else if (c >= this.contents.length || height >= this.contents[0].length) {
            return -2;
        }
        else {
            return this.contents[c][height];
        }
    }
    convertToHeight(c, r) {
        if (c % 2 != 0) {
            return r - (c + 1) / 2;
        }
        else {
            return r - c / 2;
        }
    }
}
let a = new HexMap(5, 5);
