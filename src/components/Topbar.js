import React from 'react';

function Topbar() {
  return (
    <div className="flex w-4/5 items-center mb-14 px-3 h-14 bg-white fixed right-0 z-50">
      <div className="w-5/6">
        <img src="/images/notif-bell-none.png" alt="Notification" className="w-7" />
      </div>
      <div>
        <h1 className="text-sm w-44">Emmanuelle James Duallo</h1>
        <h2 className="text-xs text-gray-500">Project Leader</h2>
      </div>
    </div>
  );
}

export default Topbar;
