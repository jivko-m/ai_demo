import { css } from 'lit';

export const selectStyles = css`
    :host {
        border: 1px solid var(--border-color, #ccc);
        border-radius: var(--border-radius, 0.25em);
        padding: 0.2rem 0.4rem;
        position: relative;
        display: block;
        min-height: 2.0em;
        background-color: var(--bgr-2, #fff);
        transition: all 0.2s ease-in-out;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
        font-family: var(--font-family, sans-serif);
    }

    :host(:hover) {
        border-color: var(--border-color-hover, #7a7a7a);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .ctrl-inner {
        display: flex;
        align-items: center;
        width: 100%;
        height: var(--floated-slotted-elm-inner-padding);
        line-height: 1.2rem;
        padding-right: 1.6em;
    }

    .ctrl-text {
        display: block;
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: var(--text-color, #333);
        font-size: 0.9rem;
    }

    .draficon-arr-down {
        font-size: 0.85em;
        position: absolute;
        right: 0.6rem;
        top: 50%;
        transform: translate(0, -50%);
        color: var(--border-color, #999);
        transition: all 0.3s ease;
        opacity: 0.8;
    }

    :host(:hover) .draficon-arr-down {
        color: var(--border-color-hover, #555);
        opacity: 1;
    }

    :host(.focus) .draficon-arr-down {
        transform: translate(0, -50%) rotate(180deg);
        color: var(--primary-color, #4a90e2);
    }

    select {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        opacity: 0.0001;
        z-index: 2;
        cursor: pointer;
        font-family: inherit;
    }

    option {
        padding: 0.4em 0.6em;
        font-size: 0.9rem;
    }

    option[disabled], .ctrl-text.disabled {
        color: var(--disabled-text, #aaa);
        font-style: italic;
    }

    :host([disabled]) {
        border: 1px solid var(--border-color-disabled, #ddd);
        color: var(--disabled-text, #aaa);
        background: var(--bgr-disabled, #f5f5f5);
        cursor: not-allowed;
        box-shadow: none;
        opacity: 0.9;
    }

    :host([disabled]) select {
        cursor: not-allowed;
    }

    :host([readonly]) {
        background: var(--readonly-bg, #f9f9f9);
        color: var(--readonly-text, #666);
        border-color: var(--border-color, #ddd);
    }

    :host(.focus) {
        border-color: var(--primary-color, #4a90e2);
        box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.2);
        outline: none;
    }
`;
