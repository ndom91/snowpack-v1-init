import {LitElement, html} from '../web_modules/lit-element.js';

export class TodoHeader extends LitElement {
    static get properties() {
        return {
            name: { type: String }
        }
    }

    render() {
        return html`
            <header>
                <h2>${this.name}</h2>
            </header>
        `;
    }
}

customElements.define('todo-header', TodoHeader);