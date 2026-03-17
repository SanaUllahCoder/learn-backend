import { useEffect, useState } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export default function Music() {
  const [musics, setMusics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMusic() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`${API_BASE_URL}/api/music/`, {
          method: 'GET',
          credentials: 'include',
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data?.message || 'Failed to load music');
        }

        setMusics(Array.isArray(data.musics) ? data.musics : []);
      } catch (err) {
        setError(err.message || 'Error fetching music');
      } finally {
        setLoading(false);
      }
    }

    fetchMusic();
  }, []);

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 24 }}>
      <h1>Music</h1>

      {loading && <p>Loading music...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && musics.length === 0 && <p>No music found. Upload some music first.</p>}

      <div style={{ display: 'grid', gap: 18, marginTop: 18 }}>
        {musics.map((music) => (
          <div key={music._id || music.id} style={{ border: '1px solid #ccc', borderRadius: 8, padding: 14 }}>
            <h2 style={{ margin: 0 }}>{music.title || music.caption || 'Untitled'}</h2>
            <p style={{ margin: '6px 0', color: '#555' }}>
              Artist: {music.artist?.username || music.artist?.email || 'Unknown'}
            </p>

            {music.uri ? (
              <audio controls src={music.uri} style={{ width: '100%', marginTop: 8 }}>
                Your browser does not support the audio element.
              </audio>
            ) : (
              <p style={{ color: '#666' }}>Audio source not available.</p>
            )}

            {music.caption && (
              <p style={{ marginTop: 8, color: '#333' }}><strong>Caption:</strong> {music.caption}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
