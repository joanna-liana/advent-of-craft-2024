export class Gift {
    private attributes: Map<string, string> = new Map<string, string>();

    constructor(
        private readonly name: string,
        private readonly weight: number,
        private readonly color: string,
        private readonly material: string,
    ) {
    }

    public assignToChild(childName: string): void {
    }

    public addAttribute(key: string, value: string): void {
        this.attributes.set(key, value);
    }

    public getRecommendedAge(): number {
        const recommendedAge = this.attributes.get('recommendedAge');
        const parsedAge = parseInt(recommendedAge, 10);

        return isNaN(parsedAge) ? 0 : parsedAge;
    }

    public toString(): string {
        return `A ${this.color}-colored ${this.name} weighing ${this.weight} kg made in ${this.material}`;
    }
}
