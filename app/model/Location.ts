module WorldBuilder {
    export class Location implements Identifiable, Nameable {
        guid: string = Util.createGUID();
        name: string = "New Location";
        icon: Icon;
    }
}