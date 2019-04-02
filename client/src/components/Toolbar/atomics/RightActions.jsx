import React from 'react';

import { Tooltip } from 'antd';

import { StyledToolbar } from '../styled';

export default
class RightActions extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <Tooltip placement="top" title="Setting microphone, camera, speaker">
          <StyledToolbar.ActionItem>
            <StyledToolbar.ActionIcon type="setting" />
            <StyledToolbar.ActionLabel>Settings</StyledToolbar.ActionLabel>
          </StyledToolbar.ActionItem>
        </Tooltip>

        <Tooltip placement="top" title="Need some help?">
          <StyledToolbar.ActionItem>
            <StyledToolbar.ActionIcon type="question-circle" />
            <StyledToolbar.ActionLabel>Help</StyledToolbar.ActionLabel>
          </StyledToolbar.ActionItem>
        </Tooltip>
      </React.Fragment>
    );
  }
}