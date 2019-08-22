import { h } from 'preact'
import Console from '../Console'

const Terminal: preact.FunctionalComponent = () => (
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
