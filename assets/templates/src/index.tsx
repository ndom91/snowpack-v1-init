import { h, render } from 'preact'
// import 'preact/debug'
import App from './components/App'

const appMount = document.querySelector('#app')
if (appMount) render(<App />, appMount)

export default App
