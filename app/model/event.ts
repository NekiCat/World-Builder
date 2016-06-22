module WorldBuilder {
    export class Event implements Identifiable, Nameable {
        guid: string = createGUID();
        name: string = "New Event";
        icon: Icon;
    }
}