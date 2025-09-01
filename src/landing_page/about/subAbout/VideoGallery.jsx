import React from 'react';
import Tilt from 'react-parallax-tilt';

const videos = [
  'https://www.youtube.com/embed/XZQ7bYXEE5g',
  'https://www.youtube.com/embed/dpAJDYnqVJs',
  'https://www.youtube.com/embed/VIDEO_ID_4',
];

function VideoGallery() {
  return (
    <div className="px-4 py-10 bg-gray-100">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 mt-10">Watch Our Videos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {videos.map((src, index) => (
          <Tilt
            key={index}
            tiltMaxAngleX={10}
            tiltMaxAngleY={10}
            perspective={1000}
            transitionSpeed={500}
            scale={1.02}
            gyroscope={true}
            className="w-full aspect-video rounded-xl shadow-md"
          >
            <iframe
              className="w-full h-full rounded-xl"
              src={src}
              title={`YouTube video ${index + 1}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </Tilt>
        ))}
      </div>
    </div>
  );
}

export default VideoGallery;
