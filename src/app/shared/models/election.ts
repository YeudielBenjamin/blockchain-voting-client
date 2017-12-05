export class Election{
    constructor(
        private title: string,
        private description: string,
        private options: string[],
        private image: string,
        private candidates: string[]
    ) {}

    public setImage(image: string){
        this.image = image;
    }
}