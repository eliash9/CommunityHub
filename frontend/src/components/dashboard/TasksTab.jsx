import { useState } from 'react';

const TasksTab = ({ communityId }) => {
  // State untuk daftar tugas
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Piket Kebersihan',
      description: 'Membersihkan area taman dan fasilitas umum',
      assignees: [
        { id: 1, name: 'Budi Santoso' },
        { id: 2, name: 'Dewi Lestari' },
        { id: 3, name: 'Ahmad Rizki' },
      ],
      schedule: [
        { date: '2025-08-25', assigneeId: 1 },
        { date: '2025-08-26', assigneeId: 2 },
        { date: '2025-08-27', assigneeId: 3 },
        { date: '2025-08-28', assigneeId: 1 },
        { date: '2025-08-29', assigneeId: 2 },
      ],
      status: 'active',
    },
    {
      id: 2,
      title: 'Ronda Malam',
      description: 'Menjaga keamanan lingkungan pada malam hari',
      assignees: [
        { id: 4, name: 'Hendra Wijaya' },
        { id: 5, name: 'Bambang Supriadi' },
        { id: 6, name: 'Doni Kusuma' },
        { id: 7, name: 'Eko Prasetyo' },
      ],
      schedule: [
        { date: '2025-08-25', assigneeId: 4 },
        { date: '2025-08-26', assigneeId: 5 },
        { date: '2025-08-27', assigneeId: 6 },
        { date: '2025-08-28', assigneeId: 7 },
        { date: '2025-08-29', assigneeId: 4 },
      ],
      status: 'active',
    },
  ]);

  // State untuk anggota komunitas
  const [members, setMembers] = useState([
    { id: 1, name: 'Budi Santoso', role: 'Anggota' },
    { id: 2, name: 'Dewi Lestari', role: 'Anggota' },
    { id: 3, name: 'Ahmad Rizki', role: 'Anggota' },
    { id: 4, name: 'Hendra Wijaya', role: 'Anggota' },
    { id: 5, name: 'Bambang Supriadi', role: 'Anggota' },
    { id: 6, name: 'Doni Kusuma', role: 'Anggota' },
    { id: 7, name: 'Eko Prasetyo', role: 'Anggota' },
    { id: 8, name: 'Siti Rahayu', role: 'Admin' },
  ]);

  // State untuk modal pembuatan tugas baru
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    assignees: [],
    startDate: '',
    endDate: '',
    rotationType: 'daily', // daily, weekly, monthly
  });

  // State untuk menampilkan detail tugas
  const [selectedTask, setSelectedTask] = useState(null);
  const [showTaskDetailModal, setShowTaskDetailModal] = useState(false);

  // Fungsi untuk menangani perubahan pada form tugas baru
  const handleTaskChange = (e) => {
    const { name, value } = e.target;
    setNewTask(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Fungsi untuk menangani perubahan pada assignees
  const handleAssigneeChange = (memberId) => {
    setNewTask(prev => {
      const isSelected = prev.assignees.includes(memberId);
      
      if (isSelected) {
        // Hapus dari daftar jika sudah ada
        return {
          ...prev,
          assignees: prev.assignees.filter(id => id !== memberId)
        };
      } else {
        // Tambahkan ke daftar jika belum ada
        return {
          ...prev,
          assignees: [...prev.assignees, memberId]
        };
      }
    });
  };

  // Fungsi untuk menangani submit form tugas baru
  const handleTaskSubmit = (e) => {
    e.preventDefault();
    
    // Validasi: pastikan semua field terisi
    if (!newTask.title.trim() || !newTask.description.trim() || 
        newTask.assignees.length === 0 || !newTask.startDate || !newTask.endDate) {
      return;
    }
    
    // Buat jadwal berdasarkan tanggal mulai, tanggal selesai, dan tipe rotasi
    const startDate = new Date(newTask.startDate);
    const endDate = new Date(newTask.endDate);
    const schedule = [];
    
    // Fungsi untuk menambahkan hari ke tanggal
    const addDays = (date, days) => {
      const result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    };
    
    // Fungsi untuk format tanggal ke string YYYY-MM-DD
    const formatDate = (date) => {
      return date.toISOString().split('T')[0];
    };
    
    // Buat jadwal berdasarkan tipe rotasi
    let currentDate = startDate;
    let assigneeIndex = 0;
    
    while (currentDate <= endDate) {
      const assigneeId = newTask.assignees[assigneeIndex % newTask.assignees.length];
      
      schedule.push({
        date: formatDate(currentDate),
        assigneeId: assigneeId
      });
      
      // Increment tanggal berdasarkan tipe rotasi
      switch (newTask.rotationType) {
        case 'daily':
          currentDate = addDays(currentDate, 1);
          break;
        case 'weekly':
          currentDate = addDays(currentDate, 7);
          break;
        case 'monthly':
          const nextMonth = new Date(currentDate);
          nextMonth.setMonth(nextMonth.getMonth() + 1);
          currentDate = nextMonth;
          break;
        default:
          currentDate = addDays(currentDate, 1);
      }
      
      assigneeIndex++;
    }
    
    // Buat objek tugas baru
    const task = {
      id: tasks.length + 1,
      title: newTask.title,
      description: newTask.description,
      assignees: newTask.assignees.map(id => {
        const member = members.find(m => m.id === id);
        return { id, name: member.name };
      }),
      schedule,
      status: 'active',
    };
    
    // Tambahkan tugas baru ke daftar tugas
    setTasks(prev => [...prev, task]);
    
    // Reset form dan tutup modal
    setNewTask({
      title: '',
      description: '',
      assignees: [],
      startDate: '',
      endDate: '',
      rotationType: 'daily',
    });
    setShowTaskModal(false);
  };

  // Fungsi untuk menampilkan detail tugas
  const handleViewTaskDetail = (task) => {
    setSelectedTask(task);
    setShowTaskDetailModal(true);
  };

  // Fungsi untuk mendapatkan nama assignee berdasarkan ID
  const getAssigneeName = (assigneeId) => {
    const assignee = members.find(member => member.id === assigneeId);
    return assignee ? assignee.name : 'Tidak ditugaskan';
  };

  // Fungsi untuk format tanggal
  const formatDateDisplay = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  };

  // Fungsi untuk mendapatkan jadwal hari ini
  const getTodaySchedule = () => {
    const today = new Date().toISOString().split('T')[0];
    const todayTasks = [];
    
    tasks.forEach(task => {
      const todaySchedule = task.schedule.find(s => s.date === today);
      if (todaySchedule) {
        todayTasks.push({
          taskId: task.id,
          taskTitle: task.title,
          assigneeId: todaySchedule.assigneeId,
          assigneeName: getAssigneeName(todaySchedule.assigneeId),
        });
      }
    });
    
    return todayTasks;
  };

  // Mendapatkan jadwal untuk minggu ini
  const getWeekSchedule = () => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay()); // Minggu sebagai awal minggu
    
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    
    const formatDate = (date) => date.toISOString().split('T')[0];
    const startDate = formatDate(startOfWeek);
    const endDate = formatDate(endOfWeek);
    
    const weekSchedule = [];
    
    tasks.forEach(task => {
      task.schedule.forEach(schedule => {
        if (schedule.date >= startDate && schedule.date <= endDate) {
          weekSchedule.push({
            date: schedule.date,
            taskId: task.id,
            taskTitle: task.title,
            assigneeId: schedule.assigneeId,
            assigneeName: getAssigneeName(schedule.assigneeId),
          });
        }
      });
    });
    
    // Urutkan berdasarkan tanggal
    weekSchedule.sort((a, b) => a.date.localeCompare(b.date));
    
    return weekSchedule;
  };

  return (
    <div className="bg-white shadow rounded-lg">
      {/* Header Tugas */}
      <div className="px-4 py-5 border-b border-gray-200 sm:px-6 flex justify-between items-center">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Jadwal Giliran / Tugas
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Kelola jadwal piket, ronda, atau tugas lainnya untuk anggota komunitas
          </p>
        </div>
        <button
          onClick={() => setShowTaskModal(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          Buat Jadwal Baru
        </button>
      </div>

      {/* Jadwal Hari Ini */}
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Jadwal Hari Ini
        </h3>
        <div className="mt-4 bg-gray-50 p-4 rounded-md">
          {getTodaySchedule().length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {getTodaySchedule().map((schedule) => (
                <li key={`${schedule.taskId}-${schedule.assigneeId}`} className="py-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{schedule.taskTitle}</p>
                      <p className="text-sm text-gray-500">Ditugaskan kepada: {schedule.assigneeName}</p>
                    </div>
                    <button
                      onClick={() => handleViewTaskDetail(tasks.find(t => t.id === schedule.taskId))}
                      className="text-sm text-primary-600 hover:text-primary-800"
                    >
                      Lihat Detail
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500 text-center py-4">Tidak ada jadwal untuk hari ini.</p>
          )}
        </div>
      </div>

      {/* Jadwal Minggu Ini */}
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Jadwal Minggu Ini
        </h3>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tanggal
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tugas
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Petugas
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Aksi</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {getWeekSchedule().length > 0 ? (
                getWeekSchedule().map((schedule, index) => (
                  <tr key={`${schedule.taskId}-${schedule.date}-${index}`}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDateDisplay(schedule.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {schedule.taskTitle}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {schedule.assigneeName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleViewTaskDetail(tasks.find(t => t.id === schedule.taskId))}
                        className="text-primary-600 hover:text-primary-800"
                      >
                        Detail
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-sm text-gray-500 text-center">
                    Tidak ada jadwal untuk minggu ini.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Daftar Semua Tugas */}
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Semua Jadwal Tugas
        </h3>
        <div className="mt-4">
          <ul className="divide-y divide-gray-200">
            {tasks.map((task) => (
              <li key={task.id} className="py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-base font-medium text-gray-900">{task.title}</h4>
                    <p className="text-sm text-gray-500 mt-1">{task.description}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Petugas: {task.assignees.map(a => a.name).join(', ')}
                    </p>
                  </div>
                  <button
                    onClick={() => handleViewTaskDetail(task)}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Lihat Detail
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Modal Buat Tugas Baru */}
      {showTaskModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleTaskSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                      <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                        Buat Jadwal Tugas Baru
                      </h3>
                      <div className="mt-4 space-y-4">
                        <div>
                          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Judul Tugas
                          </label>
                          <input
                            type="text"
                            name="title"
                            id="title"
                            required
                            value={newTask.title}
                            onChange={handleTaskChange}
                            className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            placeholder="Contoh: Piket Kebersihan, Ronda Malam"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Deskripsi Tugas
                          </label>
                          <textarea
                            id="description"
                            name="description"
                            rows="3"
                            required
                            value={newTask.description}
                            onChange={handleTaskChange}
                            className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            placeholder="Jelaskan detail tugas yang perlu dilakukan"
                          ></textarea>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Pilih Petugas
                          </label>
                          <div className="mt-1 max-h-48 overflow-y-auto border border-gray-300 rounded-md p-2">
                            {members.map((member) => (
                              <div key={member.id} className="flex items-center py-1">
                                <input
                                  id={`member-${member.id}`}
                                  name={`member-${member.id}`}
                                  type="checkbox"
                                  checked={newTask.assignees.includes(member.id)}
                                  onChange={() => handleAssigneeChange(member.id)}
                                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                                />
                                <label htmlFor={`member-${member.id}`} className="ml-2 block text-sm text-gray-900">
                                  {member.name} ({member.role})
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                              Tanggal Mulai
                            </label>
                            <input
                              type="date"
                              name="startDate"
                              id="startDate"
                              required
                              value={newTask.startDate}
                              onChange={handleTaskChange}
                              className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>
                          <div>
                            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                              Tanggal Selesai
                            </label>
                            <input
                              type="date"
                              name="endDate"
                              id="endDate"
                              required
                              value={newTask.endDate}
                              onChange={handleTaskChange}
                              className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="rotationType" className="block text-sm font-medium text-gray-700">
                            Tipe Rotasi
                          </label>
                          <select
                            id="rotationType"
                            name="rotationType"
                            value={newTask.rotationType}
                            onChange={handleTaskChange}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                          >
                            <option value="daily">Harian</option>
                            <option value="weekly">Mingguan</option>
                            <option value="monthly">Bulanan</option>
                          </select>
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
                    Buat Jadwal
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowTaskModal(false)}
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

      {/* Modal Detail Tugas */}
      {showTaskDetailModal && selectedTask && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      {selectedTask.title}
                    </h3>
                    <div className="mt-4 space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-700">Deskripsi</h4>
                        <p className="mt-1 text-sm text-gray-500">{selectedTask.description}</p>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-700">Petugas</h4>
                        <ul className="mt-1 text-sm text-gray-500 list-disc list-inside">
                          {selectedTask.assignees.map((assignee) => (
                            <li key={assignee.id}>{assignee.name}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-700">Jadwal</h4>
                        <div className="mt-1 max-h-60 overflow-y-auto">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Tanggal
                                </th>
                                <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Petugas
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {selectedTask.schedule.map((schedule, index) => (
                                <tr key={`${schedule.date}-${index}`}>
                                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                                    {formatDateDisplay(schedule.date)}
                                  </td>
                                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                                    {getAssigneeName(schedule.assigneeId)}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => setShowTaskDetailModal(false)}
                  className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TasksTab;