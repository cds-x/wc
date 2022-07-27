// import { TemplateResult, render } from 'lit';
import { expect, fixture, html } from '@open-wc/testing';
import { CdxSkiplink } from '@cdx/skiplink/skiplink.element';
import '@cdx/skiplink/register.js';

describe('CdxSkiplink', () => {
  let testElement: CdxSkiplink;
  // let component: CdxSkiplink;
  const skiplinkText = 'Skip to content';

  beforeEach(async () => {
    // testElement = await createTestElement(html`
    //   <cdx-skiplink target="content">${skiplinkText}</cdx-skiplink>
    // `);
    testElement = await fixture(html`
      <div>
        <cdx-skiplink target="content">${skiplinkText}</cdx-skiplink>
        <main id="content">This is the main content.</main>
      </div>
    `);
    // component = testElement.querySelector<CdxSkiplink>('cdx-skiplink');
  });

  afterEach(() => {
    testElement.remove();
  });

  it('should render the component', async () => {
    console.log('testElement', testElement.shadowRoot);
    window.addEventListener('keydown', (e) => {
      console.log(e)
    })

    window.dispatchEvent(new KeyboardEvent('keydown', {
      'key': 'tab'
    }));
    // await componentIsStable(component);
    // const slots = getComponentSlotContent(component);
    // expect(slots.default).contains(skiplinkText);

    expect(testElement).lightDom.to.equalSnapshot();
    // await expect(testElement).to.be.accessible();
  });

  // it moves focus to the body

  // it moves focus to the parent

  // it is accessible

  // it hides and shows the dropdown when user tabs

  // it hides and shows the dropdown when user clicks
});

// function sum(n1: number, n2: number) {
//   return n1 + n2;
// }
//
// it('sums up 2 numbers', () => {
//   console.log('the sum is', sum(42, 42));
//   expect(sum(1, 1)).to.equal(2);
//   expect(sum(3, 12)).to.equal(15);
// });

// import { expect, fixture, html } from '@open-wc/testing';
// import '@cdx/skiplink/register.js';
// import { CdxSkiplink } from '@cdx/skiplink';
// // import { componentIsStable, createTestElement, removeTestElement } from '@cds/core/test';
// import { Nullable} from '@cdx/utils';
//
// describe('badge element', () => {
//   let testElement: HTMLElement;
//   let component: Nullable<CdxSkiplink>;
//   const skiplinkText = 'Skip to target';
//
//   beforeEach(async () => {
//     testElement = await createTestElement(html`<cds-badge>${skiplinkText}</cds-badge>`);
//     component = testElement.querySelector<CdxSkiplink>('cdx-skiplink');
//   });
//
//   afterEach(() => {
//     removeTestElement(testElement);
//   });

  // it('should create the component', async () => {
  //   await componentIsStable(component);
  //   expect(component?.innerText).equal(skiplinkText);
  // });
//   it('should run', function() {
//     console.log('hello wtr');
//     expect(true).to.equal(true);
//   });
// });
