import { LitElement, html, css, nothing } from 'lit';

// Import styles with type assertions
import { coreStyles } from './styles/core-styles.js';
import { skinStyles } from './styles/skin-styles.js';

export { html, css, nothing };
export { renderIf } from './directives/render-if';
export { ifDefined } from 'lit/directives/if-defined.js';
export { unsafeHTML } from 'lit/directives/unsafe-html.js';

export class WebComponent extends LitElement {
	// Property to track disabled state
	disabled = false;

	static get styles() {
		return [coreStyles, skinStyles];
	}

	constructor() {
		super();

		this.addEventListener('focus', () => this.focus());
		this.addEventListener('blur', () => this.blur());
	}

	focus(): void {
		if (this.disabled === false && !!this.shadowRoot?.firstElementChild) {
			this.classList.add('focus');
			(this.shadowRoot.firstElementChild as HTMLElement).focus();
		}
	}

	blur(): void {
		if (!!this.shadowRoot?.firstElementChild) {
			this.classList.remove('focus');
			(this.shadowRoot.firstElementChild as HTMLElement).blur();
		}
	}

	/**
	 * Retrieves all light-DOM elements assigned to ShadowDom slot
	 * @param name If component has named slots gets the content of the specified
	 * @returns Array of HTMLElements or null if no elements are assigned
	 */
	getAssignedElements(name: string | null = null): HTMLElement[] | null {
		const slot = name !== null
			? this.shadowRoot?.querySelector(`slot[name="${name}"]`) as HTMLSlotElement | null
			: this.shadowRoot?.querySelector('slot') as HTMLSlotElement | null;

		return slot?.assignedElements() as HTMLElement[] ?? null;
	}

	/**
	* Triggers a custom event on itself
	* @param type A string representing the event type to dispatch
	* @param data Property list object which will be set on event object
	* @returns False if at least one of the event handlers which handled this event called Event.preventDefault()
	*/
	raiseEvent(_type: string, _data?: Record<string, unknown>): boolean {
		throw new Error('Not Implemented');
	}

	/**
	 * Gets the first element in parent's chain which matches selector
	 * @param cssSelector CSS style selector
	 * @return Returns first matching element or itself
	 */
	findParent(_cssSelector: string): HTMLElement {
		throw new Error('Not implemented');
	}
}
