import React, { Component } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  height: ${props => props.height}px;
  overflow: auto;

  @media screen and (max-width: 767px) {
    overflow: hidden;
  }
`

const Content = styled.div`
  position: relative;
  transition: ${props => props.transition ? 'all .3s' : 'none'};
  top: ${prpos => prpos.offset}px;

  p {
    margin: 0;
    padding: 20px;
  }
`

class ScrollPanel extends Component {
  constructor (props) {
    super(props)

    this.state = {
      x: 0,
      y: 0,
      move: 0,
      offset: 0,
      transition: false
    }

    this.handleTouchStart = this.handleTouchStart.bind(this)
    this.handleTouchMove = this.handleTouchMove.bind(this)
    this.handleTouchEnd = this.handleTouchEnd.bind(this)
  }

  componentDidMount () {
    const wrapperHeight = this.wrapperElem.getBoundingClientRect().height
    const contentHeight = this.contentElem.getBoundingClientRect().height
    this.setState({
      wrapperHeight,
      contentHeight,
      offsetLimit: wrapperHeight - contentHeight
    })
  }

  getPosition (e) {
    return {
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    }
  }

  handleTouchStart (e) {
    const { x, y } = this.getPosition(e)
    this.setState({
      x,
      y,
      move: 0
    })
  }

  handleTouchMove (e) {
    const { x, y } = this.getPosition(e)
    const move = this.state.y - y
    this.setState({
      x,
      y,
      move,
      offset: this.state.offset - move
    })
  }

  handleTouchEnd (e) {
    const { offset, offsetLimit } = this.state
    if (offset > 0) {
      return this.setState({
        offset: 0,
        transition: true
      })
    }
    if (offset < offsetLimit) {
      return this.setState({
        offset: offsetLimit,
        transition: true
      })
    }
  }

  render () {
    const { height = 300, offset, transition } = this.state
    return (
      <Wrapper
        height={height}
        innerRef={elem => (this.wrapperElem = elem)}
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        onTouchEnd={this.handleTouchEnd}
        onTransitionEnd={() => this.setState({ transition: false })}
      >
        <Content
          innerRef={elem => (this.contentElem = elem)}
          offset={offset}
          transition={transition}
        >
          {this.props.children}
        </Content>
      </Wrapper>
    )
  }
}

export default ScrollPanel
