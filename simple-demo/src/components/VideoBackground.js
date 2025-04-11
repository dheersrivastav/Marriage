import React from 'react';

function VideoBackground({ videoUrl, fallbackImageUrl }) {
  // Use the fallback image if video cannot be loaded
  const fallbackStyle = {
    backgroundImage: `url(${fallbackImageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
  };

  return (
    <div className="video-container">
      {/* Fallback background for when video is loading or not supported */}
      <div style={fallbackStyle}></div>
      
      {/* Video element */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="video-background"
      >
        <source src={videoUrl} type="video/mp4" />
        {/* Browser doesn't support video tag, fallback already displayed */}
      </video>
      
      {/* Overlay to ensure text readability */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to right, rgba(26, 34, 56, 0.8), rgba(26, 34, 56, 0.5))',
          zIndex: -1
        }}
      ></div>
    </div>
  );
}

export default VideoBackground;