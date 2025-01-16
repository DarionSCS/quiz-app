import {
  Tables,
  TablesInsert,
  TablesUpdate,
} from "@core/networking/database.types";
export type Profile = Tables<"profiles">;

export type CreateProfileBody = TablesInsert<"profiles">;
export type UpdateProfileBody = TablesUpdate<"profiles">;

// export type Profile = {
//   id: string;
//   surname: string | null;
//   lastname: string | null;
//   nickname: string | null;
//   birth: string | null;
//   img: string | null;
//   sound: boolean | null;
//   vibration: boolean | null;
//   role: number | null;
//   user_id: string | null;
//   created_at: string;
// };
