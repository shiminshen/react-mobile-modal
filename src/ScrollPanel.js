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
      transition: false,
      startTime: null
    }

    this.handleTouchStart = this.handleTouchStart.bind(this)
    this.handleTouchMove = this.handleTouchMove.bind(this)
    this.handleTouchEnd = this.handleTouchEnd.bind(this)
  }

  componentDidMount () {
    const { maxHeight } = this.props
    const wrapperHeight = this.wrapperElem.getBoundingClientRect().height

    this.wrapperHeight = wrapperHeight > maxHeight ? maxHeight : wrapperHeight
    console.log(this.wrapperHeight)
    this.contentHeight = this.contentElem.getBoundingClientRect().height
    this.setState({
      offsetLimit: this.wrapperHeight - this.contentHeight
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
      move: 0,
      startTime: Date.now()
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
    const { move, offset, offsetLimit, startTime } = this.state
    const duration = (Date.now() - startTime) / 1000
    const momentumOffset = offset - (move / duration)

    if (momentumOffset > 0) {
      return this.setState({
        offset: 0,
        transition: true
      })
    }
    if (momentumOffset < offsetLimit) {
      return this.setState({
        offset: offsetLimit,
        transition: true
      })
    }

    if (duration < 1) {
      return this.setState({
        offset: momentumOffset,
        transition: true
      })
    }
  }

  render () {
    const { offset, transition } = this.state
    return (
      <Wrapper
        height={this.wrapperHeight}
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

ScrollPanel.defaultProps = {
  maxHeight: 300
}

export default ScrollPanel
