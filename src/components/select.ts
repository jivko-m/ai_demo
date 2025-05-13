import { html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';
import { WebComponent } from '../web-component';
import { selectStyles } from '../styles/select-styles';
import { SelectController } from '../controllers/select-controller';

@customElement('ctrl-select')
export class CtrlSelect extends WebComponent {
  static get styles() {
    const parentStyles = Array.isArray(super.styles) ? super.styles : [super.styles];
    return [...parentStyles, selectStyles];
  }

  // Properties
  @property({ type: String }) name = '';
  @property({ type: String }) text = '';
  @property({ type: Array, attribute: 'data-source' }) dataSource: any[] = [];
  @property({ type: String, attribute: 'display-member' }) displayMember?: string;
  @property({ type: String, attribute: 'value-member' }) valueMember?: string;
  @property({ type: String }) value: any = null;
  @state() asyncContent = false;

  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) required = false;
  @property({ type: Boolean, reflect: true }) readonly = false;
  @property({ type: Boolean, reflect: true }) nullable = false;

  @property({ type: Number, attribute: 'selected-index' }) selectedIndex = 0;
  @property({ attribute: false }) selectedItem?: any;

  // Select controller to handle select functionality
  private selectController: SelectController;
  private $select?: HTMLSelectElement;

  constructor() {
    super();

    // Initialize the select controller
    this.selectController = new SelectController(this);

    // Initialize selectedItem if not set
    if (this.selectedIndex >= 0 && this.dataSource.length > 0) {
      this.selectedItem = this.dataSource[this.selectedIndex];
    }
  }

  // Delegate validation methods to the controller
  get willValidate(): boolean {
    return this.selectController.willValidate;
  }

  setCustomValidity(msg: string): void {
    this.selectController.setCustomValidity(msg);
  }

  checkValidity(): boolean {
    return this.selectController.checkValidity();
  }

  get validity(): ValidityState {
    return this.selectController.validity;
  }

  get validationMessage(): string {
    return this.selectController.validationMessage;
  }

  // Lifecycle methods
  connectedCallback(): void {
    super.connectedCallback();

    // Process ctrl-option elements
    const ctrlOptions = Array.from(this.querySelectorAll('ctrl-option'));
    if (ctrlOptions.length > 0) {
      this.dataSource = ctrlOptions.map(option => ({
        value: option.getAttribute('value') || option.textContent,
        label: option.textContent,
        selected: option.hasAttribute('selected')
      }));

      // Set initial selection
      const selectedIndex = this.dataSource.findIndex(item => item.selected);
      if (selectedIndex >= 0) {
        this.selectedIndex = selectedIndex;
        this.selectedItem = this.dataSource[selectedIndex];
        this.value = this.selectedItem.value;
      }
    }
  }

  firstUpdated(changedProperties: Map<string, any>): void {
    super.firstUpdated(changedProperties);
    this.$select = this.shadowRoot?.querySelector('select') as HTMLSelectElement;
    this.selectController.hostFirstUpdated(this.shadowRoot!);

    // Add options to the select element
    if (this.$select && this.dataSource.length > 0) {
      this.selectController.addOptions();
    }
  }

  updated(changedProperties: Map<string, any>): void {
    super.updated(changedProperties);
    this.selectController.processChanges(changedProperties);

    // Update options when dataSource or readonly changes
    if ((changedProperties.has('dataSource') || changedProperties.has('readonly')) && 
        this.$select && !this.readonly) {
      this.selectController.addOptions();
    }
  }

  // Handle change events
  private handleChange(e: Event): void {
    this.selectController.handleChange(e);
  }

  // Clear selection
  clearSelection(): void {
    this.selectController.clearSelection();
  }

  // Render method
  render() {
    // Determine the label to display
    let label = '';

    // If we have a selectedItem, use it for the label
    if (this.selectedItem) {
      if (this.displayMember && this.selectedItem[this.displayMember] !== undefined) {
        label = this.selectedItem[this.displayMember];
      } else if (typeof this.selectedItem === 'object' && this.selectedItem.label) {
        label = this.selectedItem.label;
      } else if (typeof this.selectedItem === 'object') {
        label = JSON.stringify(this.selectedItem);
      } else {
        label = String(this.selectedItem);
      }
    } 
    // If we have text property set, use it
    else if (this.text) {
      label = this.text;
    }
    // For disabled select with no selectedItem, use the first option's text
    else if (this.disabled && this.dataSource.length > 0) {
      label = this.dataSource[0].label || String(this.dataSource[0]);
    }

    // Create option elements for the select
    const options: ReturnType<typeof html>[] = [];
    if (this.nullable) {
      options.push(html`<option value=""></option>`);
    }

    // Add options from dataSource
    for (let i = 0; i < this.dataSource.length; i++) {
      const item = this.dataSource[i];
      const value = this.valueMember && item[this.valueMember] !== undefined 
        ? item[this.valueMember] 
        : item.value !== undefined ? item.value : i;
      const text = this.displayMember && item[this.displayMember] !== undefined
        ? item[this.displayMember]
        : item.label !== undefined ? item.label : String(item);
      const selected = i === this.selectedIndex;

      options.push(html`<option value="${value}" ?selected=${selected}>${text}</option>`);
    }

    return html`
      <span class="ctrl-inner ctrl-btn">
        <span class="ctrl-text">${label}</span>
        <span class="draficon-arr-down"></span>
      </span>
      ${when(!this.readonly, 
        () => html`
          <select
            .value=${this.value}
            .selectedIndex=${this.selectedIndex}
            @change=${this.handleChange}
            ?disabled=${this.disabled}
            ?required=${this.required}>
            ${options}
          </select>
        `,
        () => html``
      )}
    `;
  }
}