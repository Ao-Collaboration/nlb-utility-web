import { Contract, ethers } from 'ethers'
import {
	createContext,
	FC,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from 'react'
import nlbABI from '../../abi/nlbABI.json'
import stakingABI from '../../abi/stakingABI.json'
import { getNlbContractId, getStakingContractId } from '../../config/chain'
import { Web3Context } from './Web3Context'

interface CtxProps {
	stakingContract?: Contract
	stakingContractId?: string
	nlbContract?: Contract
	nlbContractId?: string
}
interface Props {
	children: ReactNode
}

export const ContractContext = createContext<CtxProps>({})
const ContractContextProvider: FC<Props> = ({ children }) => {
	const { web3Provider } = useContext(Web3Context)

	const [stakingContract, setStakingContract] = useState<Contract>()
	const [stakingContractId, setStakingContractId] = useState<string>()
	const [nlbContract, setNlbContract] = useState<Contract>()
	const [nlbContractId, setNlbContractId] = useState<string>()

	useEffect(() => {
		getContracts()
	}, [web3Provider])

	const getContracts = async () => {
		if (!web3Provider) {
			return
		}

		const { chainId } = await web3Provider.getNetwork()
		const _stakingContractId = getStakingContractId(chainId)
		const _nlbContractId = getNlbContractId(chainId)

		const signer = web3Provider.getSigner()

		if (_stakingContractId) {
			setStakingContractId(_stakingContractId)
			const _stakingContract = new ethers.Contract(
				_stakingContractId,
				stakingABI,
				signer,
			)
			setStakingContract(_stakingContract)
		}

		if (_nlbContractId) {
			setNlbContractId(_nlbContractId)
			const _nlbContract = new ethers.Contract(_nlbContractId, nlbABI, signer)
			setNlbContract(_nlbContract)
		}
	}

	return (
		<ContractContext.Provider
			value={{
				stakingContract,
				stakingContractId,
				nlbContract,
				nlbContractId,
			}}
		>
			{children}
		</ContractContext.Provider>
	)
}

export default ContractContextProvider
