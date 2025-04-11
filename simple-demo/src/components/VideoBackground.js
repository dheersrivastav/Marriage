import React, { useEffect, useRef, useState } from 'react';

function VideoBackground({ videoUrl, fallbackImageUrl }) {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const containerRef = useRef(null);
  
  // We'll use a direct video embed with multiple backup options
  const weddingVideo = "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"; // Reliable Google-hosted video
  const localVideo = "https://www.w3schools.com/html/mov_bbb.mp4"; // Very reliable small test video
  
  // Use the local video since it's more reliable
  const activeVideo = localVideo;

  useEffect(() => {
    // Create a new HTML5 video element programmatically
    const createVideoElement = () => {
      if (!containerRef.current) return;
      
      try {
        // Create new video element
        const videoElement = document.createElement('video');
        videoElement.muted = true;
        videoElement.autoplay = true;
        videoElement.loop = true;
        videoElement.playsInline = true;
        videoElement.setAttribute('playsinline', '');
        videoElement.classList.add('video-background');
        
        // Apply CSS to make video fit container
        videoElement.style.width = '100%';
        videoElement.style.height = '100%';
        videoElement.style.objectFit = 'cover';
        videoElement.style.position = 'absolute';
        videoElement.style.top = '0';
        videoElement.style.left = '0';
        videoElement.style.zIndex = '-1';
        
        // Add loading handler
        videoElement.addEventListener('loadeddata', () => {
          console.log("Video loaded successfully");
          setVideoLoaded(true);
          videoElement.play().catch(err => {
            console.warn("Auto-play prevented:", err);
          });
        });
        
        // Add error handler
        videoElement.addEventListener('error', (e) => {
          console.error("Video load error:", e);
          setVideoLoaded(false);
        });
        
        // Set source and begin loading
        videoElement.src = activeVideo;
        videoElement.load();
        
        // Add to container
        if (containerRef.current.querySelector('video')) {
          containerRef.current.removeChild(containerRef.current.querySelector('video'));
        }
        containerRef.current.appendChild(videoElement);
        
        // Force play attempt after a delay
        setTimeout(() => {
          videoElement.play().catch(err => {
            console.warn("Delayed play attempt:", err);
          });
        }, 1000);
        
        return videoElement;
      } catch (error) {
        console.error("Error creating video element:", error);
        return null;
      }
    };
    
    const videoElement = createVideoElement();
    
    // Cleanup
    return () => {
      if (videoElement && containerRef.current) {
        containerRef.current.removeChild(videoElement);
      }
    };
  }, [activeVideo]);

  // Fallback image style
  const fallbackStyle = {
    backgroundImage: `url(${fallbackImageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -2,
  };

  return (
    <div ref={containerRef} className="video-container">
      {/* Fallback background always visible as base layer */}
      <div style={fallbackStyle}></div>
      
      {/* Video element will be added programmatically */}
      
      {/* Animated gradient overlay */}
      <div 
        className="video-overlay"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, rgba(26, 34, 56, 0.6), rgba(128, 0, 32, 0.4), rgba(212, 175, 55, 0.3))',
          backgroundSize: '300% 300%',
          animation: 'gradientOverlayAnimation 15s ease infinite',
          zIndex: 0,
        }}
      ></div>
    </div>
  );
}

export default VideoBackground;