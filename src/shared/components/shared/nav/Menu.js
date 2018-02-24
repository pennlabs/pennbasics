import React, { Component } from 'react';

class Menu extends Component {
  state = { isToggleOn: true };

  handleClick = (e) => {
    const sidebar = document.getElementById("sidebar");
    const shaddow = document.getElementById("shade");
    shaddow.classList.toggle("fade-in");
    sidebar.classList.toggle("active");
  }

  // Shadow
  render() {
    return (
      <div id="sidebar-toggle" onClick={this.handleClick}>
        <div className="bar" />
        <div className="bar" />
        <div className="bar" />
        <div id="shade" />
      </div>
    );
  }
}

export default Menu;
