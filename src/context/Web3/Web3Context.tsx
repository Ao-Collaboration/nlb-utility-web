import {
	createContext,
	Dispatch,
	FC,
	ReactNode,
	SetStateAction,
	useState,
} from 'react'
import { Web3Provider } from '@ethersproject/providers'

interface CtxProps {
	account?: string | null
	setAccount?: Dispatch<SetStateAction<string | null>>
	address?: string | null
	setAddress?: Dispatch<SetStateAction<string | null>>
	web3Provider?: Web3Provider | null
	setWeb3Provider?: Dispatch<SetStateAction<Web3Provider | null>>
}
interface Props {
	children: ReactNode
}

export const Web3Context = createContext<CtxProps>({})
const Web3ContextProvider: FC<Props> = ({ children }) => {
	const [account, setAccount] = useState<string | null>(null)
	const [address, setAddress] = useState<string | null>(null)
	const [web3Provider, setWeb3Provider] = useState<Web3Provider | null>(null)

	return (
		<Web3Context.Provider
			value={{
				account,
				setAccount,
				address,
				setAddress,
				web3Provider,
				setWeb3Provider,
			}}
		>
			{children}
		</Web3Context.Provider>
	)
}

export default Web3ContextProvider
