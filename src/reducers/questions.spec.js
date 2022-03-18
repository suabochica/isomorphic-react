import { questions } from './questions';

describe("The Question Reducer", () => {
    it("should not modify state for unrecognized action", () => {
        const state = ["foo", "bar"];
        const stateClone = ["foo", "bar"];
        const newState = questions(state, { type: "UNRECOGNIZED_QUESTION" });

        expect(newState).toEqual(stateClone);
        expect(newState).toBe(state);

    });

    it("should add a new quesitons", () => {
        const state = [{ question_id: "foo" }, { question_id: "bar" }];
        const newQuestion = { question_id: "baz" };
        const newQuestionClone = { question_id: "baz" };
        const newState = questions(state, { type: 'FETCHED_QUESTION', question: newQuestion })

        expect(newState).toContain(newQuestion);
        expect(state).not.toContain(newQuestion);
        expect(newState).toHaveLength(3);
    });
});
