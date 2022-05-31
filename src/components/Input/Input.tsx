import useStyles from './Input.styles'

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => {
	const classes = useStyles()

	return (
		<input
			className={classes['base']}
			{...props}
		/>
	)
}

export default Input
