import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import useStyles, { ClassNames } from './PageWrapper.styles'

interface Props {
	className?: ClassNames
	children?: React.ReactNode
	hasHeader?: boolean
	hasFooter?: boolean
}

const PageWrapper: React.FC<Props> = ({
	children,
	className = 'default',
	hasHeader = true,
	hasFooter = true,
}) => {
	const classes = useStyles()

	return (
		<div className={classes[className]}>
			{hasHeader && <Header />}
			<main className={classes.main}>
				{children}
			</main>
			{hasFooter && <Footer />}
		</div>
	)
}

export default PageWrapper
