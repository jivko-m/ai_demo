import { selectStyles } from '../styles/select-styles';
import { WebComponent, html, renderIf } from '../web-component';
import { customElement, property, state } from 'lit/decorators.js';

const optionsToDataSource = (list: HTMLElement[]): Array<{
  value: string;
  label: string;
  selected: boolean;
}> => list.map((l) => ({
  value: l.getAttribute('value') || l.innerText,
  label: l.innerText,
  selected: l.hasAttribute('selected')
}));

interface DataSourceItem {
  [key: string]: any;
  disabled?: boolean;
  inactive?: boolean;
}

@customElement('ctrl-select')
export class CtrlSelect extends WebComponent {
  static styles = selectStyles;

  @property({ type: String }) name = '';
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean }) required = false;
  @property({ type: Boolean }) readonly = false;
  @property({ type: Boolean, reflect: true }) nullable = false;
  @property({ type: String }) text = '';
  @property({ attribute: 'display-member' }) displayMember?: string;
  @property({ attribute: 'value-member' }) valueMember?: string;
  @property({ attribute: 'selected-index', type: Number }) 
  get selectedIndex(): number {
    return this._selectedIndex;
  }
  set selectedIndex(data: number) {
    const oldVal = this._selectedIndex;
    this._selectedIndex = data;

    if (this.$select) this.$select.selectedIndex = data;

    this.setSelected();

    this.requestUpdate('selectedIndex', oldVal);
  }

  @property({ type: String })
  get value(): any {
    // When nullable is true and selectedIndex is -1 (no item selected), return null
    if (this.nullable && this.selectedIndex === -1) {
      return null;
    }
    return this._value;
  }
  set value(data: any) {
    if (!this.nullable && data == null)
      return;

    const oldVal = this._value;
    this._value = data;

    if (this.$select)
      this.$select.value = data;

    this.setSelected();

    this.requestUpdate('value', oldVal);
  }

  @property({ attribute: 'data-source', type: Array })
  get dataSource(): Array<DataSourceItem> {
    return this._dataSource;
  }
  set dataSource(data: Array<DataSourceItem>) {
    if (data == null)
      return;

    if (this.nullable && data.length > 0) {
      if (this.displayMember && this.valueMember) {
        const nullItem: DataSourceItem = { [this.displayMember]: '', [this.valueMember]: null };
        data = [nullItem, ...data];
      } else {
        data = ['', ...data];
      }

      // When nullable is true, set selectedIndex to -1 and value to null
      this._selectedIndex = -1;
      this._value = null;
      this.selectedItem = null;
    }

    const oldVal = this._dataSource;
    this._dataSource = data;

    this.requestUpdate('dataSource', oldVal);
  }

  @state() selectedItem: DataSourceItem | null = null;
  @state() private _selectedIndex = 0;
  @state() private _value: any = null;
  @state() private _dataSource: Array<DataSourceItem> = [];

  private $select: HTMLSelectElement | null = null;
  private $input: HTMLSelectElement | null = null;

  constructor() {
    super();
    this.dataSource = [];
    this.displayMember = undefined;
    this.valueMember = undefined;
    this.value = null;
    this.selectedIndex = this.nullable ? -1 : 0;
    this.selectedItem = null;
  }

  firstUpdated(changedProperties: Map<string, any>): void {
    const ctrlOptions = Array.from(this.querySelectorAll('ctrl-option'));
    if (ctrlOptions.length > 0) {
      this.dataSource = optionsToDataSource(ctrlOptions);
      this.valueMember = 'value';
      this.displayMember = 'label';
      this.selectedIndex = this.dataSource.findIndex((ds) => ds.selected);
    }

    this.$input = this.shadowRoot?.querySelector('select') || null;
    this.$select = this.$input;
  }

  updated(changedProperties: Map<string, any>): void {
    super.updated(changedProperties);

    if (changedProperties.has('dataSource')) {
      this.setSelected();
      this.addOptions();
    }

    if (changedProperties.has('readonly')) {
      this.$select = this.shadowRoot?.querySelector('select') || null;
      this.addOptions();
    }

    if (changedProperties.has('nullable') && this.nullable) {
      this._value = null;
      this.selectedItem = null;
      this._selectedIndex = -1;
    }

    if ((changedProperties.has('value')
      || changedProperties.has('selectedIndex')) && this.selectedIndex >= 0) {
      this.setSelected();
      this.raiseEvent('value-changed');
    }
  }

  addOptions(): void {
    if (this.$select) {
      this.clearOptions();

      this.dataSource.forEach((ds, index) => {
        let option = this.renderOption(ds, index);
        if (this.$select) {
          this.$select.appendChild(option);
        }
      });

      this.$select.selectedIndex = this.selectedIndex;
    }
  }

  clearOptions(): void {
    if (this.$select) {
      this.$select.innerHTML = '';
    }
  }

  renderOption(ds: DataSourceItem, index: number): HTMLOptionElement {
    const optionLabel = (opt: DataSourceItem): string => 
      (this.displayMember ? String(opt[this.displayMember]) : String(opt));

    const option = document.createElement('option');
    const val = this.valueMember ? ds[this.valueMember] : ds;

    if (val != null) {
      option.setAttribute('value', String(val));
    }

    if (this.selectedIndex === index) {
      option.setAttribute('selected', 'selected');
    }

    if (ds.disabled) {
      option.setAttribute('disabled', String(ds.disabled));
    }

    if (ds.inactive) {
      option.setAttribute('class', 'not-present');
    }

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

  handleChange(e: Event): void {
    const target = e.target as HTMLSelectElement;
    this.selectedIndex = target.selectedIndex;
    this.selectedItem = this.dataSource[target.selectedIndex];
    this.value = this.valueMember && this.selectedItem 
      ? this.selectedItem[this.valueMember] 
      : this.selectedItem;

    this.raiseEvent('change', this.selectedItem);
  }

  setSelected(): void {
    // selection is set either by value or selected-index
    if (this.value != null) {
      this._selectedIndex = this.dataSource.findIndex(ds => 
        (this.valueMember ? ds[this.valueMember] : ds) == this.value);
      this.selectedItem = this._selectedIndex != -1 ? this.dataSource[this._selectedIndex] : null;
    } else if (this.nullable && this.selectedIndex === -1) {
      // When nullable is true and selectedIndex is -1, ensure selectedItem and _value are null
      this.selectedItem = null;
      this._value = null;
    } else {
      // Otherwise, set selectedItem and _value based on selectedIndex
      this.selectedItem = this.dataSource[this.selectedIndex];
      this._value = (this.valueMember && this.selectedItem)
        ? this.selectedItem[this.valueMember]
        : this.selectedItem;
    }

    this.raiseEvent('value-changed');
  }

  clearSelection(): void {
    this.selectedIndex = -1;
    this.selectedItem = null;
    this.value = null;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ctrl-select': CtrlSelect;
  }
}
