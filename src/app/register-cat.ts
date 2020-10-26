/* Model class for a cat, used by the template */

export class RegisterCat {
    constructor(
        public CatName: string,
        public CatColor: string,
        public CatAge: number,
        public timePreference: string,
        public subscribe: boolean
    ){};
}
