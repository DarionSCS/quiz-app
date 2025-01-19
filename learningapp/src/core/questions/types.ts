import {
  Tables,
  TablesInsert,
  TablesUpdate,
} from "@core/networking/database.types";
export type Question = Tables<"questions">;

export type CreateQuestionBody = TablesInsert<"questions">;
export type UpdateQuestionBody = TablesUpdate<"questions">;
