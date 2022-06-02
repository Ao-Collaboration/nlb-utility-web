import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ProfileRoute } from './routes'
import Profile from './Profile/Profile'
import { useContext } from 'react'
import { Web3Context } from '../context/Web3/Web3Context'
import ConnectWallet from './ConnectWallet/ConnectWallet'

const Router: React.FC = () => {
	const { web3Provider } = useContext(Web3Context)

	if (!web3Provider) {
		// Require wallet connection
		return (<ConnectWallet />)
	}
	return (
		<>
			<HashRouter>
				<Routes>
					{/* <Route path={HomeRoute.path} element={<Home />} /> */}
					<Route path={ProfileRoute.path} element={<Profile />} />
					<Route path="*" element={<Navigate to={ProfileRoute.path} />} />
				</Routes>
			</HashRouter>
		</>
	)
}

export default Router
