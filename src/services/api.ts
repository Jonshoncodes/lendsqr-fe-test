import { User } from '../types';

// Mock API data generator
const generateMockUsers = (): User[] => {
  const organizations = ['Lendsqr', 'Irorun', 'Lendstar'];
  const statuses: Array<'Active' | 'Inactive' | 'Pending' | 'Blacklisted'> = ['Active', 'Inactive', 'Pending', 'Blacklisted'];
  const firstNames = ['Grace', 'John', 'Sarah', 'Michael', 'Emma', 'David', 'Lisa', 'James', 'Anna', 'Robert'];
  const lastNames = ['Effiom', 'Smith', 'Johnson', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor', 'Anderson'];
  
  const users: User[] = [];
  
  for (let i = 1; i <= 500; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const fullName = `${firstName} ${lastName}`;
    const username = `${firstName.toLowerCase()}${lastName.toLowerCase()}${i}`;
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@gmail.com`;
    
    users.push({
      id: `user-${i}`,
      organization: organizations[Math.floor(Math.random() * organizations.length)],
      username,
      email,
      phoneNumber: `0${Math.floor(Math.random() * 9000000000) + 1000000000}`,
      dateJoined: new Date(2020 + Math.floor(Math.random() * 4), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)).toISOString(),
      status: statuses[Math.floor(Math.random() * statuses.length)],
      fullName,
      bvn: `${Math.floor(Math.random() * 90000000000) + 10000000000}`,
      gender: Math.random() > 0.5 ? 'Male' : 'Female',
      maritalStatus: ['Single', 'Married', 'Divorced'][Math.floor(Math.random() * 3)],
      children: Math.floor(Math.random() * 5).toString(),
      typeOfResidence: ['Parent\'s Apartment', 'Rented Apartment', 'Own House'][Math.floor(Math.random() * 3)],
      levelOfEducation: ['B.Sc', 'M.Sc', 'Ph.D', 'HND'][Math.floor(Math.random() * 4)],
      employmentStatus: ['Employed', 'Unemployed', 'Self-employed'][Math.floor(Math.random() * 3)],
      sectorOfEmployment: ['FinTech', 'Technology', 'Healthcare', 'Education'][Math.floor(Math.random() * 4)],
      durationOfEmployment: `${Math.floor(Math.random() * 10) + 1} years`,
      officeEmail: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@company.com`,
      monthlyIncome: `₦${(Math.floor(Math.random() * 500000) + 50000).toLocaleString()}`,
      loanRepayment: `₦${(Math.floor(Math.random() * 50000) + 5000).toLocaleString()}`,
      twitter: `@${username}`,
      facebook: fullName,
      instagram: `@${username}`,
      guarantorName: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
      guarantorPhone: `0${Math.floor(Math.random() * 9000000000) + 1000000000}`,
      guarantorEmail: `guarantor${i}@gmail.com`,
      guarantorRelationship: ['Sister', 'Brother', 'Friend', 'Colleague'][Math.floor(Math.random() * 4)]
    });
  }
  
  return users;
};

let mockUsers: User[] = [];

export const fetchUsers = async (): Promise<User[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  if (mockUsers.length === 0) {
    mockUsers = generateMockUsers();
  }
  
  return mockUsers;
};

export const fetchUserById = async (id: string): Promise<User | null> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (mockUsers.length === 0) {
    mockUsers = generateMockUsers();
  }
  
  return mockUsers.find(user => user.id === id) || null;
};