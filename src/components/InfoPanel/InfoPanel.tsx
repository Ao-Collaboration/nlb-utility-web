import { useState } from 'react'
import Button from '../Button/Button'
import Text from '../Text/Text'
import useStyles from './InfoPanel.styles'

interface Props {
	title: string
	content: string
	onClick?: () => void
	buttonText?: string
}

const InfoPanel: React.FC<Props> = ({
	title,
	content,
	onClick,
	buttonText,
}) => {
	const [isLoading, setIsLoading] = useState(false)

	const classes = useStyles()

	const doOnClick = async () => {
		if (onClick) {
			setIsLoading(true)
			await onClick()
			setIsLoading(false)
		}
	}

	return (
		<div className={classes.card}>
			<Text variant="body-purple">{title}</Text>
			<Text variant="h3">{content}</Text>
			{onClick && buttonText && (
				<Button onClick={doOnClick} disabled={isLoading} className='primary'>
					{buttonText}
				</Button>
			)}
		</div>
	)
}

export default InfoPanel
