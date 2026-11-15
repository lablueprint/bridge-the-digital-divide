import "server-only";

import { supabase } from "./supabase";

type User = {
  id: string;
  username: string;
};

type NewUser = Omit<User, "id">;

// Example service: add more user operations here as the application grows.
export const usersService = {
  async getUsers() {
    const { data, error } = await supabase
      .from("users")
      .select("id, username")
      .order("username", { ascending: true });

    if (error) throw error;

    return data as User[];
  },

  async getUserById(id: string) {
    const { data, error } = await supabase
      .from("users")
      .select("id, username")
      .eq("id", id)
      .single();

    if (error) throw error;

    return data as User;
  },

  async addUser(user: NewUser) {
    const { data, error } = await supabase
      .from("users")
      .insert(user)
      .select("id, username")
      .single();

    if (error) throw error;

    return data as User;
  },

  async deleteUser(id: string) {
    const { error } = await supabase.from("users").delete().eq("id", id);

    if (error) throw error;
  },
};
