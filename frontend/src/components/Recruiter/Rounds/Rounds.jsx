import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPlus, FaCheck } from "react-icons/fa";
import RoundForm from "./RoundForm";

function Rounds() {
  const [rounds, setRounds] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch rounds from the API
  useEffect(() => {
    const fetchRounds = async () => {
      const companyId = sessionStorage.getItem("company_id");
      if (!companyId) {
        alert("Company ID is missing in sessionStorage.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("http://127.0.0.1:5000/recruitment-rounds", {
          params: { company_id: companyId },
        });
        setRounds(response.data); // Assuming the API returns an array of rounds
      } catch (error) {
        console.error("Error fetching rounds:", error);
        alert("Failed to fetch rounds. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchRounds();
  }, []);

  // const handleAddRound = (newRound) => {
  //   setRounds([...rounds, newRound]);
  //   setShowForm(false); // Hide the form after adding a round
  // };

  const handleUpdateStatus = (roundId, status) => {
    setRounds(
      rounds.map((round) =>
        round.id === roundId ? { ...round, status } : round
      )
    );
  };

  if (loading) {
    return <div className="text-center text-lg font-medium">Loading...</div>;
  }

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
          onCancel={() => setShowForm(false)}
        />
      )}

      {/* Display rounds */}
      <div className="space-y-4">
        {rounds.length > 0 ? (
          rounds.map((round) => (
            <div key={round.id} className="bg-white shadow rounded-lg p-6 mb-4">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-2xl font-medium text-gray-900">
                    {round.name}
                  </h3>
                  <p className="text-sm text-gray-500">Type: {round.type}</p>
                  <p className="text-sm text-gray-500">Description: {round.description}</p>
                  <p className="text-sm text-gray-500">Order Number: {round.order_number}</p>
                  <p className="text-sm text-gray-500">Job ID: {round.job_id}</p>
                  <p className="text-sm text-gray-500">
                    Created At: {new Date(round.created_at).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    Updated At: {new Date(round.updated_at).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">Company ID: {round.company_id}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${round.status === "completed"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                      }`}
                  >
                    {round.status.charAt(0).toUpperCase() + round.status.slice(1)}
                  </span>
                  {round.status !== "Completed" && (
                    <button
                      onClick={() => handleUpdateStatus(round.id, "completed")}
                      className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      <FaCheck className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No rounds available.</p>
        )}
      </div>
    </div>
  );
}

export default Rounds;
