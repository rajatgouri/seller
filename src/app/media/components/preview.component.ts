import { Component, Input } from '@angular/core';
@Component({
  selector: 'media-preview',
  template: `
  <span class="media-preview">
    <img class="img-fluid img-thumbnail media-gallery-item"
      [src]="media?.thumbUrl" alt=""
      *ngIf="media?.type === 'photo'" />
    <i class="fa fa-video media-gallery-item" *ngIf="media?.type === 'video'"></i>
    <i class="fa fa-file media-gallery-item" *ngIf="media?.type === 'file'"></i>
  </span>
  `
})
export class MediaPreviewComponent {
  @Input() media: any;
}
