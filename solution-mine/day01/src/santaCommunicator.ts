import {Logger} from "./logger";

type DaysLeft = {
    numbersOfDaysForComingBack: number;
    numberOfDaysBeforeChristmas: number;
}

export type ReindeerStatusData = DaysLeft & {
    reindeerName: string;
    currentLocation: string;
};

export class SantaCommunicator {
    private readonly numberOfDaysToRest: number;

    constructor(numberOfDaysToRest: number, private readonly logger: Logger) {
        this.numberOfDaysToRest = numberOfDaysToRest;
    }

    public composeMessage({ currentLocation, numberOfDaysBeforeChristmas, numbersOfDaysForComingBack, reindeerName }: ReindeerStatusData): string {
        const daysBeforeReturn = this.daysBeforeReturn({ numbersOfDaysForComingBack, numberOfDaysBeforeChristmas });
        return `Dear ${reindeerName}, please return from ${currentLocation} in ${daysBeforeReturn} day(s) to be ready and rest before Christmas.`;
    }

    public isOverdue({ currentLocation, numberOfDaysBeforeChristmas, numbersOfDaysForComingBack, reindeerName }: ReindeerStatusData): boolean {
        if (this.daysBeforeReturn({ numbersOfDaysForComingBack, numberOfDaysBeforeChristmas }) <= 0) {
            this.logger.log(`Overdue for ${reindeerName} located ${currentLocation}.`);
            return true;
        }
        return false;
    }

    private daysBeforeReturn({ numbersOfDaysForComingBack, numberOfDaysBeforeChristmas }: DaysLeft): number {
        return numberOfDaysBeforeChristmas - numbersOfDaysForComingBack - this.numberOfDaysToRest;
    }
}
