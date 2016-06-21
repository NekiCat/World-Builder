module WorldBuilder {
    export class Icon {
        mime: string;
        data: string;
    }

    export class Project {
        icon: Icon;

        constructor(public name: string) {

        }
    }
}