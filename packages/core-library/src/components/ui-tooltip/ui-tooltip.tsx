import { Component, Host, Prop, h, State, Listen, Element } from '@stencil/core';

@Component({
  tag: 'ui-tooltip',
  styleUrl: 'ui-tooltip.scss',
  shadow: true,
})
export class UITooltip {
  @Element() host: HTMLElement;
  private tooltipRef!: HTMLParagraphElement;
  private arrowRef!: HTMLSpanElement;
  @Prop() content?: string;
  @Prop() placement?: 'top' | 'bottom' | 'left' | 'right' = 'top';

  @State() isUsingTouch: boolean = false;

  @Listen('mouseenter')
  onTouchStart() {
    this.isUsingTouch = true;
  }

  show() {
    if (this.isUsingTouch) return this.hide();
    this.tooltipRef.style.display = "block";
    this.tooltipRef.showPopover?.();
  }

  hide() {
    this.tooltipRef.style.display = "none";
    this.tooltipRef?.hidePopover?.();
  }

  render() {
    return (
      <Host onMouseEnter={this.show.bind(this)} onMouseLeave={this.hide.bind(this)}>
        <slot></slot>
        <p ref={ref => (ref ? (this.tooltipRef = ref) : undefined)} popover="true" role="tooltip">
          {this.content}
        </p>
        <span
          ref={ref => {
            ref ? (this.arrowRef = ref) : undefined;
          }}
          class="arrow"
        />
      </Host>
    );
  }
}
