import { newE2EPage } from '@stencil/core/testing';
import { describe, expect, it } from '@stencil/vitest';

describe('ui-typograghy', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-typograghy></ui-typograghy>');

    const element = await page.find('ui-typograghy');
    expect(element).toHaveClass('hydrated');
  });
});
