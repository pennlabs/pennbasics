import { Action } from 'redux'
import {
  filterHomeCustomizeRequested,
  TOGGLE_FILTER_HOME_CUSTOMIZE,
} from '../actions/action_types'

import { IHomeReducerState } from '../../types/home'

type IHomeAction = {
  filterList?: number[]
} & Action

const defaultState: IHomeReducerState = {
  filterList: [],
  filterCustomizeActive: false,
}

const HomeReducer = (
  state: IHomeReducerState = defaultState,
  action: IHomeAction
): IHomeReducerState => {
  switch (action.type) {
    case filterHomeCustomizeRequested:
      return {
        ...state,
        filterList: action.filterList,
      }
    case TOGGLE_FILTER_HOME_CUSTOMIZE:
      return {
        ...state,
        filterCustomizeActive: !state.filterCustomizeActive,
      }
    default:
      return state
  }
}

export default HomeReducer
