import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '../components/select';

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
    const target = e.target as HTMLSelectElement;
    if (target) {
      this.selectedValue = target.value;
    }
    this.selectedItem = e.detail;
    console.log('Select changed:', e.detail);
  }

  static styles = css`
    :host {
      display: block;
      font-family: var(--font-family, 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif);
      --primary-color: #4a90e2;
      --secondary-color: #34495e;
    }

    .page {
      padding: 1.5rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    h1 {
      color: var(--secondary-color, #2c3e50);
      margin-bottom: 1.2rem;
      font-weight: 600;
      font-size: 2rem;
      border-bottom: 2px solid #eee;
      padding-bottom: 0.5rem;
    }

    p {
      color: #34495e;
      line-height: 1.7;
      margin-bottom: 2rem;
      font-size: 1.05rem;
    }

    .demo-container {
      background-color: #f9f9f9;
      border-radius: 10px;
      padding: 2rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      border: 1px solid #eaeaea;
    }

    .demo-row {
      display: flex;
      align-items: center;
      margin-bottom: 2rem;
      padding: 1.5rem;
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.08);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      border: 1px solid #f0f0f0;
    }
    
    .demo-row:last-child {
      margin-bottom: 0;
    }

    h3 {
      color: var(--secondary-color, #444);
      margin: 0 1.5rem 0 0;
      min-width: 180px;
      font-weight: 500;
      font-size: 1.1rem;
    }

    .select-demo {
      display: flex;
      flex-direction: column;
      flex: 1;
    }

    ctrl-select {
      min-width: 250px;
      max-width: 350px;
    }

    .selection-info {
      margin: 0.8rem 0 0 0;
      font-size: 0.9rem;
      color: #666;
      background-color: #f5f9ff;
      padding: 0.5rem 0.8rem;
      border-radius: 4px;
      border-left: 3px solid var(--primary-color, #4a90e2);
    }

    @media (max-width: 768px) {
      .demo-row {
        flex-direction: column;
        align-items: flex-start;
      }

      h3 {
        margin: 0 0 1rem 0;
      }

      ctrl-select {
        width: 100%;
        max-width: none;
      }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'selects-page': SelectsPage;
  }
}
