import {
  Tables,
  TablesInsert,
  TablesUpdate,
} from "@core/networking/database.types";
export type Subject = Tables<"subjects">;

export type CreateSubjectBody = TablesInsert<"subjects">;
export type UpdateSubjectBody = TablesUpdate<"subjects">;
