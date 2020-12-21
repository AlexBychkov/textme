import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
	container : {
		margin: '20px auto 0 auto'
	},
	itemContainer: {
		display: 'flex',
		flexDirection: 'column',
		margin: '10px 0',
		backgroundColor: '#f6f6f6',
		cursor: 'pointer',
	},
	lastMessageContainer: {
		justifyContent: 'center',
		color: 'rgba(0,0,0,0.54)',
		padding: '6px'
	},
	marginHorizontal : {
		margin: '0 6px'
	},
	paper : {
		position: 'absolute',
		width: 400,
		marginLeft: 'auto',
    marginRight: 'auto',
    left: 0,
		right: 0,
		top: '20vh',
    textAlign: 'center',
    backgroundColor: theme.palette.background.paper,
    borderRadius: '12px',
    boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
		outline: 'none'
	}
}))