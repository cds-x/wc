import { html, LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import { query } from 'lit/decorators/query.js';
import { baseStyles } from '../internal';
import styles from './skiplink.element.scss';
import '@cds/core/dropdown/register.js';
// import { CdsDropdown } from '@cds/core/dropdown';
import '@cds/core/dropdown/register.js';
import { id } from '@cds/core/internal';

type Nullable<T> = T | null | undefined;

/**
 * @element cdx-skiplink
 */
export class CdxSkiplink extends LitElement {
  static get styles() {
    return [baseStyles, styles];
  }

  closable = false;
  defaultPointerType: string | null = null;

  @property({ type: String })
  parent?: string;

  @property({ type: String })
  target!: string;

  targetElement!: HTMLElement;

  // @query('#skiplink-anchor')
  // anchor!: HTMLAnchorElement;

  // @query('#skip-dropdown')
  // dropdown!: CdsDropdown;

  @id()
  popupId!: string;

  @id()
  anchorId!: string;

  connectedCallback() {
    super.connectedCallback();
  }

  private lastEvent?: Nullable<Event>;
  /**
   * popup="demo-signpost-basic"
   * the popup attribute needs to go on the 'trigger' e.g body or parent element
   * that will orient the popup to the body/parent
   * id="demo-signpost-basic"
   * the id needs to go on the thing that is being shown e.g this
   */
  firstUpdated() {
    // Determine where to render to
    let renderTo;
    if (this.parent) {
      renderTo = document.querySelector(`#${this.parent}`);
    } else {
      renderTo = document.querySelector('body');
    }

    // Need to add a hidden element so the popup has something to attach to
    // with the popup="this.id" attribute
    // const triggerDiv = document.createElement('section');
    // triggerDiv.setAttribute('popup', this.anchorId);
    // triggerDiv.setAttribute('id', this.popupId);
    // triggerDiv.setAttribute('tabindex', '0');
    // this.prepend(triggerDiv);

    // Allow the target to be focusable
    // TODO, clean up after yourself when this is destroyed
    document.querySelector(`#${this.target}`)?.setAttribute('tabindex', '-1');

    // Move the nodes
    this.parentNode?.removeChild(this);
    renderTo?.prepend(this);

    // const skiplink = this.shadowRoot?.querySelector(`#${this.popupId}`);
    // console.log('does it skip?', skiplink);
    //Handle the visibility stuff
    // const triggerDiv = this.renderRoot.querySelector(`#${this.anchorId}`);
    // const triggerDiv = this.shadowRoot.querySelector(`#${this.popupId}`);
    // triggerDiv!.addEventListener('focus', () => {
    //   const dd = this.renderRoot.querySelector(`#${this.popupId}`);
    //   dd!.removeAttribute('hidden');
    //   console.log('focus yo', dd);
    //   // skiplink!.removeAttribute('cds-layout');
    // });

    // const link = this.renderRoot.querySelector(`#${this.popupId} > a`);
    // link!.addEventListener('click', (event: Event) => {
    //   const dd = this.renderRoot.querySelector(`#${this.popupId}`);
    //   dd!.setAttribute('hidden', '');
    //   console.log('focus out yo', dd);
    //   event.preventDefault();
    // });
    // triggerDiv!.addEventListener('focusout', () => {
    //   const dd = this.renderRoot.querySelector(`#${this.popupId}`);
    //   dd!.setAttribute('hidden', '');
    //   console.log('focusout yo', dd);
    //   // skiplink!.removeAttribute('cds-layout');
    // });
    // triggerDiv!.addEventListener('focusout', () => {
    //   const dd = this.renderRoot.querySelector(`#${this.popupId}`);
    //   console.log('dd: ', dd);
    //   dd!.setAttribute('hidden', '');
    //   console.log('focus out yo', dd);
    // });
    // const skiplink = this.renderRoot.querySelector(`[href="${this.targetId()}"]`)
    // skiplink!.addEventListener( 'click', () => {
    //   const dd = this.renderRoot.querySelector(`#${this.popupId}`);
    //   dd!.setAttribute('hidden', '');
    //   console.log('focus out yo', dd);
    // });
  }

  updates() {
    console.log("what's up(date) danger? ");
  }

  handleEvent(event: Nullable<Event>) {
    // Handle the double event that gets generated.
    if (this.lastEvent === undefined) {
      this.lastEvent = event;
    } else {
      this.lastEvent = undefined;
      return;
    }
    this.renderRoot
      .querySelector(`#${this.popupId}`)!
      .removeAttribute('hidden');
  }

  // Why does focus event fire after the a element is clicked on first time?
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
          @click="${(event: Event) => {
            console.log('anchor click');
            this.renderRoot
              .querySelector(`#${this.popupId}`)!
              .setAttribute('hidden', '');
            event.stopPropagation();
          }}"
          cds-first-focus
          cds-layout=""
          href="${this.targetId()}"
        >
          <slot></slot>
        </a>
      </cds-dropdown>
    `;
  }

  targetId(): string {
    return `#${this.target}`;
  }
}
