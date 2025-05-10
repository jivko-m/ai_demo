import { css } from 'lit';

export const buttonStyles = css`
  :host {                    
    cursor: pointer;
    display: inline-block;
    background-clip: padding-box;
    background: var(--bgr-1);
    border: none;
    white-space: nowrap;
    padding: 0.4em 0.5em;
  }

  :host(:hover) {
    background: var(--bgr-1-hover);
  }

  .ficon {
    display: inline-block;
  }

  :host([disabled]) {
    background: var(--bgr-disabled-btn);
    color: var(--btn-color-disabled);
    cursor: auto;
  }
`;