import { createContext, useContext, useState, useEffect } from "react";
import { account, ID } from "../services/appwrite";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Register
  const register = async ({ email, password, fullName, role, expertise, companyName, website }) => {
    try {
      // Step 1: Create User
      const newUser = await account.create(
        ID.unique(),
        email,
        password,
        fullName
      );

      // Step 2: Save prefs (role, expertise, etc.)
      await account.updatePrefs({
        role,
        expertise: role === "seeker" ? expertise : "",
        companyName: role === "company" ? companyName : "",
        website: role === "company" ? website : "",
      });

      // Step 3: Auto-login
      const session = await account.createEmailPasswordSession(email, password);

      // Step 4: Set user
      const loggedUser = await account.get();
      setUser(loggedUser);

      return loggedUser; 
    } catch (err) {
      console.error("Register error:", err);
      throw err; 
    }
  };

  // Login
  const login = async (email, password) => {
    try {
      await account.createEmailPasswordSession(email, password);
      const currentUser = await account.get();
      setUser(currentUser);
      return currentUser;
    } catch (err) {
      console.error("Login error:", err);
      throw err;
    }
  };

  // Logout
  const logout = async () => {
    await account.deleteSession("current");
    setUser(null);
  };

  // On mount → check user
  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await account.get();
        setUser(currentUser);
      } catch {
        setUser(null);
      }
    };
    checkUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
