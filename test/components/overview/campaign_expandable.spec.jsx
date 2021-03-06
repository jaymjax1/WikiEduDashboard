import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducer from '../../../app/assets/javascripts/reducers';
import '../../testHelper';
import CampaignEditable from '../../../app/assets/javascripts/components/overview/campaign_editable.jsx';

describe('CampaignEditable', () => {
  const campaigns = ['Cool campaign'];
  const course = {
    string_prefix: 'course_generic',
    id: 1,
  };
  const allCampaigns = ['Cool campaign', 'Not cool campaign'];
  const initialState = { campaigns: { campaigns } };
  const reduxStoreWithCampaigns = createStore(reducer, initialState, compose(applyMiddleware(thunk)));

  it('it opens the component when editable is true', () => {
    const TestButton = ReactTestUtils.renderIntoDocument(
      <CampaignEditable
        store={reduxStoreWithCampaigns}
        campaigns={campaigns}
        allCampaigns={allCampaigns}
        course={course}
        editable={true}
      />
    );
    ReactTestUtils.findRenderedDOMComponentWithClass(TestButton, 'pop__container campaigns open');
  });

  it('it includes a plus button when is closed to open the expandable', () => {
    const TestButton = ReactTestUtils.renderIntoDocument(
      <CampaignEditable
        store={reduxStoreWithCampaigns}
        campaigns={campaigns}
        allCampaigns={allCampaigns}
        course={course}
        editable={false}
      />
    );
    ReactTestUtils.findRenderedDOMComponentWithClass(TestButton, 'button border plus open');
  });
});
