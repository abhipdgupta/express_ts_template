import { UserRoles } from '../constants/userRoles'
import UserModel from '../db/models/userModel'
import {
  UserAlreadyExistsError,
  UserNotFoundError,
} from '../exceptions/exceptions'
import { hashPassword } from '../utils/password'

export const getUserById = async (id: string) => {
  try {
    const result = await UserModel.findOne({ _id: id })
    return result
  } catch (err) {
    console.error('Error in getUserById:')
    throw err
  }
}

export const getUserByEmail = async (email: string) => {
  try {
    const result = await UserModel.findOne({ email })
    return result
  } catch (err) {
    console.error('Error in getUserById:')

    throw err
  }
}

export const getAllUsers = async (
  options: { page: number; limit: number } = { page: 1, limit: 15 },
) => {
  try {
    const { page, limit } = options
    const skip = (page - 1) * limit

    const result = await UserModel.find({ role: UserRoles.USER })
      .sort('timestamp')
      .select('-password -refresh_tokens')
      .skip(skip)
      .limit(limit)

    return result
  } catch (err) {
    console.error('Error in getAllUsers:')

    throw err
  }
}

export const getAllAdmins = async (
  options: { page: number; limit: number } = { page: 1, limit: 15 },
) => {
  try {
    const { page, limit } = options
    const skip = (page - 1) * limit

    const result = await UserModel.find({ role: UserRoles.ADMIN })
      .sort('timestamp')
      .select('-password -refresh_tokens')
      .skip(skip)
      .limit(limit)

    return result
  } catch (error) {
    console.error('Error in getAllAdmins:')
    throw error
  }
}

export const addUser = async ({
  email,
  password,
  name,
}: {
  email: string
  password: string
  name: string
}) => {
  try {
    // check for existing user
    const existingUser = await getUserByEmail(email)

    if (existingUser) {
      throw new UserAlreadyExistsError('Email is already in use')
    }

    //   create user
    const newUser = new UserModel({
      email,
      password,
      name,
    })
    const savedUser = await newUser.save()

    return savedUser
  } catch (error) {
    console.error('Error in addUser:', error)

    throw error
  }
}

export const updateUser = async (
  id: string,
  updateData: {
    email?: string
    password?: string
    name?: string
    avatar?: string
    role?: UserRoles
    refresh_token?: {
      token: string | null
      expiry_date: Date | null
    }
  },
) => {
  try {
    if (updateData.password) {
      updateData.password = await hashPassword(updateData.password)
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true },
    ).select('-password -refresh_tokens')

    if (!updatedUser) {
      throw new UserNotFoundError('User not found')
    }

    return updatedUser
  } catch (error) {
    console.error('Error in updateUser:', error)
    throw error
  }
}

export const deleteUserById = async (id: string) => {
  try {
    const deletedUser = await UserModel.findByIdAndDelete(id).select(
      '-password -refresh_tokens',
    )
    if (!deletedUser) {
      throw new UserNotFoundError('User not found')
    }
    return true
  } catch (error) {
    console.error('Error in deleteUserById:', error)
    throw error
  }
}
