import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function BookNowButton({ roomId }: { roomId: string }) {
  const [loading, setLoading] = useState(false);

  const handleBookNow = async () => {
    setLoading(true);
    try {
      // Simulate an API call (replace with real booking logic)
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Room booked successfully!");
    } catch (error) {
      toast.error("Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        className={`px-4 py-2 rounded bg-blue-600 text-white shadow hover:bg-blue-700 transition ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={handleBookNow}
        disabled={loading}
      >
        {loading ? "Booking..." : "Book Now"}
      </button>
      <ToastContainer position="top-center" />
    </>
  );
}