// EXAMPLE FILE:
// this file shows how to call a service and render that data on the client
// few things to note:
// 1) any interactive component/page requires a "use client at the top"
// 2) notice the file structure. We are using next.js app routing, which
// means that nesting the test folder within app (which is the root)
// automatically defines a /test route that goes to this page. Within this
// folder, the page.tsx file is always the actual page, and all other tsx
// files are components that are rendered on the page. By convention, place
// components in a components folder within each page.

// Furthermore, we can also utilize dynamic routes, by defining the folder
// as something like [id]. This way, /123 and /456 both route to the same
// page, but with the id as a parameter that we can use later. Example:
// rendering a specific user; we use the id to call a service function to
// fetch that specific user and render it.

"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usersService } from "@/services";
import type { User } from "@/types";
import styles from "./page.module.css";

export default function TestPage() {
  // we use useState for dynamic data here
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // useEffect with no dependencies (see comment at end of function on dependency array) means that it runs once on mount
  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      setErrorMessage(null);

      // call the service here and save data and error
      const { data, error } = await usersService.getUsers();

      // ideally, error is null, but if not we can catch the error here and inspect the console
      if (error) {
        console.error("Failed to load users:", error);
        setErrorMessage("Unable to load users.");
      } else if (data) {
        // if we get data, then change value of users to data
        setUsers(data);
      }

      // utilize a loading state to render soemthing like "loading..." while we are waiting for async function to return
      setLoading(false);
    };

    loadUsers();
  }, []); // [] means no dependency array

  return (
    <main className={styles.page}>
      <Link href="/">/</Link>
      {/* ternary operator: if loading then render "loading...", else if error then show the error, else render the users */}
      {loading ? (
        <p>loading...</p>
      ) : errorMessage ? (
        <p>error: {errorMessage}</p>
      ) : (
        <>
          <p>database connected</p>
          <p>users: {users.length}</p>
          <ul>
            {users.map((user) => (
              <li key={user.id}>{user.username}</li>
            ))}
          </ul>
        </>
      )}
    </main>
  );
}
