import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import DirectorSidebar from '../../components/DirectorSidebar';
import Topbar from '../../components/Topbar';
import Button from '@mui/material/Button';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export default function DirectorProjectStatistics() {
  const legendItems = [
    { label: 'Approved', color: '#4CAF50' }, // Example color
    { label: 'Pending', color: '#FFC107' }, // Example color
    { label: 'Rejected', color: '#F44336' }, // Example color
  ];

  return (
  <div className="bg-gray-200 min-h-screen flex">
    {/* Left Sidebar */}
    <div className="w-1/5 fixed h-full">
      <DirectorSidebar />
    </div>

    {/* Main Content */}
    <div className="flex-1 ml-[20%] mr-[0%] max-w-full">
      <Topbar />

      <div className="flex flex-col mt-16 px-10 w-full">
        {/* Projects by campus */}
        <div className="bg-white shadow-lg rounded-lg py-4 px-4 mt-4 w-full">
          <div className="flex flex-row">
            <h1 className="text-2xl font-semibold mb-4">Project Proposals by Campus</h1>
            <div className="w-full sm:w-auto px-5">
              <label htmlFor="documentFilter" className="mr-2">Filter by Year:</label>
              <select
                id="documentFilter"
                className="w-full sm:w-auto px-3 py-2 border rounded-md"
              >
                {/* Add year options */}
              </select>
            </div>

            <div className="w-full sm:w-auto">
              <label htmlFor="documentFilter" className="mr-2">Filter by Month:</label>
              <select
                id="documentFilter"
                className="w-full sm:w-auto px-3 py-2 border rounded-md"
              >
                {/* Add month options */}
              </select>
            </div>
          </div>

          <div className="flex justify-center items-center h-full">
            <BarChart
              xAxis={[{ scaleType: 'band', data: ['Campus A', 'Campus B', 'Campus C'] }]}
              series={[
                { data: [4, 3, 5], color: '#4CAF50' }, // Approved
                { data: [1, 6, 3], color: '#FFC107' }, // Pending
                { data: [2, 5, 6], color: '#F44336' }, // Rejected
              ]}
              width={500}
              height={300}
            />
          </div>

          {/* Custom Legend */}
          <div className="flex justify-center mt-4">
            {legendItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center mx-2"
              >
                <span
                  className="w-4 h-4"
                  style={{ backgroundColor: item.color }}
                ></span>
                <span className="ml-2 text-sm">{item.label}</span>
              </div>
            ))}
          </div>

          <div className='flex flex-row justify-center'>
            <div className="flex mt-4 mx-2">
              <Button variant="contained">
                View Project Proposals per College
              </Button>
            </div>

            <div className="flex mt-4 mx-2">
              <Button variant="contained">
                View Project Proposals per Program
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}
