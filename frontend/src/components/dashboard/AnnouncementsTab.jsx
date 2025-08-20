import { useState } from 'react';

const AnnouncementsTab = ({ communityId }) => {
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: 'Pengumuman Rapat Bulanan',
      content: 'Rapat bulanan akan diadakan pada tanggal 25 Agustus 2025 pukul 19:00 di Aula Utama. Mohon kehadiran seluruh anggota komunitas.',
      author: 'Admin',
      date: '20 Agustus 2025',
      isPinned: true,
    },
    {
      id: 2,
      title: 'Jadwal Kerja Bakti',
      content: 'Kerja bakti akan dilaksanakan pada hari Sabtu, 30 Agustus 2025 mulai pukul 08:00. Diharapkan seluruh anggota komunitas dapat berpartisipasi.',
      author: 'Admin',
      date: '18 Agustus 2025',
      isPinned: false,
    },
  ]);
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    content: '',
    isPinned: false,
  });

  // Fungsi untuk menangani perubahan pada form pengumuman baru
  const handleAnnouncementChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewAnnouncement(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Fungsi untuk menangani submit form pengumuman baru
  const handleAnnouncementSubmit = (e) => {
    e.preventDefault();
    
    // Format tanggal saat ini
    const today = new Date();
    const day = today.getDate();
    const month = today.toLocaleString('id-ID', { month: 'long' });
    const year = today.getFullYear();
    const formattedDate = `${day} ${month} ${year}`;
    
    // Buat objek pengumuman baru
    const announcement = {
      id: announcements.length + 1,
      ...newAnnouncement,
      author: 'Admin', // Dalam implementasi sebenarnya, ini akan diambil dari user yang login
      date: formattedDate,
    };
    
    // Tambahkan pengumuman baru ke daftar pengumuman
    setAnnouncements(prev => [announcement, ...prev]);
    
    // Reset form dan tutup modal
    setNewAnnouncement({
      title: '',
      content: '',
      isPinned: false,
    });
    setShowAnnouncementModal(false);
  };

  // Fungsi untuk menangani pin/unpin pengumuman
  const handleTogglePin = (id) => {
    setAnnouncements(prev =>
      prev.map(announcement =>
        announcement.id === id
          ? { ...announcement, isPinned: !announcement.isPinned }
          : announcement
      )
    );
  };

  // Urutkan pengumuman: yang di-pin di atas, kemudian berdasarkan tanggal terbaru
  const sortedAnnouncements = [...announcements].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return 0;
  });

  return (
    <div className="bg-white shadow rounded-lg">
      {/* Header Pengumuman */}
      <div className="px-4 py-5 border-b border-gray-200 sm:px-6 flex justify-between items-center">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Pengumuman
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Informasi dan pengumuman penting untuk anggota komunitas
          </p>
        </div>
        <button
          onClick={() => setShowAnnouncementModal(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          Buat Pengumuman
        </button>
      </div>

      {/* Daftar Pengumuman */}
      <div className="bg-white p-4">
        <div className="space-y-4">
          {sortedAnnouncements.length > 0 ? (
            sortedAnnouncements.map((announcement) => (
              <div key={announcement.id} className={`bg-white shadow overflow-hidden sm:rounded-md ${announcement.isPinned ? 'border-l-4 border-primary-500' : ''}`}>
                <div className="px-4 py-5 sm:px-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
                        {announcement.title}
                        {announcement.isPinned && (
                          <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                            Disematkan
                          </span>
                        )}
                      </h3>
                      <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        Oleh {announcement.author} pada {announcement.date}
                      </p>
                    </div>
                    <button
                      onClick={() => handleTogglePin(announcement.id)}
                      className={`p-2 rounded-full ${announcement.isPinned ? 'text-primary-600 hover:text-primary-800' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </button>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-900 whitespace-pre-line">{announcement.content}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 text-center py-8">Belum ada pengumuman.</p>
          )}
        </div>
      </div>

      {/* Modal Buat Pengumuman */}
      {showAnnouncementModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleAnnouncementSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                      <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                        Buat Pengumuman Baru
                      </h3>
                      <div className="mt-4 space-y-4">
                        <div>
                          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Judul Pengumuman
                          </label>
                          <input
                            type="text"
                            name="title"
                            id="title"
                            required
                            value={newAnnouncement.title}
                            onChange={handleAnnouncementChange}
                            className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                        <div>
                          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                            Isi Pengumuman
                          </label>
                          <textarea
                            id="content"
                            name="content"
                            rows="5"
                            required
                            value={newAnnouncement.content}
                            onChange={handleAnnouncementChange}
                            className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          ></textarea>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="isPinned"
                            name="isPinned"
                            type="checkbox"
                            checked={newAnnouncement.isPinned}
                            onChange={handleAnnouncementChange}
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                          />
                          <label htmlFor="isPinned" className="ml-2 block text-sm text-gray-900">
                            Sematkan pengumuman ini
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Publikasikan
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAnnouncementModal(false)}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Batal
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnnouncementsTab;