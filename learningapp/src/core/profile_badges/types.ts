import {
  Tables,
  TablesInsert,
  TablesUpdate,
} from "@core/networking/database.types";
export type Profile_Badge = Tables<"profile_badges">;

export type CreateProfile_BadgeBody = TablesInsert<"profile_badges">;
export type UpdateProfile_BadgeBody = TablesUpdate<"profile_badges">;
