module WorldBuilder {
    export class Icon {
        mime: string;
        data: string;
    }

    export class Project implements Identifiable, Nameable {
        guid: string = GUID.create();
        name: string = "New Project";
        icon: Icon;
    }
}