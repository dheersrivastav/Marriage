import React, { useEffect, useRef, useState } from 'react';

function VideoBackground({ videoUrl, fallbackImageUrl, isYouTube = false }) {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const containerRef = useRef(null);

  // YouTube video ID
  const youtubeVideoId = "JNKZN8uq1H8";
  
  // Use a celebration themed video
  const activeVideo = videoUrl || shortVideo;

  useEffect(() => {
    // Create a new HTML5 video element programmatically
    const createVideoElement = () => {
      if (!containerRef.current) return;
      
      try {
        // Create new video element
        const videoElement = document.createElement('video');
        
        // Essential video attributes for autoplay
        videoElement.muted = true;
        videoElement.autoplay = true;
        videoElement.defaultMuted = true;
        videoElement.loop = true;
        videoElement.playsInline = true;
        videoElement.setAttribute('playsinline', '');
        videoElement.setAttribute('webkit-playsinline', '');
        videoElement.setAttribute('muted', '');
        videoElement.preload = 'auto';
        videoElement.classList.add('video-background');
        
        // Apply CSS to make video fit container
        videoElement.style.width = '100%';
        videoElement.style.height = '100%';
        videoElement.style.objectFit = 'cover';
        videoElement.style.position = 'absolute';
        videoElement.style.top = '0';
        videoElement.style.left = '0';
        videoElement.style.zIndex = '-1';
        videoElement.style.minHeight = '100%';
        videoElement.style.minWidth = '100%';
        videoElement.style.transform = 'translate(-50%, -50%)';
        videoElement.style.left = '50%';
        videoElement.style.top = '50%';
        
        // Add loading handler
        videoElement.addEventListener('loadeddata', () => {
          console.log("Video loaded successfully");
          setVideoLoaded(true);
          
          // Play with multiple fallbacks
          const playPromise = videoElement.play();
          
          if (playPromise !== undefined) {
            playPromise.then(() => {
              console.log("Video playing");
            }).catch(err => {
              console.warn("Auto-play prevented:", err);
              
              // Try to force play with user interaction simulation
              document.addEventListener('click', () => {
                videoElement.play().catch(e => console.warn("User interaction play failed:", e));
              }, { once: true });
              
              // Try playing again after a short delay
              setTimeout(() => videoElement.play().catch(() => {}), 1000);
            });
          }
        });
        
        // Add error handler with multiple fallbacks
        videoElement.addEventListener('error', (e) => {
          console.error("Video load error:", e);
          setVideoLoaded(false);
          
          // Try a cascade of fallback videos
          if (videoElement.src.includes(activeVideo)) {
            console.log("Trying first fallback video");
            videoElement.src = shortVideo;
            videoElement.load();
          } else if (videoElement.src.includes(shortVideo)) {
            console.log("Trying second fallback video");
            videoElement.src = weddingVideo;
            videoElement.load();
          } else if (videoElement.src.includes(weddingVideo)) {
            console.log("Trying last fallback video");
            videoElement.src = celebrationVideo;
            videoElement.load();
          }
        });
        
        // Listen for stalled playback
        videoElement.addEventListener('stalled', () => {
          console.warn("Video playback stalled - forcing reload");
          videoElement.load();
          setTimeout(() => videoElement.play().catch(() => {}), 500);
        });
        
        // Set source and begin loading
        videoElement.src = activeVideo;
        videoElement.load();
        
        // Add to container
        if (containerRef.current.querySelector('video')) {
          containerRef.current.removeChild(containerRef.current.querySelector('video'));
        }
        containerRef.current.appendChild(videoElement);
        
        // Force multiple play attempts at staggered intervals
        const playIntervals = [500, 1000, 2000, 3000, 5000];
        
        playIntervals.forEach(timeout => {
          setTimeout(() => {
            if (videoElement && !videoElement.playing) {
              videoElement.play().catch(() => {
                console.log(`Retry playing at ${timeout}ms`);
              });
            }
          }, timeout);
        });
        
        return videoElement;
      } catch (error) {
        console.error("Error creating video element:", error);
        return null;
      }
    };
    
    // Initial creation
    const videoElement = createVideoElement();
    
    // Create video on mount and when video source changes
    // Periodically check if video is playing
    const checkInterval = setInterval(() => {
      const currentVideo = containerRef.current?.querySelector('video');
      if (currentVideo && currentVideo.paused && videoLoaded) {
        console.log("Video paused but should be playing - restarting");
        currentVideo.play().catch(() => {});
      }
    }, 5000);
    
    // Cleanup
    return () => {
      clearInterval(checkInterval);
      if (videoElement && containerRef.current) {
        if (containerRef.current.contains(videoElement)) {
          containerRef.current.removeChild(videoElement);
        }
      }
    };
  }, [activeVideo, weddingVideo, celebrationVideo, shortVideo, videoLoaded]);

  // Fallback image style for when video doesn't load
  const fallbackStyle = {
    backgroundImage: `url(${fallbackImageUrl || 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80'})`,
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
      
      {/* YouTube Video */}
      <iframe
        src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&mute=1&loop=1&playlist=${youtubeVideoId}&controls=0&modestbranding=1&showinfo=0&rel=0&iv_load_policy=3&playsinline=1`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          height: '100%',
          border: 'none',
          objectFit: 'cover',
          zIndex: -1
        }}
      />
      
      {/* Animated floating particles overlay */}
      <div className="particles-overlay"></div>
      
      {/* Animated gradient overlay */}
      <div 
        className="video-overlay"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, rgba(26, 34, 56, 0.7), rgba(128, 0, 32, 0.5), rgba(212, 175, 55, 0.4))',
          backgroundSize: '400% 400%',
          animation: 'gradientOverlayAnimation 15s ease infinite',
          zIndex: 0,
        }}
      ></div>
    </div>
  );
}

export default VideoBackground;