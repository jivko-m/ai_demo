import { css } from "lit";

export const skinStyles = css`

:host {
    font-family: var(--global-font);
}


/* Ctrl-file */

:host(ctrl-file) .file-upload ctrl-button {
    /*background: none;
    color: #2287c8;
    border: 2px solid #2287c8;
    border-radius: 30px;*/
    min-width: 90px;
    text-align: center;
    /*font-size: 14px;*/
}

    .main-content {
        width: 100%;
    }

`;
