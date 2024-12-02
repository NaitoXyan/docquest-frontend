import React, { useEffect, useState } from "react";
import axios from "axios";

const ProponentsDeliverables = ({ formData, setFormData, showTrainers }) => {
  const [deliverables, setDeliverables] = useState([]);

  // Trainer-related deliverable names
  const trainerDeliverableNames = [
    "Loading of Trainers", 
    "Trainers CV", 
    "Trainers DTR*"
  ];

  // Fetch deliverables from API
  useEffect(() => {
    const fetchDeliverables = async () => {
      try {
        const response = await axios.get("https://web-production-4b16.up.railway.app/get_checklist");
        setDeliverables(response.data);
      } catch (error) {
        console.error("Error fetching deliverables:", error);
      }
    };

    fetchDeliverables();
  }, []);

  // Effect to manage deliverables based on showTrainers
  useEffect(() => {
    setFormData((prevFormData) => {
      // If showTrainers is true, add ALL deliverable IDs
      if (showTrainers) {
        return {
          ...prevFormData,
          deliverables: deliverables.map(item => item.deliverableID)
        };
      } 
      // If showTrainers is false, remove ONLY trainer-related deliverable IDs
      else {
        const trainerDeliverableIDs = deliverables
          .filter(item => trainerDeliverableNames.includes(item.deliverableName))
          .map(item => item.deliverableID);

        return {
          ...prevFormData,
          deliverables: prevFormData.deliverables.filter(
            id => !trainerDeliverableIDs.includes(id)
          )
        };
      }
    });
  }, [showTrainers, deliverables]);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 mt-10">Checklist of Documentary Requirements</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-2 gap-2 text-gray-700 mr-5">
          {deliverables.map((item) => {
            // Determine if this is a trainer-related deliverable
            const isTrainerDeliverable = trainerDeliverableNames.includes(item.deliverableName);

            // Determine checked status
            const isChecked = showTrainers 
              ? true 
              : !isTrainerDeliverable;

            return (
              <label key={item.deliverableID} className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={isChecked}
                  readOnly={true}
                />
                {item.deliverableName}
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProponentsDeliverables;