import { useState } from 'react';

const PollsTab = ({ communityId }) => {
  // State untuk daftar polling
  const [polls, setPolls] = useState([
    {
      id: 1,
      question: 'Kapan waktu terbaik untuk rapat bulanan?',
      options: [
        { id: 1, text: 'Senin, 19:00', votes: 5 },
        { id: 2, text: 'Rabu, 20:00', votes: 8 },
        { id: 3, text: 'Sabtu, 10:00', votes: 12 },
      ],
      createdBy: 'Admin',
      createdAt: '15 Agustus 2025',
      isActive: true,
      hasVoted: false,
    },
    {
      id: 2,
      question: 'Tema untuk acara tahunan komunitas?',
      options: [
        { id: 1, text: 'Gotong Royong', votes: 15 },
        { id: 2, text: 'Keberagaman Budaya', votes: 10 },
        { id: 3, text: 'Teknologi dan Inovasi', votes: 7 },
      ],
      createdBy: 'Admin',
      createdAt: '10 Agustus 2025',
      isActive: true,
      hasVoted: true,
      userVote: 1, // ID opsi yang dipilih user
    },
  ]);

  // State untuk modal pembuatan polling baru
  const [showPollModal, setShowPollModal] = useState(false);
  const [newPoll, setNewPoll] = useState({
    question: '',
    options: ['', ''],
  });

  // Fungsi untuk menangani perubahan pada form polling baru
  const handlePollQuestionChange = (e) => {
    setNewPoll(prev => ({
      ...prev,
      question: e.target.value
    }));
  };

  // Fungsi untuk menangani perubahan pada opsi polling
  const handlePollOptionChange = (index, value) => {
    const updatedOptions = [...newPoll.options];
    updatedOptions[index] = value;
    setNewPoll(prev => ({
      ...prev,
      options: updatedOptions
    }));
  };

  // Fungsi untuk menambah opsi polling
  const handleAddOption = () => {
    setNewPoll(prev => ({
      ...prev,
      options: [...prev.options, '']
    }));
  };

  // Fungsi untuk menghapus opsi polling
  const handleRemoveOption = (index) => {
    if (newPoll.options.length <= 2) return; // Minimal 2 opsi
    
    const updatedOptions = [...newPoll.options];
    updatedOptions.splice(index, 1);
    setNewPoll(prev => ({
      ...prev,
      options: updatedOptions
    }));
  };

  // Fungsi untuk menangani submit form polling baru
  const handlePollSubmit = (e) => {
    e.preventDefault();
    
    // Validasi: pastikan pertanyaan dan semua opsi terisi
    if (!newPoll.question.trim()) return;
    if (newPoll.options.some(option => !option.trim())) return;
    
    // Format tanggal saat ini
    const today = new Date();
    const day = today.getDate();
    const month = today.toLocaleString('id-ID', { month: 'long' });
    const year = today.getFullYear();
    const formattedDate = `${day} ${month} ${year}`;
    
    // Buat objek polling baru
    const poll = {
      id: polls.length + 1,
      question: newPoll.question,
      options: newPoll.options.map((text, index) => ({
        id: index + 1,
        text,
        votes: 0,
      })),
      createdBy: 'Admin', // Dalam implementasi sebenarnya, ini akan diambil dari user yang login
      createdAt: formattedDate,
      isActive: true,
      hasVoted: false,
    };
    
    // Tambahkan polling baru ke daftar polling
    setPolls(prev => [poll, ...prev]);
    
    // Reset form dan tutup modal
    setNewPoll({
      question: '',
      options: ['', ''],
    });
    setShowPollModal(false);
  };

  // Fungsi untuk menangani vote pada polling
  const handleVote = (pollId, optionId) => {
    setPolls(prev =>
      prev.map(poll => {
        if (poll.id === pollId) {
          // Update jumlah vote untuk opsi yang dipilih
          const updatedOptions = poll.options.map(option => {
            if (option.id === optionId) {
              return { ...option, votes: option.votes + 1 };
            }
            return option;
          });
          
          // Tandai polling sebagai sudah di-vote oleh user
          return {
            ...poll,
            options: updatedOptions,
            hasVoted: true,
            userVote: optionId,
          };
        }
        return poll;
      })
    );
  };

  // Fungsi untuk menghitung total votes pada polling
  const getTotalVotes = (poll) => {
    return poll.options.reduce((total, option) => total + option.votes, 0);
  };

  // Fungsi untuk menghitung persentase vote untuk setiap opsi
  const getVotePercentage = (votes, totalVotes) => {
    if (totalVotes === 0) return 0;
    return Math.round((votes / totalVotes) * 100);
  };

  // Fungsi untuk menutup polling
  const handleClosePoll = (pollId) => {
    setPolls(prev =>
      prev.map(poll =>
        poll.id === pollId
          ? { ...poll, isActive: false }
          : poll
      )
    );
  };

  return (
    <div className="bg-white shadow rounded-lg">
      {/* Header Polling */}
      <div className="px-4 py-5 border-b border-gray-200 sm:px-6 flex justify-between items-center">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Voting / Polling
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Buat dan ikuti polling untuk keputusan komunitas
          </p>
        </div>
        <button
          onClick={() => setShowPollModal(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          Buat Polling
        </button>
      </div>

      {/* Daftar Polling */}
      <div className="bg-white p-4">
        <div className="space-y-6">
          {polls.length > 0 ? (
            polls.map((poll) => {
              const totalVotes = getTotalVotes(poll);
              
              return (
                <div key={poll.id} className="bg-white shadow overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 sm:px-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
                          {poll.question}
                          {!poll.isActive && (
                            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              Ditutup
                            </span>
                          )}
                        </h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">
                          Dibuat oleh {poll.createdBy} pada {poll.createdAt} • {totalVotes} vote
                        </p>
                      </div>
                      {poll.isActive && (
                        <button
                          onClick={() => handleClosePoll(poll.id)}
                          className="text-sm text-gray-500 hover:text-gray-700"
                        >
                          Tutup polling
                        </button>
                      )}
                    </div>
                    
                    <div className="mt-4 space-y-3">
                      {poll.options.map((option) => {
                        const percentage = getVotePercentage(option.votes, totalVotes);
                        const isSelected = poll.hasVoted && poll.userVote === option.id;
                        
                        return (
                          <div key={option.id} className="relative">
                            {poll.hasVoted ? (
                              // Tampilan setelah vote
                              <div className="flex items-center">
                                <div className="flex-grow">
                                  <div className="flex justify-between items-center mb-1">
                                    <span className="text-sm font-medium text-gray-700 flex items-center">
                                      {option.text}
                                      {isSelected && (
                                        <span className="ml-2 text-xs text-primary-600">(Pilihan Anda)</span>
                                      )}
                                    </span>
                                    <span className="text-sm text-gray-500">{percentage}%</span>
                                  </div>
                                  <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                                    <div
                                      style={{ width: `${percentage}%` }}
                                      className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${isSelected ? 'bg-primary-500' : 'bg-gray-500'}`}
                                    ></div>
                                  </div>
                                </div>
                                <div className="ml-3 text-sm text-gray-500">
                                  {option.votes}
                                </div>
                              </div>
                            ) : (
                              // Tampilan untuk vote
                              <button
                                onClick={() => poll.isActive && handleVote(poll.id, option.id)}
                                disabled={!poll.isActive}
                                className={`w-full text-left px-4 py-2 border rounded-md ${poll.isActive ? 'hover:bg-gray-50 border-gray-300' : 'bg-gray-100 border-gray-200 cursor-not-allowed'}`}
                              >
                                {option.text}
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-sm text-gray-500 text-center py-8">Belum ada polling.</p>
          )}
        </div>
      </div>

      {/* Modal Buat Polling */}
      {showPollModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handlePollSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                      <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                        Buat Polling Baru
                      </h3>
                      <div className="mt-4 space-y-4">
                        <div>
                          <label htmlFor="question" className="block text-sm font-medium text-gray-700">
                            Pertanyaan
                          </label>
                          <input
                            type="text"
                            name="question"
                            id="question"
                            required
                            value={newPoll.question}
                            onChange={handlePollQuestionChange}
                            className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            placeholder="Masukkan pertanyaan polling"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">
                            Opsi Jawaban
                          </label>
                          {newPoll.options.map((option, index) => (
                            <div key={index} className="flex items-center">
                              <input
                                type="text"
                                required
                                value={option}
                                onChange={(e) => handlePollOptionChange(index, e.target.value)}
                                className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                placeholder={`Opsi ${index + 1}`}
                              />
                              {newPoll.options.length > 2 && (
                                <button
                                  type="button"
                                  onClick={() => handleRemoveOption(index)}
                                  className="ml-2 text-red-600 hover:text-red-800"
                                >
                                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                  </svg>
                                </button>
                              )}
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={handleAddOption}
                            className="mt-2 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-primary-700 bg-primary-100 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                          >
                            <svg className="-ml-1 mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                            Tambah Opsi
                          </button>
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
                    Buat Polling
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowPollModal(false)}
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

export default PollsTab;