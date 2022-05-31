import { Link } from 'react-router-dom'
import { ProfileRoute } from '../routes'
import PageWrapper from '../../components/PageWrapper/PageWrapper'

const Home: React.FC = () => {
	return (
		<PageWrapper className='default'>
			<h1>Home Page</h1>
			<Link to={`${ProfileRoute.path}`}>Profile</Link>
		</PageWrapper>
	)
}

export default Home
