import RouteData from "@/model/route.model";

const publicRoutes: RouteData[] = [
  { path: "/", label: "Home" },
  { path: "/about-us", label: "About Us" },
];

const guestOnlyRoutes: RouteData[] = [
  { path: "/sign-in", label: "Sign In" },
  { path: "/sign-up", label: "Sign Up" },
];

const privateRoutes: RouteData[] = [{ path: "/dashboard", label: "Dashboard" }];

export { publicRoutes, privateRoutes, guestOnlyRoutes };
