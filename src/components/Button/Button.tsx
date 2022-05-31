import useStyles, { ClassNames } from './Button.styles'

interface Props {
	className?: ClassNames
	children?: React.ReactNode
  onClick: () => void
  disabled?: boolean
}

const Button: React.FC<Props> = ({children, onClick, className, disabled}) => {
	const classes = useStyles()

	return (
		<button
			className={classes[className || 'button']}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</button>
	)
}

export default Button
