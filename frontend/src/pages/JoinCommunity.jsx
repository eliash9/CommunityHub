import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const JoinCommunity = () => {
  const navigate = useNavigate();
  const [communityCode, setCommunityCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulasi API call untuk bergabung ke komunitas
      // Dalam implementasi sebenarnya, ini akan memanggil API backend
      setTimeout(() => {
        // Validasi kode komunitas sederhana
        if (communityCode.trim() === '') {
          setError('Kode komunitas tidak boleh kosong');
          setIsLoading(false);
          return;
        }
        
        // Redirect ke dashboard komunitas
        navigate(`/community/${communityCode}/calendar`);
      }, 1500);
    } catch (err) {
      setError('Terjadi kesalahan saat bergabung ke komunitas. Silakan coba lagi.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-2xl font-bold text-primary-600 hover:text-primary-700 transition-colors duration-300">CommunityHub</Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-lg mx-auto pt-10 pb-12 px-4 lg:pb-16">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Gabung ke Komunitas</h1>
          <p className="mt-2 text-sm text-gray-600">
            Masukkan kode atau tautan komunitas untuk bergabung dengan komunitas yang sudah ada.
          </p>
        </div>

        <form className="space-y-6 mt-6" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">{error}</h3>
                </div>
              </div>
            </div>
          )}

          <div>
            <label htmlFor="communityCode" className="block text-sm font-medium text-gray-700">
              Kode Komunitas
            </label>
            <div className="mt-1">
              <input
                type="text"
                id="communityCode"
                required
                value={communityCode}
                onChange={(e) => setCommunityCode(e.target.value)}
                className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Contoh: rw05-jakarta atau tautan lengkap"
              />
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Kode komunitas biasanya diberikan oleh admin komunitas atau dapat ditemukan di tautan undangan.
            </p>
          </div>

          <div className="flex justify-end space-x-3">
            <Link
              to="/"
              className="btn-secondary"
            >
              Batal
            </Link>
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Memproses...' : 'Gabung'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default JoinCommunity;