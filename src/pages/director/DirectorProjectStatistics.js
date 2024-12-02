import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart } from '@mui/x-charts/BarChart';
import DirectorSidebar from '../../components/DirectorSidebar';
import Topbar from '../../components/Topbar';
import CircularProgress from '@mui/material/CircularProgress';

const DirectorProjectStatistics = () => {
  const token = localStorage.getItem('token');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [campusFilter, setCampusFilter] = useState({
    year: '',
    month: '',
    campus: '',
    status: 'all'
  });

  const [collegeFilter, setCollegeFilter] = useState({
    year: '',
    month: '',
    campus: '',
    college: '',
    status: 'all'
  });

  const [programFilter, setProgramFilter] = useState({
    year: '',
    month: '',
    campus: '',
    college: '',
    program: '',
    status: 'all'
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('https://web-production-4b16.up.railway.app/get_all_projects', {
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
          }
        });
        setProjects(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch projects');
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 5 }, (_, i) => currentYear - i);
  };

  const generateMonthOptions = () => {
    return [
      { value: 1, label: 'January' },
      { value: 2, label: 'February' },
      { value: 3, label: 'March' },
      { value: 4, label: 'April' },
      { value: 5, label: 'May' },
      { value: 6, label: 'June' },
      { value: 7, label: 'July' },
      { value: 8, label: 'August' },
      { value: 9, label: 'September' },
      { value: 10, label: 'October' },
      { value: 11, label: 'November' },
      { value: 12, label: 'December' }
    ];
  };

  const safeExtract = (project, groupBy) => {
    if (!project.program || project.program.length === 0) {
      return 'Unassigned';
    }

    try {
      switch (groupBy) {
        case 'campus':
          return project.program[0]?.college?.campus?.name || 'Unknown Campus';
        case 'college':
          return project.program[0]?.college?.title || 'Unknown College';
        case 'program':
          return project.program[0]?.title || 'Unknown Program';
        default:
          return 'Unknown';
      }
    } catch (err) {
      console.error(`Error extracting ${groupBy}:`, err);
      return 'Unknown';
    }
  };

  const generateUniqueValues = (groupBy) => {
    const uniqueValues = new Set(
      projects.map(project => safeExtract(project, groupBy))
    );
    return Array.from(uniqueValues).sort();
  };

  const filterProjects = (projects, filter, groupBy) => {
    return projects.filter(project => {
      if (!project || !project.dateCreated) return false;

      const date = new Date(project.dateCreated);
      const yearMatch = !filter.year || date.getFullYear() === parseInt(filter.year);
      const monthMatch = !filter.month || date.getMonth() + 1 === parseInt(filter.month);
      const statusMatch = filter.status === 'all' ||
        (project.status || '').toLowerCase() === filter.status;

      const dynamicFilters = {
        campus: !filter.campus ||
          safeExtract(project, 'campus').toLowerCase() === filter.campus.toLowerCase(),
        college: !filter.college ||
          safeExtract(project, 'college').toLowerCase() === filter.college.toLowerCase(),
        program: !filter.program ||
          safeExtract(project, 'program').toLowerCase() === filter.program.toLowerCase()
      };

      const additionalFiltersMatch = Object.keys(dynamicFilters)
        .filter(key => filter.hasOwnProperty(key))
        .every(key => dynamicFilters[key]);

      return yearMatch && monthMatch && statusMatch && additionalFiltersMatch;
    });
  };

  const generateBarData = (filter, groupBy) => {
    const filteredProjects = filterProjects(projects, filter, groupBy);
    const groupedData = filteredProjects.reduce((acc, project) => {
      const groupKey = safeExtract(project, groupBy);

      if (!acc[groupKey]) {
        acc[groupKey] = {
          approved: 0,
          pending: 0,
          rejected: 0
        };
      }

      const status = project.status?.toLowerCase() || 'unknown';
      switch (status) {
        case 'approved':
          acc[groupKey].approved++;
          break;
        case 'pending':
          acc[groupKey].pending++;
          break;
        case 'rejected':
          acc[groupKey].rejected++;
          break;
      }
      return acc;
    }, {});

    return {
      labels: Object.keys(groupedData),
      approved: Object.values(groupedData).map(item => item.approved),
      pending: Object.values(groupedData).map(item => item.pending),
      rejected: Object.values(groupedData).map(item => item.rejected)
    };
  };

  const renderBarChart = (filter, groupBy) => {
    const data = generateBarData(filter, groupBy);

    const allZero = data.approved.every(val => val === 0) &&
      data.pending.every(val => val === 0) &&
      data.rejected.every(val => val === 0);

    if (allZero) {
      return (
        <div className="text-center text-red-500 py-8">
          No data available for {groupBy}
        </div>
      );
    }

    return (
      <div className="w-full overflow-x-auto">
        <BarChart
          xAxis={[{
            scaleType: 'band',
            data: data.labels
          }]}
          series={[
            { data: data.approved, label: 'Approved', color: '#4ADE80' },
            { data: data.pending, label: 'Pending', color: '#FACC15' },
            { data: data.rejected, label: 'Rejected', color: '#F87171' }
          ]}
          width={Math.max(800, data.labels.length * 100)}
          height={400}
        />
      </div>
    );
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-1/5 fixed h-full z-10">
        <DirectorSidebar />
      </div>

      <div className="flex-1 ml-[20%] overflow-y-auto">
        <Topbar />

        <div className="p-6 bg-gray-200">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <CircularProgress />
            </div>
          ) : error ? (
            <div className="text-red-500 text-center">
              {error}
            </div>
          ) : (
            <div className="space-y-6">
              <h2 className="text-xl font-bold">PROJECTS STATISTICS</h2>

              {/* Campus Section */}
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">PROJECTS BY CAMPUS</h3>
                <div className="flex flex-wrap gap-4 mb-4">
                  <select
                    value={campusFilter.year}
                    onChange={(e) => setCampusFilter(prev => ({ ...prev, year: e.target.value }))}
                    className="px-3 py-2 border rounded-md flex-grow"
                  >
                    <option value="">All Years</option>
                    {generateYearOptions().map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>

                  <select
                    value={campusFilter.month}
                    onChange={(e) => setCampusFilter(prev => ({ ...prev, month: e.target.value }))}
                    className="px-3 py-2 border rounded-md flex-grow"
                  >
                    <option value="">All Months</option>
                    {generateMonthOptions().map(month => (
                      <option key={month.value} value={month.value}>{month.label}</option>
                    ))}
                  </select>

                  <select
                    value={campusFilter.campus}
                    onChange={(e) => setCampusFilter(prev => ({ ...prev, campus: e.target.value }))}
                    className="px-3 py-2 border rounded-md flex-grow"
                  >
                    <option value="">All Campuses</option>
                    {generateUniqueValues('campus').map(campus => (
                      <option key={campus} value={campus}>{campus}</option>
                    ))}
                  </select>

                  <select
                    value={campusFilter.status}
                    onChange={(e) => setCampusFilter(prev => ({ ...prev, status: e.target.value }))}
                    className="px-3 py-2 border rounded-md flex-grow"
                  >
                    <option value="all">All Statuses</option>
                    <option value="approved">Approved</option>
                    <option value="pending">Pending</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
                <div className='flex justify-center w-full'>
                  <div className='justify items-center'>
                    {renderBarChart(campusFilter, 'campus')}
                  </div>
                </div>
              </div>

              {/* College Section */}
              <div className="bg-white shadow-lg rounded-lg p-6 justify-center">
                <h3 className="text-xl font-bold mb-4">PROJECTS BY COLLEGE</h3>
                <div className="flex flex-wrap gap-4 mb-4">
                  <select
                    value={collegeFilter.year}
                    onChange={(e) => setCollegeFilter(prev => ({ ...prev, year: e.target.value }))}
                    className="px-3 py-2 border rounded-md flex-grow"
                  >
                    <option value="">All Years</option>
                    {generateYearOptions().map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>

                  <select
                    value={collegeFilter.month}
                    onChange={(e) => setCollegeFilter(prev => ({ ...prev, month: e.target.value }))}
                    className="px-3 py-2 border rounded-md flex-grow"
                  >
                    <option value="">All Months</option>
                    {generateMonthOptions().map(month => (
                      <option key={month.value} value={month.value}>{month.label}</option>
                    ))}
                  </select>

                  <select
                    value={collegeFilter.campus}
                    onChange={(e) => setCollegeFilter(prev => ({ ...prev, campus: e.target.value }))}
                    className="px-3 py-2 border rounded-md flex-grow"
                  >
                    <option value="">All Campuses</option>
                    {generateUniqueValues('campus').map(campus => (
                      <option key={campus} value={campus}>{campus}</option>
                    ))}
                  </select>

                  <select
                    value={collegeFilter.college}
                    onChange={(e) => setCollegeFilter(prev => ({ ...prev, college: e.target.value }))}
                    className="px-3 py-2 border rounded-md flex-grow"
                  >
                    <option value="">All Colleges</option>
                    {generateUniqueValues('college').map(college => (
                      <option key={college} value={college}>{college}</option>
                    ))}
                  </select>

                  <select
                    value={collegeFilter.status}
                    onChange={(e) => setCollegeFilter(prev => ({ ...prev, status: e.target.value }))}
                    className="px-3 py-2 border rounded-md flex-grow"
                  >
                    <option value="all">All Statuses</option>
                    <option value="approved">Approved</option>
                    <option value="pending">Pending</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
                <div className='flex justify-center w-full'>
                  <div className='justify items-center'>
                    {renderBarChart(collegeFilter, 'college')}
                  </div>
                </div>
              </div>

              {/* Program Section */}
              <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
                <h3 className="text-xl font-bold mb-4">PROJECTS BY PROGRAM</h3>
                <div className="flex flex-wrap gap-4 mb-4">
                  <select
                    value={programFilter.year}
                    onChange={(e) => setProgramFilter(prev => ({ ...prev, year: e.target.value }))}
                    className="px-3 py-2 border rounded-md flex-grow"
                  >
                    <option value="">All Years</option>
                    {generateYearOptions().map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>

                  <select
                    value={programFilter.month}
                    onChange={(e) => setProgramFilter(prev => ({ ...prev, month: e.target.value }))}
                    className="px-3 py-2 border rounded-md flex-grow"
                  >
                    <option value="">All Months</option>
                    {generateMonthOptions().map(month => (
                      <option key={month.value} value={month.value}>{month.label}</option>
                    ))}
                  </select>

                  <select
                    value={programFilter.campus}
                    onChange={(e) => setProgramFilter(prev => ({ ...prev, campus: e.target.value }))}
                    className="px-3 py-2 border rounded-md flex-grow"
                  >
                    <option value="">All Campuses</option>
                    {generateUniqueValues('campus').map(campus => (
                      <option key={campus} value={campus}>{campus}</option>
                    ))}
                  </select>

                  <select
                    value={programFilter.college}
                    onChange={(e) => setProgramFilter(prev => ({ ...prev, college: e.target.value }))}
                    className="px-3 py-2 border rounded-md flex-grow"
                  >
                    <option value="">All Colleges</option>
                    {generateUniqueValues('college').map(college => (
                      <option key={college} value={college}>{college}</option>
                    ))}
                  </select>

                  <select
                    value={programFilter.program}
                    onChange={(e) => setProgramFilter(prev => ({ ...prev, program: e.target.value }))}
                    className="px-3 py-2 border rounded-md flex-grow"
                  >
                    <option value="">All Programs</option>
                    {generateUniqueValues('program').map(program => (
                      <option key={program} value={program}>{program}</option>
                    ))}
                  </select>

                  <select
                    value={programFilter.status}
                    onChange={(e) => setProgramFilter(prev => ({ ...prev, status: e.target.value }))}
                    className="px-3 py-2 border rounded-md flex-grow"
                  >
                    <option value="all">All Statuses</option>
                    <option value="approved">Approved</option>
                    <option value="pending">Pending</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
                <div className='flex justify-center w-full'>
                  <div className='justify items-center'>
                    {renderBarChart(programFilter, 'program')}
                  </div>
                </div>

              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DirectorProjectStatistics;