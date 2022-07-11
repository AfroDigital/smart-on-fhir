import React from 'react'

class App extends React.Component {
  constructor (props) {
    super(props)

    const self = this
    self.state = {
      isVisible: true
    }
  }

  getVisibility () {
    return this.state.isVisible ? 'visible' : 'hidden'
  }

  render () {
    return (
      <div style={{ visibility: this.getVisibility() }}>
        content
      </div>
    )
  }
} export default App
