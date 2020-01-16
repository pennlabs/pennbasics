import React from 'react'
import { Route, Switch } from 'react-router-dom'
import s from 'styled-components'
import { MobileView, BrowserView } from 'react-device-detect'

import { BLUE, DARK_BLUE, SNOW } from '../styles/colors'

import Nav from './shared/Nav'
import Home from './home/App'
import NotFound from './shared/NotFound'
import Dining from './dining/App'
import Foodtrucks from './foodtrucks/App'
import Laundry from './laundry/App'
import StudySpaces from './studyspaces/App'
import Reservations from './reservations/App'
import Mobile from './mobile/App'
import Feedback from './shared/Feedback'
import Profile from './profile/App'

const AppWrapper = s.div`
  a {
    color: ${BLUE};

    &:visited {
      color: ${BLUE};
    }

    &:hover,
    &:focus,
    &:active {
      color: ${DARK_BLUE};
    }
  }
`

export default () => (
  <AppWrapper>
    {/* <MobileView>
      <div id="wrapper">
        <div id="app">
          <Mobile />
        </div>
      </div>
    </MobileView> */}

    {/* <BrowserView> */}
    <Nav />
    <Feedback />
    <div id="wrapper" style={{ background: SNOW }}>
      <div id="app">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/dining" component={Dining} />
          <Route exact path="/dining/:id" component={Dining} />
          <Route exact path="/foodtrucks" component={Foodtrucks} />
          <Route exact path="/foodtrucks/:id" component={Foodtrucks} />
          <Route exact path="/laundry" component={Laundry} />
          <Route exact path="/laundry/:id" component={Laundry} />
          <Route exact path="/studyspaces" component={StudySpaces} />
          <Route exact path="/studyspaces/:id" component={StudySpaces} />
          <Route exact path="/reservations" component={Reservations} />
          <Route exact path="/profile" component={Profile} />
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
    </div>
    {/* </BrowserView> */}
  </AppWrapper>
)
