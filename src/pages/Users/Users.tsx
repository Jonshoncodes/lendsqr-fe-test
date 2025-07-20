import React, { useState, useEffect } from 'react';


import StatsCard from '../../components/StatsCard/StatsCard';
import UserTable from '../../components/UserTable/UserTable';
import FilterModal from '../../components/FilterModal/FilterModal';
import Pagination from '../../components/Pagination/Pagination';
import { fetchUsers } from '../../services/api';
import { User, FilterOptions } from '../../types';
import './Users.scss';

import IconUsers from '../../icons/icon-users.svg';
import IconActive from '../../icons/icon-active.svg';
import IconLoans from '../../icons/icon-loans.svg';
import IconSavings from '../../icons/icon-savings.svg';

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  useEffect(() => {
    setItemsPerPage(isMobile ? 5 : 10);
    setCurrentPage(1);
  }, [isMobile]);

  
  const stats = [
    {
      icon: IconUsers,
      title: 'Users',
      value: 2453
    },
    {
      icon: IconActive,
      title: 'Active Users',
      value: 2453
    },
    {
      icon: IconLoans,
      title: 'Users with Loans',
      value: 12453
    },
    {
      icon: IconSavings,
      title: 'Users with Savings',
      value: 102453
    }
  ];

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const userData = await fetchUsers();
      setUsers(userData);
      setFilteredUsers(userData);
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (filters: FilterOptions) => {
    let filtered = users;

    if (filters.organization) {
      filtered = filtered.filter(user =>
        user.organization.toLowerCase().includes(filters.organization.toLowerCase())
      );
    }

    if (filters.username) {
      filtered = filtered.filter(user =>
        user.username.toLowerCase().includes(filters.username.toLowerCase())
      );
    }

    if (filters.email) {
      filtered = filtered.filter(user =>
        user.email.toLowerCase().includes(filters.email.toLowerCase())
      );
    }

    if (filters.phoneNumber) {
      filtered = filtered.filter(user =>
        user.phoneNumber.includes(filters.phoneNumber)
      );
    }

    if (filters.status) {
      filtered = filtered.filter(user => user.status === filters.status);
    }

    if (filters.date) {
      const filterDate = new Date(filters.date).toDateString();
      filtered = filtered.filter(user =>
        new Date(user.dateJoined).toDateString() === filterDate
      );
    }

    setFilteredUsers(filtered);
    setCurrentPage(1);
  };

  const handleResetFilter = () => {
    setFilteredUsers(users);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  if (loading) {
    return (
      <div className="users-page">
        <div className="loading">
          {isMobile ? 'Loading...' : 'Loading users...'}
        </div>
      </div>
    );
  }

  return (
    <div className="users-page">
      <div className="users-header">
        <h1>Users</h1>
        {isMobile && (
          <div className="mobile-user-count">
            {filteredUsers.length} total users
          </div>
        )}
      </div>

      <div className="users-content">
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

        <div className="users-table-section">
          <UserTable
            users={currentUsers}
            onFilterClick={() => setShowFilterModal(true)}
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            totalItems={filteredUsers.length}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={(newItemsPerPage) => {
              setItemsPerPage(newItemsPerPage);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      <FilterModal
        isOpen={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        onApplyFilter={handleFilter}
        onReset={handleResetFilter}
      />
    </div>
  );
};

export default Users;
