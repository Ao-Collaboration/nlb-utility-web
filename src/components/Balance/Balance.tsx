import { BigNumber, Contract, ethers } from 'ethers'
import { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Web3Context } from '../../context/Web3/Web3Context'
import { formatEthers } from '../../utils/format'
import Button from '../Button/Button'
import Spinner from '../Spinner/Spinner'
import useStyles from './Balance.styles'

interface Props {
	stakingContract?: Contract
	stakedIds?: BigNumber[]
}

const Balance: React.FC<Props> = ({ stakingContract, stakedIds }) => {
	const { address, web3Provider } = useContext(Web3Context)

	const [balance, setBalance] = useState('0')
	const [owed, setOwed] = useState('0')
	const [isLoading, setIsLoading] = useState(true)
	const [txPending, setTxPending] = useState(false)

	const classes = useStyles()

	const getBalances = async () => {
		setIsLoading(true)

		if (!stakingContract) {
			setIsLoading(false)
			return
		}

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
	}, [web3Provider])

	const claimTokens = async () => {
		setIsLoading(true)

		if (!stakedIds || stakedIds.length === 0) {
			return
		}

		// Claim tokens
		try {
			const tx = await stakingContract?.stake(stakedIds)
			setTxPending(true)
			await tx.wait()
			setTxPending(false)
			getBalances()
		} catch (err: unknown) {
			if (err instanceof Error) {
				toast.error(err.message)
			}
		}

		getBalances()
	}

	return (
		<div className={classes.section}>
			{isLoading ? (
				<Spinner />
			) : (
				<>
					<Button onClick={claimTokens} disabled={txPending}>
						<>
							{txPending ? 'Tx Pending...' : `Claim ${owed} $CHOW`}
						</>
					</Button>
					<p className={classes.text}>
						Total claimed:{' '}
						<span className={classes.textSpecial}>
							<>
								{balance}
								{' '}
								$CHOW
							</>
						</span>
					</p>
				</>
			)}
		</div>
	)
}

export default Balance
