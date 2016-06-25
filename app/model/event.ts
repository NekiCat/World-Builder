module WorldBuilder {
    export class Event implements Identifiable, Nameable {
        guid: string = Util.createGUID();
        name: string = "New Event";
        icon: Icon;
    }
}