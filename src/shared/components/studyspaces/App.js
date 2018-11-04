import React, { Component } from 'react';
import { connect } from 'react-redux';

import SpaceCard from './SpaceCard';
import {
  Map,
  Row,
  Col,
  Line,
  Subtext,
} from '../shared';
import { WHITE } from '../../styles/colors';
import { NAV_HEIGHT } from '../../styles/sizes';
import ErrorMessage from '../shared/ErrorMessage';
import { getAllSpacesData } from '../../actions/spaces_actions';

// TODO ghost loaders

class App extends Component {
  componentDidMount() {
    const { getAllSpacesDataDispatch } = this.props;
    getAllSpacesDataDispatch();
  }

  render() {
    const { spacesData, error, pending } = this.props;

    if (pending || !spacesData || !Object.keys(spacesData).length) return null;

    return (
      <Row maxHeight={`calc(100vh - ${NAV_HEIGHT})`}>
        <Col
          padding="0 1rem .5rem 1rem"
          background={WHITE}
          overflowY="scroll"
          width="40%"
        >
          <ErrorMessage message={error} />

          {Object.keys(spacesData).map((spaceId) => {
            const space = spacesData[spaceId];
            return (
              <div key={spaceId}>
                <SpaceCard
                  {...space}
                />
                <Line />
              </div>
            );
          })}

          <Subtext paddingTop="0.5rem" marginBottom="0">
            Made with &hearts; by&nbsp;
            <a href="https://pennlabs.org" target="_BLANK" rel="noopener noreferrer">
              Penn Labs.
            </a>
          </Subtext>
        </Col>
        <Col>
          <Map mapId="map" height={`calc(100vh - ${NAV_HEIGHT})`} />
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => state.spaces;

const mapDispatchToProps = dispatch => ({
  getAllSpacesDataDispatch: venueId => dispatch(getAllSpacesData(venueId)),
});

// Redux config
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
