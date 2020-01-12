import { h, FunctionalComponent } from '/web_modules/preact.js'
import Console from '../Console/index.js'

const Terminal: FunctionalComponent = () => (
  <div className="terminal-window">
    <header>
      <div className="button red" />
      <div className="button yellow" />
      <div className="button green" />
    </header>
    <Console />
  </div>
)

export default Terminal
