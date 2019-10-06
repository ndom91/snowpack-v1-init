import { h } from 'preact'
import Typist from '../Typist'
import text from './text'

const Console: preact.FunctionalComponent = () => (
  <div>
    <div style={{ display: 'flex', width: '750px' }} id="console">
      <Typist file={text} />
    </div>
  </div>
)

export default Console
