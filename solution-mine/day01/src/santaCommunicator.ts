import {Logger} from "./logger";

export class SantaCommunicator {
    private readonly numberOfDaysToRest: number;

    constructor(numberOfDaysToRest: number, private readonly logger: Logger) {
        this.numberOfDaysToRest = numberOfDaysToRest;
    }

    public composeMessage(reindeerName: string, currentLocation: string, numbersOfDaysForComingBack: number, numberOfDaysBeforeChristmas: number): string {
        const daysBeforeReturn = this.daysBeforeReturn(numbersOfDaysForComingBack, numberOfDaysBeforeChristmas);
        return `Dear ${reindeerName}, please return from ${currentLocation} in ${daysBeforeReturn} day(s) to be ready and rest before Christmas.`;
    }

    public isOverdue(reindeerName: string, currentLocation: string, numbersOfDaysForComingBack: number, numberOfDaysBeforeChristmas: number): boolean {
        if (this.daysBeforeReturn(numbersOfDaysForComingBack, numberOfDaysBeforeChristmas) <= 0) {
            this.logger.log(`Overdue for ${reindeerName} located ${currentLocation}.`);
            return true;
        }
        return false;
    }

    private daysBeforeReturn(numbersOfDaysForComingBack: number, numberOfDaysBeforeChristmas: number): number {
        return numberOfDaysBeforeChristmas - numbersOfDaysForComingBack - this.numberOfDaysToRest;
    }
}