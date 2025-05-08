import User from './User';
import BirthProfile from './BirthProfile';

// Export all models
export {
  User,
  BirthProfile
};

// Set up associations
export const initializeAssociations = () => {
  // User to BirthProfile relationship
  User.hasMany(BirthProfile, {
    foreignKey: 'userId',
    as: 'birthProfiles'
  });
  
  BirthProfile.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user'
  });
};