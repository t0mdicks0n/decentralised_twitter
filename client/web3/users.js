import { eth, getInstance } from './provider'
const Web3Utils = require('web3-utils');

import UserStorage from "./artifacts/UserStorage.json"
import UserController from "./artifacts/UserController.json"

export const createUser = async (username) => {
  const controller = await getInstance(UserController)

  try {
    await ethereum.enable()
    const addresses = await eth.getAccounts()
    const result = await controller.createUser(
      Web3Utils.fromAscii(username),
    {
      from: addresses[0],
    })

    return result
  } catch (err) {
    console.error("Err:", err)
  }
}

export const getUserInfo = async (userId) => {
  const storage = await getInstance(UserStorage)
  const { id, username } = await storage.profiles.call(userId)

  return {
    id: parseInt(id),
    username: Web3Utils.toAscii(username),
  }
}
