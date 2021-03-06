import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import s from 'styled-components'
import { DebounceInput } from 'react-debounce-input'
import axios from 'axios'

import XSVG from '../../../../public/img/x.svg'
import { Title, BorderedCard, Card, Row, Col, Line } from '../shared'
import {
  getFavorites,
  removeFavorite as diningRemoveFavorite,
} from '../../actions/dining_actions'
import {
  getFavoritesHomePage,
  removeFavorite as laundryRemoveFavorite,
} from '../../actions/laundry_actions'
import { getUserInfo } from '../../actions/auth_actions'
import {
  BORDER,
  FOCUS_GRAY,
  MEDIUM_GRAY,
  DARK_GRAY,
  BLUE,
} from '../../styles/colors'
import CheckCircleSVG from '../../../../public/img/check-circle.svg'
import Loading from '../shared/Loading'
import NotFound from '../shared/NotFound'
import { getApiAuthRouteWithRedirectParams } from '../../constants/routes'
import IDVenueJSON from '../../../server/resources/dining/id_venue_mappings.json'

const IDVenueData = IDVenueJSON as Record<string, string>

import { IAuthReducerState, IUser } from '../../../types/authentication'
import { IDiningReducerState, IFavorite as IDiningFavorite } from '../../../types/dining'
import { ILaundryReducerState, IFavoriteHome as ILaundryFavorite } from '../../../types/laundry'

const Wrapper = s.div`
  padding: 1rem;
`

const StyledCard = s(Card)`
  padding: 0em;
  border-radius: 4px;
  border: 1px solid ${BORDER};
  margin-top: 0.5em;
`

const InputField = s(DebounceInput)`
  font-size: 16px;
  font-weight: 400;
  border: 1px solid ${FOCUS_GRAY};
  background: transparent;
  margin-right: 1em;
  color: ${MEDIUM_GRAY};
  padding: 0.5em;
  margin-left: 1em;
  
  :focus {
    outline: none;
    color: ${DARK_GRAY};
    border-bottom-color: ${BORDER};
  }
`

interface IAppProps {
  dispatchGetDiningFavorites: () => void
  dispatchGetLaundryFavorites: () => void
  dispatchDiningRemoveFavorite: (venueId: string) => void
  dispatchLaundryRemoveFavorite: (hallId: number) => void
  diningFavorites: IDiningFavorite[]
  laundryFavorites: ILaundryFavorite[]
  userInfo: IUser
}

const App = ({
  dispatchGetDiningFavorites,
  dispatchGetLaundryFavorites,
  dispatchDiningRemoveFavorite,
  dispatchLaundryRemoveFavorite,
  diningFavorites,
  laundryFavorites,
  userInfo,
}: IAppProps) => {
  const { loggedIn } = userInfo || {}
  if (!loggedIn) {
    return (
      <Wrapper>
        <NotFound
          title="Oops!"
          message="Seems like you are not logged in"
          urlText="Click to login"
          url={getApiAuthRouteWithRedirectParams('/profile')}
          linkIsExternal
        />
      </Wrapper>
    )
  }

  useEffect(() => {
    dispatchGetDiningFavorites()
    dispatchGetLaundryFavorites()
  }, [dispatchGetDiningFavorites, dispatchGetLaundryFavorites])

  const { fullName, displayName, pennid } = userInfo || {}

  const [name, setName] = useState(displayName || fullName)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setName(displayName || fullName)
  }, [fullName, displayName])

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
    axios
      .post('/api/auth/updateUser', { pennid, displayName: e.target.value })
      .then(resp => {
        const { status } = resp
        if (status === 200) {
          setLoading(false)
        }
      })
  }

  return (
    <div style={{ padding: '1em 5em' }}>
      <Title> Profile </Title>
      <BorderedCard style={{ marginBottom: '2rem' }}>
        Display Name
        <InputField
          value={name}
          onChange={onChangeName}
          onKeyDown={() => setLoading(true)}
          debounceTimeout={400}
        />
        {loading ? (
          <Loading
            displayInLine
            padding="0"
            size="1.5rem"
            translateY="6px"
            thickness="0.1rem"
          />
        ) : null}
        {!loading ? (
          <CheckCircleSVG
            style={{ transform: 'translateY(6px)', color: BLUE }}
          />
        ) : null}
      </BorderedCard>
      <Title> Favorites </Title>
      <Row>
        <Col>
          <div style={{ marginRight: '0.5em' }}>
            Dining
            {diningFavorites && diningFavorites.length ? (
              <StyledCard>
                {diningFavorites.map(id => (
                  <>
                    <p style={{ padding: '1rem' }}>
                      {IDVenueData[id]}
                      <XSVG
                        style={{
                          float: 'right',
                          cursor: 'pointer',
                        }}
                        onClick={() => dispatchDiningRemoveFavorite(id)}
                      />
                    </p>
                    <Line />
                  </>
                ))}
              </StyledCard>
            ) : null}
          </div>
        </Col>
        <Col>
          <>
            Laundry
            {laundryFavorites && laundryFavorites.length ? (
              <StyledCard>
                {laundryFavorites.map(hall => (
                  <>
                    <p style={{ padding: '1rem' }}>
                      {hall.hall_name}
                      <XSVG
                        style={{
                          float: 'right',
                          cursor: 'pointer',
                        }}
                        onClick={() => {
                          dispatchLaundryRemoveFavorite(Number(hall.id))
                          dispatchGetLaundryFavorites()
                        }}
                      />
                    </p>
                    <Line />
                  </>
                ))}
              </StyledCard>
            ) : null}
          </>
        </Col>
      </Row>
      <a
        href="/api/auth/logout"
        className="button is-info"
        style={{ color: 'white', marginTop: '3rem' }}
      >
        Logout
      </a>
    </div>
  )
}

interface IStateToProps {
  dining: IDiningReducerState
  laundry: ILaundryReducerState
  authentication: IAuthReducerState
}

const mapStateToProps = ({ dining, laundry, authentication }: IStateToProps) => {
  const { favorites: diningFavorites } = dining
  const { favoritesHome: laundryFavorites } = laundry
  const { userInfo } = authentication

  return {
    diningFavorites,
    laundryFavorites,
    userInfo,
  }
}

const mapDispatchToProps = (dispatch: (action: any) => any) => ({
  dispatchGetDiningFavorites: () => dispatch(getFavorites()),
  dispatchGetLaundryFavorites: () => dispatch(getFavoritesHomePage()),
  dispatchGetUserInfo: () => dispatch(getUserInfo()),
  dispatchDiningRemoveFavorite: (venueId: string) =>
    dispatch(diningRemoveFavorite(venueId)),
  dispatchLaundryRemoveFavorite: (hallId: number) =>
    dispatch(laundryRemoveFavorite(hallId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
