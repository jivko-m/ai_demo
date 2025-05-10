import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * Sidebar menu component with navigation links
 */
@customElement('sidebar-menu')
export class SidebarMenu extends LitElement {
  @property({ type: String })
  activePage = 'home';

  // Define the navigation items
  private navItems = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'buttons', label: 'Buttons', icon: 'button' },
    { id: 'selects', label: 'Selects', icon: 'select' },
    { id: 'about', label: 'About', icon: 'info' },
    { id: 'logs', label: 'Logs', icon: 'logs' },
    { id: 'playwright', label: 'Playwright Report', icon: 'report' },
    { id: 'coverage', label: 'Test Coverage', icon: 'coverage' }
  ];

  render() {
    return html`
      <nav class="sidebar">
        <div class="sidebar-header">
          <h2>Navigation</h2>
        </div>
        <ul class="sidebar-menu">
          ${this.navItems.map(item => html`
            <li class="sidebar-item ${this.activePage === item.id ? 'active' : ''}">
              <a href="#" @click=${() => this._handleNavClick(item.id)}>
                <span class="icon ${item.icon ? `icon-${item.icon}` : ''}"></span>
                <span class="label">${item.label}</span>
              </a>
            </li>
          `)}
        </ul>
      </nav>
    `;
  }

  private _handleNavClick(pageId: string) {
    this.activePage = pageId;
    // Dispatch a custom event that the parent component can listen for
    this.dispatchEvent(new CustomEvent('page-change', {
      detail: { pageId },
      bubbles: true,
      composed: true
    }));
  }

  static styles = css`
    :host {
      display: block;
      height: 100%;
    }

    .sidebar {
      background-color: #2c3e50;
      color: #ecf0f1;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
    }

    .sidebar-header {
      padding: 1rem;
      border-bottom: 1px solid #34495e;
    }

    .sidebar-header h2 {
      margin: 0;
      font-size: 1.2rem;
      color: #ecf0f1;
    }

    .sidebar-menu {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .sidebar-item {
      padding: 0;
      transition: background-color 0.3s;
    }

    .sidebar-item a {
      display: flex;
      align-items: center;
      padding: 1rem;
      color: #ecf0f1;
      text-decoration: none;
      transition: background-color 0.3s;
    }

    .sidebar-item a:hover {
      background-color: #34495e;
    }

    .sidebar-item.active a {
      background-color: #3498db;
      color: white;
    }

    .icon {
      margin-right: 0.5rem;
      width: 20px;
      height: 20px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .label {
      flex: 1;
    }

    /* Icons - using simple placeholders */
    .icon-home::before { content: "🏠"; }
    .icon-button::before { content: "🔘"; }
    .icon-select::before { content: "📋"; }
    .icon-info::before { content: "ℹ️"; }
    .icon-docs::before { content: "📚"; }
    .icon-logs::before { content: "🩺"; }
    .icon-report::before { content: "🎭"; }
    .icon-coverage::before { content: "📊"; }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'sidebar-menu': SidebarMenu;
  }
}
