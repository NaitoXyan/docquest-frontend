import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { EstaffFetchCampus, EstaffFetchCollege, EstaffFetchProgram, EstaffFetchRoles, createUser } from '../../services/api';
import FormInput from '../../components/CreateUser/FormInput';
import FormSelect from '../../components/CreateUser/FormSelect';

const EstaffCreateUserForm = () => {
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
    program: '',
    roleID: '',
  };

  const [formData, setFormData] = useState(initialFormState);
  const [campuses, setCampuses] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        // Fetch campuses and roles initially
        const [campusResponse, rolesResponse] = await Promise.all([
          EstaffFetchCampus(),
          EstaffFetchRoles(),
        ]);

        setCampuses(campusResponse);
        setRoles(rolesResponse);
      } catch (error) {
        toast.error('Failed to load initial data');
      }
    };

    loadInitialData();
  }, []);

  const handleCampusChange = async (e) => {
    const campusID = e.target.value;
    setFormData((prev) => ({ ...prev, campus: campusID, college: '', program: '' }));

    try {
      const collegeResponse = await EstaffFetchCollege(campusID);
      setColleges(collegeResponse);
      setPrograms([]); // Clear programs since the campus changed
    } catch (error) {
      toast.error('Failed to load colleges');
    }
  };

  const handleCollegeChange = async (e) => {
    const collegeID = e.target.value;
    setFormData((prev) => ({ ...prev, college: collegeID, program: '' }));

    try {
      const programResponse = await EstaffFetchProgram(collegeID);
      setPrograms(programResponse);
    } catch (error) {
      toast.error('Failed to load programs');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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
      'roleID',
      'campus',
      'college',
      'program',
    ];

    const missingFields = requiredFields.filter((field) => !formData[field]);
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
      campus: parseInt(formData.campus),
      college: parseInt(formData.college),
      program: parseInt(formData.program),
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
        <FormSelect
          label="Campus"
          name="campus"
          value={formData.campus}
          onChange={handleCampusChange}
          required
          options={campuses.map((campus) => ({
            value: campus.id,
            label: campus.name,
          }))}
        />

        <FormSelect
          label="College"
          name="college"
          value={formData.college}
          onChange={handleCollegeChange}
          options={colleges.map((college) => ({
            value: college.id,
            label: college.name,
          }))}
        />

        <FormSelect
          label="Program"
          name="program"
          value={formData.program}
          onChange={handleChange}
          options={programs.map((program) => ({
            value: program.id,
            label: program.name,
          }))}
        />

        <FormSelect
          label="Role"
          name="roleID"
          value={formData.roleID}
          onChange={handleChange}
          required
          options={roles.map((role) => ({
            value: role.roleID,
            label: role.code === 'rglr' ? 'Regular (Project Leader)' : role.role,
          }))}
        />
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

export default EstaffCreateUserForm;