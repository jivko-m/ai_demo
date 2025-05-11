import { css } from 'lit';

export const selectStyles = css`
    :host {
        border: 1px solid var(--border-color);
        border-radius: var(--border-radius, 0.2em);
        padding: 0.5rem 0.6rem;
        position: relative;
        display: block;
        min-height: 2.2em;
        background-color: var(--bgr-2, #fff);
        transition: border-color 0.2s ease, box-shadow 0.2s ease;
    }

    :host(:hover) {
        border-color: var(--border-color-hover, #999);
    }

    .ctrl-inner {
        display: flex;
        align-items: center;
        width: 100%;
        height: var(--floated-slotted-elm-inner-padding);
        line-height: 1.25rem;
        padding-right: 1.5em;
    }

    .ctrl-text {
        display: block;
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .draficon-arr-down {
        font-size: 0.85em;
        position: absolute;
        right: 0.6rem;
        top: 50%;
        transform: translate(0, -50%);
        color: var(--border-color, #bbb);
        transition: transform 0.2s ease;
    }

    :host(:hover) .draficon-arr-down {
        color: var(--border-color-hover, #999);
    }

    :host(.focus) .draficon-arr-down {
        transform: translate(0, -50%) rotate(180deg);
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
    }

    option {
        padding: 0.5em;
    }

    option[disabled], .ctrl-text.disabled {
        color: var(--disabled-text, #888);
    }

    :host([disabled]) {
        border: 1px solid var(--border-color-disabled);
        color: var(--disabled-text);
        background: var(--bgr-disabled);
        cursor: not-allowed;
    }

    :host([disabled]) select {
        cursor: not-allowed;
    }

    :host([readonly]) {
        background: var(--readonly-bg);
        color: var(--readonly-text);
    }

    :host(.focus) {
        border-color: var(--border-color-hover, #999);
        box-shadow: var(--focus-border);
    }
`;
