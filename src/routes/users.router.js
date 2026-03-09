import express from "express";
import userController from "../controllers/users.controller.js";

/*
    TODO: 
        - Crear los controladores de los endpoints
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

userRouter.post(
    "/", 
    userController.createUser
);

userRouter.put(
    "/:id", 
    /* Este endpoint funciona para modificar cualquier dato del usuario, incluso password y isActive, aunque quierorevisar si conviene así o si conviene en un endpoint aparte. */
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