import { LitElement, html, css, nothing } from 'lit';

import { coreStyles } from './styles/core-styles';
import { skinStyles } from './styles/skin-styles';

export { html, css, nothing };
export { renderIf } from './directives/render-if';
export { ifDefined } from 'lit/directives/if-defined.js';
export { unsafeHTML } from 'lit/directives/unsafe-html.js';

export class WebComponent extends LitElement {
	static get styles() {
		return [coreStyles, skinStyles];
	}

	constructor() {
		super();

		this.addEventListener('focus', e => this.focus());
		this.addEventListener('blur', e => this.blur());
	}

	focus() {
		if (this.disabled == false && !!this.shadowRoot.firstElementChild) {
			this.classList.add('focus');
			this.shadowRoot.firstElementChild.focus()
		}
	}

	blur() {
		if(!!this.shadowRoot.firstElementChild) {
			this.classList.remove('focus');
			this.shadowRoot.firstElementChild.blur();
		}
	}

	/**
	 * Retrieves all light-DOM elements assigned to ShadowDom slot
	 * @param {*} name If component has named slots gets the content of the specified
	 * @returns {Array} HTMLElement[]
	 */
	assignedSlot(name = null) {
		const slot = name !== null
			? this.shadowRoot?.querySelector(`slot[name="${name}"]`)
			: this.shadowRoot?.querySelector('slot');

		return slot?.assignedElements() ?? null;
	}

	/**
	* Triggers a custom event on itself
	* @param {String} type A string representing the event type to dispatch
	* @param {Object} [data] Property list object which will be set on event object
	* @returns {Boolean} False if at least one of the event handlers which handled this event called Event.preventDefault()
	*/
	raiseEvent(type, data) {
		throw new Error('Not Implemented');
	}

	/**
	 * Gets the first element in parent's chain which matches selector
	 * @param {string} cssSelector  CSS style selector
	 * @return {HTMLElement} Returns first matching element or itself
	 */
	findParent(cssSelector) {
		throw new Error('Not implemented');
	}
}
