import React, { Component } from 'react'
import s from 'styled-components'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { clearActiveSpace } from '../../actions/spaces_actions'

import {
  Title,
  Text,
  Modal,
  ModalContainer,
  Image,
  Tag,
  Map,
  Subtext,
} from '../shared'
import { SNOW } from '../../styles/colors'
import Hours from './Hours'

const Credit = s.div`
  width: 100%;
  padding: 0 1rem;
`

class SpaceModal extends Component {
  constructor(props) {
    super(props)

    this.toggle = this.toggle.bind(this)
  }

  toggle() {
    const { clearActiveSpaceDispatch } = this.props
    clearActiveSpaceDispatch()
  }

  render() {
    const { activeSpace, spacesData } = this.props
    const space = spacesData[activeSpace]
    const show = Boolean(activeSpace && space)

    const {
      name,
      image,
      description,
      address,
      location,
      imageCredit,
      start,
      end,
      tags,
    } = space || {}

    return (
      <Modal show={show} toggle={this.toggle}>
        {space ? (
          <>
            <ModalContainer>
              <Title marginBottom="2.5vh">{name}</Title>
            </ModalContainer>

            {image && <Image src={image} alt={name} marginBottom="2.5vh" />}

            {imageCredit && (
              <Credit>
                <Subtext>
                  {'Image credit: '}
                  <a href={imageCredit.link}>{imageCredit.name}</a>
                </Subtext>
              </Credit>
            )}

            {description && (
              <ModalContainer paddingTop="0.5rem">
                <Text>{description}</Text>
              </ModalContainer>
            )}

            {tags && (
              <ModalContainer paddingBottom="0.5rem">
                {tags.map(tag => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </ModalContainer>
            )}

            <ModalContainer
              background={SNOW}
              paddingTop="1.5rem"
              paddingBottom="1rem"
            >
              <Text>
                <strong>Address</strong>
              </Text>
              <br />
              <Text>{address}</Text>
            </ModalContainer>

            {location && location.lat && location.lng ? (
              <Map
                mapId={name}
                location={location}
                showMarker
                gestureHandling="cooperative"
                height="50%"
              />
            ) : null}

            <ModalContainer paddingTop="1.5rem">
              <Hours start={start} end={end} />
            </ModalContainer>
          </>
        ) : (
          <div />
        )}
      </Modal>
    )
  }
}

SpaceModal.defaultProps = {
  location: null,
  activeSpace: null,
  spacesData: {},
}

SpaceModal.propTypes = {
  activeSpace: PropTypes.string,
  clearActiveSpaceDispatch: PropTypes.func.isRequired,
  spacesData: PropTypes.object, // eslint-disable-line
  location: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }),
}

const mapStateToProps = ({ spaces }) => {
  const { spacesData, activeSpace } = spaces
  return {
    spacesData,
    activeSpace,
  }
}

const mapDispatchToProps = dispatch => ({
  clearActiveSpaceDispatch: () => dispatch(clearActiveSpace()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SpaceModal)
