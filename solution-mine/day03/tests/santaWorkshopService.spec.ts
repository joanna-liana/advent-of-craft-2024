import * as fc from 'fast-check';
import {SantaWorkshopService} from "../src/santaWorkshopService";
import {Gift} from "../src/gift";

describe('SantaWorkshopService', () => {
    let service: SantaWorkshopService;

    const validGiftArbitrariesModel = {
        giftName: fc.string(),
        weight: fc.float({ max: 5 }),
        color: fc.string(),
        material: fc.string(),
    };

    beforeEach(() => {
        service = new SantaWorkshopService();
    });

    it('should prepare a gift with valid parameters', () => {
        const giftName = 'Bitzee';
        const weight = 3;
        const color = 'Purple';
        const material = 'Plastic';

        const gift = service.prepareGift(giftName, weight, color, material);

        expect(gift).toBeInstanceOf(Gift);
    });

    it('should prepare a gift with valid weight', () => {
        fc.assert(
            fc.property(fc.record(validGiftArbitrariesModel), ({ giftName, weight, color, material }) => {
                const gift = service.prepareGift(giftName, weight, color, material);

                return gift instanceof Gift;
            })
        );
    });

    it('should throw an error if gift is too heavy', () => {
        const giftName = 'Dog-E';
        const weight = 6;
        const color = 'White';
        const material = 'Metal';

        expect(() => service.prepareGift(giftName, weight, color, material)).toThrow('Gift is too heavy for Santa\'s sleigh');
    });

    it('should throw an error for any gift that is too heavy', () => {
        const giftAttributes = fc.record({
            ...validGiftArbitrariesModel,
            weight: fc.float({ min: 5, minExcluded: true }),
        });

        fc.assert(
            fc.property(giftAttributes, ({ giftName, weight, color, material }) => {
                let error: Error | undefined;

                try {
                    service.prepareGift(giftName, weight, color, material);
                } catch (err) {
                    error = err
                }

                return error!.message === 'Gift is too heavy for Santa\'s sleigh';
            })
        );
    });

    describe("setting recommended age", () => {
        let gift: Gift;

        beforeEach(() => {
            const giftName = 'Furby';
            const weight = 1;
            const color = 'Multi';
            const material = 'Cotton';

            gift = service.prepareGift(giftName, weight, color, material);
        })

        it('should add an attribute to a gift', () => {
            gift.addAttribute('recommendedAge', '3');

            expect(gift.getRecommendedAge()).toBe(3);
        });

        it('should add numeric recommended age to the gift', () => {
            fc.assert(
                fc.property(fc.oneof(fc.integer(), fc.float()), recommendedAge => {
                    // given
                    const stringifiedAge = `${recommendedAge}`;

                    gift.addAttribute('recommendedAge', stringifiedAge);

                    // when, then
                    expect(gift.getRecommendedAge()).toBe(
                        parseInt(stringifiedAge, 10) // NOTE: this is the same as the implementation
                    );
                })
            )
        });

        it('should treat non-numeric recommended age as 0', () => {
            const nonNumericArbitrary = fc.string()
                .filter(value => {
                    const shouldIncludeValue = isNaN(parseInt(value, 10))

                    return shouldIncludeValue;
                });

            fc.assert(
                fc.property(nonNumericArbitrary, recommendedAge => {
                    // given
                    gift.addAttribute('recommendedAge', recommendedAge);

                    // when, then
                    expect(gift.getRecommendedAge()).toBe(0);
                }),
                { verbose: true }
            );
        });
    })
});
