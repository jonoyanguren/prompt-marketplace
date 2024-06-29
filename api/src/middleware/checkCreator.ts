export const checkCreator = (req: any, res: any, next: any) => {
  if (!req.user || !req.user.creator) {
    return res.status(401).json({ message: "Unauthorized" });
  } else {
    next();
  }
};
