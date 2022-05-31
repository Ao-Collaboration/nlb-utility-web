import Web3ContextProvider from './context/Web3/Web3Context'
import Router from './pages/Router'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App: React.FC = () => {
	return (
		<Web3ContextProvider>
			<Router />
			<ToastContainer
				theme='dark'
				position='top-center'
				autoClose={5000}
				pauseOnFocusLoss={false}
				draggable={false}
			/>
		</Web3ContextProvider>
	)
}

export default App
