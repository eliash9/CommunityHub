import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CreateCommunity = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    language: 'id',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulasi API call untuk membuat komunitas
      // Dalam implementasi sebenarnya, ini akan memanggil API backend
      setTimeout(() => {
        // Generate ID unik untuk komunitas (dalam implementasi sebenarnya dari backend)
        const communityId = `${formData.name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`;
        
        // Redirect ke dashboard komunitas
        navigate(`/community/${communityId}/calendar`);
      }, 1500);
    } catch (err) {
      setError('Terjadi kesalahan saat membuat komunitas. Silakan coba lagi.');
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
          <h1 className="text-3xl font-extrabold text-gray-900">Buat Komunitas Baru</h1>
          <p className="mt-2 text-sm text-gray-600">
            Isi formulir di bawah ini untuk membuat komunitas baru. Anda akan menjadi admin komunitas ini.
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
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nama Komunitas
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="name"
                id="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Contoh: RW 05 Jakarta Selatan"
              />
            </div>
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Lokasi
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="location"
                id="location"
                required
                value={formData.location}
                onChange={handleChange}
                className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Contoh: Jakarta, Indonesia"
              />
            </div>
          </div>

          <div>
            <label htmlFor="language" className="block text-sm font-medium text-gray-700">
              Bahasa
            </label>
            <div className="mt-1">
              <select
                id="language"
                name="language"
                value={formData.language}
                onChange={handleChange}
                className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
              >
                <option value="id">Bahasa Indonesia</option>
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
              </select>
            </div>
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
              {isLoading ? 'Memproses...' : 'Buat Komunitas'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CreateCommunity;