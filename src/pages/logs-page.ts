import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '../components/md-view';

@customElement('logs-page')
export class LogsPage extends LitElement {
  @state()
  activeTab = 'markdown-examples';

  // List of available HTML files
  private docFiles = [
      { id: 'junie-plans', label: 'Junie Plans', action: async() => import('../docs/junie-plans.md') },
      { id: 'ctrl-button', label: 'Button Component', action: async() => import('../docs/ctrl-button.md') },
      { id: 'ctrl-select', label: 'Select Component', action: async() => import('../docs/ctrl-select.md') },
      { id: 'style-refactor', label: 'Style Refactor', action: async() => import('../docs/style-refactoring-decision.md') },
    ];

  render() {
    return html`
      <div class="page">
        <h1>Documentation Logs</h1>
        <p>
          View the generated documentation from Markdown files. Use the tabs below to navigate
          between different documentation pages.
        </p>

        <div class="tabs-container">
          <div class="tabs">
            ${this.docFiles.map(file => html`
              <button 
                class="tab ${this.activeTab === file.id ? 'active' : ''}"
                @click=${() => this._setActiveTab(file.id)}>
                ${file.label}
              </button>
            `)}
          </div>

          <div class="tab-content">
            <md-view .id=${this._getActiveFilePath()}></md-view>
          </div>
        </div>
      </div>
    `;
  }

  private _setActiveTab(tabId: string) {
    this.activeTab = tabId;
  }

  private _getActiveFilePath() {
      const activeFile = this.docFiles.find(file => file.id === this.activeTab);
      return activeFile ? activeFile.id : this.docFiles[0].id;
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

    .tabs-container {
      background-color: #f9f9f9;
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }

    .tabs {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1rem;
      border-bottom: 1px solid #ddd;
      padding-bottom: 1rem;
    }

    .tab {
      padding: 0.5rem 1rem;
      background-color: #e9e9e9;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.9rem;
      transition: background-color 0.3s;
    }

    .tab:hover {
      background-color: #d4d4d4;
    }

    .tab.active {
      background-color: #3498db;
      color: white;
    }

    .tab-content {
      background-color: white;
      border-radius: 4px;
      min-height: 500px;
    }

    .content-frame {
      width: 100%;
      height: 800px;
      border: none;
      border-radius: 4px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'logs-page': LogsPage;
  }
}