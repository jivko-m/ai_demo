import { WebComponent, html, css, unsafeHTML } from "../web-component";
import { property, customElement, state } from "lit/decorators.js";
import MarkdownIt from "markdown-it";

@customElement('md-view')
export class CtrlMDView extends WebComponent {

    @property({type: String}) path = '';
    @state() private content = '';
    @state() private error: string | null = null;

    private md = new MarkdownIt();
    
    constructor() {
        super();
    }

    async updated(changedProperties: Map<string, unknown>) {
        if (changedProperties.has('path') && this.path) {
            await this.fetchMarkdownContent();
        }
    }

    async fetchMarkdownContent() {
        if (!this.path) return;

        this.error = null;

        try {
            const response = await fetch(this.path);

            if (!response.ok) {
                throw new Error(`Failed to load markdown file: ${response.statusText}`);
            }

            const text = await response.text();
            this.content = this.md.render(text);
        } catch (err) {
            this.error = err instanceof Error ? err.message : 'An unknown error occurred';
            console.error('Error loading markdown file:', err);
        }
    }

    render() {
        if (this.error) {
            return html`<div class="error">Error: ${this.error}</div>`;
        }

        if (!this.content) {
            return html`<div class="empty">No content to display. Please provide a valid path.</div>`;
        }

        return html`
            <div class="markdown-content">
                ${unsafeHTML(this.content)}
            </div>
        `;
    }

    static styles = css`
            :host {
                display: block;
                font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                line-height: 1.5;
                color: var(--md-text-color, #333);
            }

            .markdown-content {
                padding: 1rem;
            }

            .markdown-content h1 {
                font-size: 2rem;
                margin-top: 1.5rem;
                margin-bottom: 1rem;
                border-bottom: 1px solid #eaecef;
                padding-bottom: 0.3rem;
            }

            .markdown-content h2 {
                font-size: 1.5rem;
                margin-top: 1.5rem;
                margin-bottom: 1rem;
                border-bottom: 1px solid #eaecef;
                padding-bottom: 0.3rem;
            }

            .markdown-content h3 {
                font-size: 1.25rem;
                margin-top: 1.5rem;
                margin-bottom: 1rem;
            }

            .markdown-content p {
                margin-top: 0;
                margin-bottom: 1rem;
            }

            .markdown-content ul, .markdown-content ol {
                margin-top: 0;
                margin-bottom: 1rem;
                padding-left: 2rem;
            }

            .markdown-content code {
                font-family: monospace;
                background-color: rgba(27, 31, 35, 0.05);
                padding: 0.2em 0.4em;
                border-radius: 3px;
            }

            .markdown-content pre {
                background-color: #f6f8fa;
                border-radius: 3px;
                padding: 1rem;
                overflow: auto;
            }

            .markdown-content pre code {
                background-color: transparent;
                padding: 0;
            }

            .markdown-content hr {
                height: 0.25em;
                padding: 0;
                margin: 24px 0;
                background-color: #e1e4e8;
                border: 0;
            }

            .loading, .error, .empty {
                padding: 1rem;
                text-align: center;
            }

            .error {
                color: #721c24;
                background-color: #f8d7da;
                border: 1px solid #f5c6cb;
                border-radius: 4px;
            }
        `;
}
