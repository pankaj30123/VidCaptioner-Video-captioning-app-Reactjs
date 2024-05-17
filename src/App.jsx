import { useState, useRef, useEffect } from "react";

function App() {
  const [videoUrl, setVideoUrl] = useState("");
  const [captionText, setCaptionText] = useState("");
  const [captionTime, setCaptionTime] = useState("");
  const [captions, setCaptions] = useState([]);
  const [videoSource, setVideoSource] = useState("");
  const [currentCaption, setCurrentCaption] = useState("");
  const videoRef = useRef(null);

  const handleAddCaption = () => {
    if (videoUrl && captionText && captionTime) {
      if (!videoSource) {
        setVideoSource(videoUrl);
      }
      setCaptions([
        ...captions,
        { time: parseFloat(captionTime), text: captionText },
      ]);
      setCaptionText("");
      setCaptionTime("");
    } else {
      alert("Please enter a valid video URL, caption text, and timestamp.");
    }
  };

  useEffect(() => {
    const videoElement = videoRef.current;
    const handleTimeUpdate = () => {
      const currentTime = videoElement.currentTime;
      const currentCaption = captions.find(
        (caption) => Math.abs(caption.time - currentTime) < 0.5
      );
      setCurrentCaption(currentCaption ? currentCaption.text : "");
    };

    if (videoElement) {
      videoElement.addEventListener("timeupdate", handleTimeUpdate);
      return () => {
        videoElement.removeEventListener("timeupdate", handleTimeUpdate);
      };
    }
  }, [captions]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-teal-200 p-6">
      <div className="bg-amber-100 p-8 rounded-lg shadow-xl w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Video Captioning Web App
        </h1>
        <div className="flex flex-col lg:flex-row lg:space-x-6 space-y-6 lg:space-y-0">
          <div className="flex-1">
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="videoUrl"
                  className="block text-sm font-medium text-gray-700"
                >
                  Video URL:
                </label>
                <input
                  type="text"
                  id="videoUrl"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="Enter video URL here"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-emerald-300"
                />
              </div>
              <div>
                <label
                  htmlFor="captionText"
                  className="block text-sm font-medium text-gray-700"
                >
                  Caption Text:
                </label>
                <input
                  type="text"
                  id="captionText"
                  value={captionText}
                  onChange={(e) => setCaptionText(e.target.value)}
                  placeholder="Enter caption text here"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-emerald-300"
                />
              </div>
              <div>
                <label
                  htmlFor="captionTime"
                  className="block text-sm font-medium text-gray-700"
                >
                  Timestamp (in seconds):
                </label>
                <input
                  type="number"
                  id="captionTime"
                  value={captionTime}
                  onChange={(e) => setCaptionTime(e.target.value)}
                  placeholder="Enter time in seconds"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-emerald-300"
                />
              </div>
              <button
                onClick={handleAddCaption}
                className="w-full bg-emerald-500 text-white py-2 rounded-md hover:bg-emerald-600"
              >
                Add Caption
              </button>
            </div>
          </div>
          <div className="flex-1 relative">
            <video
              ref={videoRef}
              id="videoPlayer"
              controls
              className="w-full mt-6 h-4/5   rounded-lg shadow-md"
            >
              {videoSource && <source src={videoSource} type="video/mp4" />}
              Your browser does not support the video tag.
            </video>
            {currentCaption && (
              <div className=" bottom-1/4 absolute left-1/2 transform -translate-x-1/2 text-lg text-white py-2 px-4 rounded-lg shadow-lg">
                {currentCaption}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
