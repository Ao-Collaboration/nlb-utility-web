import { BigNumber, Contract, ethers } from 'ethers'
import { useContext, useEffect, useState } from 'react'
import nlbABI from '../../abi/nlbABI.json'
import stakingABI from '../../abi/stakingABI.json'
import { getNlbContractId, getStakingContractId } from '../../config/chain'
import { Web3Context } from '../../context/Web3/Web3Context'
import { NFTMetadata } from '../../interface/nftMetadata'
import doFetch from '../../utils/doFetch'
import Balance from '../Balance/Balance'
import Button from '../Button/Button'
import Spinner from '../Spinner/Spinner'
import NFTCard from './NFTCard'
import useStyles from './Staking.styles'

interface NFTSelected extends NFTMetadata {
	tokenId: BigNumber
	selected: boolean
}

const Staking: React.FC = () => {
	const [unstaked, setUnstaked] = useState<NFTSelected[]>([])
	const [staked, setStaked] = useState<NFTSelected[]>([])
	const [stakingContract, setStakingContract] = useState<Contract>()
	const [nlbContract, setNlbContract] = useState<Contract>()
	const [isLoading, setIsLoading] = useState(true)
	const [isApproved, setIsApproved] = useState(false)
	const [txPending, setTxPending] = useState(false)
	const [forceRefresh, setForceRefresh] = useState(true) // Toggle this state to force a refresh

	const { address, web3Provider } = useContext(Web3Context)

	if (!web3Provider) {
		return <></>
	}

	const classes = useStyles()

	useEffect(() => {
		getNLBs()
	}, [web3Provider])

	const getNLBs = async () => {
		setIsLoading(true)

		const { chainId } = await web3Provider.getNetwork()
		const stakingContractId = getStakingContractId(chainId)
		const nlbContractId = getNlbContractId(chainId)
		if (!stakingContractId || !nlbContractId) {
			setIsLoading(false)
			return
		}

		const signer = web3Provider.getSigner()
		const _stakingContract = new ethers.Contract(
			stakingContractId,
			stakingABI,
			signer,
		)
		setStakingContract(_stakingContract)

		const _nlbContract = new ethers.Contract(
			nlbContractId,
			nlbABI,
			signer,
		)
		setNlbContract(_nlbContract)

		const allNLBs = await _nlbContract.walletOfOwner(address)
		// const allNLBs = [BigNumber.from(1), BigNumber.from(2)]
		const stakedNLBs = await _stakingContract.listStakedTokensOfOwner(address)
		const unstakedNLBs: BigNumber[] = []

		allNLBs.forEach((token_id: BigNumber) => {
			if (!stakedNLBs.includes(token_id)) {
				unstakedNLBs.push(token_id)
			}
		})

		const stakedNLBData: NFTSelected[] = []
		const unstakedNLBData: NFTSelected[] = []

		const basePath = await _nlbContract.baseURI()
		// const basePath = 'https://opensea.mypinata.cloud/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/'

		for (let i = 0; i < stakedNLBs.length; i++) {
			const metadata: NFTSelected = await doFetch(
				`${basePath}${stakedNLBs[i].toNumber()}`,
				'GET',
			)
			metadata.tokenId = stakedNLBs[i]
			metadata.selected = false
			metadata.name = metadata.name || `#${stakedNLBs[i].toNumber()}`
			metadata.image = metadata.image.replace('ipfs://', 'https://ipfs.io/ipfs/')
			stakedNLBData.push(metadata)
		}

		for (let i = 0; i < unstakedNLBs.length; i++) {
			const metadata = await doFetch(
				`${basePath}${unstakedNLBs[i].toNumber()}`,
				'GET',
			)
			metadata.tokenId = unstakedNLBs[i]
			metadata.selected = false
			metadata.name = metadata.name || `#${unstakedNLBs[i].toNumber()}`
			metadata.image = metadata.image.replace('ipfs://', 'https://ipfs.io/ipfs/')
			console.error(metadata)
			unstakedNLBData.push(metadata)
		}

		setStaked(stakedNLBData)
		setUnstaked(unstakedNLBData)

		// Check approved status
		setIsApproved(
			await _nlbContract.isApprovedForAll(
				address,
				stakingContractId,
			),
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

		const { chainId } = await web3Provider.getNetwork()
		const stakingContractId = getStakingContractId(chainId)
		const tx = await nlbContract?.setApprovalForAll(stakingContractId, true)
		setTxPending(true)
		await tx.wait()
		setIsApproved(true)
		setTxPending(false)
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
		const tx = await stakingContract?.stake(selected)
		setTxPending(true)
		await tx.wait()
		setTxPending(false)
		getNLBs()
	}

	const doUnstake = async () => {
		const selected = staked.filter(h => h.selected).map(h => h.tokenId)
		if (!selected.length) {
			window.alert('Please select NLBs to unstake')
			return
		}
		const tx = await stakingContract?.unstake(selected)
		setTxPending(true)
		await tx.wait()
		setTxPending(false)
		getNLBs()
	}

	const hasStakeSelected = !!staked.find(h => h.selected)
	const hasUnstakeSelected = !!unstaked.find(h => h.selected)

	return (
		<div className={classes.sectionContainer}>
			<div>
				{isLoading ? (
					<Spinner />
				) :
					staked.length === 0 && unstaked.length === 0 ? (
						<>
							<h2 className={classes.heading}>No NLBs</h2>
						</>
					) : (
						<>
							<h2 className={classes.heading}>Staked</h2>
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
										<Button onClick={doUnstake} disabled={txPending}>
											{txPending ? 'Tx Pending...' : 'Unstake'}
										</Button>
									)}
								</>
							) : (
								<p>No NLBs staked</p>
							)}
							<Balance />
						</>
					)
				}
			</div>
			{!isLoading && unstaked.length > 0 && (
				<div>
					<h2 className={classes.heading}>Unstaked</h2>
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
					{isApproved ? (
						<Button onClick={doStake} disabled={txPending || !hasUnstakeSelected}>
							{txPending ? 'Tx Pending...' : 'Stake'}
						</Button>
					) : (
						<Button onClick={doApproval} disabled={txPending || !hasUnstakeSelected}>
							{txPending ? 'Tx Pending...' : 'Approve'}
						</Button>
					)}
				</div>
			)}
		</div>
	)
}

export default Staking
