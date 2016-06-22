module WorldBuilder {
    export class Character implements Identifiable, Nameable {
        guid: string = createGUID();
        name: string = "New Character";
        icon: Icon;
    }
}