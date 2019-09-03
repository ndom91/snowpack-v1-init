import { h } from 'preact'
import styled from 'preact-emotion'
import Typist from '../Typist'
import text from './text'

const Container = styled('div')`
  display: flex;
  width: 750px;
`

const Console: preact.FunctionalComponent = () => (
  <div>
    <Container id="console">
      <Typist
        file={text}
       />
    </Container>
  </div>
)

export default Console
