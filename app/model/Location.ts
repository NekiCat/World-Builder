module WorldBuilder {
    export class Location implements Identifiable, Nameable {
        guid: string = createGUID();
        name: string = "New Location";
        icon: Icon;
    }
}