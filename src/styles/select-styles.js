import { css } from "../../web-component";

export const selectStyles = css`
    :host {
        border: 1px solid var(--border-color);
        border-radius: var(--border-radius);
        padding: 0.45rem;
        position: relative;
        display: block;
    }

    .ctrl-inner {
        display: block; 
        width: 100%;  
        /* added to avoid two rows in select */
        height: var(--floated-slotted-elm-inner-padding);
        line-height: 1.25rem;
        padding-right: 15px; 

        }

    .ctrl-text {
        display: block; 
        overflow: hidden;
        text-overflow: clip;
        white-space: nowrap;
        /*line-height: 1.2em;*/
        }

    .draficon-arr-down {
        font-size: 1em;
        position: absolute;
        right: 0.45rem;
        top: 50%;
        transform: translate(0, -50%);
    }

    select {
        width: 100%; height: 100%;
        position: absolute; top: 0; left: 0; bottom: 0;
        opacity: 0.0001; 
        z-index: 2;
    }

    option[disabled], .ctrl-text.disabled {
        color: #888;
    }

    :host([disabled]) {
        border: 1px solid var(--border-color-disabled);
        color: var(--disabled-text);
        background: var(--bgr-disabled);
    }

    :host([readonly]){
        background: var(--readonly-bg);
        color: var(--readonly-text);
    }

    :host(.focus) {
        box-shadow: var(--focus-border);
    }

`;