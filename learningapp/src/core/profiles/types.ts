export interface Profile {
  id: string;
  surname: string | null;
  lastname: string | null;
  nickname: string | null;
  birth: string | null; // Update to Date if handling dates as Date objects
  img: string | null;
  sound: boolean | null;
  vibration: boolean | null;
  role: number | null;
  user_id: string | null;
  created_at: string; // Update to Date if handling dates as Date objects
}
