export function getHomeRoute(role) {
  if (role === "admin") {
    return "/admin";
  }

  if (role === "mother") {
    return "/dashboard";
  }

  return "/login";
}