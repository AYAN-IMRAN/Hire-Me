import React, { createContext, useContext, useEffect, useState } from "react";
import { account, ID } from "../services/appwrite";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // helper to create session (handles SDK differences)
  const createSession = async (email, password) => {
    if (typeof account.createEmailPasswordSession === "function") {
      return account.createEmailPasswordSession(email, password);
    }
    if (typeof account.createEmailSession === "function") {
      return account.createEmailSession(email, password);
    }
    // fallback (older SDKs)
    if (typeof account.createSession === "function") {
      return account.createSession(email, password);
    }
    throw new Error("No session creation method available in Appwrite SDK");
  };

  // Signup: create user only (we will NOT call updatePrefs here)
  const signup = async (email, password, name) => {
    try {
      const newUser = await account.create(ID.unique(), email, password, name);
      return newUser;
    } catch (err) {
      // bubble up
      throw err;
    }
  };

  // Login: create session then fetch user
  const login = async (email, password) => {
    try {
      await createSession(email, password);
      const current = await account.get();
      setUser(current);
      return current;
    } catch (err) {
      throw err;
    }
  };

  // updatePrefs: must be called when user is logged in (has session)
  const updatePrefs = async (prefs) => {
    try {
      if (typeof account.updatePrefs !== "function") {
        throw new Error("account.updatePrefs is not available on this SDK");
      }
      await account.updatePrefs(prefs);
      const current = await account.get();
      setUser(current);
      return current;
    } catch (err) {
      throw err;
    }
  };

  const logout = async () => {
    try {
      if (typeof account.deleteSession === "function") {
        await account.deleteSession("current");
      }
      setUser(null);
    } catch (err) {
      console.warn("Logout error:", err);
      setUser(null);
    }
  };

  // on mount, try to get current user
  useEffect(() => {
    (async () => {
      try {
        const current = await account.get();
        setUser(current);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, signup, login, logout, updatePrefs }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
