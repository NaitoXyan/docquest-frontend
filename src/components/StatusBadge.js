import React from 'react';

const StatusBadge = ({ status, approvalCounter }) => {
  const getStatusStyles = () => {
    if (approvalCounter > 0) {
      return {
        backgroundColor: 'bg-green-100',
        textColor: 'text-green-700',
        label: 'Approved'
      };
    }
    
    switch (status?.toLowerCase()) {
      case 'rejected':
        return {
          backgroundColor: 'bg-red-100',
          textColor: 'text-red-700',
          label: 'Rejected'
        };
      case 'pending':
        return {
          backgroundColor: 'bg-yellow-100',
          textColor: 'text-yellow-700',
          label: 'Pending'
        };
      default:
        return {
          backgroundColor: 'bg-gray-100',
          textColor: 'text-gray-700',
          label: 'Unknown'
        };
    }
  };

  const { backgroundColor, textColor, label } = getStatusStyles();

  return (
    <span className={`px-4 py-2 inline-flex items-center justify-center rounded-full text-sm font-medium ${backgroundColor} ${textColor}`}>
      {label}
    </span>
  );
};

export default StatusBadge;