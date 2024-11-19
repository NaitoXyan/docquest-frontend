import React, { useEffect, useState } from "react";
import axios from "axios";

const ProponentsDeliverables = ({ formData, setFormData }) => {
  const [deliverables, setDeliverables] = useState([]);

  // Fetch deliverables from API
  useEffect(() => {
    const fetchDeliverables = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/get_checklist");
        setDeliverables(response.data);
      } catch (error) {
        console.error("Error fetching deliverables:", error);
      }
    };

    fetchDeliverables();
  }, []);

  // Handle checkbox change
  const handleCheckboxChange = (deliverableID) => {
    setFormData((prevFormData) => {
      const isSelected = prevFormData.deliverables.includes(deliverableID);

      // Toggle deliverableID in the array
      const updatedDeliverables = isSelected
        ? prevFormData.deliverables.filter((id) => id !== deliverableID)
        : [...prevFormData.deliverables, deliverableID];

      return { ...prevFormData, deliverables: updatedDeliverables };
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 mt-10">Proponents Deliverables</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-2 gap-2 text-gray-700 mr-5">
          {deliverables.map((item) => (
            <label key={item.deliverableID} className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={formData.deliverables.includes(item.deliverableID)}
                onChange={() => handleCheckboxChange(item.deliverableID)}
              />
              {item.deliverableName}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProponentsDeliverables;