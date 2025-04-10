export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  displayName: string;
  dob: string; // hoặc Date nếu bạn muốn parse thành Date object
  gender: boolean;
  email: string;
  cover: string | null;
  avatar: string | null;
  userId: string;
  followerCount?: 0; //Tiện cho việc hiển thi UI
}
