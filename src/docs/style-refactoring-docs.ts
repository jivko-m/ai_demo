import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import {docsStyles} from "../styles/docs-styles.ts";

@customElement('style-refactoring-docs')
export class ButtonDocs extends LitElement {
    static styles = docsStyles;


    render() {
        return html`
            <div class="markdown-content">
                <h1>Style Refactoring Decision for ctrl-select and ctrl-button Components</h1>
                <h2>Overview</h2>
                <p>This document outlines the decision-making process for refactoring the styles of the <code>ctrl-select</code>
                    and <code>ctrl-button</code> components to improve their appearance.</p>
                <h2>Current Structure Analysis</h2>
                <h3>Component Styling Hierarchy</h3>
                <p>The current styling structure follows this hierarchy:</p>
                <ol>
                    <li><strong>Core Styles</strong> (<code>core-styles.js</code>) - Global styles and CSS variables
                    </li>
                    <li><strong>Skin Styles</strong> (<code>skin-styles.js</code>) - Minimal theme overrides</li>
                    <li><strong>Component-specific Styles</strong> (<code>button-styles.ts</code> and <code>select-styles.ts</code>)
                        - Styles specific to each component
                    </li>
                </ol>
                <h3>Button Component (<code>ctrl-button</code>)</h3>
                <p>Current styling in <code>button-styles.ts</code> is minimal:</p>
                <ul>
                    <li>Basic cursor, display, and background styling</li>
                    <li>Simple hover state</li>
                    <li>Disabled state styling</li>
                    <li>Uses CSS variables for theming</li>
                </ul>
                <h3>Select Component (<code>ctrl-select</code>)</h3>
                <p>Current styling in <code>select-styles.ts</code> is more complex:</p>
                <ul>
                    <li>Border and border-radius styling</li>
                    <li>Positioning for the dropdown arrow</li>
                    <li>Hidden native select element with custom UI overlay</li>
                    <li>Disabled and readonly states</li>
                    <li>Focus state with box-shadow</li>
                </ul>
                <h2>Decision Factors</h2>
                <h3>Component vs. Page Styles</h3>
                <h4>Modifying Component Styles (Pros):</h4>
                <ul>
                    <li><strong>Reusability</strong>: Changes will apply everywhere the component is used</li>
                    <li><strong>Consistency</strong>: Ensures uniform appearance across the application</li>
                    <li><strong>Maintainability</strong>: Single source of truth for component styling</li>
                    <li><strong>Encapsulation</strong>: Keeps component styling with the component definition</li>
                </ul>
                <h4>Modifying Page Styles (Pros):</h4>
                <ul>
                    <li><strong>Contextual Styling</strong>: Can tailor components to specific page contexts</li>
                    <li><strong>Non-invasive</strong>: Doesn't affect other instances of the components</li>
                    <li><strong>Experimentation</strong>: Easier to try different styles in isolation</li>
                </ul>
                <h2>Decision</h2>
                <p><strong>Decision: Modify the component-specific style files (<code>button-styles.ts</code> and <code>select-styles.ts</code>)</strong>
                </p>
                <h3>Rationale:</h3>
                <ol>
                    <li>The components are used across multiple pages, so improving their base styles will benefit the
                        entire application.
                    </li>
                    <li>The current styling is already well-structured with component-specific style files.</li>
                    <li>The components use CSS variables for theming, which allows for contextual overrides when
                        needed.
                    </li>
                    <li>Modifying the component styles maintains the separation of concerns in the codebase.</li>
                </ol>
                <h2>Implementation Plan</h2>
                <h3>For <code>ctrl-button</code>:</h3>
                <ol>
                    <li>Improve the visual appearance with better padding, border-radius, and transitions</li>
                    <li>Enhance hover and focus states for better user feedback</li>
                    <li>Ensure proper alignment of icon and text</li>
                </ol>
                <h3>For <code>ctrl-select</code>:</h3>
                <ol>
                    <li>Refine the dropdown appearance with better spacing and alignment</li>
                    <li>Improve the arrow indicator styling</li>
                    <li>Enhance focus and hover states for better user feedback</li>
                    <li>Ensure consistent height and alignment with other form controls</li>
                </ol>
                <h2>Conclusion</h2>
                <p>By modifying the component-specific style files, we'll achieve a better look and feel for these
                    components throughout the application while maintaining the existing architecture and separation of
                    concerns.</p>
            </div>
        `;
    }
}
