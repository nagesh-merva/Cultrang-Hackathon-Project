import React, { useState } from "react";
import { FaPlus, FaCheck } from "react-icons/fa";
import RoundForm from "./RoundForm";

function Rounds() {
  const [rounds, setRounds] = useState([
    // Sample rounds for initial state
    {
      id: "1",
      name: "Round 1",
      type: "Type A",
      status: "pending",
      date: "2025-01-20",
      notes: "Some notes here",
    },
    {
      id: "2",
      name: "Round 2",
      type: "Type B",
      status: "completed",
      date: "2025-01-21",
      notes: "Some more notes here",
    },
  ]);
  const [showForm, setShowForm] = useState(false);

  const handleAddRound = (round) => {
    setRounds([...rounds, round]);
    setShowForm(false); // Hide the form after adding a round
  };

  const handleUpdateStatus = (roundId, status) => {
    setRounds(
      rounds.map((round) =>
        round.id === roundId ? { ...round, status } : round
      )
    );
  };

  return (
    <div className="space-y-6 px-4 py-6">
      {/* Show title only if the form is not visible */}
      {!showForm && (
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-blue-600">Round Management</h2>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <FaPlus className="mr-2 h-4 w-4" />
            Add Round
          </button>
        </div>
      )}

      {showForm && (
        <RoundForm
          onAddRound={handleAddRound}
          onCancel={() => setShowForm(false)}
        />
      )}

      {/* Display rounds after the form is submitted */}
      <div className="space-y-4">
        {rounds.map((round) => (
          <div key={round.id} className="bg-white shadow rounded-lg p-6 mb-4">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-2xl font-medium text-gray-900">
                  {round.name}
                </h3>
                <p className="text-sm text-gray-500">{round.type}</p>
              </div>
              <div className="flex items-center space-x-4">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    round.status === "completed"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {round.status.charAt(0).toUpperCase() + round.status.slice(1)}{" "}
                  {/* Capitalizing status */}
                </span>
                {round.status !== "completed" && (
                  <button
                    onClick={() => handleUpdateStatus(round.id, "completed")}
                    className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    <FaCheck className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
            {round.date && (
              <p className="mt-2 text-sm text-gray-500">
                Date: {new Date(round.date).toLocaleDateString()}
              </p>
            )}
            {round.notes && (
              <p className="mt-2 text-sm text-gray-600">{round.notes}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Rounds;
