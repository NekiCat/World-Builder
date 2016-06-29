module WorldBuilder {
    export class Event implements Identifiable, Nameable, Deletable {
        guid: string = Util.createGUID();
        name: string = "New Event";
        deleted: boolean = false;
        icon: Icon;
    }
}