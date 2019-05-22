import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import {connect} from 'react-redux';
import EventList from '../EventList/EventList';
import {createEvent, deleteEvent, updateEvent} from '../eventActions'
import LoadingComponent from '../../../app/layout/LoadingComponent';
import EventActivity from '../EventActivity/EventActivity';

const mapState = (state) => ({
  events: state.events,
  loading: state.async.loading
})

const actions = {
  createEvent, 
  deleteEvent,
  updateEvent
}

class EventDashboard extends Component {
  state = {
    contextRef: {}
  }

  handleDeleteEvent = id => {
    this.props.deleteEvent(id);
  };

  handleSetContextRef = (contextRef) => this.setState({contextRef})

  render() {
    const {events, loading} = this.props;
    if (loading) return <LoadingComponent />
    return (
      <Grid>
        <Grid.Column width={10}>
          <div ref={this.handleSetContextRef}>
          <EventList
            events={events}
            deleteEvent={this.handleDeleteEvent}
          />
          </div>

        </Grid.Column>
        <Grid.Column width={6}>
          <EventActivity contextRef={this.state.contextRef} />
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(mapState, actions)(EventDashboard);
