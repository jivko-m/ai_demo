import { WebComponent, html, css } from '../web-component';

export class CtrlButton extends WebComponent {

	static get styles() {
		return [super.styles, css`
			:host {                    
				cursor: pointer;
				display: inline-block;
				background-clip: padding-box;
				background: var(--bgr-1);
				border: none;
				white-space: nowrap;
				padding: 0.4em 0.5em;
				
			}

			:host(:hover) {
				background: var(--bgr-1-hover);
			}

			.ficon {display: inline-block; }

			:host([disabled]) {
				background: var(--bgr-disabled-btn);
				color: var(--btn-color-disabled);
				cursor: auto;
			}
		`]
	}


	static get properties() {
		return {
			name: { type: String },
			disabled: { type: Boolean, reflect: true },
			icon: { type: String },
			type: { type: String },
			action: { type: String },
			path: { type: String, },
			text: { type: String },
			title: { type: String }
		};
	}

	// get title() {
	// 	return super.title || this.text;
	// }

	// set title(value) {
	// 	super.title = value;
	// }

	constructor() {
		super(); // always call super() first in the constructor.
		this.text = this.icon = this.path = '';//'';
		this.disabled = false;
		this.title = undefined;

		this.addEventListener('click', function (e) {

			if (this.disabled) {
				e.stopImmediatePropagation();
				e.preventDefault();
				return;
			}

			if (this.type === 'submit') {
				this.btnSubmit.click();
			}

			var type = 'action',
				detail = { action: this.action };

			if (this.path) {
				type = 'follow';
				detail.path = this.path;
			}

			this.raiseEvent(type, detail);
		}, { useCapture: true });
	}

	firstUpdated() {
		if (this.type === 'submit') {
			let btnSubmit = document.createElement('button');

			btnSubmit.type = 'submit';

			Object.assign(btnSubmit.style, {
				position: 'fixed',
				left: '-999px',
				top: '-999px'
			});

			this.append(btnSubmit);
			this.btnSubmit = btnSubmit;
		}

		//TODO: Should the title be translated here or outside?
		super.title = this.title != undefined ? this.title : this.text;
	}

	render() {
		return html`
			${this.icon ? html`<span class=${this.icon}></span>` : ''}
			${this.text ? html`<span class="ctrl-text">${this.text}</span>` : html`<span class="ctrl-text"><slot></slot></span>`}
		`;
	}
}

customElements.get('ctrl-button') || customElements.define('ctrl-button', CtrlButton);