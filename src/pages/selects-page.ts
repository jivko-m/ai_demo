import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '../components/select';
import '../components/option';

/**
 * Selects demo page component
 */
@customElement('selects-page')
export class SelectsPage extends LitElement {
  @state()
  selectedValue: string | null = null;

  @state()
  selectedItem: any = null;

  // Sample data for the select component
  private fruits = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' },
    { value: 'orange', label: 'Orange' },
    { value: 'strawberry', label: 'Strawberry' }
  ];

  render() {
    return html`
      <div class="page">
        <h1>Select Components</h1>
        <p>
          Explore various select dropdown components. These selects are built using
          the ctrl-select web component.
        </p>

        <div class="demo-container">
          <div class="demo-row">
            <h3>Basic Select</h3>
            <div class="select-demo">
              <ctrl-select
                .dataSource=${this.fruits}
                display-member="label"
                value-member="value"
                @change=${this._onSelectChange}>
              </ctrl-select>
              ${this.selectedValue ? html`<p class="selection-info">Selected value: ${this.selectedValue}</p>` : ''}
              ${this.selectedItem ? html`<p class="selection-info">Selected item: ${JSON.stringify(this.selectedItem)}</p>` : ''}
            </div>
          </div>

          <div class="demo-row">
            <h3>Disabled Select</h3>
            <ctrl-select
              .dataSource=${this.fruits}
              display-member="label"
              value-member="value"
              disabled>
            </ctrl-select>
          </div>

          <div class="demo-row">
            <h3>Required Select</h3>
            <ctrl-select
              .dataSource=${this.fruits}
              display-member="label"
              value-member="value"
              required>
            </ctrl-select>
          </div>

          <div class="demo-row">
            <h3>Readonly Select</h3>
            <ctrl-select
              .dataSource=${this.fruits}
              display-member="label"
              value-member="value"
              readonly>
            </ctrl-select>
          </div>

          <div class="demo-row">
            <h3>Select with Options</h3>
            <ctrl-select>
              <ctrl-option value="1">Option 1</ctrl-option>
              <ctrl-option value="2">Option 2</ctrl-option>
              <ctrl-option value="3" selected>Option 3</ctrl-option>
              <ctrl-option value="4">Option 4</ctrl-option>
            </ctrl-select>
          </div>

          <div class="demo-row">
            <h3>Nullable Select</h3>
            <ctrl-select
              .dataSource=${this.fruits}
              display-member="label"
              value-member="value"
              nullable>
            </ctrl-select>
          </div>
        </div>
      </div>
    `;
  }

  private _onSelectChange(e: CustomEvent) {
    this.selectedValue = e.target.value;
    this.selectedItem = e.detail;
    console.log('Select changed:', e.detail);
  }

  static styles = css`
    :host {
      display: block;
    }

    .page {
      padding: 1rem;
    }

    h1 {
      color: #2c3e50;
      margin-bottom: 1rem;
    }

    p {
      color: #34495e;
      line-height: 1.6;
      margin-bottom: 2rem;
    }

    .demo-container {
      background-color: #f9f9f9;
      border-radius: 8px;
      padding: 1.5rem;
    }

    .demo-row {
      display: flex;
      align-items: center;
      margin-bottom: 1.5rem;
      padding: 1rem;
      background-color: white;
      border-radius: 4px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    h3 {
      color: #555;
      margin: 0 1rem 0 0;
      min-width: 150px;
    }

    .select-demo {
      display: flex;
      flex-direction: column;
    }

    .selection-info {
      margin: 0.5rem 0 0 0;
      font-size: 0.9rem;
      color: #666;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'selects-page': SelectsPage;
  }
}