import { computePosition, offset, flip, shift, arrow, autoUpdate } from '@floating-ui/dom';
import { Component, Host, Prop, h, State, Listen, Element } from '@stencil/core';

@Component({
  tag: 'ui-tooltip',
  styleUrl: 'ui-tooltip.scss',
  shadow: true,
})
export class UITooltip {
  @Element() host!: HTMLElement;
  private tooltipRef!: HTMLParagraphElement;
  private arrowRef!: HTMLSpanElement;
  private autoUpdateCleanUp!: () => void;

  @Prop() content?: string;
  @Prop() placement?: 'top' | 'bottom' | 'left' | 'right' = 'bottom';

  @State() isUsingTouch: boolean = false;

  disconnectedCallback() {
    this.autoUpdateCleanUp?.();
  }

  @Listen('mouseenter')
  onTouchStart() {
    this.isUsingTouch = true;
  }

  private positionTooltip() {
    computePosition(this.host, this.tooltipRef, {
      placement: this.placement,
      middleware: [offset(6), flip(), shift({ padding: 5 }), arrow({ element: this.arrowRef })],
    }).then(({ x, y, placement, middlewareData }) => {
      Object.assign(this.tooltipRef.style, {
        left: `${x}px`,
        top: `${y}px`,
      });

      // Accessing the data
      const arrowX = middlewareData.arrow?.x;
      const arrowY = middlewareData.arrow?.y;

      const staticSide = {
        top: 'bottom',
        right: 'left',
        bottom: 'top',
        left: 'right',
      }[placement.split('-')[0] as 'top' | 'right' | 'bottom' | 'left'];

      Object.assign(this.arrowRef.style, {
        left: arrowX != null ? `${arrowX}px` : '',
        top: arrowY != null ? `${arrowY}px` : '',
        right: '',
        bottom: '',
        [staticSide]: '-4px',
      });
    });
  }

  show() {
    if (this.isUsingTouch) return this.hide();
    this.tooltipRef.style.display = 'block';
    this.tooltipRef.showPopover?.();
    this.positionTooltip();
    this.autoUpdateCleanUp = autoUpdate(this.host, this.tooltipRef, this.positionTooltip.bind(this));
  }

  hide() {
    this.tooltipRef.style.display = 'none';
    this.tooltipRef?.hidePopover?.();
    this.autoUpdateCleanUp?.();
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
