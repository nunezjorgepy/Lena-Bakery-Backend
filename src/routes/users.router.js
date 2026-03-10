import express from "express";
import userController from "../controllers/users.controller.js";

/*
    TODO: 
        - No olidar las validaciones necesarias (autenticación, autorización, etc.)
*/

const userRouter = express.Router();

userRouter.get(
    "/", 
    userController.getAllUsers
);

userRouter.get(
    "/:id", 
    userController.getUserById
);

userRouter.put(
    "/:id", 
    /* TODO: Este endpoint funciona para modificar cualquier dato del usuario, incluso passwordpero en realidad esto hay que hacerlo en un endpoint separado. */
    userController.updateUser
);

/* Modificar isActive */
userRouter.patch(
    "/:id/isActive", 
    /* userController.updateUser */
    /* El controlador deberá simplemente modificar el estado de isActive */
    (req, res) => res.send(`Update isActive by Id: ${req.params.id}`)
)


export default userRouter;