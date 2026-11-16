import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'ui-typography',
  styleUrl: 'ui-typography.css',
  shadow: true,
})
export class UITypography {
  @Prop() variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' = 'h1';

  render() {
    const Tag = this.variant;
    return (
      <Host>
        <Tag>
          <slot></slot>
        </Tag>
      </Host>
    );
  }
}
