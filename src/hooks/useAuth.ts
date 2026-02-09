import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthService } from "../services/auth.service";
type LoginPayload = {
  email: string;
  password: string;
};

export const useAuth = () => {
  const queryClient = useQueryClient();
  
  const loginMutation = useMutation({
    mutationFn: (payload: LoginPayload) => AuthService.login(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      // Call backend logout endpoint to clear cookies
      await fetch("/api/auth/logout", { 
        method: "POST",
        credentials: "include" 
      });
    },
    onSuccess: () => {
      window.location.href = "/";
    },
  });
  
  const userQuery = useQuery({
    queryKey: ["user"],
    queryFn: () => AuthService.user(),
    retry: false,
    refetchOnWindowFocus: false,
  });

  return {
    // actions
    login: loginMutation.mutate,
    logout: logoutMutation.mutate,
    user: userQuery.data,

    // loading states
    isLoggingIn: loginMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
    isUserFetching: userQuery.isPending,
    loading: userQuery.isPending,

    // authentication state
    isAuthenticated: !!userQuery.data,

    // errors
    loginError: loginMutation.error,
    logoutError: logoutMutation.error,
    userError: userQuery.error
  };
};
