'use client';

import { useEffect, useRef, useState } from 'react';
import { Camera, Image as ImageIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CameraPage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [imageData, setImageData] = useState<string | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    // Request camera access when component mounts
    async function setupCamera() {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' } // Use back camera if available
        });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        setError('Unable to access camera. Please ensure you have granted camera permissions.');
        console.error('Camera access error:', err);
      }
    }

    setupCamera();

    // Cleanup function to stop camera stream when component unmounts
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleCapture = async () => {
    if (!canvasRef.current || !videoRef.current) return;

    try {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const context = canvas.getContext('2d');
      if (!context) return;
      
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const capturedImage = canvas.toDataURL('image/jpeg', 0.8);
      setImageData(capturedImage);

      // Redirect to report page immediately
      router.push('/report?status=analyzing');

      // Send image to backend
      const response = await fetch('/api/analyze-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: capturedImage }),
      });

      if (!response.ok) throw new Error('Failed to analyze image');

      const result = await response.json();
      
      // Update URL with analysis ID
      router.push(`/report?id=${result.analysisId}`);
    } catch (err) {
      setError('Failed to process image. Please try again.');
      console.error('Image processing error:', err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="flex justify-between items-center p-4 bg-white border-b border-gray-200">
        <Link href="/" className="text-gray-600">← Back</Link>
        <h1 className="text-xl font-semibold text-blue-600">Capture Food</h1>
        <div className="w-10"></div>
      </header>

      <main className="flex-1 p-4 flex flex-col items-center">
        {/* Camera viewfinder - made smaller and centered */}
        <div className="relative w-full max-w-md aspect-square bg-black rounded-lg mb-4 flex items-center justify-center overflow-hidden">
          {error ? (
            <p className="text-red-500 text-center p-4">{error}</p>
          ) : (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="absolute inset-0 w-full h-full object-cover"
              />
              <canvas ref={canvasRef} className="hidden" />
              <div className="absolute inset-0 border-2 border-white opacity-50 m-4"></div>
              <Button 
                className="absolute bottom-4 right-4 bg-white text-blue-600"
                onClick={handleCapture}
              >
                <Camera className="mr-2 h-4 w-4" /> Capture
              </Button>
            </>
          )}
        </div>

        {/* Tips card - also made smaller to match camera width */}
        <Card className="p-4 mb-4 w-full max-w-md">
          <h2 className="font-semibold mb-2">Tips for Best Results:</h2>
          <ul className="text-sm text-gray-600 list-disc list-inside">
            <li>Ensure good lighting</li>
            <li>Center the food in frame</li>
            <li>Capture the entire plate/dish</li>
          </ul>
        </Card>
      </main>

      <footer className="p-4 bg-white border-t border-gray-200">
        <p className="text-xs text-center text-gray-500">
          Position your food properly for accurate analysis
        </p>
      </footer>
    </div>
  );
} 