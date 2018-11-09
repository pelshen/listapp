export interface IItem {
    _id: number;

    name: string;
    description: string;
    keywords: string[];
}

export class Item {

    public _id: number;

    public name: string;
    public description: string;
    public keywords: string[] = [];

    constructor(item?: IItem) {
        if (item) {
            this._id = item._id;
            this.name = item.name;
            this.description = item.description;
            this.keywords = item.keywords;
        }
    }

    clone(): Item {
        const cloneItem = new Item();
        cloneItem._id = this._id;
        cloneItem.name = this.name;
        cloneItem.description = this.description;
        cloneItem.keywords = this.keywords.slice(0);
        return cloneItem;
    }
}
