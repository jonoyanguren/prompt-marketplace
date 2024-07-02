export const checkCreator = (req: any, res: any, next: any) => {
  console.log("checkCreator", req.user);

  if (!req.user || !req.user.creator) {
    return res.status(401).json({ message: "Unauthorized" });
  } else {
    next();
  }
};
