export class Vote{
    constructor(
        private electionId: string,
        private election: string,
        private vote: string,
        private candidateId: string
    ) {}
}