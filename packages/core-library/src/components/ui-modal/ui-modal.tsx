import { Component, EventEmitter, Prop, Event, h, Watch, Method, State } from '@stencil/core';

@Component({
  tag: 'ui-modal',
  styleUrl: 'ui-modal.scss',
  shadow: true,
})
export class UIModal {
  private dialogRef!: HTMLDialogElement;

  @Prop({ mutable: true, reflect: true }) open = false;
  @Prop() headerTitle?: string;
  @Prop() width?: string;
  @Prop() height?: string;

  @Prop() closable: boolean = true;
  @Prop() outsideClick: boolean = true;

  @Event() close!: EventEmitter<void>;
  @Event() openChange!: EventEmitter<boolean>;

  @Prop() hasFooter: boolean = false;

  componentDidLoad() {
    this.updateMenu();
  }

  @Method()
  async openModal() {
    this.setOpen(true);
  }

  @Method()
  async closeModal() {
    this.setOpen(false);
  }

  @Watch('open')
  updateMenu() {
    if (!this.dialogRef) return;

    if (this.open && !this.dialogRef.open) {
      this.dialogRef.showModal();
    } else if (!this.open && this.dialogRef.open) {
      this.dialogRef.close();
    }
  }

  private setOpen(value: boolean) {
    if (this.open === value) return;

    this.open = value;
    this.openChange.emit(value);
  }

  private handleClose() {
    if (this.open) {
      this.setOpen(false);
    }
    this.close.emit();
  }

  private handleDialogClick(event: Event) {
    if (!this.outsideClick) return;

    if (event.target === this.dialogRef) {
      this.setOpen(false);
    }
  }

  /*   private handleFooterSlotChange(event: Event) {
    const slot = event.target as HTMLSlotElement;

    this.hasFooter = slot.assignedNodes().some(node => node.nodeType === Node.ELEMENT_NODE || Boolean(node.textContent?.trim()));
  }
 */
  render() {
    return (
      <dialog
        ref={el => (this.dialogRef = el as HTMLDialogElement)}
        onClose={() => this.handleClose()}
        onClick={event => this.handleDialogClick(event)}
        style={{
          width: this.width,
          height: this.height,
        }}
      >
        <div class="modal-content">
          <header>
            <ui-typography variant="h4">{this.headerTitle}</ui-typography>
            {this.closable && <button onClick={() => this.setOpen(false)}>x</button>}
          </header>

          <section>
            <slot />
          </section>

          {this.hasFooter && (
            <footer>
              <slot name="footer" />
            </footer>
          )}
        </div>
      </dialog>
    );
  }
}
