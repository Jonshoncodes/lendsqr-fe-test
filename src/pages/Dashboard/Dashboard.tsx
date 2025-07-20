import React from 'react';
import StatsCard from '../../components/StatsCard/StatsCard';
import './Dashboard.scss';

import IconUsers from '../../icons/icon-users.svg';
import IconActive from '../../icons/icon-active.svg';
import IconLoans from '../../icons/icon-loans.svg';
import IconSavings from '../../icons/icon-savings.svg';

const Dashboard: React.FC = () => {
  const stats = [
    {
      icon: IconUsers,
      title: 'USERS',
      value: 2453
    },
    {
      icon: IconActive,
      title: 'ACTIVE USERS',
      value: 2453
    },
    {
      icon: IconLoans,
      title: 'USERS WITH LOANS',
      value: 12453
    },
    {
      icon: IconSavings,
      title: 'USERS WITH SAVINGS',
      value: 102453
    }
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
      </div>

      <div className="dashboard-content">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <StatsCard
              key={index}
              icon={stat.icon}
              title={stat.title}
              value={stat.value}
            />
          ))}
        </div>

        <div className="dashboard-placeholder">
          <p>Welcome to your dashboard! Navigate to Users to view user management features.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
