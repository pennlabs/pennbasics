import React, { Component } from 'react';
import { connect } from 'react-redux';

import FilterButton from './FilterBtn';
import {
    filterHomeCustomize,
    toggleHomeCustomize
} from '../../../actions/home_actions'

class Filter extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { 
            filterHomeCustomizeDispatch,
            toggleHomeCustomizeDispatch,
            filterCustomize,
            filterCustomizeActive
        } = this.props;
        return (
            <FilterButton
                text="Customize This Page"
                onClick={toggleHomeCustomizeDispatch}
                onClickOption={filterHomeCustomizeDispatch}
                options={['Weather', 'Events', 'News']}
                activeOptions={filterCustomize}
                active={filterCustomizeActive}
            />)
    }
}

const mapStateToProps = ({ home }) => home;

const mapDispatchToProps = dispatch => ({
    filterHomeCustomizeDispatch: filter => dispatch(filterHomeCustomize(filter)),
    toggleHomeCustomizeDispatch: () => dispatch(toggleHomeCustomize()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Filter);