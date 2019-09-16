import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getLaundryHalls, getFavorites } from '../../actions/laundry_actions'

import {
  Card,
  Row,
  Col,
  Scrollbar,
  NavSectionHeader,
  Line,
  Favorites,
} from '../shared'
import { BABY_BLUE } from '../../styles/colors'
import PennLabsCredit from '../shared/PennLabsCredit'
import { NAV_HEIGHT } from '../../styles/sizes'
import LaundryCard from './LaundryCard'
import LaundryVenue from './LaundryVenue'
import favoriteCard from './FavoriteCard'

class App extends Component {
  constructor(props) {
    super(props)
    const { dispatchGetLaundryHalls, dispatchGetFavorites } = this.props

    dispatchGetLaundryHalls()
    dispatchGetFavorites()
  }

  render() {
    const {
      laundryHalls,
      match: {
        params: { id } = {
          params: { id: '-1' },
        },
      },
      favorites,
    } = this.props

    return (
      <Row maxHeight={`calc(100vh - ${NAV_HEIGHT})`}>
        <Scrollbar
          padding="0 0 .5rem 0"
          width="20%"
          borderRight
          height={`calc(100vh - ${NAV_HEIGHT})`}
        >
          <Favorites favorites={favorites} favoriteCard={favoriteCard} />

          <Card background={BABY_BLUE} padding="0">
            <NavSectionHeader className="title is-5">
              Laundry Halls
            </NavSectionHeader>
            <Line />
          </Card>

          {laundryHalls &&
            laundryHalls.map(locationObject => (
              <LaundryCard
                locationObject={locationObject}
                key={locationObject.location}
              />
            ))}

          <PennLabsCredit />
        </Scrollbar>

        <Col
          width="80%"
          overflowY="auto"
          maxHeight={`calc(100vh - ${NAV_HEIGHT} - 1px)`}
        >
          <LaundryVenue hallURLId={Number.isNaN(id) ? null : id} />
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = ({ laundry }) => {
  const { laundryHalls, favorites } = laundry
  return { laundryHalls, favorites }
}

const mapDispatchToProps = dispatch => ({
  dispatchGetLaundryHalls: () => dispatch(getLaundryHalls()),
  dispatchGetFavorites: () => dispatch(getFavorites()),
})

App.defaultProps = {
  laundryHalls: null,
  favorites: [],
}

App.propTypes = {
  laundryHalls: PropTypes.arrayOf(
    PropTypes.shape({
      halls: PropTypes.array,
      location: PropTypes.string,
    })
  ),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  favorites: PropTypes.arrayOf(
    PropTypes.shape({
      hallId: PropTypes.string,
      locationName: PropTypes.string,
    })
  ),
  dispatchGetFavorites: PropTypes.func.isRequired,
  dispatchGetLaundryHalls: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
