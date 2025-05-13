import { LitElement, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import './components/button';
import './components/sidebar-menu';
import './pages/home-page';
import './pages/buttons-page';
import './pages/logs-page';
import './pages/selects-page';

/**
 * Demo app for ctrl-button and ctrl-select components
 */
@customElement('demo-app')
export class DemoApp extends LitElement {
  @property({ type: String })
  title = 'Component Demo Page';

  @state()
  buttonClickCount = 0;

  @state()
  selectedValue: string | null = null;

  @state()
  selectedItem: any = null;

  @state()
  currentPage = 'home';

  render() {
    return html`
      <div class="app-container">
        <aside class="sidebar">
          <sidebar-menu 
            activePage=${this.currentPage}
            @page-change=${this._handlePageChange}>
          </sidebar-menu>
        </aside>

        <main class="main-content">
          <div class="container">
            <h1>${this.title}</h1>

            ${this._renderCurrentPage()}
          </div>
        </main>
      </div>
    `;
  }

  private _renderCurrentPage() {
    switch(this.currentPage) {
      case 'home':
        return html`<home-page></home-page>`;
      case 'buttons':
        return html`<buttons-page></buttons-page>`;
      case 'selects':
        return html`<selects-page></selects-page>`;
      case 'logs':
        return html`<logs-page></logs-page>`;
      case 'coverage':
        return html`<iframe src="/coverage/index.html" class="iframe-content"></iframe>`;
      default:
        return html`<home-page></home-page>`;
    }
  }

  private _handlePageChange(e: CustomEvent) {
    this.currentPage = e.detail.pageId;

    // Handle external links
    if (e.detail.external) {
      window.open(e.detail.url, '_blank');
      return;
    }

    console.log('Page changed to:', this.currentPage);
  }

  static styles = css`
    :host {
      display: block;
      font-family: Arial, sans-serif;
      height: 100vh;
    }

    .app-container {
      display: flex;
      height: 100%;
    }

    .sidebar {
      width: 250px;
      height: 100%;
      flex-shrink: 0;
    }

    .main-content {
      flex: 1;
      overflow-y: auto;
      background-color: #f5f5f5;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }

    h1 {
      color: #333;
      text-align: center;
      margin-top: 0;
    }

    h2 {
      color: #444;
      border-bottom: 1px solid #ddd;
      padding-bottom: 0.5rem;
    }

    h3 {
      color: #555;
      margin-right: 1rem;
      min-width: 150px;
    }

    p {
      margin-left: 1rem;
      color: #666;
    }

    .iframe-content {
      width: 100%;
      height: 800px;
      border: none;
      border-radius: 4px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }

    /* Responsive layout for smaller screens */
    @media (max-width: 768px) {
      .app-container {
        flex-direction: column;
      }

      .sidebar {
        width: 100%;
        height: auto;
      }

      .main-content {
        height: calc(100% - 60px);
      }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'demo-app': DemoApp;
  }
}
