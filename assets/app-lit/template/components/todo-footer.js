import {LitElement, html, css} from '../web_modules/lit-element.js';

class TodoFooter extends LitElement {
    static get styles() {
        return css`
            footer {
            padding: 10px;
            color: gray;
            font-style: italic;
            }
        `;
    }

    render() {
        return html`
            <footer>
                <slot></slot>
            </footer>
        `
    }
}

customElements.define('todo-footer', TodoFooter);