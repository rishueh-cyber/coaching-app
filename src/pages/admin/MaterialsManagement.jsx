import { useState, useRef } from 'react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { FiUploadCloud, FiTrash2, FiFileText } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function MaterialsManagement() {
  const { materials, addMaterial, removeMaterial } = useData();
  const { user } = useAuth();
  const fileInputRef = useRef(null);

  const [dragActive, setDragActive] = useState(false);

  const handleDrag = function(e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const processFile = (file) => {
    if (!file) return;
    const newMaterial = {
      title: file.name,
      type: file.name.split('.').pop().toUpperCase(),
      subject: 'General',
      uploadedBy: user.name,
      size: (file.size / (1024 * 1024)).toFixed(2) + ' MB'
    };
    addMaterial(newMaterial);
  };

  const handleDrop = function(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = function(e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-6 pb-10">
      <div>
        <h1 className="text-3xl font-display font-bold">Study Materials</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">Upload syllabus contents, assignments, and test papers for your students.</p>
      </div>

      {/* Upload Dropzone (Admin/Teacher only) */}
      {(user?.role === 'admin' || user?.role === 'teacher') && (
        <div 
          className={`bg-white dark:bg-obsidian-light rounded-2xl border-2 border-dashed transition-all duration-300 p-10 flex flex-col items-center justify-center text-center cursor-pointer
            ${dragActive ? 'border-electric-blue bg-blue-50 dark:bg-blue-900/10' : 'border-slate-300 dark:border-white/10 hover:border-slate-400'}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input ref={fileInputRef} type="file" multiple className="hidden" onChange={handleChange} />
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-electric-blue rounded-full mb-4 flex items-center justify-center">
            <FiUploadCloud size={30} />
          </div>
          <h3 className="text-xl font-bold font-display mb-2">Drag & Drop files here</h3>
          <p className="text-slate-500 text-sm">Or click to browse your computer. Supports PDF, DOCX, ZIP.</p>
        </div>
      )}

      {/* Materials List */}
      <h2 className="text-xl font-bold font-display mt-8 mb-4">Uploaded Files</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {materials.map((mat, index) => (
          <motion.div 
            key={mat.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white dark:bg-obsidian-light p-4 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow relative group"
          >
            <div className="w-12 h-12 bg-purple-50 dark:bg-purple-900/20 text-neon-violet rounded-xl shrink-0 flex items-center justify-center mt-1">
              <FiFileText size={24} />
            </div>
            <div className="flex-1 pr-6 truncate">
              <h4 className="font-bold text-sm truncate" title={mat.title}>{mat.title}</h4>
              <p className="text-xs text-slate-500 mt-1">{mat.size} • {mat.type}</p>
              <p className="text-xs text-slate-400 mt-2">By {mat.uploadedBy} on {mat.date}</p>
            </div>
            
            {(user?.role === 'admin' || user?.role === 'teacher') && (
              <button 
                onClick={() => removeMaterial(mat.id)}
                className="absolute top-4 right-4 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <FiTrash2 size={18} />
              </button>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
