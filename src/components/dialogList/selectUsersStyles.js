import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
	formGroup: {
		padding: '15px'
	},
	field: {
		width: '210px'
	},
	closeIcon: {
		position: 'absolute',
		top: '10px',
		right: '10px',
		color: '#000',
		cursor: 'pointer',
	}
}))