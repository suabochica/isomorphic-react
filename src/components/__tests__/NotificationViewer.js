
import React from 'react';
import renderer from 'react-test-renderer';
import delay from 'redux-saga';

import NotificationViewer from '../NotificationViewer';

jest.mock('../../services/NotificationService');
const notificationService = require('../../services/NotificationService').default

describe("The Notificaiton Viewer Component", () => {
    beforeAll(() => {
        notificationService.__setCount(42)
    });

    it("should display the number of notifications", async () => {
        const tree = renderer.create(<NotificationViewer />)

        await delay();

        const instance = tree.root;
        const component = instance.findByProps({ className: `notifications` });
        const text = component.children[0];

        expect(text).toEqual("42 Notifications Awaiting!");
    });
});
