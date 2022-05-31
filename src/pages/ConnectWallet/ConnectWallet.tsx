import ConnectButton from '../../components/Button/ConnectButton'
import PageWrapper from '../../components/PageWrapper/PageWrapper'
import useStyles from './ConnectWallet.styles'

const ConnectWallet: React.FC = () => {
	const classes = useStyles()
	return (
		<PageWrapper hasHeader={false} hasFooter={false}>
			<div className={classes.page}>
				<ConnectButton />
			</div>
		</PageWrapper>
	)
}

export default ConnectWallet
