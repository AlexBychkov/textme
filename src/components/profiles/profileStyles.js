import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles((theme) => ({
  modalPaper: {
    position: 'absolute',
    width: '40vw',
    left: '30vw',
    top: '20vh',
    outline: 'none',
  },
  modalPointer: {
    cursor: 'pointer',
    fontWeight: 'normal',
  },

  profileMainGrid: {
    flexWrap: 'nowrap',
  },

  profileHeader: {
    flexBasis: '40%',
    minHeight: '100px',
    backgroundColor: '#4791db',
  },
  profileAvatar: {
    marginTop: '6px',
    marginBottom: '8px',
    width: '60px',
    height: '60px',
    border: '1px solid white',
  },

  profileContactButton: {
    margin: '10px',
  },
  profileAboutLabel: {
    margin: '8px 0px 10px 8px',
  },
  profilePhone: {
    margin: '8px 0px 15px 20px',
  },
  profileAbout: {
    margin: '10px 0px 0px 20px',
  },
}));
