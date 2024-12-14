class TestEid {
    private _eid = "00000000";

    toString() {
        return this.eid;
    }

    private set eid(value: string) {
        this._eid  = value;

        this.calculateControlKey();
    }

    private get eid() {
        return this._eid;
    }

    private calculateControlKey() {
        const eidWithoutControlKey = this.eid.slice(0, -2);

        const controlKey = 97 - (parseInt(eidWithoutControlKey, 10) % 97);
        this._eid = eidWithoutControlKey + `${controlKey}`.padStart(2, "0")
    }

    withGenderCode(code: string) {
        this.eid = code + this.eid.slice(1)

        return this;
    }

    withBirthYear(birthYear: string) {
        this.eid = this.eid.slice(0, 1) + birthYear + this.eid.slice(3)

        return this;
    }

    withSerial(serial: string) {
        this.eid = this.eid.slice(0, 3) + serial + this.eid.slice(-2)

        return this;
    }

    withControlKey(key: string) {
        this._eid = this.eid.slice(0, -2) + key

        return this;
    }
}

// TODO: randomise valid values
const getValidEid = () => new TestEid()
    .withGenderCode("1")
    .withBirthYear("23")
    .withSerial("456")
    .toString()

describe('EID', () => {

    // EID parser
    // return metadata when correct
    // throw if falsy

    describe("gender", () => {
        it.todo("supports Sloubi")
        it.todo("supports Gagna")
        it.todo("supports Catact")

        // .each([-1, 0, 4])
        it.todo("rejects EID with invalid gender")
    });

    describe("birth year", () => {
        const currentYear = 2022;
        const currentCentury = 20;
        const previousCentury = 19;

        // .each([00..22])
        it.todo("supports birth years in the current century")

        // .each([23..99])
        it.todo("supports birth years in the previous century")

        // .each([-01, 100])
        it.todo("rejects EID with invalid birth year")
    });

    describe("serial number", () => {
        // .each([001..999])
        it.todo("supports serial number in limited birth order")

        // .each([000, 1000])
        it.todo("rejects EID with invalid serial number")
    });

    describe("control key", () => {
        it.todo("supports EID with a valid control key")

        // .each([valid - 1, valid + 1])
        it.todo("rejects EIDs with an invalid control key")
    });

    describe("invalid length", () => {
        it.todo("rejects EIDs that are too short")
        it.todo("rejects EIDs that are too long")
    })
});
