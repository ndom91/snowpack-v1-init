import { h, render } from 'preact'
import App from './components/App'

const appMount = document.querySelector('#app')
if (appMount) render(<App />, appMount)

export default App
