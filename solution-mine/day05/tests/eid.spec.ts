class TestEid {
    private eid = "GBBSSSKK";

    toString() {
        return this.eid;
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

    withKey(key: string) {
        this.eid = this.eid.slice(0, -2) + key

        return this;
    }
}

const testEid = new TestEid()
    .withGenderCode("1")
    .withBirthYear("23")
    .withSerial("456")
    .withKey("78")
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
});
