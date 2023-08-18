type UserType = {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  isVerified?: boolean;

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
};

export default UserType;
