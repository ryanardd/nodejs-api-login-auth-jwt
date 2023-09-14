// import { prismaClient } from "../application/database";

// export const authMiddleware = async (req, res, next) => {
//     const token = req.headers.authorization;

//     if (!token) {
//         res.status(401)
//             .json({
//                 error: "Unauthorization",
//             })
//             .end();
//     } else {
//         // cek db
//         const user = prismaClient.user.findFirst({
//             where: {
//                 token: token,
//             },
//         });

//         // cek user
//         if (!user) {
//             res.status(401).json({
//                 errors: "Unauthorization",
//             });
//         } else {
//             req.user = user;
//             next();
//         }
//     }
// };
