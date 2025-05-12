import type {ReactiveController, ReactiveControllerHost} from 'lit';
export interface IButtonControllerHost extends ReactiveControllerHost {
  disabled: boolean;
  type: string;
  action: string;
  path: string;
  raiseEvent: (type: string, data?: Record<string, unknown>) => boolean;
  addEventListener: (type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions) => void;
  appendChild: (node: Node) => Node;
}

/**
 * Controller for button functionality
 * Handles click events and submit button creation
 */
export class ButtonController implements ReactiveController {
  private host: IButtonControllerHost;
  private btnSubmit?: HTMLButtonElement;

  constructor(host: IButtonControllerHost) {
    this.host = host;

    // Register a controller with the host
    this.host.addController(this);

    // Add click event listener
    this.host.addEventListener('click', ((e: Event) => {
      this.handleClick(e as MouseEvent);
    }) as EventListener, { capture: true });
  }

  /** Called when the host is connected to the DOM */
  hostConnected(): void {
    // No need to create submit button here, it will be created in hostFirstUpdated
  }

  /** Called when the host is first updated */
  hostFirstUpdated(): void {
    this.createSubmitButton();
  }

  /** Called when the host is disconnected from the DOM */
  hostDisconnected(): void {}

  private createSubmitButton(): void {
    if (this.host.type === 'submit') {
      const btnSubmit = document.createElement('button');
      btnSubmit.type = 'submit';

      Object.assign(btnSubmit.style, {
        position: 'fixed',
        left: '-999px',
        top: '-999px'
      });

      this.host.appendChild(btnSubmit);
      this.btnSubmit = btnSubmit;
    }
  }

  /**
   * Handles click events on the button
   * @param e The mouse event
   */
  private handleClick(e: MouseEvent): void {
    if (this.host.disabled) {
      e.stopImmediatePropagation();
      e.preventDefault();
      return;
    }

    if (this.host.type === 'submit') {
      this.btnSubmit?.click();
    }

    let type = 'action';
    const detail: Record<string, unknown> = { action: this.host.action };

    if (this.host.path) {
      type = 'follow';
      detail.path = this.host.path;
    }

    this.host.raiseEvent(type, detail);
  }
}
