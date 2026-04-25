import { useState, useEffect, useCallback } from 'react';
import { FiYoutube, FiExternalLink, FiLoader, FiSearch, FiPlay, FiX, FiRefreshCw } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const CHANNEL_ID = 'UCRjrOL3McmzRno7hSHOnlQQ';
const CHANNEL_HANDLE = '@ramratanstudy143';
const CHANNEL_URL = `https://www.youtube.com/${CHANNEL_HANDLE}`;

// RSS2JSON proxy to get YouTube RSS without CORS issues
const RSS_PROXY = `https://api.rss2json.com/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

// Fallback videos (from channel scouting) in case RSS fails
const FALLBACK_VIDEOS = [
  { id: 'rI-dGzTuHAM', title: 'Important Books and Authors || Pustak Aur Lekhak For UPSSSC VDO Re-Exam', thumbnail: `https://img.youtube.com/vi/rI-dGzTuHAM/hqdefault.jpg`, publishedAt: '2023-09-15' },
  { id: 'KMYJET8HR2o', title: 'Important Books & Authors || Pustak Aur Lekhak for UPSSSC VDO Re-Exam', thumbnail: `https://img.youtube.com/vi/KMYJET8HR2o/hqdefault.jpg`, publishedAt: '2023-09-10' },
  { id: 'eFfNKhWPOIM', title: 'Army MES New Recruitment 2023 || Military Engineer Service Vacancy 2023', thumbnail: `https://img.youtube.com/vi/eFfNKhWPOIM/hqdefault.jpg`, publishedAt: '2023-08-20' },
  { id: 'Cts5Tk7x-kg', title: 'प्रमुख अभिलेख और उनके शासक || GK TRICK || IMPORTANT INSCRIPTION', thumbnail: `https://img.youtube.com/vi/Cts5Tk7x-kg/hqdefault.jpg`, publishedAt: '2023-08-05' },
  { id: 'rxmJLuPaXMg', title: 'KVS Recruitment 2023 || KVS Vacancy 2023 Full Details', thumbnail: `https://img.youtube.com/vi/rxmJLuPaXMg/hqdefault.jpg`, publishedAt: '2023-07-25' },
  { id: 'PYETCa3VUGY', title: 'Teacher New Vacancy || Age || Eligibility || Qualification || Full Details', thumbnail: `https://img.youtube.com/vi/PYETCa3VUGY/hqdefault.jpg`, publishedAt: '2023-07-18' },
  { id: '2zSnIAf5fa0', title: 'IBPS RRB New Vacancy 2023 || Post 8594 || Eligibility, Age, Qualification', thumbnail: `https://img.youtube.com/vi/2zSnIAf5fa0/hqdefault.jpg`, publishedAt: '2023-07-01' },
  { id: 'H25u0mis2WI', title: 'India Post GDS Recruitment 2023 || Post Office GDS BPM & Vacancy 2023', thumbnail: `https://img.youtube.com/vi/H25u0mis2WI/hqdefault.jpg`, publishedAt: '2023-06-15' },
  { id: 'UPM3yiScu-g', title: 'FCI Recruitment 2023 || FCI Bharti 2023 || All India Job || Full Details', thumbnail: `https://img.youtube.com/vi/UPM3yiScu-g/hqdefault.jpg`, publishedAt: '2023-06-01' },
];

function extractVideoId(url) {
  const match = url?.match(/[?&]v=([^&]+)/) || url?.match(/youtu\.be\/([^?]+)/) || url?.match(/embed\/([^?]+)/);
  return match ? match[1] : null;
}

export default function YoutubeChannel() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchVideos = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(RSS_PROXY);
      const data = await res.json();
      if (data.status === 'ok' && data.items?.length > 0) {
        const parsed = data.items.map(item => {
          const id = extractVideoId(item.link) || extractVideoId(item.guid);
          return {
            id,
            title: item.title,
            thumbnail: id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : '',
            publishedAt: item.pubDate ? item.pubDate.split(' ')[0] : '',
            description: item.description?.replace(/<[^>]+>/g, '').slice(0, 120) + '…',
          };
        }).filter(v => v.id);
        setVideos(parsed);
      } else {
        throw new Error('RSS returned no items');
      }
    } catch {
      setError('Could not load live feed — showing curated videos.');
      setVideos(FALLBACK_VIDEOS);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  const filtered = videos.filter(v =>
    v.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">

      {/* Channel Banner / Hero */}
      <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200 dark:border-white/10">
        {/* Banner gradient background */}
        <div className="h-40 sm:h-52 bg-gradient-to-r from-red-600 via-red-500 to-rose-400 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[url('https://img.youtube.com/vi/rI-dGzTuHAM/maxresdefault.jpg')] bg-cover bg-center blur-sm scale-110" />
          <div className="absolute inset-0 bg-gradient-to-r from-red-700/80 via-red-500/60 to-rose-400/80" />
          {/* YouTube Play Icon watermark */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-10">
            <FiYoutube size={160} className="text-white" />
          </div>
          <div className="relative z-10 text-center px-6">
            <p className="text-white/80 text-sm font-medium uppercase tracking-widest mb-1">
              Official Channel
            </p>
            <h1 className="text-white text-3xl sm:text-5xl font-display font-black drop-shadow-lg">
              Ramratan Study
            </h1>
            <p className="text-white/90 mt-2 text-sm sm:text-base font-medium">
              BANK • SSC • UPSSSC • POLICE • UPSC • TET
            </p>
          </div>
        </div>

        {/* Channel info bar */}
        <div className="bg-white dark:bg-obsidian-light px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Channel Logo Circle */}
            <div className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center text-white font-black text-xl shadow-lg border-4 border-white dark:border-obsidian-light shrink-0 -mt-8 relative z-10">
              RS
            </div>
            <div>
              <h2 className="font-display font-bold text-lg leading-tight">Ramratan Study</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">{CHANNEL_HANDLE} • Govt. Exam Preparation</p>
            </div>
          </div>
          <a
            href={CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl font-bold text-sm transition-all shadow-md hover:shadow-lg active:scale-95 shrink-0"
          >
            <FiYoutube size={18} />
            Visit Channel
            <FiExternalLink size={14} />
          </a>
        </div>
      </div>

      {/* Search & Controls */}
      <div className="flex flex-col sm:flex-row gap-3 items-center">
        <div className="relative flex-1 w-full">
          <FiSearch size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search videos…"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white dark:bg-obsidian-light border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all dark:text-white"
          />
        </div>
        <button
          onClick={fetchVideos}
          disabled={loading}
          className="flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-obsidian-light hover:bg-slate-50 dark:hover:bg-white/5 font-medium transition-all text-sm disabled:opacity-50 shrink-0"
        >
          <FiRefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      {/* Status messages */}
      {error && (
        <div className="flex items-center gap-3 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/40 rounded-xl text-amber-700 dark:text-amber-400 text-sm">
          <span className="text-lg">⚠️</span> {error}
        </div>
      )}

      {/* Video Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <FiLoader size={40} className="animate-spin text-red-500" />
          <p className="text-slate-500 font-medium">Loading videos from Ramratan Study…</p>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold font-display">
              {searchQuery ? `Results for "${searchQuery}"` : 'All Videos'}
              <span className="ml-2 text-sm font-normal text-slate-500">({filtered.length})</span>
            </h2>
          </div>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center py-20 gap-3 text-slate-400">
              <FiSearch size={48} />
              <p className="text-lg font-medium">No videos found for "{searchQuery}"</p>
              <button onClick={() => setSearchQuery('')} className="text-sm text-red-500 hover:underline">Clear search</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((video, idx) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.04, duration: 0.35 }}
                  className="group bg-white dark:bg-obsidian-light rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer"
                  onClick={() => setSelectedVideo(video)}
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-video overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={e => { e.target.src = `https://img.youtube.com/vi/${video.id}/mqdefault.jpg`; }}
                    />
                    {/* Play overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                      <div className="w-14 h-14 bg-red-600/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100 shadow-2xl">
                        <FiPlay size={24} className="text-white ml-1" />
                      </div>
                    </div>
                    {/* YouTube logo badge */}
                    <div className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-md opacity-80">
                      <FiYoutube size={14} />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <h3 className="font-bold text-sm leading-snug line-clamp-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 flex items-center gap-1">
                      <FiYoutube size={12} className="text-red-500" />
                      Ramratan Study
                      {video.publishedAt && <span className="ml-auto">{video.publishedAt}</span>}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Video Player Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 280, damping: 25 }}
              className="w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              {/* Player header */}
              <div className="flex items-center justify-between px-5 py-3 bg-obsidian/80 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <FiYoutube size={20} className="text-red-500" />
                  <span className="text-white font-semibold text-sm truncate max-w-xs sm:max-w-lg">
                    {selectedVideo.title}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={`https://www.youtube.com/watch?v=${selectedVideo.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-white transition-colors"
                    title="Open in YouTube"
                  >
                    <FiExternalLink size={18} />
                  </a>
                  <button
                    onClick={() => setSelectedVideo(null)}
                    className="text-slate-400 hover:text-white transition-colors ml-1"
                    title="Close"
                  >
                    <FiX size={22} />
                  </button>
                </div>
              </div>

              {/* Embedded YouTube Player */}
              <div className="aspect-video w-full">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1&rel=0&modestbranding=1`}
                  title={selectedVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>

              {/* Actions below player */}
              <div className="px-5 py-3 bg-obsidian/80 flex items-center justify-between">
                <p className="text-slate-400 text-xs line-clamp-1">{selectedVideo.title}</p>
                <a
                  href={`https://www.youtube.com/watch?v=${selectedVideo.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-xs font-bold transition-all shrink-0 ml-4"
                >
                  <FiYoutube size={14} />
                  YouTube
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
