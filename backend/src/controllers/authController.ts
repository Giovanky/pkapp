import { Request, Response } from 'express'
import Users, {IUsers} from '../models/Users'
import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'
import _ from 'lodash'

const user = 'dorothea.streich50@ethereal.email'
const pass = 'C7zwVF9TbxtVqx3DKR'

class AuthController {
    public async signup(req: Request, res: Response) {
        try{
            const {name, email, password} = req.body
            const verifyUser = await Users.findOne({email})
            if(verifyUser){
                return res.status(400).json({
                    success: false,
                    message: 'El correo ya existe para otro usuario'
                })
            }
            const newUser: IUsers = new Users({
                name, 
                email,
                password
            })
            newUser.password = await newUser.encryptPassword(newUser.password)
            const data = await newUser.save()
            const payload = {
                _id: data._id,
                name: data.name,
                email: data.email,
                role: data.role
            }
         
            const token = jwt.sign(payload, process.env.SEED, {expiresIn: 1200})

            const transporter = nodemailer.createTransport({
                host: 'smtp.ethereal.email',
                port: 587,
                auth: {
                    user: user,
                    pass: pass
                }
            })

            const info = await transporter.sendMail({
                from: 'noreply@pkapp.com', // sender address,
                to: email,
                subject: 'Pokeapp Account Activation Link',
                html: `
                <h2>Please click on given link to activate your Pokeapp account</h2>
                <p>localhost:xxxx/authentication/activate/${token}</p>`
            })
        
            if(!info){
                return res.json({
                    success: false,
                    message: 'Problemas al enviar correo de verificacion'
                })
            } 
            return res.json({
                success: true,
                message: 'Le hemos enviado un correo para verificar su cuenta'
            })
        }catch(err){
            return res.status(500).json({
                success: false,
                message: 'Problemas al registrar el Usuario',
                err
            })
        }
    }

    public async signin(req: Request, res: Response) {
        try{
            const data = await Users.findOne({email: req.body.email})
            if(!data){
                return res.status(400).json({
                    success: false,
                    message: 'No se ha encontrado el email del usuario'
                })
            }
            const correctPassword: boolean = await data.validatePassword(req.body.password) 
            console.log(correctPassword)
            if(!correctPassword){
                return res.status(400).json({
                    success: false,
                    message: 'Contraseña incorrecta'
                })
            }
            if(!data.active) {
                return res.status(400).json({
                    success: false,
                    message: 'Es necesario confirmar su correo'
                })
            }
            const payload = {
                _id: data._id,
                email: data.email,
                role: data.role
            }
            const token = jwt.sign(payload, process.env.SEED, {
                expiresIn: 60*60*48 
            })
            console.log(token)
            return res.json({
                success: true,
                token
            })
        }catch(err){
            return res.status(500).json({
                sucess: false,
                message: 'No se pudo autenticar el Usuario',
                err
            })
        }
    }

    public async activateAccount(req: Request, res: Response) {
        try{
            const {token} = req.body 
            if(!token) {
                return res.status(400).json({
                    success: false,
                    message: 'Es necesario un token'
                })
            }
            const decoded: any = jwt.verify(token, process.env.SEED)
            if(!decoded){
                return res.status(400).json({
                    success: false,
                    message: 'Token erroneo o expirado'
                })
            }
            const {email} = decoded
            const user = await Users.findOne({email})
            await user.updateOne({active: true})
            return res.json({
                success: true,
                message: 'La cuenta ha sido activada'
            })
        }catch(err){
            return res.status(500).json({
                success: false,
                message: 'Error al activar la cuenta',
                err
            })
        }
    }

    public async forgotPassword(req: Request, res: Response) {
        try{
            const {email} = req.body
            const user = await Users.findOne({email})
            if(!user){
                return res.status(400).json({
                    success: false,
                    message: 'Problemas al realizar la operacion'
                })
            }
            const token = jwt.sign({_id: user._id}, process.env.SEED, {expiresIn: 1200})
            const transporter = nodemailer.createTransport({
                host: 'smtp.ethereal.email',
                port: 587,
                secure: false,
                auth: {
                    user: 'dorothea.streich50@ethereal.email',
                    pass: 'C7zwVF9TbxtVqx3DKR'
                },
                tls: {
                    rejectUnauthorized: false
                }
            })
            const info = await transporter.sendMail({
                from: 'noreply@pokeapp.com', // sender address,
                to: email,
                subject: 'Pokeapp Reset Password Link',
                html: `
                    <h2>Please click on given link to reset your password</h2>
                    <p>localhost:xxxx/forgot-password/${token}</p>`
            })
            if(!info){
                return res.json({
                    success: false,
                    message: 'Problemas al cambiar su contraseña'
                })
            }
            const data = await user.updateOne({resetLink: token})
            if(!data){
                return res.status(500).json({
                    success: false,
                    message: 'Enlace de resetear contraseña incorrecto'
                })
            }
            console.log(data)
            return res.json({
                success: true,
                message: 'Le hemos enviado un enlace para resetear la contraseña'
            })
        }catch(err){
            return res.status(500).json({
                success: false,
                message: 'Error al enviar enlace para resetear contraseña',
                err
            })
        }
    }

    public async resetPassword(req: Request, res: Response) {
        try{
            const {resetLink, newPass} = req.body
            if(!resetLink){
                return res.status(500).json({
                    success: false,
                    message: 'Token incorrecto o expirado'
                })
            }
            const decoded = jwt.verify(resetLink, process.env.SEED)
            if(!decoded){
                return res.status(500).json({
                    success: false,
                    message: 'Error al verificar el token'
                })
            }
            let user = await Users.findOne({resetLink})
            const obj = {
                password: newPass,
                resetLink: ''
            }
            user = _.extend(user, obj)
            user.password = await user.encryptPassword(user.password)
            const modifiedUser = await user.save()
            if(!modifiedUser){
                return res.status(500).json({
                    success: false,
                    message: 'Error al modificar contraseña',
                })
            }
            return res.json({
                success: true,
                message: 'Tu contraseña ha sido modificada'
            })
        }catch(err){
            return res.status(500).json({
                success: false,
                message: 'Error al resetear contraseña',
                err
            })
        }
    }
}

export const authController = new AuthController()