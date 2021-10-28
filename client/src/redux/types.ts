export type User = {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  avartar: string | null;
};

export type LoginForm = {
  username: string;
  password: string;
};

export type registerForm = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type updateProfileForm = {
  firstName: string | undefined;
  lastName: string | undefined;
  avartar: string | undefined;
};

export type changePasswordForm = {
  _id: string;
  password: string;
  confirmPassword: string;
};

export const apiUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost/practice2/Server/index.php"
    : // ? "http://localhost:5000/index.php"
      "https://quizzo-service.herokuapp.com/api";
