import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '../components/button';

/**
 * Buttons demo page component
 */
@customElement('buttons-page')
export class ButtonsPage extends LitElement {
  @state()
  buttonClickCount = 0;

  render() {
    return html`
      <div class="page">
        <h1>Button Components</h1>
        <p>
          Explore various button styles and functionalities. These buttons are built using
          the ctrl-button web component.
        </p>

        <div class="demo-container">
          <div class="demo-row">
            <h3>Basic Button</h3>
            <ctrl-button @click=${this._onBasicButtonClick}>
              Click Me (${this.buttonClickCount})
            </ctrl-button>
          </div>

          <div class="demo-row">
            <h3>Button with Icon</h3>
            <ctrl-button icon="draficon-arr-down" text="Button with Icon"></ctrl-button>
          </div>

          <div class="demo-row">
            <h3>Disabled Button</h3>
            <ctrl-button disabled text="Disabled Button"></ctrl-button>
          </div>

          <div class="demo-row">
            <h3>Button with Action</h3>
            <ctrl-button 
              action="save" 
              text="Action Button" 
              @action=${(e: CustomEvent) => this._onActionEvent(e)}>
            </ctrl-button>
          </div>

          <div class="demo-row">
            <h3>Button with Path</h3>
            <ctrl-button 
              path="/some-path" 
              text="Path Button" 
              @follow=${(e: CustomEvent) => this._onFollowEvent(e)}>
            </ctrl-button>
          </div>
        </div>
      </div>
    `;
  }

  private _onBasicButtonClick() {
    this.buttonClickCount++;
  }

  private _onActionEvent(e: CustomEvent) {
    console.log('Action event:', e.detail);
    alert(`Action triggered: ${e.detail.action}`);
  }

  private _onFollowEvent(e: CustomEvent) {
    console.log('Follow event:', e.detail);
    alert(`Navigate to: ${e.detail.path}`);
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
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'buttons-page': ButtonsPage;
  }
}