import { BigNumber, ethers } from 'ethers'
import { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { ContractContext } from '../../context/Web3/ContractContext'
import { Web3Context } from '../../context/Web3/Web3Context'
import { NFTMetadata } from '../../interface/nftMetadata'
import doFetch from '../../utils/doFetch'
import Button from '../Button/Button'
import Spinner from '../Spinner/Spinner'
import Text from '../Text/Text'
import NFTCard from './NFTCard'
import useStyles from './Staking.styles'

interface NFTSelected extends NFTMetadata {
	tokenId: BigNumber
	selected: boolean
}

const Staking: React.FC = () => {
	const [unstaked, setUnstaked] = useState<NFTSelected[]>([])
	const [staked, setStaked] = useState<NFTSelected[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [isApproved, setIsApproved] = useState(false)
	const [txPending, setTxPending] = useState(false)
	const [forceRefresh, setForceRefresh] = useState(true) // Toggle this state to force a refresh

	const { address } = useContext(Web3Context)
	const { stakingContract, stakingContractId, nlbContract } = useContext(
		ContractContext,
	)

	const classes = useStyles()

	useEffect(() => {
		getNLBs()
	}, [stakingContract, nlbContract])

	const getNLBs = async () => {
		setIsLoading(true)

		if (!nlbContract) {
			setIsLoading(false)
			return
		}

		const unstakedNLBs = await nlbContract.walletOfOwner(address)
		let stakedNLBs: BigNumber[] = []
		if (stakingContract) {
			stakedNLBs = await stakingContract.listStakedTokensOfOwner(address)
		}

		const stakedNLBData: NFTSelected[] = []
		const unstakedNLBData: NFTSelected[] = []

		const basePath = await nlbContract.baseURI()

		let metadataPromises: Promise<NFTSelected>[] = []

		const cleanMetadata = (metadata: NFTSelected, tokenId: BigNumber) => {
			metadata.tokenId = tokenId
			metadata.selected = false
			metadata.name = metadata.name || `NLB #${tokenId.toNumber()}`
			metadata.image = metadata.image.replace(
				'ipfs://',
				'https://ipfs.io/ipfs/',
			)
		}

		// Get staked metadata
		for (let i = 0; i < stakedNLBs.length; i++) {
			metadataPromises.push(
				doFetch(`${basePath}${stakedNLBs[i].toNumber()}.json`, 'GET'),
			)
		}
		await Promise.all(metadataPromises)
		for (let i = 0; i < stakedNLBs.length; i++) {
			const metadata: NFTSelected = await metadataPromises[i]
			cleanMetadata(metadata, stakedNLBs[i])
			stakedNLBData.push(metadata)
		}

		// Get unstaked metadata
		metadataPromises = []
		for (let i = 0; i < unstakedNLBs.length; i++) {
			metadataPromises.push(
				doFetch(`${basePath}${unstakedNLBs[i].toNumber()}.json`, 'GET'),
			)
		}
		await Promise.all(metadataPromises)
		for (let i = 0; i < unstakedNLBs.length; i++) {
			const metadata = await metadataPromises[i]
			cleanMetadata(metadata, unstakedNLBs[i])
			unstakedNLBData.push(metadata)
		}

		setStaked(stakedNLBData)
		setUnstaked(unstakedNLBData)

		// Check approved status
		setIsApproved(
			await nlbContract.isApprovedForAll(address, stakingContractId || ethers.constants.AddressZero),
		)

		setIsLoading(false)
	}

	const updateSelected = (name: string) => {
		let nlb = staked.find(h => h.name === name)
		if (nlb) {
			nlb.selected = !nlb.selected
			setStaked(staked)
		} else {
			nlb = unstaked.find(h => h.name === name)
			if (nlb) {
				nlb.selected = !nlb.selected
				setUnstaked(unstaked)
			}
		}
		setForceRefresh(!forceRefresh)
	}

	const doApproval = async () => {
		if (isApproved) {
			return
		}

		try {
			const tx = await nlbContract?.setApprovalForAll(stakingContractId, true)
			setTxPending(true)
			await tx.wait()
			setIsApproved(true)
			setTxPending(false)
		} catch (err) {
			if (err instanceof Error) {
				toast.error(err.message)
			}
		}
	}

	const doStake = async () => {
		if (!isApproved) {
			return
		}
		const selected = unstaked.filter(h => h.selected).map(h => h.tokenId)
		if (!selected.length) {
			window.alert('Please select NLBs to stake')
			return
		}
		try {
			const tx = await stakingContract?.stake(selected)
			setTxPending(true)
			await tx.wait()
			setTxPending(false)
			getNLBs()
		} catch (err) {
			if (err instanceof Error) {
				toast.error(err.message)
			}
		}
	}

	const doUnstake = async () => {
		const selected = staked.filter(h => h.selected).map(h => h.tokenId)
		if (!selected.length) {
			window.alert('Please select NLBs to unstake')
			return
		}
		try {
			const tx = await stakingContract?.unstake(selected)
			setTxPending(true)
			await tx.wait()
			setTxPending(false)
			getNLBs()
		} catch (err) {
			if (err instanceof Error) {
				toast.error(err.message)
			}
		}
	}

	const hasStakeSelected = !!staked.find(h => h.selected)
	const hasUnstakeSelected = !!unstaked.find(h => h.selected)

	if (!nlbContract) {
		return <></>
	}

	return (
		<div className={classes.sectionContainer}>
			<div>
				{isLoading ? (
					<Spinner />
				) : staked.length === 0 && unstaked.length === 0 ? (
					<>
						<Text variant='h2'>You don't have any NLBs</Text>
					</>
				) : (
					<div className={classes.section}>
						<Text variant='h2'>Staked NFTs</Text>
						{staked.length > 0 ? (
							<>
								<div className={classes.container}>
									{staked.map(nlb => (
										<NFTCard
											key={nlb.name}
											nft={nlb}
											selected={nlb.selected}
											onClick={updateSelected}
										/>
									))}
								</div>
								{hasStakeSelected && (
									<Button onClick={doUnstake} disabled={txPending} className='primaryInverted'>
										{txPending ? 'Tx Pending...' : 'Unstake'}
									</Button>
								)}
							</>
						) : (
							<Text variant='body'>No NLBs staked</Text>
						)}
					</div>
				)}
			</div>
			{!isLoading && unstaked.length > 0 && (
				<div className={classes.section}>
					<Text variant='h2'>Unstaked NFTs</Text>
					<div className={classes.container}>
						{unstaked.map(nlb => (
							<NFTCard
								key={nlb.name}
								nft={nlb}
								selected={nlb.selected}
								onClick={updateSelected}
							/>
						))}
					</div>
					{stakingContract &&
						isApproved ? (
							<Button
								onClick={doStake}
								disabled={txPending || !hasUnstakeSelected}
								className='primaryInverted'
							>
								{txPending ? 'Tx Pending...' : 'Stake'}
							</Button>
						) : (
							<Button
								onClick={doApproval}
								disabled={txPending || !hasUnstakeSelected}
								className='primaryInverted'
							>
								{txPending ? 'Tx Pending...' : 'Approve'}
							</Button>
						)
					}
				</div>
			)}
		</div>
	)
}

export default Staking
