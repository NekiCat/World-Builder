module WorldBuilder {
    export class Term implements Identifiable, Nameable {
        guid: string = createGUID();
        name: string = "New Term";
        icon: Icon;
    }
}