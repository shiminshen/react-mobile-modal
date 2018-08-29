import React, { Component } from 'react'
import DialogBox from './DialogBox'
import ScrollPanel from './ScrollPanel'

export default class ReactMobileModal extends Component {
  constructor (props) {
    super(props)

    this.state = {
      show: false
    }
  }

  render () {
    return (
      <div>
        <h2>Welcome to React components</h2>
        <button
          type='button'
          onClick={() => this.setState({ show: !this.state.show })}
        >
          click
        </button>
        <DialogBox
          show={this.state.show}
          onOverlayClick={() => this.setState({ show: !this.state.show })}
          title='Title'
        >
          <ScrollPanel>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
          </ScrollPanel>
        </DialogBox>
      </div>
    )
  }
}
