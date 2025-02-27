import { Auth } from "./auth";
import { User } from "./user";
import { Report } from "./report";

Auth.hasOne(User)
Report.belongsTo(User)
User.hasMany(Report)
User.belongsTo(Auth)

export { Auth, User, Report }