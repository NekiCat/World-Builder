module WorldBuilder {
    export class Term implements Identifiable, Nameable {
        guid: string = Util.createGUID();
        name: string = "New Term";
        icon: Icon;
    }
}