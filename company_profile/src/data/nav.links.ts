import RouteData from "@/model/route.model";

const publicRoutes: RouteData[] = [
  { path: "/", label: "Home" },
  { path: "/about-us", label: "About Us" },
  { path: "/services", label: "Services" },
  { path: "/teams", label: "Teams" },
  { path: "/blog", label: "Blog" },
];

const guestOnlyRoutes: RouteData[] = [
  { path: "/sign-in", label: "Sign In" },
  { path: "/sign-up", label: "Sign Up" },
];

const privateRoutes: RouteData[] = [{ path: "/dashboard", label: "Dashboard" }];

export { publicRoutes, privateRoutes, guestOnlyRoutes };
