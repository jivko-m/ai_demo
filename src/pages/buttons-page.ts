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
            <div class="button-container">
              <ctrl-button @click=${this._onBasicButtonClick}>
                Click Me (${this.buttonClickCount})
              </ctrl-button>
            </div>
          </div>

          <div class="demo-row">
            <h3>Button with Icon</h3>
            <div class="button-container">
              <ctrl-button icon="draficon-arr-down" text="Button with Icon"></ctrl-button>
            </div>
          </div>

          <div class="demo-row">
            <h3>Disabled Button</h3>
            <div class="button-container">
              <ctrl-button disabled text="Disabled Button"></ctrl-button>
            </div>
          </div>

          <div class="demo-row">
            <h3>Button with Action</h3>
            <div class="button-container">
              <ctrl-button 
                action="save" 
                text="Action Button" 
                @action=${(e: CustomEvent) => this._onActionEvent(e)}>
              </ctrl-button>
            </div>
          </div>

          <div class="demo-row">
            <h3>Button with Path</h3>
            <div class="button-container">
              <ctrl-button 
                path="/some-path" 
                text="Path Button" 
                @follow=${(e: CustomEvent) => this._onFollowEvent(e)}>
              </ctrl-button>
            </div>
          </div>

          <div class="demo-row">
            <h3>Button Variations</h3>
            <div class="button-container">
              <ctrl-button text="Primary"></ctrl-button>
              <ctrl-button text="Secondary" style="--bgr-1: var(--secondary-color); --bgr-1-hover: #27ae60;"></ctrl-button>
              <ctrl-button text="Accent" style="--bgr-1: var(--accent-color); --bgr-1-hover: #c0392b;"></ctrl-button>
              <ctrl-button text="Purple" style="--bgr-1: #9b59b6; --bgr-1-hover: #8e44ad;"></ctrl-button>
              <ctrl-button text="Orange" style="--bgr-1: #f39c12; --bgr-1-hover: #d35400;"></ctrl-button>
            </div>
          </div>

          <div class="demo-row">
            <h3>Icon Buttons</h3>
            <div class="button-container">
              <ctrl-button icon="draficon-arr-down" text="Down"></ctrl-button>
              <ctrl-button icon="draficon-arr-up" text="Up" style="--bgr-1: var(--secondary-color); --bgr-1-hover: #27ae60;"></ctrl-button>
              <ctrl-button icon="draficon-arr-left" text="Left" style="--bgr-1: var(--accent-color); --bgr-1-hover: #c0392b;"></ctrl-button>
              <ctrl-button icon="draficon-arr-right" text="Right" style="--bgr-1: #9b59b6; --bgr-1-hover: #8e44ad;"></ctrl-button>
            </div>
          </div>

          <div class="demo-row">
            <h3>Compact Buttons</h3>
            <div class="button-container">
              <ctrl-button class="compact" text="Compact"></ctrl-button>
              <ctrl-button class="compact" icon="draficon-arr-down" text="With Icon"></ctrl-button>
              <ctrl-button class="compact" style="--bgr-1: var(--secondary-color); --bgr-1-hover: #27ae60;" text="Green"></ctrl-button>
              <ctrl-button class="compact" style="--bgr-1: var(--accent-color); --bgr-1-hover: #c0392b;" text="Red"></ctrl-button>
              <ctrl-button class="compact" disabled text="Disabled"></ctrl-button>
            </div>
            <p class="description">Compact buttons are useful for toolbars and space-constrained interfaces.</p>
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
      --primary-color: #3498db;
      --secondary-color: #2ecc71;
      --accent-color: #e74c3c;
      --text-color: #2c3e50;
      --background-color: #f8f9fa;
      --card-background: #ffffff;
    }

    .page {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    h1 {
      color: var(--text-color);
      margin-bottom: 1rem;
      font-size: 2.2rem;
      font-weight: 600;
      border-bottom: 2px solid var(--primary-color);
      padding-bottom: 0.5rem;
      display: inline-block;
    }

    p {
      color: #34495e;
      line-height: 1.8;
      margin-bottom: 2.5rem;
      font-size: 1.1rem;
      max-width: 800px;
    }

    .demo-container {
      background-color: var(--background-color);
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    }

    .demo-row {
      display: flex;
      flex-direction: column;
      margin-bottom: 2rem;
      padding: 1.5rem;
      background-color: var(--card-background);
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .demo-row h3 {
      color: var(--text-color);
      margin: 0 0 1rem 0;
      font-size: 1.3rem;
      font-weight: 500;
      border-left: 3px solid var(--primary-color);
      padding-left: 0.8rem;
    }

    .button-container {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      margin-top: 0.5rem;
    }

    /* Style variations for different button types */
    .demo-row:nth-child(2) ctrl-button {
      --bgr-1: var(--secondary-color);
      --bgr-1-hover: #27ae60;
    }

    .demo-row:nth-child(4) ctrl-button {
      --bgr-1: var(--accent-color);
      --bgr-1-hover: #c0392b;
    }

    .demo-row:nth-child(5) ctrl-button {
      --bgr-1: #9b59b6;
      --bgr-1-hover: #8e44ad;
    }

    /* Styles for button variations section */
    .demo-row:nth-child(6) .button-container {
      display: flex;
      flex-wrap: wrap;
      gap: 0.8rem;
    }

    /* Styles for icon buttons section */
    .demo-row:nth-child(7) .button-container {
      display: flex;
      flex-wrap: wrap;
      gap: 0.8rem;
    }

    /* Styles for compact buttons section */
    .demo-row:nth-child(8) .button-container {
      display: flex;
      flex-wrap: wrap;
      gap: 0.8rem;
    }

    .description {
      margin-top: 1rem;
      font-size: 0.9rem;
      color: #666;
      font-style: italic;
      line-height: 1.4;
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
      .page {
        padding: 1rem;
      }

      .demo-container {
        padding: 1rem;
      }

      .demo-row {
        padding: 1rem;
      }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'buttons-page': ButtonsPage;
  }
}
