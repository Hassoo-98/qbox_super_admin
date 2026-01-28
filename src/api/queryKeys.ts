/**
 * Query Key Factory
 * Centralized keys for all TanStack Query hooks to ensure consistency and easy invalidation.
 */
export const queryKeys = {
  admin: {
    all: ["admin"] as const,
    homeOwners: () => [...queryKeys.admin.all, "homeOwners"] as const,
    homeOwnerDetail: (id: string | number) =>
      [...queryKeys.admin.homeOwners(), id] as const,
  },
  auth: {
    user: ["auth", "user"] as const,
  },
  // Add more modules as the application grows
};
