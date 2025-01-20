import {
  Tables,
  TablesInsert,
  TablesUpdate,
} from "@core/networking/database.types";
export type Badge = Tables<"badges">;

export type CreateBadgeBody = TablesInsert<"badges">;
export type UpdateBadgeBody = TablesUpdate<"badges">;
