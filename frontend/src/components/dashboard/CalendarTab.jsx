import { useState } from 'react';

const CalendarTab = ({ communityId }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Rapat Bulanan',
      description: 'Rapat rutin bulanan untuk membahas kegiatan komunitas',
      date: new Date(2025, 7, 25), // 25 Agustus 2025
      startTime: '19:00',
      endTime: '21:00',
      location: 'Aula Utama',
    },
    {
      id: 2,
      title: 'Kerja Bakti',
      description: 'Kerja bakti membersihkan lingkungan komunitas',
      date: new Date(2025, 7, 30), // 30 Agustus 2025
      startTime: '08:00',
      endTime: '12:00',
      location: 'Taman Komunitas',
    },
  ]);
  const [showEventModal, setShowEventModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: new Date(),
    startTime: '08:00',
    endTime: '09:00',
    location: '',
  });

  // Fungsi untuk mendapatkan hari dalam bulan
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    
    const days = [];
    
    // Tambahkan hari-hari dari bulan sebelumnya
    const prevMonthDays = new Date(year, month, 0).getDate();
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevMonthDays - i),
        isCurrentMonth: false,
      });
    }
    
    // Tambahkan hari-hari dari bulan ini
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true,
      });
    }
    
    // Tambahkan hari-hari dari bulan berikutnya
    const remainingDays = 42 - days.length; // 6 baris x 7 hari
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
      });
    }
    
    return days;
  };

  // Fungsi untuk mendapatkan nama bulan
  const getMonthName = (date) => {
    const months = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    return months[date.getMonth()];
  };

  // Fungsi untuk mendapatkan nama hari
  const getDayName = (day) => {
    const days = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
    return days[day];
  };

  // Fungsi untuk mendapatkan acara pada tanggal tertentu
  const getEventsForDate = (date) => {
    return events.filter(event => 
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
    );
  };

  // Fungsi untuk menangani perubahan bulan
  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  // Fungsi untuk menangani klik pada tanggal
  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  // Fungsi untuk menangani perubahan pada form acara baru
  const handleEventChange = (e) => {
    const { name, value } = e.target;
    setNewEvent(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Fungsi untuk menangani submit form acara baru
  const handleEventSubmit = (e) => {
    e.preventDefault();
    
    // Buat objek acara baru
    const eventDate = new Date(selectedDate);
    const [year, month, day] = newEvent.date.split('-');
    eventDate.setFullYear(parseInt(year));
    eventDate.setMonth(parseInt(month) - 1);
    eventDate.setDate(parseInt(day));
    
    const event = {
      id: events.length + 1,
      ...newEvent,
      date: eventDate,
    };
    
    // Tambahkan acara baru ke daftar acara
    setEvents(prev => [...prev, event]);
    
    // Reset form dan tutup modal
    setNewEvent({
      title: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
      startTime: '08:00',
      endTime: '09:00',
      location: '',
    });
    setShowEventModal(false);
  };

  // Render kalender
  const days = getDaysInMonth(currentMonth);
  const today = new Date();

  return (
    <div className="bg-white shadow rounded-lg">
      {/* Header Kalender */}
      <div className="px-4 py-5 border-b border-gray-200 sm:px-6 flex justify-between items-center">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {getMonthName(currentMonth)} {currentMonth.getFullYear()}
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Kalender kegiatan komunitas
          </p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handlePrevMonth}
            className="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          <button
            onClick={handleNextMonth}
            className="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          <button
            onClick={() => {
              setSelectedDate(new Date());
              setShowEventModal(true);
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Tambah Acara
          </button>
        </div>
      </div>

      {/* Grid Kalender */}
      <div className="bg-white p-4">
        <div className="grid grid-cols-7 gap-px bg-gray-200 border border-gray-200 rounded">
          {/* Header Hari */}
          {[0, 1, 2, 3, 4, 5, 6].map((day) => (
            <div key={day} className="bg-gray-50 py-2 text-center text-sm font-medium text-gray-700">
              {getDayName(day)}
            </div>
          ))}

          {/* Sel Tanggal */}
          {days.map((day, index) => {
            const dateEvents = getEventsForDate(day.date);
            const isToday = day.date.getDate() === today.getDate() &&
                          day.date.getMonth() === today.getMonth() &&
                          day.date.getFullYear() === today.getFullYear();
            const isSelected = day.date.getDate() === selectedDate.getDate() &&
                             day.date.getMonth() === selectedDate.getMonth() &&
                             day.date.getFullYear() === selectedDate.getFullYear();

            return (
              <div
                key={index}
                onClick={() => handleDateClick(day.date)}
                className={`bg-white min-h-[100px] p-2 ${!day.isCurrentMonth ? 'text-gray-400' : ''} ${isToday ? 'bg-blue-50' : ''} ${isSelected ? 'ring-2 ring-primary-500' : ''} hover:bg-gray-50 cursor-pointer`}
              >
                <div className="flex justify-between">
                  <span className={`text-sm ${isToday ? 'font-bold text-primary-600' : ''}`}>
                    {day.date.getDate()}
                  </span>
                  {dateEvents.length > 0 && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                      {dateEvents.length}
                    </span>
                  )}
                </div>
                <div className="mt-2 space-y-1">
                  {dateEvents.slice(0, 2).map((event) => (
                    <div key={event.id} className="text-xs p-1 rounded bg-primary-50 text-primary-700 truncate">
                      {event.startTime} - {event.title}
                    </div>
                  ))}
                  {dateEvents.length > 2 && (
                    <div className="text-xs text-gray-500">
                      +{dateEvents.length - 2} lainnya
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Daftar Acara untuk Tanggal yang Dipilih */}
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Acara pada {selectedDate.getDate()} {getMonthName(selectedDate)} {selectedDate.getFullYear()}
        </h3>
        <div className="mt-4 space-y-4">
          {getEventsForDate(selectedDate).length > 0 ? (
            getEventsForDate(selectedDate).map((event) => (
              <div key={event.id} className="bg-white shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">{event.title}</h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">{event.description}</p>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Waktu</p>
                      <p className="mt-1 text-sm text-gray-900">{event.startTime} - {event.endTime}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Lokasi</p>
                      <p className="mt-1 text-sm text-gray-900">{event.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">Tidak ada acara pada tanggal ini.</p>
          )}
        </div>
      </div>

      {/* Modal Tambah Acara */}
      {showEventModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleEventSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                      <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                        Tambah Acara Baru
                      </h3>
                      <div className="mt-4 space-y-4">
                        <div>
                          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Judul Acara
                          </label>
                          <input
                            type="text"
                            name="title"
                            id="title"
                            required
                            value={newEvent.title}
                            onChange={handleEventChange}
                            className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                        <div>
                          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Deskripsi
                          </label>
                          <textarea
                            id="description"
                            name="description"
                            rows="3"
                            value={newEvent.description}
                            onChange={handleEventChange}
                            className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          ></textarea>
                        </div>
                        <div>
                          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                            Tanggal
                          </label>
                          <input
                            type="date"
                            name="date"
                            id="date"
                            required
                            value={selectedDate.toISOString().split('T')[0]}
                            onChange={handleEventChange}
                            className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">
                              Waktu Mulai
                            </label>
                            <input
                              type="time"
                              name="startTime"
                              id="startTime"
                              required
                              value={newEvent.startTime}
                              onChange={handleEventChange}
                              className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>
                          <div>
                            <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">
                              Waktu Selesai
                            </label>
                            <input
                              type="time"
                              name="endTime"
                              id="endTime"
                              required
                              value={newEvent.endTime}
                              onChange={handleEventChange}
                              className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>
                        </div>
                        <div>
                          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                            Lokasi
                          </label>
                          <input
                            type="text"
                            name="location"
                            id="location"
                            value={newEvent.location}
                            onChange={handleEventChange}
                            className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
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
                    Simpan
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowEventModal(false)}
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

export default CalendarTab;