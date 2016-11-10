import React from 'react';
import TestUtils from 'react-addons-test-utils';
import MessageItem from './messageItem';

describe('MessageItem component', () => {
  it('should render default text', () => {
    const messageItem = TestUtils.renderIntoDocument(<MessageItem/>);
    const h2 = TestUtils.findRenderedDOMComponentWithTag(messageItem, 'h2');
    expect(h2.textContent).toEqual('My brand new component!');
  });
});
