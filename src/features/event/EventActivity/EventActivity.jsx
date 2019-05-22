import React from 'react'
import { Header, Segment, Sticky } from 'semantic-ui-react';

const EventActivity = ({contextRef}) => {
  return (
    <Sticky context={contextRef} offset={100}>
        <Header attached='top' content='Recent Activity' />
        <Segment attached>
            <p>Recent activity</p>
        </Segment>
    </Sticky>
  )
}

export default EventActivity
