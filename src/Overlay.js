import React, { Component } from 'react'
import styled from 'styled-components'

const Blacklay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2100;
  background-color: rgba(0, 0, 0, 0.4);
  cursor: default;
`

class Overlay extends Component {
  handleClick (e) {
    if (e.target !== e.currentTarget) return
    this.props.onClick(e)
  }
  render () {
    return (
      <Blacklay className={this.props.className} onClick={this.handleClick.bind(this)}>
        { this.props.children }
      </Blacklay>
    )
  }
}

export default Overlay
