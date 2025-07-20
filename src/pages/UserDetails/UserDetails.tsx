import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, User, Menu, X } from 'lucide-react';
import { fetchUserById } from '../../services/api';
import { dbService } from '../../services/storage';
import { User as UserType } from '../../types';
import './UserDetails.scss';

const UserDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('general');
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const tabs = [
    { id: 'general', label: 'General Details' },
    { id: 'documents', label: 'Documents' },
    { id: 'bank', label: 'Bank Details' },
    { id: 'loans', label: 'Loans' },
    { id: 'savings', label: 'Savings' },
    { id: 'system', label: 'App and System' }
  ];

  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  useEffect(() => {
    loadUser();
  }, [id]);

  const loadUser = async () => {
    if (!id) return;

    try {
      setLoading(true);
      
      // Try to get from IndexedDB first
      let userData = await dbService.getUser(id);
      
      // If not found in IndexedDB, fetch from API and save
      if (!userData) {
        userData = await fetchUserById(id);
        if (userData) {
          await dbService.saveUser(userData);
        }
      }
      
      setUser(userData);
    } catch (error) {
      console.error('Error loading user:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setShowMobileMenu(false);
  };

  if (loading) {
    return (
      <div className="user-details-page">
        <div className="loading">
          {isMobile ? 'Loading...' : 'Loading user details...'}
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="user-details-page">
        <div className="error">User not found</div>
      </div>
    );
  }

  return (
    <div className="user-details-page">
      <div className="user-details-header">
        <Link to="/users" className="back-link">
          <ArrowLeft />
          <span className="back-text">Back to Users</span>
        </Link>
        
        <div className="header-content">
          <h1>User Details</h1>
          <div className="header-actions">
            <button className="btn btn-outline blacklist-btn">
              {isMobile ? 'BLACKLIST' : 'BLACKLIST USER'}
            </button>
            <button className="btn btn-outline activate-btn">
              {isMobile ? 'ACTIVATE' : 'ACTIVATE USER'}
            </button>
          </div>
        </div>
      </div>

      <div className="user-details-content">
        <div className="user-summary-card">
          <div className="user-summary">
            <div className="user-avatar">
              <User />
            </div>
            <div className="user-info">
              <h2>{user.fullName}</h2>
              <p>{user.username}</p>
            </div>
          </div>
          
          <div className="user-tier">
            <p>User's Tier</p>
            <div className="stars">
              <Star className="filled" />
              <Star />
              <Star />
            </div>
          </div>
          
          <div className="user-balance">
            <h3>₦200,000.00</h3>
            <p>9912345678/Providus Bank</p>
          </div>
        </div>

        {/* Mobile Tab Menu Toggle */}
        {isMobile && (
          <div className="mobile-tab-header">
            <button 
              className="mobile-tab-toggle"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              <span>{tabs.find(tab => tab.id === activeTab)?.label}</span>
              {showMobileMenu ? <X /> : <Menu />}
            </button>
          </div>
        )}

        <div className={`user-tabs ${isMobile && showMobileMenu ? 'mobile-open' : ''}`}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => handleTabChange(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="user-details-card">
          {activeTab === 'general' && (
            <div className="details-content">
              <div className="details-section">
                <h3>Personal Information</h3>
                <div className="details-grid">
                  <div className="detail-item">
                    <label>Full Name</label>
                    <p>{user.fullName}</p>
                  </div>
                  <div className="detail-item">
                    <label>Phone Number</label>
                    <p>{user.phoneNumber}</p>
                  </div>
                  <div className="detail-item">
                    <label>Email Address</label>
                    <p>{user.email}</p>
                  </div>
                  <div className="detail-item">
                    <label>BVN</label>
                    <p>{user.bvn}</p>
                  </div>
                  <div className="detail-item">
                    <label>Gender</label>
                    <p>{user.gender}</p>
                  </div>
                  <div className="detail-item">
                    <label>Marital Status</label>
                    <p>{user.maritalStatus}</p>
                  </div>
                  <div className="detail-item">
                    <label>Children</label>
                    <p>{user.children}</p>
                  </div>
                  <div className="detail-item">
                    <label>Type of Residence</label>
                    <p>{user.typeOfResidence}</p>
                  </div>
                </div>
              </div>

              <div className="details-section">
                <h3>Education and Employment</h3>
                <div className="details-grid">
                  <div className="detail-item">
                    <label>Level of Education</label>
                    <p>{user.levelOfEducation}</p>
                  </div>
                  <div className="detail-item">
                    <label>Employment Status</label>
                    <p>{user.employmentStatus}</p>
                  </div>
                  <div className="detail-item">
                    <label>Sector of Employment</label>
                    <p>{user.sectorOfEmployment}</p>
                  </div>
                  <div className="detail-item">
                    <label>Duration of Employment</label>
                    <p>{user.durationOfEmployment}</p>
                  </div>
                  <div className="detail-item">
                    <label>Office Email</label>
                    <p>{user.officeEmail}</p>
                  </div>
                  <div className="detail-item">
                    <label>Monthly Income</label>
                    <p>{user.monthlyIncome}</p>
                  </div>
                  <div className="detail-item">
                    <label>Loan Repayment</label>
                    <p>{user.loanRepayment}</p>
                  </div>
                </div>
              </div>

              <div className="details-section">
                <h3>Socials</h3>
                <div className="details-grid">
                  <div className="detail-item">
                    <label>Twitter</label>
                    <p>{user.twitter}</p>
                  </div>
                  <div className="detail-item">
                    <label>Facebook</label>
                    <p>{user.facebook}</p>
                  </div>
                  <div className="detail-item">
                    <label>Instagram</label>
                    <p>{user.instagram}</p>
                  </div>
                </div>
              </div>

              <div className="details-section">
                <h3>Guarantor</h3>
                <div className="details-grid">
                  <div className="detail-item">
                    <label>Full Name</label>
                    <p>{user.guarantorName}</p>
                  </div>
                  <div className="detail-item">
                    <label>Phone Number</label>
                    <p>{user.guarantorPhone}</p>
                  </div>
                  <div className="detail-item">
                    <label>Email Address</label>
                    <p>{user.guarantorEmail}</p>
                  </div>
                  <div className="detail-item">
                    <label>Relationship</label>
                    <p>{user.guarantorRelationship}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab !== 'general' && (
            <div className="details-content">
              <div className="placeholder">
                <p>Content for {tabs.find(tab => tab.id === activeTab)?.label} will be displayed here.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetails;