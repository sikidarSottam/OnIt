class CameraService {
    private stream: MediaStream | null = null;

    async startCamera(videoElement: HTMLVideoElement | null): Promise<void> {
        if (!videoElement) {
            throw new Error("Video element is not available.");
        }

        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            throw new Error("Camera (getUserMedia) is not supported in this browser.");
        }

        try {
            // Stop any existing stream before starting a new one
            this.stopCamera();
            this.stream = await navigator.mediaDevices.getUserMedia({ video: true });
            videoElement.srcObject = this.stream;
            await videoElement.play();
        } catch (error) {
            console.error("Error accessing camera:", error);
            throw error;
        }
    }

    stopCamera() {
        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
            this.stream = null;
        }
    }

    isActive(): boolean {
        return this.stream !== null;
    }
}

export const cameraService = new CameraService();
