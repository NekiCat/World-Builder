module WorldBuilder.Util {
    export function createNameable(list: Array<Nameable>, ctr: new() => Nameable) {
        let item = new ctr();
        let num = 0;
        let name = item.name;
        while (list.filter(i => i.name.toLowerCase() == name.toLowerCase()).length > 0) {
            name = item.name + " (" + (++num) + ")";
        }

        item.name = name;
        list.push(item);
    }
    
    export function removeStart<T extends Deletable>(list: Array<T>, item: T) {
        if (list.indexOf(item) > -1) {
            item.deleted = true;
        }
    }

    export function removeEnd<T extends Deletable>(list: Array<T>) {
        let i = list.length;
        while (i--) {
            if (list[i].deleted) {
                list.splice(i, 1);
            }
        }
    }

    export function removeUndo<T extends Deletable>(list: Array<T>, item: T) {
        item.deleted = false;
    }
}