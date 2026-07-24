import React, { useState, useEffect } from 'react';
import JSZip from 'jszip';

const ZipPhotoViewer = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadZipPhotos = async () => {
      try {
        setLoading(true);
        // Fetch catalog.zip from public folder
        const response = await fetch(`${process.env.PUBLIC_URL}/catalog.zip`);
        
        if (!response.ok) {
          throw new Error('catalog.zip not found in client/public/');
        }

        const blob = await response.blob();
        const zip = await JSZip.loadAsync(blob);
        const imagePromises = [];

        // Loop through all files in the ZIP archive
        zip.forEach((relativePath, zipEntry) => {
          // Ignore folders, macOS metadata files, and non-image files
          const isImage = /\.(jpe?g|png|webp|gif)$/i.test(zipEntry.name);
          const isMacMeta = zipEntry.name.includes('__MACOSX');

          if (!zipEntry.dir && isImage && !isMacMeta) {
            const promise = zipEntry.async('blob').then((fileBlob) => {
              const imageUrl = URL.createObjectURL(fileBlob);
              return {
                name: zipEntry.name.split('/').pop(), // Extract filename
                url: imageUrl,
              };
            });
            imagePromises.push(promise);
          }
        });

        const loadedPhotos = await Promise.all(imagePromises);
        setPhotos(loadedPhotos);
        setError(null);
      } catch (err) {
        console.error('Error loading ZIP photos:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadZipPhotos();
  }, []);

  if (loading) return <p style={{ color: '#d4af37', textAlign: 'center' }}>Loading Catalog Photos...</p>;
  if (error) return <p style={{ color: '#ff4d4d', textAlign: 'center' }}>Error: {error}</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h3 style={{ color: '#d4af37', textAlign: 'center', marginBottom: '20px' }}>
        Uploaded ZIP Portfolio Archive ({photos.length} Photos)
      </h3>

      {photos.length === 0 ? (
        <p style={{ color: '#aaa', textAlign: 'center' }}>No photos found inside catalog.zip</p>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '20px',
          }}
        >
          {photos.map((photo, index) => (
            <div
              key={index}
              style={{
                background: '#1a1a1a',
                border: '1px solid #d4af37',
                borderRadius: '8px',
                overflow: 'hidden',
                textAlign: 'center',
              }}
            >
              <img
                src={photo.url}
                alt={photo.name}
                style={{ width: '100%', height: '220px', objectFit: 'cover' }}
              />
              <p style={{ color: '#ccc', fontSize: '14px', padding: '10px 5px', margin: 0 }}>
                {photo.name}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ZipPhotoViewer;