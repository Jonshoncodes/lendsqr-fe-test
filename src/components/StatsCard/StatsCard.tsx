import React from 'react';
import './StatsCard.scss';

interface StatsCardProps {
  icon: string;
  title: string;
  value: string | number;
}

const StatsCard: React.FC<StatsCardProps> = ({ icon, title, value }) => {
  return (
    <div className="stats-card">
      <div className="stats-card-icon">
        <img src={icon} alt={`${title} icon`} className="stats-card-icon-img" />
      </div>
      <h3 className="stats-card-title">{title}</h3>
      <p className="stats-card-value">{Number(value).toLocaleString()}</p>
    </div>
  );
};

export default StatsCard;
