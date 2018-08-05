import React from 'react';
import { FormattedMessage } from 'react-intl';
import { shallow } from 'enzyme';

import Loading from '../index';
import messages from '../messages';

describe('<Loading />', () => {
  it('should render', () => {
    const renderedComponent = shallow(<Loading />);
    expect(
      renderedComponent.contains(<FormattedMessage {...messages.loading} />),
    ).toEqual(true);
  });
});
