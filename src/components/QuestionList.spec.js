
describe(`The Question List Component`, () => {
    beforeEach(() => {
        console.log("Before each!")
    });

    beforeAll(() => {
        console.log("Before all!")
    });

    afterEach(() => {
        console.log("After each!")
    });

    afterAll(() => {
        console.log("After all!")
    });

    it.only(`should display a list of questions`, () => {
        expect(40 + 2).toEqual(42);
    });

    it(`should display a list of questions`, () => {
        expect(40 + 2).toEqual(43);
    });
});