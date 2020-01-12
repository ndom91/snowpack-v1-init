import {LitElement, html, css} from '../web_modules/lit-element.js';
import { header } from './todo-header.js';
import './todo-footer.js';

export class LitSnowpack extends LitElement {
    static get properties() {
        return {
            todos: { type: Array }
        }
    }

    constructor() {
        super();
        this.todos = [];
    }
    
    static get styles() {
        return css`
            ul {
                min-height: 100px;
                padding: 0;
                list-style: none;
                text-align: left;
                border: 4px dashed #aaa;
            }

            li {
                padding: 5px 10px;
            }

            li:nth-child(odd) {
                box-shadow: 0 0 1px -1px rgba(0, 0, 0, 0.5);
                background: #f8fbff;
            }

            button {
                font-size: 24px;
                padding: 10px;
            }
        `;
    }

    addTodo() {
        this.todos = [...this.todos, `Item ${this.todos.length}`];
    }

    render() {
        return html`
            ${header("Todo list")}
            <ul>
                ${this.todos.map(item => html`
                    <li>${item}</li>
                `)}
            </ul>
            <button @click=${this.addTodo}>✨ Add Item</button>
            <todo-footer>footer content here</todo-footer>
        `;
    }
}