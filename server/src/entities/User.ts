interface User {
  id?: string;
  name: string;
  sobrenome: string;
  email: string;
  password: string;
  avatar?: string;
  whatsapp?: string;
  bio?: string;
  created_at?: string;
  updated_at?: string;
}

export default User;
