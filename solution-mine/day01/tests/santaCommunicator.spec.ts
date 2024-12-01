import {MessageData, SantaCommunicator} from "../src/santaCommunicator";
import {TestLogger} from "./doubles/testLogger";

const SantaCommunicatorSpec = 'Dasher';
const NORTH_POLE = 'North Pole';
const numberOfDaysToRest = 2;
const numberOfDayBeforeChristmas = 24;

describe('SantaCommunicator', () => {
    let communicator: SantaCommunicator;
    let logger: TestLogger;

    beforeEach(() => {
        logger = new TestLogger();
        communicator = new SantaCommunicator(numberOfDaysToRest, logger);
    });

    test('composeMessage', () => {
        // given
        const messageData: MessageData = {
            reindeerName: SantaCommunicatorSpec,
            currentLocation: NORTH_POLE,
            numbersOfDaysForComingBack: 5,
            numberOfDaysBeforeChristmas: numberOfDayBeforeChristmas
        }

        // when
        const message = communicator.composeMessage(messageData);

        // then
        expect(message).toEqual('Dear Dasher, please return from North Pole in 17 day(s) to be ready and rest before Christmas.');
    });

    test('shouldDetectOverdueReindeer', () => {
        // given
        const messageData: MessageData = {
            reindeerName: SantaCommunicatorSpec,
            currentLocation: NORTH_POLE,
            numbersOfDaysForComingBack: numberOfDayBeforeChristmas,
            numberOfDaysBeforeChristmas: numberOfDayBeforeChristmas
        }

        // when
        const overdue = communicator.isOverdue(messageData);

        // then
        expect(overdue).toBeTruthy();
        expect(logger.getLog()).toEqual('Overdue for Dasher located North Pole.');
    });

    test('shouldReturnFalseWhenNoOverdue', () => {
        // given
        const messageData: MessageData = {
            reindeerName: SantaCommunicatorSpec,
            currentLocation: NORTH_POLE,
            numbersOfDaysForComingBack: numberOfDayBeforeChristmas - numberOfDaysToRest - 1,
            numberOfDaysBeforeChristmas: numberOfDayBeforeChristmas
        }

        // when
        const overdue = communicator.isOverdue(messageData);

        // then
        expect(overdue).toBeFalsy();
    });
});
