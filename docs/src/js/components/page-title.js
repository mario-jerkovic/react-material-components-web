/* @flow */
import React from 'react';

import {Typography, Title} from '@react-mdc/typography';

/**
 * Page Title
 */
export default class PageTitle extends React.Component {
  props: {
    children?: Array<React.Element<*>> | React.Element<*>
  }
  render (): React.Element<*> {
    let {
      children,
      ...props
    } = this.props;
    return (
      <Typography {...props}>
        <Title>
          {children}
        </Title>
      </Typography>
    );
  }
}