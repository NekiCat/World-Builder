module WorldBuilder {
    export class Icon {
        mime: string;
        data: string;
    }

    export class Project implements Identifiable, Nameable {
        guid: string = Util.createGUID();
        name: string = "New Project";
        icon: Icon;
        characters: Character[] = [];
        locations: Location[] = [];
        events: Event[] = [];
        terms: Term[] = [];
    }
}