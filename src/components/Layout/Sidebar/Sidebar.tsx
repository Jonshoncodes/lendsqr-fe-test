import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './Sidebar.scss';

// SVG icon imports using SVGR (?react)
import DashboardIcon from '@/icons2/dashboard.svg?react';
import BriefcaseIcon from '@/icons2/briefcase.svg?react';
import ChevronDownIcon from '@/icons2/chevrondown.svg?react';
import UsersIcon from '@/icons2/users.svg?react';
import GuarantorsIcon from '@/icons2/guarantors.svg?react';
import LoansIcon from '@/icons2/loans.svg?react';
import DecisionModelsIcon from '@/icons2/decisionmodels.svg?react';
import SavingsIcon from '@/icons2/savings.svg?react';
import LoanRequestsIcon from '@/icons2/loanrequests.svg?react';
import WhitelistIcon from '@/icons2/whitelist.svg?react';
import KarmaIcon from '@/icons2/karma.svg?react';
import OrganizationIcon from '@/icons2/organization.svg?react';
import LoanProductsIcon from '@/icons2/loanproducts.svg?react';
import SavingsProductsIcon from '@/icons2/savingsproducts.svg?react';
import FeesIcon from '@/icons2/fees.svg?react';
import TransactionsIcon from '@/icons2/transactions.svg?react';
import ServicesIcon from '@/icons2/services.svg?react';
import ServiceAccountIcon from '@/icons2/serviceaccount.svg?react';
import SettlementsIcon from '@/icons2/settlements.svg?react';
import ReportsIcon from '@/icons2/reports.svg?react';
import PreferencesIcon from '@/icons2/preferences.svg?react';
import FeesPricingIcon from '@/icons2/feespricing.svg?react';
import AuditLogsIcon from '@/icons2/auditlogs.svg?react';

const Sidebar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const menuItems = [
    {
      title: 'CUSTOMERS',
      items: [
        { icon: UsersIcon, label: 'Users', path: '/users' },
        { icon: GuarantorsIcon, label: 'Guarantors', path: '/guarantors' },
        { icon: LoansIcon, label: 'Loans', path: '/loans' },
        { icon: DecisionModelsIcon, label: 'Decision Models', path: '/decision-models' },
        { icon: SavingsIcon, label: 'Savings', path: '/savings' },
        { icon: LoanRequestsIcon, label: 'Loan Requests', path: '/loan-requests' },
        { icon: WhitelistIcon, label: 'Whitelist', path: '/whitelist' },
        { icon: KarmaIcon, label: 'Karma', path: '/karma' },
      ]
    },
    {
      title: 'BUSINESSES',
      items: [
        { icon: OrganizationIcon, label: 'Organization', path: '/organization' },
        { icon: LoanProductsIcon, label: 'Loan Products', path: '/loan-products' },
        { icon: SavingsProductsIcon, label: 'Savings Products', path: '/savings-products' },
        { icon: FeesIcon, label: 'Fees and Charges', path: '/fees-charges' },
        { icon: TransactionsIcon, label: 'Transactions', path: '/transactions' },
        { icon: ServicesIcon, label: 'Services', path: '/services' },
        { icon: ServiceAccountIcon, label: 'Service Account', path: '/service-account' },
        { icon: SettlementsIcon, label: 'Settlements', path: '/settlements' },
        { icon: ReportsIcon, label: 'Reports', path: '/reports' },
      ]
    },
    {
      title: 'SETTINGS',
      items: [
        { icon: PreferencesIcon, label: 'Preferences', path: '/preferences' },
        { icon: FeesPricingIcon, label: 'Fees and Pricing', path: '/fees-pricing' },
        { icon: AuditLogsIcon, label: 'Audit Logs', path: '/audit-logs' },
      ]
    }
  ];

  return (
    <>
      <button
        className="mobile-menu-toggle"
        onClick={toggleMobileMenu}
        aria-label="Toggle mobile menu"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isMobileMenuOpen && <div className="mobile-overlay" onClick={toggleMobileMenu} />}

      <aside className={`sidebar ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <div className="organization-selector">
            <BriefcaseIcon className="icon" />
            <span>Switch Organization</span>
            <ChevronDownIcon className="chevron icon" />
          </div>
        </div>

        <nav className="sidebar-nav">
          <NavLink
            to="/dashboard"
            className="nav-item dashboard-link"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </NavLink>

          {menuItems.map((section) => (
            <div key={section.title} className="nav-section">
              <h3 className="section-title">{section.title}</h3>
              {section.items.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className="icon" />
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
