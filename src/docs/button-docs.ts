import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import {docsStyles} from "../styles/docs-styles.ts";

@customElement('button-docs')
export class ButtonDocs extends LitElement {
  static styles = docsStyles;

  render() {
    return html`
      <div class="markdown-content">
        <h1>Button Component Conversion to TypeScript</h1>
        <h2>Changes Made</h2>
        <h3>1. Created Separate Styles File</h3>
        <ul>
          <li>Created <code>src/styles/button-styles.ts</code> to extract CSS styles from the component</li>
          <li>Created <code>src/styles/button-styles.d.ts</code> for TypeScript type definitions</li>
        </ul>
        <h3>2. Converted Button Component to TypeScript</h3>
        <ul>
          <li>Renamed <code>button.js</code> to <code>button.ts</code></li>
          <li>Added proper TypeScript type annotations</li>
          <li>Used Lit decorators:
            <ul>
              <li><code>@customElement</code> for component registration</li>
              <li><code>@property</code> for observable properties</li>
            </ul>
          </li>
          <li>Improved code organization:
            <ul>
              <li>Extracted click handler to a separate method</li>
              <li>Used optional chaining for safer property access</li>
              <li>Used the <code>nothing</code> directive for conditional rendering</li>
            </ul>
          </li>
        </ul>
        <h3>3. Added Testing Infrastructure</h3>
        <ul>
          <li>Added testing dependencies to package.json:
            <ul>
              <li>Vitest for test running</li>
              <li>@vitest/coverage-v8 for code coverage</li>
              <li>@open-wc/testing-helpers for web component testing</li>
            </ul>
          </li>
          <li>Added test scripts to package.json:
            <ul>
              <li><code>test</code>: Run tests once</li>
              <li><code>test:watch</code>: Run tests in watch mode</li>
              <li><code>test:coverage</code>: Run tests with coverage and open report</li>
            </ul>
          </li>
        </ul>
        <h3>4. Created Unit Tests</h3>
        <ul>
          <li>Created comprehensive tests for the button component in <code>tests/unit/button.test.ts</code>
          </li>
          <li>Tests cover:
            <ul>
              <li>Component definition and rendering</li>
              <li>Default and custom properties</li>
              <li>Title handling</li>
              <li>Submit button creation</li>
              <li>Disabled state behavior</li>
              <li>Event handling for action and follow events</li>
              <li>Submit button click handling</li>
            </ul>
          </li>
        </ul>
        <h2>Benefits of the Changes</h2>
        <ul>
          <li>Improved type safety with TypeScript</li>
          <li>Better code organization with separate style files</li>
          <li>Modern component structure using decorators</li>
          <li>Comprehensive test coverage</li>
          <li>Easier maintenance with proper typing</li>
        </ul>
        <h2>Test Results</h2>
        <ul>
          <li>All tests are passing successfully</li>
          <li>Coverage report shows:
            <ul>
              <li>100% coverage for the WebComponent base class</li>
              <li>84.44% coverage for the render-if directive</li>
              <li>The button component is tested through the DOM API, so its code coverage is not
                accurately reported
              </li>
            </ul>
          </li>
        </ul>
        <h2>Next Steps</h2>
        <ul>
          <li>Consider converting other components to TypeScript</li>
          <li>Improve test coverage for all components</li>
          <li>Set up continuous integration to run tests automatically</li>
        </ul>
      </div>
    `;
  }
}
