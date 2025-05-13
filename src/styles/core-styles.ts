import { css } from "lit";
// import '../ficons/fonts/dragon-ficons.woff';

export const coreStyles = css`
[class^="draficon-"], [class*=" draficon-"], .draficon {
  /* use !important to prevent issues with browser extensions that change fonts */
  font-family: 'draficon';
  speak: none;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;

  /* Better Font Rendering =========== */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.draficon-arr-down:before {
  content: "\\e900";
}
.draficon-arr-left:before {
  content: "\\e901";
}
.draficon-arr-right:before {
  content: "\\e902";
}
.draficon-arr-up:before {
  content: "\\e903";
}
.draficon-chevron-dual-ver:before {
  content: "\\e923";
}
.draficon-chevron-dual-hor:before {
  content: "\\e924";
}
.draficon-more-hor:before {
  content: "\\e905";
}
.draficon-more-ver:before {
  content: "\\e906";
}
.draficon-filter:before {
  content: "\\e904";
}
.draficon-check:before {
  content: "\\e90a";
}
.draficon-close:before {
  content: "\\e909";
}
.draficon-forbidden:before {
  content: "\\e908";
}
.draficon-delete:before {
  content: "\\e925";
}
.draficon-edit:before {
  content: "\\e95d";
}
.draficon-edit-3:before {
  content: "\\e926";
}
.draficon-trash-2:before {
  content: "\\e922";
}
.draficon-save:before {
  content: "\\e91e";
}
.draficon-search:before {
  content: "\\e907";
}
.draficon-settings:before {
  content: "\\e91f";
}
.draficon-folder:before {
  content: "\\e928";
}
.draficon-folder-minus:before {
  content: "\\e929";
}
.draficon-folder-plus:before {
  content: "\\e92a";
}
.draficon-copy:before {
  content: "\\e92b";
}
.draficon-scissors:before {
  content: "\\e92c";
}
.draficon-clipboard:before {
  content: "\\e92d";
}
.draficon-paperclip:before {
  content: "\\e92e";
}
.draficon-share-2:before {
  content: "\\e92f";
}
.draficon-terminal:before {
  content: "\\e930";
}
.draficon-key:before {
  content: "\\e931";
}
.draficon-lock:before {
  content: "\\e932";
}
.draficon-unlock:before {
  content: "\\e933";
}
.draficon-zap:before {
  content: "\\e934";
}
.draficon-info:before {
  content: "\\e946";
}
.draficon-alert-circle:before {
  content: "\\e910";
}
.draficon-alert-octagon:before {
  content: "\\e947";
}
.draficon-alert-triangle:before {
  content: "\\e911";
}
.draficon-help-circle:before {
  content: "\\e917";
}
.draficon-bell:before {
  content: "\\e935";
}
.draficon-calendar-day:before {
  content: "\\e912";
}
.draficon-calendar-grid:before {
  content: "\\e913";
}
.draficon-columns:before {
  content: "\\e914";
}
.draficon-git-pull-request:before {
  content: "\\e915";
}
.draficon-grid:before {
  content: "\\e916";
}
.draficon-home:before {
  content: "\\e918";
}
.draficon-package:before {
  content: "\\e936";
}
.draficon-layers:before {
  content: "\\e919";
}
.draficon-pocket:before {
  content: "\\e937";
}
.draficon-layout:before {
  content: "\\e91a";
}
.draficon-map-pin:before {
  content: "\\e91b";
}
.draficon-menu:before {
  content: "\\e91c";
}
.draficon-refresh-cw:before {
  content: "\\e91d";
}
.draficon-sidebar:before {
  content: "\\e920";
}
.draficon-summary:before {
  content: "\\e921";
}
.draficon-calendar:before {
  content: "\\e927";
}
.draficon-clock:before {
  content: "\\e939";
}
.draficon-arrow-left:before {
  content: "\\e90e";
}
.draficon-arrow-right:before {
  content: "\\e90f";
}
.draficon-globe:before {
  content: "\\e90d";
}
.draficon-user:before {
  content: "\\ea02";
}
.draficon-minus:before {
  content: "\\e938";
}
.draficon-plus:before {
  content: "\\e93a";
}
.draficon-circle:before {
  content: "\\e93b";
}
.draficon-minus-circle:before {
  content: "\\e90b";
}
.draficon-plus-circle:before {
  content: "\\e90c";
}
.draficon-file-text:before {
  content: "\\e945";
}
.draficon-file-pdf:before {
  content: "\\e944";
}
.draficon-file-word:before {
  content: "\\e943";
}
.draficon-file-excel:before {
  content: "\\e942";
}
.draficon-file-powerpoint:before {
  content: "\\e941";
}
.draficon-file-image:before {
  content: "\\e940";
}
.draficon-file-archive:before {
  content: "\\e93f";
}
.draficon-file-audio:before {
  content: "\\e93e";
}
.draficon-file-movie:before {
  content: "\\e93d";
}
.draficon-file-code:before {
  content: "\\e93c";
}


/* temporary here */
/*Dragon Icons >> */
/*Dragon Icons << */

/*Dragon Global Variables >> */

:host {
    --global-font: Lato;
    --bgr-1: #d4d4d4;
    --bgr-2: #fff;
    --bgr-context: #F7F7F7;
    --bgr-1-hover: #ccc;
    --bgr-disabled: #F2F2F2;
    --bgr-disabled-btn: #eee;
    --bgr-submenu: #fff;
    --btn-color-disabled: #d2d2d2;
    --border-color: #bbb;
    --border-color-disabled: #dedede;
    --readonly-bg: #F8F8F8;
    --readonly-text: #666;
    --focus-border: 0 0 0 1px #ccc inset;
    --floated-slotted-elm-height: 2.35rem;
    --floated-slotted-elm-padding: 0.85rem;
    --floated-slotted-elm-inner-padding: 1.25rem;
    --border-color-multi: #f2f2f2;
    --header-bg-multi: #f2f2f2;
    --border-radius: 0.2em;
    --hcell-border-bottom: 3px solid #0000000f;
    --hcell-padding: 0.286em 0.462rem;
    --hcell-padding-tb: 0.286rem;
    --hcell-padding-lr: 0.462rem;
    --hcell-bold: normal;
    --tcell-padding-tb: 0.286rem;
    --tcell-padding-lr: 0.462rem;
    --grid-border-color: #0000000f; /* opacity 0.06 */
    --grid-hover-color: #00000005; /* opacity 0.02 */
    --grid-selected-color: #0000000a; /* opacity 0.04 */
    --row-context-btn-font-size: 1.05rem;
    --ctrl-link-color: #336699;
    --ctrl-link-color-hover: #3399cc;
    --font-size: 13px;
    --groupbox-padding: 20px 0;
    --disabled-text: #b3b3b3;
    --menuheader-color: #fff;
    --menu-item-hover: #0000000f; /* opacity 0.06 */
    --menu-item-current: #e78f1c;
    --menu-item-icon-min-width: 20px;
    --multi-icon-color: #ccc;
    --multi-button-bgr: #d4d4d4;
    --highlight-popup-btn: #2287c8;
    --period-primary-btn: #009bc3;
    --period-primary-btn-color: #fff;
    --period-cal-selected: #ccc;
    --period-cal-set-period: #ddd;
    --period-cal-title-color: #000;
    --period-cal-cell-hover: #cccccc4d;
    --period-secondary-btn: #eee;
    --period-button-border-radius: 3px;
    --context-max-height: 50vh;
    --context-menu-min-width: 230px;
    --dropdown-checklist-bg: #f7f7f7;
    --checklist-border-color: #dedede;
    --checklist-toggle-bg: #e8e8e8;
    --bgr-circle-checked: #fff;
    --notification-msg-top: 50%;
    --notification-msg-left: 50%;
    --notification-msg-transform: translate(-50%, -50%);
    --notification-msg-header-height: 30px;
    --notification-msg-padding: 15px 20px;
    --notification-msg-max-height: 400px;
    --toast-position-top: 10px;
    --toast-position-left: 10px;
    --toast-position-right: 10px;
    --toast-position-bottom: 10px;
    --bgr-toast: #4D7999;
    --color-toast: #fff;
    --btn-color-toast: #FFFFFF66;
    --width-toast: auto;
    --totals-size: 12px;
    --ctrl-calendar-bg: #fff;
    --ctrl-calendar-inactive: #ccc;
    --ctrl-calendar-header-bg: #ccc;
    --ctrl-calendar-selected: #ccc;
    --ctrl-calendar-hover: #cccccc4d;
	--ctrl-calendar-holiday: #A70001;
    --ctrl-calendar-spacial-week: #FFAB4A26;
    --float-lbl-color: #888;
    --error-bg: #F8E1E1;
    --error-text: #A70001;
    --success-bg: #DBEFDA;
    --success-text: #1E8B12;
    --warning-bg: #FFEAA7;
    --warning-text: #E26900;
    --warning-text_ver2: #FF8000;
    --confirm-text: #0069B2;
    --ctrl-file-wrap-padding: 5px;
    --ctrl-file-file-preview-btn-bg: #999;
    --ctrl-file-preview-bg: rgba(0, 0, 0, 0.07);
}

/*usage: color: var(--color); */
/*Dragon Global Variables << */


/*Dragon Reset >> */

*,
*::before,
*::after {
box-sizing: border-box;
}

:host {
margin: 0;
/*font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";*/
font-family: Verdana;
/*font-size: 1em;*/
font-weight: 400;
line-height: 1.2;
/*color: #212529;*/
text-align: left;
/*background-color: #fff;*/
}

@-ms-viewport {
width: device-width;
}

article, aside, figcaption, figure, footer, header, hgroup, main, nav, section {
    display: block;
}


[tabindex="-1"]:focus {
outline: 0 !important;
}

hr {
box-sizing: content-box;
height: 0;
overflow: visible;
}

h1, h2, h3, h4, h5, h6 {
margin-top: 0;
margin-bottom: 0;
}

p {
margin-top: 0;
margin-bottom: 1rem;
}

abbr[title],
abbr[data-original-title] {
text-decoration: underline;
-webkit-text-decoration: underline dotted;
text-decoration: underline dotted;
cursor: help;
border-bottom: 0;
}

address {
margin-bottom: 1rem;
font-style: normal;
line-height: inherit;
}

ol,
ul,
dl {
margin-top: 0;
/*margin-bottom: 1rem;*/
}

ol ol,
ul ul,
ol ul,
ul ol {
margin-bottom: 0;
}

dt {
font-weight: 700;
}

dd {
margin-bottom: .5rem;
margin-left: 0;
}

blockquote {
margin: 0 0 1rem;
}

dfn {
font-style: italic;
}

b,
strong {
font-weight: bolder;
}

small {
font-size: 80%;
}

sub,
sup {
position: relative;
font-size: 75%;
line-height: 0;
vertical-align: baseline;
}

sub {
bottom: -.25em;
}

sup {
top: -.5em;
}

a {
color: #007bff;
text-decoration: none;
background-color: transparent;
-webkit-text-decoration-skip: objects;
}


pre,
code,
kbd,
samp {
font-family: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
font-size: 1em;
}

pre {
margin-top: 0;
margin-bottom: 1rem;
overflow: auto;
-ms-overflow-style: scrollbar;
}

figure {
margin: 0 0 1rem;
}

img {
vertical-align: middle;
border-style: none;
}

svg {
overflow: hidden;
vertical-align: middle;
}

table {
border-collapse: collapse;
}

caption {
padding-top: 0.75rem;
padding-bottom: 0.75rem;
color: #6c757d;
text-align: left;
caption-side: bottom;
}

th {
text-align: inherit;
}

label {
display: inline-block;
/*margin-bottom: 0.5rem;*/
}

button {
border-radius: 0;
}

button:focus {
    outline: 1px dotted;
    outline: 5px auto -webkit-focus-ring-color;
}

input,
button,
select,
optgroup,
textarea {
    margin: 0;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
}

input { padding: 0; } /* reset for Chrome user agent stylesheet */

input:-webkit-autofill,
select:-webkit-autofill {
  -webkit-box-shadow: 0 0 0px 1000px #fff inset;
}

button,
input {
overflow: visible;
}

button,
select {
text-transform: none;
}

button,
html [type="button"],
[type="reset"]/*,
[type="submit"]*/ {
-webkit-appearance: button;
}

button::-moz-focus-inner,
[type="button"]::-moz-focus-inner,
[type="reset"]::-moz-focus-inner,
[type="submit"]::-moz-focus-inner {
padding: 0;
border-style: none;
}

input[type="radio"],
input[type="checkbox"] {
box-sizing: border-box;
padding: 0;
}

input[type="date"],
input[type="time"],
input[type="datetime-local"],
input[type="month"] {
-webkit-appearance: listbox;
}

textarea {
overflow: auto;
resize: vertical;
}

fieldset {
min-width: 0;
padding: 0;
margin: 0;
border: 0;
}

legend {
display: block;
width: 100%;
max-width: 100%;
padding: 0;
margin-bottom: .5rem;
font-size: 1.5rem;
line-height: inherit;
color: inherit;
white-space: normal;
}

progress {
vertical-align: baseline;
}

[type="number"]::-webkit-inner-spin-button,
[type="number"]::-webkit-outer-spin-button {
height: auto;
}

[type="search"] {
outline-offset: -2px;
-webkit-appearance: none;
}

[type="search"]::-webkit-search-cancel-button,
[type="search"]::-webkit-search-decoration {
-webkit-appearance: none;
}

::-webkit-file-upload-button {
font: inherit;
-webkit-appearance: button;
}

output {
display: inline-block;
}

summary {
display: list-item;
cursor: pointer;
}

template {
display: none;
}

[hidden] {
display: none !important;
}

/*Dragon Reset << */

/* Dragon validation styles */

:host([required]) {
    box-shadow: inset -3px 0 0 #f4a50b;
    padding-right: 3px; /* this is added to show box-shadow on Chrome. Probably there is another solution but I can't find it for now */
    border-radius: 3px 1px 1px 3px;
}

:host([required].text) {
    border-radius: 3px;
}

:host(.valid) {
    box-shadow: inset -3px 0 0 #55AB54;
    padding-right: 3px; /* this is added to show box-shadow on Chrome. Probably there is another solution but I can't find it for now */
    border-radius: 3px 1px 1px 3px;
}

:host(ctrl-checkbox.valid), :host(ctrl-toggle.valid), :host(ctrl-radio.valid), 
:host(ctrl-checkbox.valid.focus), :host(ctrl-toggle.valid.focus), :host(ctrl-radio.valid.focus) {
    box-shadow: none;
    padding-right: 0; 
    border-radius: 0;
}

:host(.valid.text) {
    border-radius: 3px;
}

:host(.invalid) {
    box-shadow: inset -3px 0 0 #ac0d0d;
    padding-right: 3px; /* this is added to show box-shadow on Chrome. Probably there is another solution but I can't find it for now */
    border-radius: 3px 1px 1px 3px;
}

:host(.invalid.text) {
    border-radius: 3px;
}

input:required,
textarea:required {
    box-shadow: inset -3px 0 0 #f4a50b;
    border-radius: 3px 1px 1px 3px;
}

:host([required].focus) {
    box-shadow: var(--focus-border), inset -3px 0 0 #f4a50b;
}

:host([required].text.focus) {
    box-shadow: var(--focus-border), inset -3px 0 0 #f4a50b;
}

:host(.valid.focus) {
    box-shadow: var(--focus-border), inset -3px 0 0 #55AB54;
}

:host(.invalid.focus) {
    box-shadow: var(--focus-border), inset -3px 0 0 #ac0d0d;
}

input.valid,
textarea.valid {
    box-shadow: inset -3px 0 0 #55AB54;
    border-radius: 3px 1px 1px 3px;
}

/*input.invalid,
textarea.invalid {
    box-shadow: inset -3px 0 0 #ac0d0d;
    border-radius: 3px 1px 1px 3px;
}

/*input.focus, textarea:focus  {
    box-shadow: var(--focus-border);
}*/

input:focus, textarea:focus {
    outline: none;
    }

    ctrl-textarea.float-element {
        flex: 1 1 auto;
        height: 100%;
    }

/*Dragon Common >> */

.ctrl-overlay {
    position: fixed;
    left: 0;
    top: 0;
    background: none repeat scroll 0 0 rgba(0, 0, 0, 0.7);
    width: 100%;
    height: 100%;
}

/* Dragon message */

/* Message */

.msg {
    padding: 10px;
    max-height: 200px;
    overflow-y: auto;
    word-wrap: break-word;
    margin-bottom: 10px;
}

ul.msg  {
    list-style: none;
}

.msg p {
    margin-bottom: 0;
}

.msg.error {
    background: var(--error-bg);
    color: var(--error-text);
}

.msg .error-code {
    display: none;
}

.msg.warning {
    background: var(--warning-bg);
    color: var(--warning-text);
}

.msg.success {
    background: var(--success-bg);
    color: var(--success-text);
    font-family: 'draficon';
}

 /*   .icon {
        display: block;
        font-family: 'draficon';
        width: 5px;
        height: 5px;
        background: red;
    } */



/* Tooltip */

.ctrl-bubble {
    background: #dec0c0;
    color: #7f1a1a;
    padding: 10px;
    margin-top: 10px;
    position: relative;
    border-radius: 5px;
    list-style: none;
    z-index: 999;
}

.ctrl-bubble:before {
    content: "";
    display: block;
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 5px solid #dec0c0;
    position: absolute;
    top: -5px;
}



/*Dragon Common << */

.hbox {
    display: flex;
}



/* Temp */

.has-context {
    transform: translate(0px, 0px);
    transition: all 300ms ease-in-out 0s;
    }

.has-context.toggle {
    transform: translate(-100px, 0px);
    }

`;
