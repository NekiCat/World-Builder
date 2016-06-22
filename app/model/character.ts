module WorldBuilder {
    export class Character implements Identifiable, Nameable {
        guid: string = GUID.create();
        name: string = "New Character";
        icon: Icon;
    }
}