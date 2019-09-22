import React from 'react'
import s from 'styled-components'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { Row, Col, ColSpace } from '../shared'
import PennLabsCredit from '../shared/PennLabsCredit'
import { maxWidth, PHONE } from '../../styles/sizes'

import Filter from './Filter/Filter'
import Weather from './Weather'
import News from './News'
import Dining from './Dining'
import Laundry from './Laundry'
import ExternalLinks from './ExternalLinks'
import Quotes from './Quotes'
import Events from './Events'

const Wrapper = s.div`
  padding-top: 1rem;
  padding-left: 3rem;
  padding-right: 3rem;
  ${maxWidth(PHONE)} {
    padding: 1rem;
  }
`

const Home = ({ filterList }) => {
  const componentList = [
    <Quotes />,
    <Weather />,
    <Events />,
    <News />,
    <Laundry />,
    <Dining />,
  ]

  return (
    <Wrapper>
      <Row>
        <Col width="70%">{filterList.map(filter => componentList[filter])}</Col>
        <ColSpace />
        <Col>
          <ExternalLinks />

          <Filter />
        </Col>
      </Row>

      <PennLabsCredit />
    </Wrapper>
  )
}

Home.propTypes = {
  filterList: [],
}

Home.defaultProps = {
  filterList: PropTypes.arrayOf(PropTypes.number),
}

const mapStateToProps = ({ home }) => {
  const { filterList } = home
  return { filterList }
}

export default connect(mapStateToProps)(Home)
