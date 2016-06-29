module WorldBuilder {
    export class Location implements Identifiable, Nameable, Deletable {
        guid: string = Util.createGUID();
        name: string = "New Location";
        deleted: boolean = false;
        icon: Icon;
    }
}