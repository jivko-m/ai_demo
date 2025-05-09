import { selectStyles } from '../styles/select-styles';
import { WebComponent, html, renderIf } from '../web-component';

const optionsToDataSource = (list) => list.map((l) => ({
	value: l.getAttribute('value') || l.innerText,
	label: l.innerText,
	selected: l.hasAttribute('selected')
}));

export class CtrlSelect extends WebComponent {
	static styles = [super.styles, selectStyles];

	static properties = {
		name: { type: String },
		text: { type: String },
		dataSource: { type: Array, attribute: 'data-source' },
		displayMember: { type: String, attribute: 'display-member' },
		valueMember: { type: String, attribute: 'value-member' },
		value: { type: String },
		asyncContent: { state: true },

		disabled: { type: Boolean },
		required: { type: Boolean },
		readonly: { type: Boolean },
		nullable: { type: Boolean },

		selectedIndex: { type: Number, attribute: 'selected-index' },
		selectedItem: { type: Object, attribute: false }
	};

	get willValidate() {
		return this.$select ? this.$select.willValidate : true;
	}

	setCustomValidity(msg) {
		if (this.$select) this.$select.setCustomValidity(msg);
	}

	checkValidity() {
		return this.$select ? this.$select.checkValidity() : true;
	}

	get validity() {
		return this.$select ? this.$select.validity : {};
	}

	get validationMessage() {
		return this.$select.validationMessage;
	}

	constructor() {
		super();

		this.name = '';

		this.disabled = false;
		this.required = false;
		this.readonly = false;
		this.nullable = false;

		this.dataSource = [];
		this.displayMember = undefined;
		this.valueMember = undefined;
		this.value = null;

		this.selectedIndex = 0;
		this.selectedItem = undefined;
	}

	get value() {
		return this._value;
	}

	set value(data) {
		if (!this.nullable && data == null)
			return;

		const oldVal = this._value;
		this._value = data;

		if (this.$select)
			this.$select.value = data;

		this.setSelected();

		this.requestUpdate('value', oldVal);
	}

	get dataSource() {
		return this._dataSource;
	}

	set dataSource(data) {
		if (data == null)
			return;

		if(this.nullable && data.length > 0)
			data = [this.displayMember && this.valueMember ? { [this.displayMember]: '', [this.valueMember]: null } : '', ...data];

		const oldVal = this._dataSource;

		this._dataSource = data;

		this.requestUpdate('dataSource', oldVal);
	}

	get selectedIndex() {
		return this._selectedIndex;
	}

	set selectedIndex(data) {
		const oldVal = this._selectedIndex;
		this._selectedIndex = data;

		if (this.$select) this.$select.selectedIndex = data;

		this.setSelected();

		this.requestUpdate('selectedIndex', oldVal);
	}

	firstUpdated(changedProperties) {
		const ctrlOptions = Array.from(this.querySelectorAll('ctrl-option'));
		if (ctrlOptions.length > 0) {
			this.dataSource = optionsToDataSource(ctrlOptions);
			this.valueMember = 'value';
			this.displayMember = 'label';
			this.selectedIndex = this.dataSource.findIndex((ds) => ds.selected);
		}

		this.$select = this.shadowRoot.querySelector('select');

		super.firstUpdated(changedProperties);
	}

	updated(_changedProperties) {
		super.updated(_changedProperties);

		if (_changedProperties.has('dataSource')) {
			this.setSelected();

			this.addOptions();
		}

		if(_changedProperties.has('readonly')) {
			this.$select = this.shadowRoot.querySelector('select');

			this.addOptions();
		}

		if ((_changedProperties.has('value')
			|| _changedProperties.has('selectedIndex')) && this.selectedIndex >= 0) {
			this.setSelected();
			this.raiseEvent('value-changed');
		}
	}

	addOptions() {
		if(this.$select) {
			this.clearOpetions();

			this.dataSource.forEach((ds, index) => {
				let option = this.renderOption(ds, index);

				this.$select.appendChild(option);
			});

			this.$select.selectedIndex = this.selectedIndex;
		}
	}

	clearOpetions() {
		this.$select.innerHTML = '';
	}

	renderOption(ds, index) {
		const optionLabel = (opt) => (this.displayMember ? opt[this.displayMember] : opt);
		var option = document.createElement('option'),
			val = this.valueMember ? ds[this.valueMember] : ds;

		if (val != null)
			option.setAttribute('value', val);

		if (this.selectedIndex === index)
			option.setAttribute('selected', 'selected');

		if (ds.disabled)
			option.setAttribute('disabled', ds.disabled);

		if (ds.inactive)
			option.setAttribute('class', 'not-present');

		const textNode = document.createTextNode(optionLabel(ds));
		option.appendChild(textNode);

		return option;
	}

	render() {
		const label = this.displayMember && this.selectedItem
			? this.selectedItem[this.displayMember]
			: this.selectedItem;

		return html`
			<span class="ctrl-inner ctrl-btn">
				<span class="ctrl-text">${label}
				<span class="draficon-arr-down"></span>
			</span>
			${renderIf(!this.readonly, () => html`
				<select
					.value=${this.value}
					.selectedIndex=${this.selectedIndex}
					@change=${this.handleChange}
					?disabled=${this.disabled}
					?required=${this.required}
					?readonly=${this.readonly}>
				</select>
			`)}
		`;
	}

	handleChange(e) {
		this.selectedIndex = e.target.selectedIndex;
		this.selectedItem = this.dataSource[e.target.selectedIndex];
		this.value = this.valueMember ? this.selectedItem[this.valueMember] : this.selectedItem;

		this.raiseEvent('change', this.selectedItem);
	}

	setSelected() {
		// selection is set either by value or selected-index
		if (this.value != null) {
			this._selectedIndex = this.dataSource.findIndex(ds => (this.valueMember ? ds[this.valueMember] : ds) == this.value);
			this.selectedItem = this._selectedIndex != -1 ? this.dataSource[this._selectedIndex] : null;
		} else if(!this.nullable) {
			this.selectedItem = this.dataSource[this.selectedIndex];
			this._value = (this.valueMember && this.selectedItem)
				? this.selectedItem[this.valueMember]
				: this.selectedItem;
		}

		this.raiseEvent('value-changed');
	}

	clearSelection() {
		this.selectedIndex = -1;
		this.selectedItem = null;
		this.value = null;
	}
}

window.customElements.get('ctrl-select') || window.customElements.define('ctrl-select', CtrlSelect);
