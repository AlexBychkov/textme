import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => {
  return ({
    modalPaper: {
      position: 'absolute',
      marginLeft: 'auto',
      marginRight: 'auto',
      left: 0,
      right: 0,
      textAlign: 'center',
      width: '500px',
      top: '20vh',
      outline: 'none',
      borderRadius: '15px',
      [theme.breakpoints.down("xs")]: {
        width: '90vw',
      },
      '@media (max-height: 500px) and (orientation: landscape)': {
        borderRadius: '0px',
        top: '0',
        height: '100%',
        overflowY: 'scroll'
      }
    },
    modalPointer: {
      cursor: 'pointer',
      fontWeight: 'normal',
    },
  
    profileHeader: {
      flexBasis: '40%',
      minHeight: '100px',
      backgroundColor: '#4791db',
      borderRadius: '12px 12px 0px 0px',
      '@media (max-height: 500px) and (orientation: landscape)' : {
        borderRadius: '0'
      }
    },
    closeIcon: {
      position: 'absolute',
      top: '10px',
      right: '10px',
      color: '#ffffff',
      cursor: 'pointer',
    },
    profileAvatar: {
      marginTop: '6px',
      marginBottom: '8px',
      width: '60px',
      height: '60px',
      boxShadow: '0px 0px 5px 1px #ffffff',
    },
    profileContentContainer: {
      padding: '15px',
    },
    profilePaddings: {
      padding: '5px',
    },
    profileSecondaryText: {
      color: 'rgba(0,0,0,0.54)',
    },
    profileTextFields : {
      width: '250px',
      paddingBottom: '8px',
      [theme.breakpoints.down("xs")]: {
        width: '200px',
      }
    },
    profileButton: {
      margin: '6px',
    },
    smallScreenProfileModal: {
      borderRadius: 'none',
      top: 0,
      width: '100vw',
    },
  })
});
