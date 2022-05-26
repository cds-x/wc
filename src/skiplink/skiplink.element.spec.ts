import { expect } from '@open-wc/testing';

function sum(n1: number, n2: number) {
  return n1 + n2;
}

it('sums up 2 numbers', () => {
  console.log('the sum is', sum(42, 42));
  expect(sum(1, 1)).to.equal(2);
  expect(sum(3, 12)).to.equal(15);
});

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
