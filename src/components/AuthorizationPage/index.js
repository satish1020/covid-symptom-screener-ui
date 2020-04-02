import React, {useState} from "react";
import { Button, TextField, Typography, makeStyles } from "@material-ui/core";
import PageTitle from '../Shared/components/PageTitle'
//import getOrganization from "../../services/getOrganization";

export const AuthorizationPage = () => {
  const classes = useStyles()
  const [orgId, setOrgId] = useState('')
  const submitOrgAuth = async () => {
      try {
        //const orgGetResp = await getOrganization(orgId)
      } catch {
          //console.log('something\'s gone wrong');
      }
  }
  const cancelAuth = () => {
    //TODO what do we do here
  }
  const handleOrgChange = (event) => {
      setOrgId(event.target.value)
  }

  return (
    <div className={classes.pageContainer}>
        <div className={classes.textContainer}>
          <PageTitle title="Sign in" />
          <Typography>A leader within your company should have provided you with an authorization code to continue.</Typography>
        </div>
        <TextField className={classes.authCode} id="org-auth-code" label="Authorization Code" variant="outlined" InputLabelProps={{shrink: true}} value={orgId} onChange={handleOrgChange}/>
        <Button className={classes.submitButton} fullWidth variant="contained" onClick={submitOrgAuth}>Submit</Button>
        <Button className={classes.cancelButton} fullWidth variant="contained" onClick={cancelAuth}>Cancel</Button>
    </div>);
};

const useStyles = makeStyles(theme => ({
  pageContainer: {
    textAlign: 'center'
  },
  textContainer: {
    margin: '1rem',
    textAlign: 'left',
    marginBottom: '1rem'
  },
  authCode: {
    marginBottom: '1rem',
    maxWidth: '300px',
    width: '90%'
  },
  submitButton: {
    ...theme.buttonPrimary,
    marginBottom: '1rem'
  },
  cancelButton: {
    ...theme.buttonSecondary
  }
}));