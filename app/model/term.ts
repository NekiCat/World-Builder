module WorldBuilder {
    export class Term implements Identifiable, Nameable, Deletable {
        guid: string = Util.createGUID();
        name: string = "New Term";
        deleted: boolean = false;
        icon: Icon;
    }
}