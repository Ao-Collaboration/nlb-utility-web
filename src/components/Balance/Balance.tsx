import { BigNumber, ethers } from 'ethers'
import { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { ContractContext } from '../../context/Web3/ContractContext'
import { Web3Context } from '../../context/Web3/Web3Context'
import { formatEthers } from '../../utils/format'
import InfoPanel from '../InfoPanel/InfoPanel'
import Spinner from '../Spinner/Spinner'
import useStyles from './Balance.styles'

const Balance: React.FC = () => {
	const { address, web3Provider } = useContext(Web3Context)
	const { stakingContract, stakingContractId } = useContext(ContractContext)

	const [balance, setBalance] = useState('0')
	const [stakedNLBs, setStakedNLBs] = useState<BigNumber[]>([])
	const [owed, setOwed] = useState('0')
	const [isLoading, setIsLoading] = useState(true)

	const classes = useStyles()

	const getBalances = async () => {
		setIsLoading(true)

		if (!stakingContract) {
			setIsLoading(false)
			return
		}

		setStakedNLBs(await stakingContract.listStakedTokensOfOwner(address))
		setBalance(formatEthers(await stakingContract.balanceOf(address)))

		const claimables: BigNumber[] = await stakingContract.listClaimableRewardsOfOwner(
			address,
		)
		const claimable: BigNumber = claimables.reduce(
			(next, curr) => curr.add(next),
			ethers.constants.Zero,
		)
		setOwed(formatEthers(claimable))
		setIsLoading(false)
	}

	useEffect(() => {
		getBalances()
	}, [stakingContract])

	const claimTokens = async () => {
		setIsLoading(true)

		if (!stakingContract) {
			setIsLoading(false)
			return
		}

		if (!stakedNLBs || stakedNLBs.length === 0) {
			return
		}

		// Claim tokens
		try {
			const tx = await stakingContract.claim(stakedNLBs)
			await tx.wait()
			getBalances()
		} catch (err) {
			if (err instanceof Error) {
				toast.error(err.message)
			}
		}

		getBalances()
	}

	const addToMM = async () => {
		if (!stakingContractId || !web3Provider || !window.ethereum) {
			return
		}

		window.ethereum.request({
			method: 'wallet_watchAsset',
			params: {
				type: 'ERC20',
				options: {
					address: stakingContractId,
					symbol: 'CHOW',
					decimals: 18,
					image: 'https://utility.nlbnft.com/img/chow.png',
				},
			},
		})
	}

	if (!stakingContract) {
		return <></>
	}

	return (
		<div className={classes.section}>
			{isLoading ? (
				<Spinner />
			) : (
				<>
					<InfoPanel
						title="Your NFTs Staked"
						content={`${stakedNLBs.length} NLB`}
					/>
					<InfoPanel
						title="Claimable Tokens"
						content={`${owed} $CHOW`}
						onClick={claimTokens}
						buttonText="Claim Tokens"
					/>
					<InfoPanel
						title="Current Balance"
						content={`${balance} $CHOW`}
						onClick={addToMM}
						buttonText="Add to MM"
					/>
				</>
			)}
		</div>
	)
}

export default Balance
