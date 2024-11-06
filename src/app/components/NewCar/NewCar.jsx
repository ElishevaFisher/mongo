// // components/NewCar/NewCar.ts
import { useState } from "react";

export default function NewCar({ onAddCar }) {
  const [newCar, setNewCar] = useState({ model: "", color: "" });

  const handleAddCar = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/cars", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCar),
      });

      const addedCar = await response.json();

      onAddCar(addedCar);

      setNewCar({ model: "", color: "" });
    } catch (error) {
      console.error("Error adding car", error);
    }
  };

  return (
    <form onSubmit={handleAddCar}>
      <input
        type="text"
        placeholder="Model"
        value={newCar.model}
        onChange={(e) => setNewCar({ ...newCar, model: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Color"
        value={newCar.color}
        onChange={(e) => setNewCar({ ...newCar, color: e.target.value })}
        required
      />
      <button type="submit">Add Car</button>
    </form>
  );
}
