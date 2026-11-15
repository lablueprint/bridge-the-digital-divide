import { supabase } from "./supabase";

type User = {
  id: string;
  username: string;
};

// Omit creates a User object, but without the specified values (id here, as supabase automatically generates the id)
type NewUser = Omit<User, "id">;

// Example service: add more user operations here as the application grows.
export const usersService = {
  async getUsers() {
    const { data, error } = await supabase
      .from("users")
      .select("id, username")
      .order("username", { ascending: true });

    return { data: data as User[] | null, error };
  },

  async getUserById(id: string) {
    const { data, error } = await supabase
      .from("users")
      .select("id, username")
      .eq("id", id)
      .single();

    return { data: data as User | null, error };
  },

  async addUser(user: NewUser) {
    const { data, error } = await supabase
      .from("users")
      .insert(user)
      .select("id, username")
      .single();

    return { data: data as User | null, error };
  },

  async deleteUser(id: string) {
    const { error } = await supabase.from("users").delete().eq("id", id);

    return { data: null, error };
  },
};
