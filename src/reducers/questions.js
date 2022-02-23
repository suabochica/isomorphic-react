import unionWith from "lodash/unionWith";

export const questions = ([], { type, questions }) => {
    const questionEquality = (a = {}, b = {}) => {
        return a.question_id === b.question_id;
    };

    if (type === 'FETCHED_QUESTIONS') {
        state = unionWith(state, questions, questionEquality)
    }

    return state;
}