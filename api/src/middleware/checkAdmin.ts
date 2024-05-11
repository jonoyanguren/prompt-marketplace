export const checkAdmin = (req: any, res: any, next: any) => {
  console.log("checkAdmin", req.user);
  if (!req.user || req.user.role !== "admin") {
    return res.status(401).json({ message: "Unauthorized" });
  } else {
    next();
  }
};
