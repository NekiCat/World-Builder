module WorldBuilder.Util {
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
        if (item.deleted) {
            item.deleted = false;
        }
    }
}