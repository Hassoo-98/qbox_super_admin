import { useMutation } from "@tanstack/react-query";
import { login, type LoginRequest, type LoginResponse } from "../auth";

export const useLogin = () =>
  useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: login,
  });
