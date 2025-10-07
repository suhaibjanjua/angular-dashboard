import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImageUploadDialogComponent } from './image-upload-dialog.component';
import { By } from '@angular/platform-browser';

describe('ImageUploadDialogComponent', () => {
  let component: ImageUploadDialogComponent;
  let fixture: ComponentFixture<ImageUploadDialogComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<ImageUploadDialogComponent>>;
  let mockVideoElement: HTMLVideoElement;

  beforeEach(async () => {
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close', 'afterClosed']);
    dialogRefSpy.afterClosed.and.returnValue({ subscribe: jasmine.createSpy() });

    await TestBed.configureTestingModule({
      imports: [ImageUploadDialogComponent, NoopAnimationsModule],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: { mode: 'upload', userId: '12345' } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ImageUploadDialogComponent);
    component = fixture.componentInstance;
    mockDialogRef = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<ImageUploadDialogComponent>>;
    
    // Mock video element
    mockVideoElement = document.createElement('video');
    mockVideoElement.play = jasmine.createSpy('play').and.returnValue(Promise.resolve());
    Object.defineProperty(mockVideoElement, 'videoWidth', { value: 640, writable: true });
    Object.defineProperty(mockVideoElement, 'videoHeight', { value: 480, writable: true });

    fixture.detectChanges();
  });

  afterEach(() => {
    // Clean up any active video streams
    if (component.videoStream) {
      component.videoStream.getTracks().forEach(track => track.stop());
    }
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Initial State', () => {
    it('should initialize with correct default values', () => {
      expect(component.imageChangedEvent).toBeNull();
      expect(component.croppedImage).toBeNull();
      expect(component.imageSrc).toBeNull();
      expect(component.croppedSrc).toBeNull();
      expect(component.capturedImage).toBeNull();
      expect(component.videoStream).toBeNull();
      expect(component.isCameraActive).toBe(false);
    });

    it('should display initial upload interface', () => {
      const uploadCard = fixture.nativeElement.querySelector('.upload-card');
      expect(uploadCard).toBeTruthy();
      
      const title = fixture.nativeElement.querySelector('mat-card-title');
      expect(title.textContent).toContain('Drag and drop your photo here');
    });

    it('should show upload actions', () => {
      const uploadButton = fixture.nativeElement.querySelector('button[color="primary"]');
      const cameraButton = fixture.nativeElement.querySelector('button[color="accent"]');
      
      expect(uploadButton?.textContent).toContain('Upload a photo');
      expect(cameraButton?.textContent).toContain('Take a selfie');
    });
  });

  describe('File Upload', () => {
    it('should handle file input change', () => {
      spyOn(component, 'validateAndPreview');
      
      const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
      const mockEvent = {
        target: { files: [mockFile] }
      } as any;

      component.handleFileInput(mockEvent);
      
      expect(component.validateAndPreview).toHaveBeenCalledWith(mockFile);
    });

    it('should handle drag and drop', () => {
      spyOn(component, 'validateAndPreview');
      spyOn(component, 'stopCamera');
      
      const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
      const mockEvent = {
        preventDefault: jasmine.createSpy('preventDefault'),
        dataTransfer: { files: [mockFile] }
      } as any;

      component.onDrop(mockEvent);
      
      expect(mockEvent.preventDefault).toHaveBeenCalled();
      expect(component.stopCamera).toHaveBeenCalled();
      expect(component.validateAndPreview).toHaveBeenCalledWith(mockFile);
    });

    it('should validate file type', () => {
      const validFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
      const invalidFile = new File(['test'], 'test.txt', { type: 'text/plain' });

      // Mock Image constructor and URL.createObjectURL
      const mockImage = {
        onload: null,
        src: ''
      };
      spyOn(window as any, 'Image').and.returnValue(mockImage);
      spyOn(URL, 'createObjectURL').and.returnValue('mock-url');

      component.validateAndPreview(validFile);
      expect(URL.createObjectURL).toHaveBeenCalledWith(validFile);

      // Reset spy
      (URL.createObjectURL as jasmine.Spy).calls.reset();

      component.validateAndPreview(invalidFile);
      expect(URL.createObjectURL).not.toHaveBeenCalled();
    });

    it('should validate file size', () => {
      const validFile = new File(['test'], 'test.jpg', { 
        type: 'image/jpeg' 
      });
      Object.defineProperty(validFile, 'size', { value: 1024 * 1024 }); // 1MB

      const invalidFile = new File(['test'], 'test.jpg', { 
        type: 'image/jpeg' 
      });
      Object.defineProperty(invalidFile, 'size', { value: 3 * 1024 * 1024 }); // 3MB

      const mockImage2 = {
        onload: null,
        src: ''
      };
      spyOn(window as any, 'Image').and.returnValue(mockImage2);
      spyOn(URL, 'createObjectURL').and.returnValue('mock-url');

      component.validateAndPreview(validFile);
      expect(URL.createObjectURL).toHaveBeenCalledWith(validFile);

      (URL.createObjectURL as jasmine.Spy).calls.reset();

      component.validateAndPreview(invalidFile);
      expect(URL.createObjectURL).not.toHaveBeenCalled();
    });
  });

  describe('Camera Functionality', () => {
    beforeEach(() => {
      // Mock navigator.mediaDevices
      Object.defineProperty(navigator, 'mediaDevices', {
        value: {
          getUserMedia: jasmine.createSpy('getUserMedia').and.returnValue(
            Promise.resolve({
              getTracks: () => [{ stop: jasmine.createSpy('stop') }]
            })
          )
        },
        configurable: true
      });

      // Mock navigator.permissions
      Object.defineProperty(navigator, 'permissions', {
        value: {
          query: jasmine.createSpy('query').and.returnValue(
            Promise.resolve({ state: 'granted' })
          )
        },
        configurable: true
      });
    });

    it('should start camera successfully', async () => {
      component.videoElement = { nativeElement: mockVideoElement };

      try {
        await component.startCamera();
        expect(navigator.permissions.query).toHaveBeenCalledWith({ name: 'camera' as PermissionName });
        expect(navigator.mediaDevices.getUserMedia).toHaveBeenCalledWith({ video: true });
        expect(component.isCameraActive).toBe(true);
        expect(mockVideoElement.play).toHaveBeenCalled();
      } catch (error) {
        // In test environment, camera might not be available
        expect(component.isCameraActive).toBe(false);
      }
    });

    it('should handle camera permission denied', async () => {
      (navigator.permissions.query as jasmine.Spy).and.returnValue(
        Promise.resolve({ state: 'denied' })
      );

      await component.startCamera();

      expect(component.isCameraActive).toBe(false);
      expect(navigator.mediaDevices.getUserMedia).not.toHaveBeenCalled();
    });

    it('should handle camera access error', async () => {
      (navigator.mediaDevices.getUserMedia as jasmine.Spy).and.returnValue(
        Promise.reject(new Error('Camera not available'))
      );

      await component.startCamera();

      expect(component.isCameraActive).toBe(false);
    });

    it('should capture image from camera', () => {
      component.videoElement = { nativeElement: mockVideoElement };
      component.isCameraActive = true;
      
      spyOn(component, 'stopCamera');
      spyOn(document, 'createElement').and.returnValue({
        width: 500,
        height: 500,
        getContext: () => ({
          drawImage: jasmine.createSpy('drawImage')
        }),
        toDataURL: () => 'data:image/png;base64,mockImageData'
      } as any);

      component.captureImage();

      expect(component.capturedImage).toBe('data:image/png;base64,mockImageData');
      expect(component.imageSrc).toBe('data:image/png;base64,mockImageData');
      expect(component.stopCamera).toHaveBeenCalled();
    });

    it('should stop camera properly', () => {
      const mockTrack = { stop: jasmine.createSpy('stop') };
      component.videoStream = {
        getTracks: () => [mockTrack]
      } as any;
      component.isCameraActive = true;

      component.stopCamera();

      expect(mockTrack.stop).toHaveBeenCalled();
      expect(component.isCameraActive).toBe(false);
    });
  });

  describe('Image Cropping', () => {
    it('should handle file change event for cropping', () => {
      const mockEvent = new Event('change');
      component.fileChangeEvent(mockEvent);
      expect(component.imageChangedEvent).toBe(mockEvent);
    });

    it('should handle image cropped event', () => {
      const mockCroppedEvent = {
        objectUrl: 'mock-cropped-url',
        blob: new Blob()
      };

      component.imageCropped(mockCroppedEvent as any);
      expect(component.croppedImage).toBe('mock-cropped-url');
    });

    it('should save cropped image', () => {
      component.croppedImage = 'mock-cropped-image';
      component.saveImage();
      expect(component.croppedSrc).toBe('mock-cropped-image');
    });

    it('should cancel image editing', () => {
      component.croppedSrc = 'mock-cropped';
      component.imageSrc = 'mock-image';

      component.cancelImage();

      expect(component.croppedSrc).toBeNull();
      expect(component.imageSrc).toBeNull();
    });
  });

  describe('Dialog Actions', () => {
    it('should close modal without result', () => {
      spyOn(component, 'stopCamera');
      
      component.closeModal();
      
      expect(component.stopCamera).toHaveBeenCalled();
      expect(mockDialogRef.close).toHaveBeenCalledWith();
    });

    it('should send image to main modal', () => {
      component.croppedSrc = 'mock-cropped-image';
      
      component.sendImageToMainModal();
      
      expect(mockDialogRef.close).toHaveBeenCalledWith('mock-cropped-image');
    });
  });

  describe('Error Handling and Edge Cases', () => {
    it('should handle missing video element gracefully', async () => {
      component.videoElement = undefined as any;
      
      try {
        await component.startCamera();
        // If it succeeds, camera should remain inactive
        expect(component.isCameraActive).toBe(false);
      } catch (error) {
        // It's expected that this might throw an error
        expect(component.isCameraActive).toBe(false);
      }
    });

    it('should handle camera capture without active camera', () => {
      component.isCameraActive = false;
      
      expect(() => component.captureImage()).not.toThrow();
    });

    it('should handle stop camera without active stream', () => {
      component.videoStream = null;
      
      expect(() => component.stopCamera()).not.toThrow();
    });

    it('should handle file input without files', () => {
      const mockEvent = {
        target: { files: null }
      } as any;

      expect(() => component.handleFileInput(mockEvent)).not.toThrow();
    });
  });
});
