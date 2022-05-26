import { html, LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import { baseStyles } from '../internal';
import styles from './skiplink.element.scss';
import '@cds/core/dropdown/register.js';
import { id, onKey } from '@cds/core/internal';
import { Nullable } from '@cdx/utils';

/**
 *  A skiplink provides an accessible way for keyboard users  to skip directly
 *  to specific content.
 *
 * ```typescript
 * import '@cdx/skiplink/register.js';
 * ```
 *
 * ```html
 * <cds-button>submit</cds-button>
 * ```
 * @element cdx-skiplink
 */
export class CdxSkiplink extends LitElement {
  static get styles() {
    return [baseStyles, styles];
  }

  @id()
  anchorId!: string;

  @id()
  popupId!: string;

  @property({ type: String })
  parent?: string;

  @property({ type: String })
  target!: string;

  private lastEvent?: Nullable<Event>;

  private handleEvent(event: Nullable<Event>) {
    // Handle the double event that gets generated.
    if (this.lastEvent === undefined) {
      this.lastEvent = event;
    } else {
      this.lastEvent = undefined;
      return;
    }
    this.showDropdown();
  }

  private hideDropdown() {
    this.renderRoot
      .querySelector(`#${this.popupId}`)!
      .setAttribute('hidden', '');
  }

  private showDropdown() {
    this.renderRoot
      .querySelector(`#${this.popupId}`)!
      .removeAttribute('hidden');
  }

  private targetId(): string {
    return `#${this.target}`;
  }

  connectedCallback() {
    super.connectedCallback();
    // Determine where to render to
    let renderTo;
    if (this.parent) {
      renderTo = document.querySelector(`#${this.parent}`);
    } else {
      renderTo = document.querySelector('body');
    }

    // Allow the target to be focusable
    // TODO: clean up after yourself when this is destroyed
    document.querySelector(`#${this.target}`)?.setAttribute('tabindex', '-1');

    // Move the nodes
    this.parentNode?.removeChild(this);
    renderTo?.prepend(this);

    this.addEventListener('keydown', (event: KeyboardEvent) => {
      onKey('tab', event, () => this.hideDropdown());
    });
  }

  render() {
    return html`
      <div
          @focus="${(event: Nullable<Event>) => this.handleEvent(event)}"
          popup="${this.popupId}"
          id="${this.anchorId}"
          tabindex="0"
        ></div>
      </div>
      <cds-dropdown hidden id="${this.popupId}" anchor="${this.anchorId}">
        <a
          @click="${() => this.hideDropdown()}"
          cds-first-focus
          cds-layout=""
          href="${this.targetId()}"
        >
          <slot></slot>
        </a>
      </cds-dropdown>
    `;
  }
}
