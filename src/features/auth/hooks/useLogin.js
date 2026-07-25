import { useMutation } from "@tanstack/react-query";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { login } from "../services/authService";
import { useAuth } from "../../../context/AuthContext";

export const useLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login: setAuth } = useAuth();

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setAuth(data.token);
      toast.success("Logged in successfully.");
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    },
  });
};
