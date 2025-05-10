import type { ReactiveController, ReactiveControllerHost } from 'lit';

export interface ISelectControllerHost extends ReactiveControllerHost {
  name: string;
  text: string;
  dataSource: any[];
  displayMember?: string;
  valueMember?: string;
  value: any;
  disabled: boolean;
  required: boolean;
  readonly: boolean;
  nullable: boolean;
  selectedIndex: number;
  selectedItem?: any;
  raiseEvent: (type: string, data?: Record<string, unknown>) => boolean;
}

/**
 * Controller for select functionality
 * Handles data source management, selection, and validation
 */
export class SelectController implements ReactiveController {
  private host: ISelectControllerHost;
  private $select?: HTMLSelectElement;

  constructor(host: ISelectControllerHost) {
    this.host = host;

    // Register the controller with the host
    this.host.addController(this);
  }

  /** Called when the host is connected to the DOM */
  hostConnected(): void {
    // No specific actions needed on connection
  }

  /** Called when the host is first updated */
  hostFirstUpdated(shadowRoot: ShadowRoot): void {
    this.$select = shadowRoot.querySelector('select') as HTMLSelectElement;

    // Process any ctrl-option elements
    const ctrlOptions = Array.from(this.host.querySelectorAll('ctrl-option'));
    if (ctrlOptions.length > 0) {
      this.host.dataSource = this.optionsToDataSource(ctrlOptions);
      this.host.valueMember = 'value';
      this.host.displayMember = 'label';
      this.host.selectedIndex = this.host.dataSource.findIndex((ds) => ds.selected);
    }
  }

  /** Called when the host is disconnected from the DOM */
  hostDisconnected(): void {
    // No specific cleanup needed
  }

  /** Called when the host is updated */
  hostUpdated(changedProperties: Map<string, any>): void {
    if (changedProperties.has('dataSource')) {
      this.setSelected();
      this.addOptions();
    }

    if (changedProperties.has('readonly')) {
      this.$select = this.host.shadowRoot?.querySelector('select') as HTMLSelectElement;
      this.addOptions();
    }

    if ((changedProperties.has('value') || changedProperties.has('selectedIndex')) && this.host.selectedIndex >= 0) {
      this.setSelected();
      this.host.raiseEvent('value-changed');
    }
  }

  /**
   * Converts ctrl-option elements to data source objects
   */
  private optionsToDataSource(list: Element[]): any[] {
    return list.map((l) => ({
      value: l.getAttribute('value') || l.textContent,
      label: l.textContent,
      selected: l.hasAttribute('selected')
    }));
  }

  /**
   * Adds options to the select element
   */
  addOptions(): void {
    if (this.$select) {
      this.clearOptions();

      this.host.dataSource.forEach((ds, index) => {
        const option = this.renderOption(ds, index);
        this.$select?.appendChild(option);
      });

      this.$select.selectedIndex = this.host.selectedIndex;
    }
  }

  /**
   * Clears all options from the select element
   */
  clearOptions(): void {
    if (this.$select) {
      while (this.$select.firstChild) {
        this.$select.removeChild(this.$select.firstChild);
      }
    }
  }

  /**
   * Creates an option element for the select
   */
  private renderOption(ds: any, index: number): HTMLOptionElement {
    const optionLabel = (opt: any) => (this.host.displayMember ? opt[this.host.displayMember] : opt);
    const option = document.createElement('option');
    const val = this.host.valueMember ? ds[this.host.valueMember] : ds;

    if (val != null) {
      option.setAttribute('value', val);
    }

    if (this.host.selectedIndex === index) {
      option.setAttribute('selected', 'selected');
    }

    if (ds.disabled) {
      option.setAttribute('disabled', 'true');
    }

    if (ds.inactive) {
      option.setAttribute('class', 'not-present');
    }

    const textNode = document.createTextNode(optionLabel(ds));
    option.appendChild(textNode);

    return option;
  }

  /**
   * Handles change events on the select element
   */
  handleChange(e: Event): void {
    const target = e.target as HTMLSelectElement;
    this.host.selectedIndex = target.selectedIndex;
    this.host.selectedItem = this.host.dataSource[target.selectedIndex];
    this.host.value = this.host.valueMember 
      ? this.host.selectedItem[this.host.valueMember] 
      : this.host.selectedItem;

    this.host.raiseEvent('change', this.host.selectedItem);
  }

  /**
   * Sets the selected item based on value or selectedIndex
   */
  setSelected(): void {
    // Selection is set either by value or selected-index
    if (this.host.value != null) {
      const selectedIndex = this.host.dataSource.findIndex(
        ds => (this.host.valueMember ? ds[this.host.valueMember] : ds) == this.host.value
      );

      this.host.selectedIndex = selectedIndex;
      this.host.selectedItem = selectedIndex !== -1 ? this.host.dataSource[selectedIndex] : null;
    } else if (!this.host.nullable) {
      this.host.selectedItem = this.host.dataSource[this.host.selectedIndex];
      this.host.value = (this.host.valueMember && this.host.selectedItem)
        ? this.host.selectedItem[this.host.valueMember]
        : this.host.selectedItem;
    }

    // Raise the value-changed event
    this.host.raiseEvent('value-changed');
  }

  /**
   * Clears the current selection
   */
  clearSelection(): void {
    this.host.selectedIndex = -1;
    this.host.selectedItem = null;
    this.host.value = null;
  }

  /**
   * Form validation methods
   */
  get willValidate(): boolean {
    return this.$select ? this.$select.willValidate : true;
  }

  setCustomValidity(msg: string): void {
    if (this.$select) {
      this.$select.setCustomValidity(msg);
    }
  }

  checkValidity(): boolean {
    return this.$select ? this.$select.checkValidity() : true;
  }

  get validity(): ValidityState {
    return this.$select ? this.$select.validity : {} as ValidityState;
  }

  get validationMessage(): string {
    return this.$select ? this.$select.validationMessage : '';
  }
}
