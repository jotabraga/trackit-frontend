import { useContext } from "react";
import UserContext from "../Contexts/UserContext";

export default function EnsureAuthenticated() {

  const { user } = useContext(UserContext);
  return [
    {
      to: "/",
      check: () => !!user?.token,
    },
  ];
}