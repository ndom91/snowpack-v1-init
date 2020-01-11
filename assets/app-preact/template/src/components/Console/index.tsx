import { h, FunctionalComponent } from '/web_modules/preact.js'
import Typist from '../Typist/index.js'
import text from './text.js'

const Console: FunctionalComponent = () => (
  <div>
    <div style={{ display: 'flex', width: '750px' }} id="console">
      <Typist file={text} />
    </div>
  </div>
)

export default Console
