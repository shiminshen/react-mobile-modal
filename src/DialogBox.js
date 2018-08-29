import React, { Component } from 'react'
import styled from 'styled-components'
import Overlay from './Overlay'
import Transition from 'react-transition-group/Transition'

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2100;
  display: flex;
  justify-content: center;
  align-items: center;
`

const DialogWrapper = styled.div`
  position: relative;
  transition: all ${props => props.timeout}ms ease-out;
  background: #fff;
  border-radius: 6px;
  overflow: hidden;
  color: #26282a;
  box-sizing: border-box;
  z-index: 2200;

  &.entering,
  &.exiting, 
  &.exited {
    opacity: 0;
    transform: translate(0%, 100%);
  }

  @media screen and (max-width: 423px) {
    width: 100%;
    max-height: 100%;
    border-radius: 6px 6px 0 0;
    align-self: flex-end;

    &.entering,
    &.exiting,
    &.exited {
      opacity: 1;
      transform: translate(0%, 100%);
    }
  }
`

const Title = styled.div`
  padding: 12px 20px;
  font-size: 16px;
  line-height: 1.5;
  color: #979ba7;
`

const CloseBtn = styled.div`
  position: absolute;
  z-index: 10;
  top: 12px;
  right: 12px;
  cursor: pointer;
`

class DialogBox extends Component {
  preventBodyScrolling (fixedBody) {
    if (fixedBody) {
      this.pageYOffset = window.pageYOffset
      document.body.style.top = `-${this.pageYOffset}px`
      document.body.style.position = 'fixed'
      document.body.style.width = '100%'
      document.body.style['overscroll-behavior-y'] = 'contain'
    } else {
      document.body.style.top = 'auto'
      document.body.style.position = 'relative'
      document.body.style['overscroll-behavior-y'] = 'auto'
      window.scrollTo(0, this.pageYOffset)
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.show !== this.props.show) {
      global.window && this.preventBodyScrolling(nextProps.show)
    }
  }

  render () {
    const { show, className, title, timeout, onOverlayClick, children, showCloseBtn = true, closeBtnColor = '#979ba7' } = this.props
    return (
      <Transition in={show} timeout={timeout} unmountOnExit>
        {
          status => (
            <Wrapper>
              <Overlay onClick={onOverlayClick} />
              <DialogWrapper
                className={className ? `${status} ${className}` : status}
                timeout={timeout}
              >
                {
                  title && (
                    <Title>{title}</Title>
                  )
                }
                {
                  showCloseBtn && (
                    <CloseBtn onClick={onOverlayClick}>
                      x
                    </CloseBtn>
                  )
                }
                {children}
              </DialogWrapper>
            </Wrapper>
          )
        }
      </Transition>
    )
  }
}

DialogBox.defaultProps = {
  show: false,
  timeout: 300
}

export default DialogBox
