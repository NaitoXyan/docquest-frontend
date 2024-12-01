import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { fetchProgramData, fetchRoles, createUser } from '../../services/api';
import FormInput from './FormInput';
import FormSelect from './FormSelect';

const CreateUserForm = () => {
  const initialFormState = {
    firstName: '',
    middleInitial: '',
    lastName: '',
    email: '',
    contactNumber: '',
    password: '',
    confirmPassword: '',
    campus: '',
    college: '',
    department: '',
    roleID: '',
  };

  const [formData, setFormData] = useState(initialFormState);
  const [programData, setProgramData] = useState(null);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [programResponse, rolesResponse] = await Promise.all([
          fetchProgramData(),
          fetchRoles(),
        ]);

        setProgramData(programResponse.programID);
        setRoles(rolesResponse);

        // Pre-fill form with program data
        setFormData(prev => ({
          ...prev,
          campus: programResponse.programID.college.campus.name,
          college: programResponse.programID.college.abbreviation,
          department: programResponse.programID.abbreviation,
        }));
      } catch (error) {
        toast.error('Failed to load initial data');
      }
    };

    loadInitialData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!');
      return false;
    }

    const requiredFields = [
      'firstName',
      'lastName',
      'email',
      'contactNumber',
      'password',
      'roleID'
    ];

    const missingFields = requiredFields.filter(field => !formData[field]);
    if (missingFields.length > 0) {
      toast.error('Please fill in all required fields');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const payload = {
      email: formData.email,
      password: formData.password,
      firstname: formData.firstName,
      middlename: formData.middleInitial || '',
      lastname: formData.lastName,
      contactNumber: formData.contactNumber,
      role: [parseInt(formData.roleID)],
      college: programData?.college?.collegeID || null,
      program: programData?.programID || null,
    };

    try {
      await createUser(payload);
      toast.success('User created successfully!');
      setFormData(initialFormState);
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Failed to create user';
      toast.error(errorMessage);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-xl p-6">
        <div className="grid grid-cols-3 gap-4">
          <FormInput
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <FormInput
            label="Middle Initial"
            name="middleInitial"
            value={formData.middleInitial}
            onChange={handleChange}
          />
          <FormInput
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <FormInput
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <FormInput
            label="Contact Number"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <FormInput
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <FormInput
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="bg-white rounded-xl p-6">
        <div className="grid grid-cols-3 gap-4">
          <FormInput
            label="Campus"
            name="campus"
            value={formData.campus}
            readOnly
            disabled
          />
          <FormInput
            label="College"
            name="college"
            value={formData.college}
            readOnly
            disabled
          />
          <FormInput
            label="Department"
            name="department"
            value={formData.department}
            readOnly
            disabled
          />
        </div>

        <div className="mt-4">
          <FormSelect
            label="Role"
            name="roleID"
            value={formData.roleID}
            onChange={handleChange}
            required
            options={roles.map(role => ({
              value: role.roleID,
              label: role.role
            }))}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-900 text-white px-10 py-2 rounded-md hover:bg-blue-800 transition-colors"
        >
          Create
        </button>
      </div>
    </form>
  );
};

export default CreateUserForm;