module WorldBuilder {
    export class Character implements Identifiable, Nameable, Deletable {
        guid: string = Util.createGUID();
        name: string = "New Character";
        deleted: boolean = false;
        icon: Icon;
    }
}