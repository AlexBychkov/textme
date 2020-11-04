import React from "react";
import { Grid, Avatar, Typography, Button } from "@material-ui/core";
import { useStyles } from "./profileStyles";
import SmartphoneIcon from "@material-ui/icons/Smartphone";
import { withRouter } from "react-router-dom";



const Profile = (props) => {
	const classes = useStyles();
	const { history } = props;
	

	return (
		<Grid container direction="column" className={classes.profileMainGrid}>
			<Grid
				container
				direction="column"
				alignItems="center"
				className={classes.profileHeader}
				item
				xs={12}
			>
				<Avatar classes={{ root: classes.profileAvatar }}>R</Avatar>
				<Typography variant="h5">Name</Typography>
				<Typography variant="caption">Status text</Typography>
			</Grid>
			<Grid
				item
				container
				direction="column"
				xs={12}
				alignItems="center"
			>
				<Button
					variant="contained"
					color="secondary"
					onClick={() => history.push("/contactList")}
					classes={{ root: classes.profileContactButton }}
				>
					contacts
				</Button>
				<Grid item container direction="column">
					<Typography classes={{ root: classes.profilePhone }}>
						<SmartphoneIcon fontSize="small" /> +7 900 958 04 32
					</Typography>
					<Typography
						variant="caption"
						className={classes.profileAboutLabel}
					>
						About
					</Typography>
					<Typography classes={{ root: classes.profileAbout }}>
						I like diving and some other stuff
					</Typography>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default withRouter(Profile);
