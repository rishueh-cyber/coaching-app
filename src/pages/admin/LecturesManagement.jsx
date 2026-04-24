import { useState, useRef } from 'react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { FiVideo, FiUpload, FiPlayCircle, FiTrash2, FiRadio } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function LecturesManagement() {
  const { videos, addVideo, removeVideo } = useData();
  const { user } = useAuth();
  const fileInputRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);

  // Upload Logic
  const handleFileUpload = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const newVideo = {
        title: file.name,
        subject: 'General',
        duration: 'Unknown',
        uploadedBy: user.name,
        thumbnail: '🎬',
      };
      addVideo(newVideo);
    }
  };

  // Live Recording Logic
  const handleToggleRecord = () => {
    if (isRecording) {
      setIsRecording(false);
      // Simulate saving a live session
      const liveVideo = {
        title: `Live Session - ${new Date().toLocaleTimeString()}`,
        subject: 'Live Class',
        duration: 'Ended',
        uploadedBy: user.name,
        thumbnail: '🔴',
      };
      addVideo(liveVideo);
    } else {
      setIsRecording(true);
    }
  };

  return (
    <div className="space-y-6 pb-10">
      <div>
        <h1 className="text-3xl font-display font-bold">Video Lectures</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">Upload pre-recorded lectures or start a live class for students.</p>
      </div>

      {(user?.role === 'admin' || user?.role === 'teacher') && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Upload Block */}
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="bg-white dark:bg-obsidian-light p-8 rounded-2xl border-2 border-dashed border-slate-200 dark:border-white/10 flex flex-col items-center text-center cursor-pointer hover:border-electric-blue hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all font-semibold"
          >
            <input type="file" accept="video/*" ref={fileInputRef} className="hidden" onChange={handleFileUpload} />
            <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 text-electric-blue rounded-full mb-3 flex items-center justify-center">
              <FiUpload size={24} />
            </div>
            Upload Lecture
            <p className="font-normal text-xs text-slate-500 mt-2">MP4 or MKV up to 500MB</p>
          </div>

          {/* Live Class Block */}
          <div 
            onClick={handleToggleRecord}
            className={`p-8 rounded-2xl border-2 transition-all flex flex-col items-center text-center cursor-pointer font-semibold ${
              isRecording 
                ? 'border-red-500 bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 animate-pulse' 
                : 'border-rose-200 bg-rose-50 text-rose-600 dark:border-rose-900/40 dark:bg-rose-900/10 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/30'
            }`}
          >
            <div className="w-14 h-14 bg-rose-200 dark:bg-rose-800 text-rose-700 dark:text-rose-200 rounded-full mb-3 flex items-center justify-center">
              {isRecording ? <FiRadio size={24} /> : <FiPlayCircle size={24} />}
            </div>
            {isRecording ? 'Stop Live Recording' : 'Start Live Lecture'}
            <p className="font-normal text-xs opacity-70 mt-2">Record a live classroom session</p>
          </div>
        </div>
      )}

      <h2 className="text-xl font-bold font-display mt-8 mb-4">Lecture Library</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <motion.div 
            key={video.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-obsidian-light rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm overflow-hidden"
          >
            <div className="aspect-video bg-slate-100 dark:bg-slate-800 flex items-center justify-center relative">
              <span className="text-5xl">{video.thumbnail}</span>
              <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                {video.duration}
              </div>
            </div>
            <div className="p-4 relative">
              <h4 className="font-bold font-display line-clamp-1">{video.title}</h4>
              <p className="text-sm text-slate-500 mt-1 capitalize">{video.subject} • {video.views} views</p>
              {(user?.role === 'admin' || user?.role === 'teacher') && (
                <button 
                  onClick={() => removeVideo(video.id)}
                  className="absolute right-4 top-4 text-slate-400 hover:text-red-500"
                >
                  <FiTrash2 size={18} />
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
