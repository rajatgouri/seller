import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { FileUploader, FileItem } from 'ng2-file-upload';
import { AuthService } from '../../shared/services';
import { MediaService } from '../service';
import * as _ from 'lodash';

@Component({
  selector: 'file-upload',
  template: `
    <div class="text-center upload-zone">
      <div ng2FileDrop
         [ngClass]="{'nv-file-over': hasBaseDropZoneOver}"
         (fileOver)="fileOverBase($event)"
         [uploader]="uploader"
         class="well my-drop-zone">
        <p class="text-center">{{options.hintText || 'Drop or click to select file'}}</p>
        <label class="custom-file">
          <input type="file" ng2FileSelect [uploader]="uploader" name="mediaPath"
          [multiple]="multiple" (change)="fileSelect()" class="custom-file-input" *ngIf="!options.isDigital"/>
          <input type="file" ng2FileSelect [uploader]="uploader" name="mediaPath" accept=".zip, .pdf, .rar"
          [multiple]="multiple" (change)="fileSelect()" class="custom-file-input" *ngIf="options.isDigital"/>
          <span class="custom-file-control"></span>
        </label>
      </div>
      <div class="progress" [hidden]="!progress">
        <div class="progress-bar progress-bar-striped progress-bar-animated" [ngStyle]="{width: progress + '%'}"></div>
      </div>
      <p *ngIf="uploader.queue.length && !autoUpload">
        <button type="button" class="btn btn-primary" *ngIf="!uploadOnSelect" (click)="upload()">{{options.uploadText || 'Upload'}}</button>
        <span *ngIf="!multiple">{{itemName}}</span>
        <span *ngIf="multiple">
          <ul>
            <div *ngFor="let item of onAddingFiles">{{item.file.name}}</div>
          </ul>
        </span>
      </p>
      <span *ngIf="uploaded"><i style="color: #0fbc2c" class="fa fa-check-circle-o" aria-hidden="true"></i> File's uploaded</span>
    </div>`
})
export class FileUploadComponent implements OnInit, AfterViewInit {
  /**
   * option format
   * {
   *  customFields: { key: value } // additional field will be added to the form
   *  query: { key: value } // custom query string
   * }
   */
  @Input() options: any;
  public hasBaseDropZoneOver: boolean = false;
  public uploader: FileUploader;
  public multiple: boolean = false;
  public uploadOnSelect: boolean = false;
  public autoUpload: boolean = false;
  private uploadedItems: any = [];
  public itemName: string = null;
  public progress: any = 0;
  public onAddingFiles: any = [];
  public isDigital: any = false;
  public uploaded = false;

  constructor(private authService: AuthService, private mediaService: MediaService) {
  }

  ngOnInit() {
    // TODO - upload default file url and custom field here
    this.isDigital = this.options && this.options.isDigital;
    this.multiple = this.options && this.options.multiple;
    this.uploadOnSelect = this.options && this.options.uploadOnSelect;
    this.autoUpload = this.options && this.options.autoUpload;
    if (!this.options) {
      this.options = {};
    }

    // https://github.com/valor-software/ng2-file-upload/blob/development/src/file-upload/file-uploader.class.ts
    this.uploader = new FileUploader({
      url: window.appConfig.apiBaseUrl + '/media',
      authToken: 'Bearer ' + this.authService.getAccessToken(),
      autoUpload: this.options.autoUpload || false
    });

    this.uploader.onBuildItemForm = (fileItem: FileItem, form: any) => {
      fileItem.alias = this.options.fileFieldName || 'file';
      // append the form
      if (this.options.customFields) {
        Object.keys(this.options.customFields).forEach(key => form.append(key, this.options.customFields[key]));
      }

      if (this.options.url) {
        fileItem.url = this.options.url;
      } else {
        let ep = 'files';
        if (fileItem.file.type.indexOf('image') > -1) {
          ep = 'photos';
        } else if (fileItem.file.type.indexOf('video') > -1) {
          ep = 'videos';
        }

        fileItem.url = `${window.appConfig.apiBaseUrl}/media/${ep}`;
      }
    };

    this.uploader.onProgressItem = (fileItem: FileItem, progress: any) => {
      fileItem.progress = progress;
    };

    this.uploader.onProgressAll = (progress: any) => this.progress = progress;

    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.uploader.removeFromQueue(item);

      // TODO - handle error event too
      const resp = JSON.parse(response);
      this.uploadedItems.push(resp);
      if (this.options.onCompleteItem) {
        this.options.onCompleteItem(resp);
      }
    };
    this.options.uploader = this.uploader;
  }

  ngAfterViewInit() {
    this.uploader.onAfterAddingFile = (item => {
      this.onAddingFiles = this.uploader.queue;
      this.itemName = item.file.name;
      item.withCredentials = false;
    });
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  fileSelect() {
    if (this.options.onFileSelect) {
      this.options.onFileSelect(this.uploader.queue);
    }
  }

  upload(frm: any) {
    if (!this.uploader.queue.length) {
      return alert('Please select file');
    }

    this.uploader.onCompleteAll = () => {
      // TODO - do something
      this.uploader.clearQueue();
      if (this.options.onFinish) {
        this.options.onFinish(this.options.multiple ? this.uploadedItems : this.uploadedItems[0]);
        this.uploaded = true;
      }

      // reset because Queue reset too
      this.uploadedItems = [];
      this.progress = 0;
    };

    this.uploader.uploadAll();
  }
}
