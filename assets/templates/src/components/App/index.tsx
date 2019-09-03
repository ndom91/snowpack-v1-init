import { h } from 'preact'
import styled from 'preact-emotion'
import Terminal from '../Terminal'

const Wrapper = styled('div')`
  display: 'flex';
  justify-content: 'center';
  align-items: 'center';
  width: '100vw';
  height: '100vh';
`

const App: preact.FunctionalComponent = () => (
  <div>
    <Wrapper>
      <Terminal />
    </Wrapper>
  </div>
)

export default App
