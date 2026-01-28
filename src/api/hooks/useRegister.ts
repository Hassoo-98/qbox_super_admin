import { useMutation } from "@tanstack/react-query";
import { register, type RegisterRequest, type LoginResponse } from "../auth";

export const useRegister = () =>
  useMutation<LoginResponse, Error, RegisterRequest>({
    mutationFn: register,
  });
