import { BigNumber, ethers } from 'ethers'
import { useContext, useEffect, useState } from 'react'
import stakingABI from '../../abi/stakingABI.json'
import { getStakingContractId } from '../../config/chain'
import { Web3Context } from '../../context/Web3/Web3Context'
import Button from '../Button/Button'
import Spinner from '../Spinner/Spinner'
import useStyles from './Balance.styles'

const Balance: React.FC = () => {
	const { address, web3Provider } = useContext(Web3Context)

	const [balance, setBalance] = useState(0)
	const [owed, setOwed] = useState('0')
	const [isLoading, setIsLoading] = useState(true)

	const classes = useStyles()

	if (!web3Provider) {
		return <></>
	}

	const getBalances = async () => {
		setIsLoading(true)

		const { chainId } = await web3Provider.getNetwork()
		const stakingContractId = getStakingContractId(chainId)
		if (!stakingContractId) {
			setIsLoading(false)
			return
		}

		const signer = web3Provider.getSigner()
		const stakingContract = new ethers.Contract(
			stakingContractId,
			stakingABI,
			signer,
		)

		setBalance(await stakingContract.balanceOf(address))

		const claimables: BigNumber[] = await stakingContract.listClaimableRewardsOfOwner(
			address,
		)
		const claimable: BigNumber = claimables.reduce(
			(next, curr) => curr.add(next),
			ethers.constants.Zero,
		)
		setOwed(ethers.utils.formatEther(claimable))
		setIsLoading(false)
	}

	useEffect(() => {
		getBalances()
	}, [])

	const claimTokens = async () => {
		setIsLoading(true)
		//FIXME Call contract
		getBalances()
	}

	return (
		<div className={classes.section}>
			{isLoading ? (
				<Spinner />
			) : (
				<>
					<Button onClick={claimTokens} disabled={isLoading}>
						<>Claim {owed} $CHOW</>
					</Button>
					<p className={classes.text}>
						Total claimed:{' '}
						<span className={classes.textSpecial}>{balance} $CHOW</span>
					</p>
				</>
			)}
		</div>
	)
}

export default Balance
