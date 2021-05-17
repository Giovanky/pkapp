import { model, Document, Schema } from 'mongoose'
import bcrypt from 'bcryptjs'
import uniqueValidator from 'mongoose-unique-validator' 

export interface IUsers extends Document{
    name: string
    email: string
    password: string | any
    google?: boolean
    role?: string
    active?: boolean
    resetLink: string
    encryptPassword(password: string): Promise<string>
}

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre del Usuario es obligatorio'],
        unique: true,
        max: 40
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El email del Usuario es obligatorio'],
        max: 30
    },
    password: {
        type: String,
        required: [true, 'La contraseña de Usuario es obligatoria'],
        max: 40
    },
    google: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        default: 'USER'
    },
    active: {
        type: Boolean,
        default: false
    },
    status: {
        type: Boolean,
        default: true
    },
    resetLink: {
        data: String,
        default: ''
    }
}, {
    timestamps: true,
    versionKey: false
})

userSchema.plugin(uniqueValidator, {message: '{PATH} ya se encuentra utilizado'})

userSchema.methods.encryptPassword = async(password): Promise<string> => {
    const salt = await bcrypt.genSalt(16)
    return bcrypt.hash(password, salt)
}

export default model<IUsers>('Users', userSchema)