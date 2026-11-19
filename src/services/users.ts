import { supabase } from "./supabase";
import type { User, NewUser } from "@/types";

// Example service
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

  async addUser(user: NewUser) { // can directly use newUser type here rather than manually creating an omit object
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
