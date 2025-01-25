import React, { useState } from 'react';

function RoundForm({ onAddRound, onCancel }) {
  const [newRound, setNewRound] = useState({
    name: '',
    type: '',
    date: '',
    notes: ''
  });

  const handleAddRound = (e) => {
    e.preventDefault();
    const round = {
      id: Date.now().toString(),
      ...newRound,
      status: 'pending'
    };
    onAddRound(round);
    setNewRound({ name: '', type: '', date: '', notes: '' });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="bg-white rounded-lg shadow p-6 w-full sm:w-96 md:w-1/2 lg:w-2/3 xl:w-3/4">
        <form onSubmit={handleAddRound} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Round Name</label>
            <input
              type="text"
              value={newRound.name}
              onChange={(e) => setNewRound({ ...newRound, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-lg py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Type</label>
            <input
              type="text"
              value={newRound.type}
              onChange={(e) => setNewRound({ ...newRound, type: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-lg py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              value={newRound.date}
              onChange={(e) => setNewRound({ ...newRound, date: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-lg py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Notes</label>
            <textarea
              value={newRound.notes}
              onChange={(e) => setNewRound({ ...newRound, notes: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-lg py-2"
              rows={3}
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
            >
              Add Round
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RoundForm;
