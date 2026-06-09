import { Auth } from './auth';
import { User } from './user';
import { Report } from './report';
import { Sighting } from './sighting';

User.hasMany(Report, {
  foreignKey: 'ownerId'
});

Report.belongsTo(User, {
  foreignKey: 'ownerId'
});

Report.hasMany(Sighting, {
  foreignKey: 'reportId'
});

Sighting.belongsTo(Report, {
  foreignKey: 'reportId'
});

export { Auth, User, Report, Sighting };
