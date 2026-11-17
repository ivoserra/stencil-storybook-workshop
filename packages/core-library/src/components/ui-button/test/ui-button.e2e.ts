import { newE2EPage } from '@stencil/core/testing';
import { describe, expect, it } from '@stencil/vitest';
describe('ui-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-button></ui-button>');

    const element = await page.find('ui-button');
    expect(element).toHaveClass('hydrated');
  });
});
