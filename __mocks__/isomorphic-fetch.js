let __value = 42;
const isomorphicFetch = jest.fn(() => __value)

isomorphicFetch.__setValue = value => __value = value;

export default isomorphicFetch;
