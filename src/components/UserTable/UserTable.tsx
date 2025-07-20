import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MoreVertical, Filter, Eye, UserX, UserCheck } from 'lucide-react';
import { User } from '../../types';
import './UserTable.scss';

interface UserTableProps {
  users: User[];
  onFilterClick: () => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onFilterClick }) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getStatusClass = (status: string) => {
    const statusMap: { [key: string]: string } = {
      'inactive': 'inactive',
      'pending': 'pending',
      'blacklisted': 'blacklisted',
      'active': 'active'
    };
    return statusMap[status.toLowerCase()] || 'inactive';
  };

  const handleDropdownToggle = (userId: string) => {
    setActiveDropdown(activeDropdown === userId ? null : userId);
  };

  const handleAction = (action: string, userId: string) => {
    console.log(`${action} user:`, userId);
    setActiveDropdown(null);
  };

  return (
    <div className="user-table-container">
      <div className="table-wrapper">
        <table className="user-table">
          <thead>
            <tr>
              <th>
                <div className="header-cell">
                  Organization
                  <button className="filter-btn" onClick={onFilterClick}>
                    <Filter />
                  </button>
                </div>
              </th>
              <th>
                <div className="header-cell">
                  Username
                  <button className="filter-btn" onClick={onFilterClick}>
                    <Filter />
                  </button>
                </div>
              </th>
              <th>
                <div className="header-cell">
                  Email
                  <button className="filter-btn" onClick={onFilterClick}>
                    <Filter />
                  </button>
                </div>
              </th>
              <th>
                <div className="header-cell">
                  Phone Number
                  <button className="filter-btn" onClick={onFilterClick}>
                    <Filter />
                  </button>
                </div>
              </th>
              <th>
                <div className="header-cell">
                  Date Joined
                  <button className="filter-btn" onClick={onFilterClick}>
                    <Filter />
                  </button>
                </div>
              </th>
              <th>
                <div className="header-cell">
                  Status
                  <button className="filter-btn" onClick={onFilterClick}>
                    <Filter />
                  </button>
                </div>
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.organization}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phoneNumber}</td>
                <td>{formatDate(user.dateJoined)}</td>
                <td>
                  <span className={`status-badge status-${getStatusClass(user.status)}`}>
                    {user.status}
                  </span>
                </td>
                <td>
                  <div className="actions-cell">
                    <button
                      className="more-btn"
                      onClick={() => handleDropdownToggle(user.id)}
                    >
                      <MoreVertical />
                    </button>
                    {activeDropdown === user.id && (
                      <div className="dropdown-menu">
                        <Link
                          to={`/users/${user.id}`}
                          className="dropdown-item"
                          onClick={() => setActiveDropdown(null)}
                        >
                          <Eye />
                          View Details
                        </Link>
                        <button
                          className="dropdown-item"
                          onClick={() => handleAction('blacklist', user.id)}
                        >
                          <UserX />
                          Blacklist User
                        </button>
                        <button
                          className="dropdown-item"
                          onClick={() => handleAction('activate', user.id)}
                        >
                          <UserCheck />
                          Activate User
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;