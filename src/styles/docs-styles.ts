import { css } from 'lit';

export const docsStyles = css`
    :host {
        display: block;
        font-family: Arial, sans-serif;
        line-height: 1.6;
        padding: 16px;
    }
    h1, h2, h3 {
        color: #333;
    }
    pre {
        background: #f4f4f4;
        padding: 8px;
        border-radius: 4px;
        overflow-x: auto;
    }
    code {
        font-family: 'Courier New', Courier, monospace;
        background: #f4f4f4;
        padding: 2px 4px;
        border-radius: 4px;
    }

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
