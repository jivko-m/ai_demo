import { css } from 'lit';

export const buttonStyles = css`
  :host {                    
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-clip: padding-box;
    background: var(--bgr-1);
    border: none;
    border-radius: var(--border-radius, 0.2em);
    white-space: nowrap;
    padding: 0.5em 0.8em;
    transition: background-color 0.2s ease, box-shadow 0.2s ease;
    min-height: 2.2em;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  }

  :host(:hover) {
    background: var(--bgr-1-hover);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  :host(:focus), :host(.focus) {
    outline: none;
    box-shadow: var(--focus-border), 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .ctrl-text {
    margin: 0 0.2em;
  }

  .ficon, [class^="draficon-"] {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.4em;
  }

  :host([disabled]) {
    background: var(--bgr-disabled-btn);
    color: var(--btn-color-disabled);
    cursor: not-allowed;
    box-shadow: none;
  }
`;
