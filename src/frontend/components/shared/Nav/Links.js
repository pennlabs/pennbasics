import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'next/router'
import s from 'styled-components'
import Link from 'next/link'

import { maxWidth, PHONE } from '../../../styles/sizes'
import { DARK_GRAY } from '../../../styles/colors'
import UserSVG from '../../../../../public/img/user.svg'
import {
  DINING_ROUTE,
  FOODTRUCKS_ROUTE,
  LAUNDRY_ROUTE,
  STUDYSPACES_ROUTE,
  getApiAuthRouteWithRedirectParams,
  PROFILE_ROUTE,
} from '../../../constants/routes'

const MOBILE_ACTIVE_NAV_HEIGHT = '250px'

const LinksDiv = s.div`
  margin-left: auto;
  
  a {
    margin-left: 1.5rem;
  }

  ${maxWidth(PHONE)} {
    width: 100%;
    z-index: ${({ zIndex }) => zIndex + 1};
    padding: 0;
    max-height: 0;
    overflow: hidden;
    opacity: 0;
    transition: max-height 200ms ease, opacity 200ms ease;
    
    a {
      font-size: 120%;
      margin-left: 0;
      display: block;
      width: auto;
      margin: 1rem;
    }

    ${({ active }) =>
      active && `max-height: ${MOBILE_ACTIVE_NAV_HEIGHT}; opacity: 1;`}
  }
`
const StyledLink = s.a`
  color: ${DARK_GRAY} !important;
`

const AuthLink = withRouter(({ userInfo, router }) => {
  if (!userInfo) return null
  const { loggedIn } = userInfo

  if (!loggedIn) {
    const { pathname } = router
    return <a href={getApiAuthRouteWithRedirectParams(pathname)}>Login</a>
  }

  return (
    <Link href={PROFILE_ROUTE}>
      <StyledLink style={{ marginLeft: '1.5rem' }}>
        <UserSVG
          style={{
            transform: 'scale(0.8) translateY(6px)',
            marginRight: '0.5em',
          }}
        />
        {userInfo.fullName}
      </StyledLink>
    </Link>
  )
})

const Links = ({ active, zIndex, userInfo, toggleActive }) => (
  <LinksDiv active={active} zIndex={zIndex}>
    <Link href={DINING_ROUTE}>
      <a onClick={() => toggleActive(false)}>Dining</a>
    </Link>
    <Link href={FOODTRUCKS_ROUTE}>
      <a onClick={() => toggleActive(false)}> Foodtrucks </a>
    </Link>
    <Link href={LAUNDRY_ROUTE}>
      <a onClick={() => toggleActive(false)}>Laundry</a>
    </Link>
    <Link href={STUDYSPACES_ROUTE}>
      <a onClick={() => toggleActive(false)}>Studyspaces</a>
    </Link>
    <AuthLink userInfo={userInfo} />
  </LinksDiv>
)

Links.propTypes = {
  active: PropTypes.bool,
  zIndex: PropTypes.number.isRequired,
  toggleActive: PropTypes.func.isRequired,
  userInfo: PropTypes.shape({
    loggedIn: PropTypes.bool,
    fullName: PropTypes.string,
  }),
}

Links.defaultProps = {
  active: false,
  userInfo: null,
}

export default Links
