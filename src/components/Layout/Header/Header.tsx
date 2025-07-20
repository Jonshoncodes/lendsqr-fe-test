import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Bell, ChevronDown, Menu, LogOut } from 'lucide-react';
import './Header.scss';
import Logo from '../../../assets/Group.svg';
import ProfileImage from '../../../assets/image 4.png';

interface HeaderProps {
  onMenuToggle?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    // Clear any stored authentication tokens/data
    localStorage.removeItem('isAuthenticated');
    sessionStorage.removeItem('isAuthenticated');
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');
    
    // Close dropdown
    setIsDropdownOpen(false);
    
    // Redirect to login page
    navigate('/login');
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-toggle" onClick={onMenuToggle}>
          <Menu />
        </button>
        <Link to="/dashboard" className="logo">
          <img src={Logo} alt="Lendsqr Logo" className="logo-img" />
        </Link>
      </div>

      <div className="header-center">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search for anything"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button className="search-button">
            <Search />
          </button>
        </div>
      </div>

      <div className="header-right">
        <Link to="/docs" className="docs-link">
          Docs
        </Link>

        <button className="notification-button">
          <Bell />
        </button>

        <div className="user-menu" ref={dropdownRef}>
          <div className="user-info" onClick={toggleDropdown}>
            <div className="user-avatar">
              <img src={ProfileImage} alt="Adedeji" />
            </div>
            <span className="user-name">Adedeji</span>
            <ChevronDown className={`chevron ${isDropdownOpen ? 'rotated' : ''}`} />
          </div>
          
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <button className="dropdown-item" onClick={handleLogout}>
                <LogOut />
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;