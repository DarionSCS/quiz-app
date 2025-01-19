import {
  Tables,
  TablesInsert,
  TablesUpdate,
} from "@core/networking/database.types";
export type Result = Tables<"results">;

export type CreateResultBody = TablesInsert<"results">;
export type UpdateResultBody = TablesUpdate<"results">;
