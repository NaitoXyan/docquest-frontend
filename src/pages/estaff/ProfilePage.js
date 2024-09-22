import React, { useState } from "react";
import Topbar from "../../components/Topbar";
import Sidebar from "../../components/Sidebar";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Emmanuel James Duallo",
    gender: "Male",
    birthdate: "09/21/2003",
    email: "emmanuelleduallo@gmail.com",
    password: "**********",
    office: "Extension Office",
    role: "Admin",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate an API call to update profile data
    console.log("Form submitted");
    console.log("Profile data:", profileData);
    setIsEditing(false); // Exit edit mode after submission
  };

  return (
    <div className="min-h-screen bg-gray-200 flex">
      <div className="w-1/5 fixed h-full">
        <Sidebar />
      </div>
      <div className="flex-1 ml-[20%]">
        <Topbar />
        <div className="flex justify-center items-center mt-28">
          <div className="w-5/6 bg-white shadow-md rounded-lg p-6">
            <div className="flex justify-center mb-4">
              {/* Avatar */}
              <img
                src="https://via.placeholder.com/150"
                alt="Avatar"
                className="w-48 h-48 rounded-full object-cover border-4 border-gray-300"
              />
            </div>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                {/* Profile Fields */}
                <div>
                  <label className="block font-semibold text-gray-600">Name</label>
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) =>
                      setProfileData({ ...profileData, name: e.target.value })
                    }
                    disabled={!isEditing}
                    className="border p-2 rounded w-full"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-600">Gender</label>
                  <input
                    type="text"
                    value={profileData.gender}
                    onChange={(e) =>
                      setProfileData({ ...profileData, gender: e.target.value })
                    }
                    disabled={!isEditing}
                    className="border p-2 rounded w-full"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-600">Birthdate</label>
                  <input
                    type="text"
                    value={profileData.birthdate}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        birthdate: e.target.value,
                      })
                    }
                    disabled={!isEditing}
                    className="border p-2 rounded w-full"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-600">Email</label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) =>
                      setProfileData({ ...profileData, email: e.target.value })
                    }
                    disabled={!isEditing}
                    className="border p-2 rounded w-full"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-600">Password</label>
                  <input
                    type="password"
                    value={profileData.password}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        password: e.target.value,
                      })
                    }
                    disabled={!isEditing}
                    className="border p-2 rounded w-full"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-600">Office</label>
                  <input
                    type="text"
                    value={profileData.office}
                    onChange={(e) =>
                      setProfileData({ ...profileData, office: e.target.value })
                    }
                    disabled={!isEditing}
                    className="border p-2 rounded w-full"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-600">Role</label>
                  <input
                    type="text"
                    value={profileData.role}
                    onChange={(e) =>
                      setProfileData({ ...profileData, role: e.target.value })
                    }
                    disabled={!isEditing}
                    className="border p-2 rounded w-full"
                  />
                </div>
              </div>

              {/* Edit and Save Button */}
              <div className="flex justify-center mt-4">
                {!isEditing ? (
                  <button
                    type="button"
                    onClick={() => {
                      console.log("Before toggle:", isEditing);
                      setIsEditing(true);
                      console.log("After toggle:", isEditing);
                    }}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
                  >
                    Edit Profile
                  </button>
                ) : (
                  <button
                    type="submit"
                    onClick={() => console.log("Save button clicked")}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg"
                  >
                    Save Changes
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
