export class Candidate{
    constructor(
        private name: string,
        private bio: string,
        private image: string
    ) {}

    public setImage(image: string){
        this.image = image;
    }
}