import React from 'react';
import renderer from 'react-test-renderer'

import TagList from './TagsList'

describe("The Tag List snapshot", () => {
    it("should render as expected", () => {
        const tree = renderer
            .create(<TagList tags={[`css`, `html`, `go`]} />)
            .toJSON();

        expect(tree).toMatchSnapshot();
    })
})
