import { NFTMetadata } from '../../interface/nftMetadata'

import useStyles from './NFTCard.styles'

interface Props {
	nft: NFTMetadata
	selected: boolean
	onClick: (name: string) => void
}

const NFTCard: React.FC<Props> = ({ nft, selected, onClick }) => {
	const classes = useStyles()
	return (
		<div
			className={selected ? classes.selectedCard : classes.card}
			onClick={() => onClick(nft.name)}
		>
			{nft.image.slice(-1) === '4' ? (
				<video className={classes.image} src={nft.image} loop={true} autoPlay={true} />
			) : (
				<img className={classes.image} src={nft.image} />
			)}
			<p className={classes.caption}>{nft.name}</p>
		</div>
	)
}

export default NFTCard
