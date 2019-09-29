/* global localStorage */
import axios from 'axios'
import {
  getVenueInfoRequested,
  getVenueInfoRejected,
  getVenueInfoFulfilled,
  updateDiningFavorites,
} from './action_types'
import { pad } from '../helperFunctions'

const convertDate = dateObj => {
  const month = dateObj.getUTCMonth() + 1
  const day = dateObj.getUTCDate()
  const year = dateObj.getUTCFullYear()
  return `${year}-${pad(month)}-${pad(day)}`
}

export const getVenueInfo = venueId => {
  return async dispatch => {
    dispatch({ type: getVenueInfoRequested })

    // Set the start date to today

    // Make a post request to pull the data
    try {
      const response = await axios.post('/api/dining/venue_hours', { venueId })
      let { venueHours } = response.data

      let startDate = new Date()
      startDate.setHours(0, 0, 0, 0)
      startDate = convertDate(startDate)

      // Set the end date to three days from now
      let endDate = new Date()
      endDate.setHours(72, 0, 0, 0)
      endDate = convertDate(endDate)
      venueHours = venueHours.filter(
        hour => startDate <= hour.date && hour.date <= endDate
      )
      dispatch({
        type: getVenueInfoFulfilled,
        venueHours,
      })
    } catch (err) {
      dispatch({
        type: getVenueInfoRejected,
        error: err.message,
      })
    }
  }
}

export const getFavorites = () => {
  return dispatch => {
    let favorites = localStorage.getItem('dining_favorites')
    if (favorites) {
      favorites = JSON.parse(favorites).sort((a, b) => {
        return a - b
      })
    } else {
      localStorage.setItem('dining_favorites', JSON.stringify([]))
      favorites = []
    }
    dispatch({
      type: updateDiningFavorites,
      favorites,
    })
  }
}

export const addFavorite = venueID => {
  return dispatch => {
    let favorites = localStorage.getItem('dining_favorites')

    if (!favorites) {
      favorites = [venueID]
    } else {
      favorites = JSON.parse(favorites)
      favorites.push(venueID)
      if (!favorites.includes(venueID)) {
        favorites.push(venueID)
      }

      favorites = favorites.sort((a, b) => {
        return a - b
      })
    }

    localStorage.setItem('dining_favorites', JSON.stringify(favorites))

    dispatch({
      type: updateDiningFavorites,
      favorites,
    })
  }
}

export const removeFavorite = venueID => {
  return dispatch => {
    // favorites is an array of venueIDs
    let favorites = JSON.parse(localStorage.getItem('dining_favorites'))
    favorites = favorites.filter(favorite => favorite !== venueID)
    localStorage.setItem('dining_favorites', JSON.stringify(favorites))
    dispatch({
      type: updateDiningFavorites,
      favorites,
    })
  }
}