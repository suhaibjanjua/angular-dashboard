import { NgIf } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ImageCropperComponent, ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';

@Component({
  selector: 'app-image-upload-dialog',
  imports: [MatProgressSpinnerModule, MatTooltipModule, MatCardModule, MatDialogModule, MatIconModule, MatButtonModule, NgIf, ImageCropperComponent],
  templateUrl: './image-upload-dialog.component.html',
  styleUrl: './image-upload-dialog.component.scss'
})
export class ImageUploadDialogComponent {

  readonly dialogRef = inject(MatDialogRef<ImageUploadDialogComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  imageChangedEvent: Event | null = null;
  croppedImage: string | null = null;

  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  imageSrc: string | null = null;
  croppedSrc: string | null = null;
  capturedImage: string | null = null; // Store captured image
  videoStream: MediaStream | null = null;
  isCameraActive: boolean = false;

  closeModal() {
    this.stopCamera();
    this.dialogRef.close();
  }

  handleFileInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.validateAndPreview(input.files[0]);
    }
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    if (event.dataTransfer?.files && event.dataTransfer.files[0]) {
      this.stopCamera();
      this.validateAndPreview(event.dataTransfer.files[0]);
    }
  }

  validateAndPreview(file: File): void {
    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      // this.appService.openPopup(this.apiService.langData.common.error, `${this.apiService.langData.common.validFileType}: .jpeg, .png`, this.apiService.langData.buttons.btnOk, PopupTypes.ERROR);
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      // this.appService.openPopup(this.apiService.langData.common.error, this.apiService.langData.onboarding.fileSizeCheck, this.apiService.langData.buttons.btnOk, PopupTypes.ERROR);
      return;
    }

    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    img.onload = () => {
      if (img.width < 500 || img.height < 500) {
        // this.appService.openPopup(this.apiService.langData.common.error, this.apiService.langData.onboarding.dimensionsCheck, this.apiService.langData.buttons.btnOk, PopupTypes.ERROR);
      } else {
        this.imageSrc = objectUrl;
      }
    };
    img.src = objectUrl;
  }

  async startCamera(): Promise<void> {
    try {
      const permissionStatus = await navigator.permissions.query({ name: 'camera' as PermissionName });

      if (permissionStatus.state === 'denied') {
        // this.appService.openPopup(this.apiService.langData.common.error, this.apiService.langData.onboarding.cameraCheck, this.apiService.langData.buttons.btnOk, PopupTypes.ERROR);
        return;
      }

      this.isCameraActive = true;
      this.videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
      this.videoElement.nativeElement.srcObject = this.videoStream;
      await this.videoElement.nativeElement.play();

    } catch (err) {
      // this.appService.openPopup(this.apiService.langData.common.error, this.apiService.langData.onboarding.grantPermissionCamera, this.apiService.langData.buttons.btnOk, PopupTypes.ERROR);
      this.isCameraActive = false;
    }
  }


  captureImage(): void {
    if (this.isCameraActive) {
      const canvas = document.createElement('canvas');
      canvas.width = 500;
      canvas.height = 500;
      const context = canvas.getContext('2d');

      if (context) {
        const video = this.videoElement.nativeElement;
        const videoAspectRatio = video.videoWidth / video.videoHeight;
        const canvasAspectRatio = canvas.width / canvas.height;

        let sx = 0, sy = 0, sWidth = video.videoWidth, sHeight = video.videoHeight;

        // Crop to cover the canvas with the video feed
        if (videoAspectRatio > canvasAspectRatio) {
          // Video is wider than canvas
          sWidth = video.videoHeight * canvasAspectRatio;
          sx = (video.videoWidth - sWidth) / 2;
        } else {
          // Video is taller than canvas
          sHeight = video.videoWidth / canvasAspectRatio;
          sy = (video.videoHeight - sHeight) / 2;
        }

        context.drawImage(video, sx, sy, sWidth, sHeight, 0, 0, canvas.width, canvas.height);

        this.capturedImage = canvas.toDataURL('image/png');
        this.imageSrc = this.capturedImage;
      }

      this.stopCamera();
    }
  }


  stopCamera(): void {
    if (this.videoStream) {
      this.videoStream.getTracks().forEach(track => track.stop());
      this.isCameraActive = false;
    }
  }

  allowDrop(event: DragEvent): void {
    event.preventDefault();
  }

  fileChangeEvent(event: Event): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    if (event.objectUrl) {
      this.croppedImage = event.objectUrl;
    }
    // event.blob can be used to upload the cropped image
  }

  imageLoaded(image: LoadedImage) {
    // show cropper
  }

  cropperReady() {
    // cropper ready
  }

  loadImageFailed() {
    // show message
  }

  saveImage(): void {
    this.croppedSrc = this.croppedImage as string;
  }

  cancelImage(): void {
    this.croppedSrc = null;
    this.imageSrc = null;
  }

  sendImageToMainModal(): void {
    this.dialogRef.close(this.croppedSrc);
  }

}
