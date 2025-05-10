import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';

/**
 * Home page component
 */
@customElement('home-page')
export class HomePage extends LitElement {
  render() {
    return html`
      <div class="page">
        <h1>Welcome to the Component Demo</h1>
        <p>
          This demo showcases various web components built with Lit. Use the sidebar navigation
          to explore different components and their features.
        </p>
        <div class="features">
          <div class="feature-card">
            <h3>Buttons</h3>
            <p>Explore various button styles and functionalities.</p>
          </div>
          <div class="feature-card">
            <h3>Selects</h3>
            <p>Discover dropdown select components with different options.</p>
          </div>
          <div class="feature-card">
            <h3>More Coming Soon</h3>
            <p>Stay tuned for more components and features.</p>
          </div>
        </div>
      </div>
    `;
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
    }

    .features {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      margin-top: 2rem;
    }

    .feature-card {
      background-color: #f8f9fa;
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      flex: 1;
      min-width: 250px;
    }

    .feature-card h3 {
      color: #3498db;
      margin-top: 0;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'home-page': HomePage;
  }
}