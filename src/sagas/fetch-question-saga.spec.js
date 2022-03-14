import { handleFetchQuestion } from './fetch-question-saga'
import fetch from 'isomorphic-fetch';

describe("Fetch qusetions saga", () => {
    beforeAll(() => {
        fetch.__setValue([{ question_id: 42 }]);
    })

    it("should fetch the questions", async () => {
        const generator = handleFetchQuestion({ question_id: 42 });
        const { value } = await generator.next();

        expect(fetch).toHaveBeenCalledWith("/api/questions/42")
        expect(value).toEqual([{ question_id: 42 }])
    })
})