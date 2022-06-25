// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {ethers} from 'ethers'
import { waitUntilSymbol } from 'next/dist/server/web/spec-compliant/fetch-event'

type Data = {
  address: string
}



const message = "Authorize me to participate!"

const provider = new ethers.providers.JsonRpcProvider('https://hackathon.skalenodes.com/v1/downright-royal-saiph')
// @ts-ignore
const wallet = new ethers.Wallet(process.env.SKALE_PRIV_KEY, provider)


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log(req.body.msg)

  const addr = ethers.utils.verifyMessage(message, req.body.msg)
  console.log(addr)

  const tx: ethers.providers.TransactionRequest = {
    to: addr,
    value: ethers.utils.parseEther('1.0').div(100000)
  }

  // for debugging balance
  // let sb = await wallet.getBalance()
  // console.log(sb.toString())

  wallet.sendTransaction(tx)
  // await x.wait()

  // sb = await wallet.getBalance()
  // console.log(sb.toString())

  res.status(200).json({ address : addr })
}
