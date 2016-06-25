module WorldBuilder {
    export class Character implements Identifiable, Nameable {
        guid: string = Util.createGUID();
        name: string = "New Character";
        icon: Icon;
    }
}