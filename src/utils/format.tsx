import { BigNumber, ethers } from 'ethers'

export const formatEthers = (bn: BigNumber, dp?: number): string =>
	Number(ethers.utils.formatEther(bn)).toFixed(dp || 2)
