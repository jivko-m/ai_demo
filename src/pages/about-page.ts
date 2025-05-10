import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';

/**
 * About page component
 */
@customElement('about-page')
export class AboutPage extends LitElement {
  render() {
    return html`
      <div class="page">
        <h1>About This Demo</h1>
        <p>
          This demo application showcases web components built with Lit, a lightweight library
          for building fast, lightweight web components.
        </p>

        <div class="info-section">
          <h2>Project Structure</h2>
          <p>
            The project is organized into several key directories:
          </p>
          <ul>
            <li><strong>components/</strong> - Reusable web components</li>
            <li><strong>controllers/</strong> - Logic controllers for components</li>
            <li><strong>pages/</strong> - Page components for navigation</li>
            <li><strong>styles/</strong> - Styles for components</li>
          </ul>
        </div>

        <div class="info-section">
          <h2>Component Architecture</h2>
          <p>
            The components in this demo follow a controller-based architecture, separating UI from logic:
          </p>
          <ul>
            <li><strong>Web Components</strong> - UI elements built with Lit</li>
            <li><strong>Controllers</strong> - Handle business logic and state management</li>
            <li><strong>Reactive Properties</strong> - Enable reactive updates to the UI</li>
          </ul>
        </div>

        <div class="info-section">
          <h2>Technologies Used</h2>
          <ul>
            <li><strong>Lit</strong> - For building web components</li>
            <li><strong>TypeScript</strong> - For type safety and better developer experience</li>
            <li><strong>CSS Custom Properties</strong> - For theming and styling</li>
          </ul>
        </div>

        <div class="info-section">
          <h2>Future Enhancements</h2>
          <p>
            Planned enhancements for this demo include:
          </p>
          <ul>
            <li>More component examples</li>
            <li>Theming support</li>
            <li>Form validation examples</li>
            <li>Integration with backend services</li>
          </ul>
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

    h2 {
      color: #3498db;
      margin: 1.5rem 0 0.5rem;
    }

    p {
      color: #34495e;
      line-height: 1.6;
    }

    .info-section {
      margin-top: 2rem;
      background-color: #f8f9fa;
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }

    ul {
      padding-left: 1.5rem;
    }

    li {
      margin-bottom: 0.5rem;
      color: #34495e;
    }

    strong {
      color: #2c3e50;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'about-page': AboutPage;
  }
}