import {
  Tables,
  TablesInsert,
  TablesUpdate,
} from "@core/networking/database.types";
export type Question_Results = Tables<"question_results">;

export type CreateQuestion_ResultsBody = TablesInsert<"question_results">;
export type UpdateQuestion_ResultsBody = TablesUpdate<"question_results">;
