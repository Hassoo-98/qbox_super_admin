import { useMutation, useQuery } from "@tanstack/react-query";
import { AuthService } from "../services/auth.service";
type LoginPayload = {
  email: string;
  password: string;
};

export const useAuth = () => {
  const loginMutation = useMutation({
    mutationFn: (payload: LoginPayload) => AuthService.login(payload),
  
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {

      return Promise.resolve();
    },
    onSuccess: () => {
      localStorage.clear();
      window.location.href = "/";
    },
  });
  const userQuery=useQuery({
    queryKey:["user"],
    queryFn:()=>AuthService.user(),
    retry: false
  })

  return {
    // actions
    login: loginMutation.mutate,
    logout: logoutMutation.mutate,
    user:userQuery.data,

    // loading states
    isLoggingIn: loginMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
    isUserFetching:userQuery.isPending,
    loading: userQuery.isPending,

    // authentication state
    isAuthenticated: !!userQuery.data,

    // errors
    loginError: loginMutation.error,
    logoutError: logoutMutation.error,
    userError:userQuery.error
  };
};
