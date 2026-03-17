import { useState } from 'react';
export default function UploadMusic() {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setStatus('Please fill title');
      return;
    }
    if (!file) {
      setStatus('Please choose a music file to upload');
      return;
    }

    try {
      setStatus('Uploading...');
      const formData = new FormData();
      formData.append('title', title);
      formData.append('music', file);

      const response = await fetch('http://localhost:3000/api/music/upload', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        if (response.status === 401) {
          setStatus('Unauthorized: please login as an artist and try again.');
          return;
        }
        if (response.status === 403) {
          setStatus('Forbidden: you do not have access to upload music.');
          return;
        }
        throw new Error(err.message || 'Upload failed');
      }

      const data = await response.json();
      setStatus('Upload successful!');
      console.log('upload result', data);
    } catch (error) {
      console.error('upload error', error);
      setStatus(`Upload failed: ${error?.message || 'Unknown error'}`);
    }
  };

  const handleFile = (e) => {
    setFile(e.target.files?.[0] || null);
  };

  return (
    <div style={{ maxWidth: 480, margin: '2rem auto', padding: '1rem', border: '1px solid #ddd', borderRadius: 8 }}>
      <h1>Upload Music</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '0.75rem' }}>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Enter track title"
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>

        <div style={{ marginBottom: '0.75rem' }}>
          <label htmlFor="file">Music File</label>
          <input
            id="file"
            type="file"
            accept="audio/*"
            onChange={handleFile}
            required
            style={{ width: '100%', marginTop: '0.25rem' }}
          />
        </div>

        <button type="submit" style={{ padding: '0.5rem 1rem' }}>
          Upload
        </button>
      </form>

      {status && <p style={{ marginTop: '0.75rem' }}>{status}</p>}
    </div>
  );
}
