import useStyles from './Spinner.styles'

const Spinner: React.FC = () => {
	const classes = useStyles()

	return (
		<div className={classes.spinPadding}>
			<div className={classes.spinner}>
			</div>
		</div>
	)
}

export default Spinner
