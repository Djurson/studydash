"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  User,
} from "firebase/auth";
import { auth, db } from "../../../firebase/client";
import {
  CreateUser,
  UserInputDB,
  UserLogin,
  UserType,
  UserTypesEnum,
} from "./usertypes";
import { doc, setDoc } from "firebase/firestore";
import { removeAuthToken, setAuthToken } from "../utils/cookies";

type AuthContextType = {
  user: User | null;
  userInfo: UserType | null;
  UserSignUpEmail: (userData: CreateUser) => Promise<string | null>;
  UserSignInEmail: (userLogin: UserLogin) => Promise<string | null>;
  UserSignInGoogle: () => Promise<string | null>;
  CreateUserData: (user: User, userData: UserInputDB) => Promise<string | null>;
  Logout: () => Promise<string | null>;
};

type AuthProviderProps = {
  children?: ReactNode;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [userInfo, setUserInfo] = useState<UserType | null>(null);

  useEffect(() => {
    if (!auth) return;

    return auth.onAuthStateChanged(async (user) => {
      if (!user) {
        setUser(null);
        removeAuthToken();
      } else {
        const token = await user.getIdToken(true);
        setUser(user);
        setAuthToken(token);

        const tokenResult = await user.getIdTokenResult();
        const verified = tokenResult.claims.verified === true ? true : false;
        const role =
          tokenResult.claims.userRole === "pro"
            ? UserTypesEnum.PRO
            : UserTypesEnum.NORMAL;

        setUserInfo({
          verified: verified,
          userRole: role,
        });
      }
    });
  }, []);

  async function UserSignUpEmail(userData: CreateUser): Promise<string | null> {
    if (!auth) {
      return Promise.reject("Internal error: 100");
    }
    try {
      const usercred = await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );
      await sendEmailVerification(usercred.user);
      await updateProfile(usercred.user, {
        displayName: `${userData.firstname} ${userData.lastname}`,
      });
      return null;
    } catch (error) {
      return Promise.reject(
        "Fel vid skapande av konto: " + (error as Error).message
      );
    }
  }

  async function CreateUserData(
    user: User,
    userData: UserInputDB
  ): Promise<string | null> {
    try {
      await setDoc(doc(db, "users", user.uid), {
        ...userData,
        displayname: user.displayName,
        email: user.email,
        created: user.metadata.creationTime,
      });
      return null;
    } catch (error) {
      return Promise.reject(
        "Fel vid skapande av konto: " + (error as Error).message
      );
    }
  }

  async function UserSignInEmail(userLogin: UserLogin): Promise<string | null> {
    if (!auth) {
      return Promise.resolve("Internal error: 100");
    }

    try {
      const usercred = await signInWithEmailAndPassword(
        auth,
        userLogin.email,
        userLogin.password
      );
      setAuthToken(await usercred.user.getIdToken());
      return null;
    } catch (error) {
      return Promise.reject("Fel vid inloggning: " + (error as Error).message);
    }
  }

  async function UserSignInGoogle(): Promise<string | null> {
    if (!auth) {
      return Promise.resolve("Internal error: 100");
    }
    try {
      const usercred = await signInWithPopup(auth, new GoogleAuthProvider());
      await setAuthToken(await usercred.user.getIdToken());
      return null;
    } catch (error) {
      return Promise.reject("Fel vid inloggning: " + (error as Error).message);
    }
  }

  async function Logout(): Promise<string | null> {
    if (!auth) {
      return Promise.resolve("Internal error: 100");
    }

    try {
      await signOut(auth);
      return null;
    } catch (error) {
      return Promise.reject("Fel vid utloggning: " + (error as Error).message);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        UserSignUpEmail,
        UserSignInEmail,
        UserSignInGoogle,
        CreateUserData,
        Logout,
        userInfo,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
