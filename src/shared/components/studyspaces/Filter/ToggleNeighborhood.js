import React, { Component } from 'react'
import s from 'styled-components'
import { connect } from 'react-redux'

import {
  FOCUS_GRAY,
  LIGHT_GRAY,
  LIGHTER_BLUE,
  BLUE,
  MEDIUM_GRAY,
} from '../../../styles/colors'
import {
  filterOnCampus
} from '../../../actions/spaces_actions'

const HEIGHT = 0.875
const WIDTH = 2.25

const Wrapper = s.div`
  float: right;
`

const Label = s.span`
  display: inline-block;
  margin-bottom: 0;
  margin-left: 0.625rem;
  color: ${MEDIUM_GRAY};
  transition: all 0.2 ease;
  cursor: pointer;
  opacity: 0.6;

  ${({ active }) => active && `
    opacity: 1;
    color: ${BLUE} !important;
  `}
`

const ToggleWrapper = s.div`
  width: ${WIDTH}rem;
  position: relative;
  display: inline-block;
`

const Bar = s.div`
  transition: all 0.2s ease;
  width: 100%;
  height: ${HEIGHT}rem;
  border-radius: ${HEIGHT}rem;
  margin-top: ${(2.5 - HEIGHT) / 2}rem;
  display: inline-block;
  background: ${({ active }) => (active ? LIGHTER_BLUE : FOCUS_GRAY)};
  cursor: pointer;
`

const Circle = s.div`
  transition: all 0.2s ease;
  height: ${HEIGHT + 0.4}rem;
  width: ${HEIGHT + 0.4}rem;
  border-radius: 100%;
  margin-top: ${(2.5 - HEIGHT) / 2 - 0.2}rem;
  position: absolute;
  background: ${({ active }) => (active ? BLUE : LIGHT_GRAY)};
  margin-left: ${({ active }) => (active ? `${WIDTH - HEIGHT - 0.4}rem` : '0')};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
  cursor: pointer;
`

class ToggleNeighborhood extends Component {
  constructor(props) {
    super(props)

    this.state = { active: false }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    const { filterOnCampusDispatch } = this.props
    const { active } = this.state
    e.stopPropagation()
    this.setState({ active: !active }, () => {
      filterOnCampusDispatch(this.state.active);
    })
  }

  render() {
    const { active } = this.state
    return (
      <Wrapper>
        <ToggleWrapper>
          <Circle onClick={this.handleClick} active={active} />
          <Bar onClick={this.handleClick} active={active} />
        </ToggleWrapper>
        <Label onClick={this.handleClick} active={active}>
          Univ. City only
        </Label>
      </Wrapper>
    )
  }
}

const mapStateToProps = ({ spaces }) => spaces;

const mapDispatchToProps = dispatch => ({
  filterOnCampusDispatch: (filter) => dispatch(filterOnCampus(filter)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ToggleNeighborhood)