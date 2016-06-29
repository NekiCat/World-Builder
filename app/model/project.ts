module WorldBuilder {
    export class Icon {
        mime: string;
        data: string;
    }

    export class Project implements Identifiable, Nameable, Deletable {
        guid: string = Util.createGUID();
        name: string = "New Project";
        deleted: boolean = false;
        icon: Icon;
        characters: Character[] = [];
        locations: Location[] = [];
        events: Event[] = [];
        terms: Term[] = [];
    }
}