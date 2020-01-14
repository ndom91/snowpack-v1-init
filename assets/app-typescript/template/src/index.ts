import { add, double } from './lib/numbers'

const $app = document.getElementById('app')

const template = `
  <p>Double of 4: ${double(4)}</p>
  <p>2 + 2: ${add(2, 2)}</p>
`

if ($app) {
  $app.innerHTML = template
}
