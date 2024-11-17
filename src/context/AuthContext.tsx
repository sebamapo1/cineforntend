import { createContext, useState, useContext, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  // Initialize authentication state from localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedValue = localStorage.getItem('isAuthenticated');
    return storedValue ? JSON.parse(storedValue) : false;
  });

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', JSON.stringify(true)); // Store in localStorage
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated'); // Remove from localStorage
  };

  // Optional: Effect to sync state with localStorage on component mount
  useEffect(() => {
    const storedValue = localStorage.getItem('isAuthenticated');
    if (storedValue) {
      setIsAuthenticated(JSON.parse(storedValue));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
