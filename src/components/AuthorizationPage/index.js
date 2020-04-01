import React, {useState} from "react";
import { Button, TextField, Typography, makeStyles } from "@material-ui/core";
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
  const handleOrgChange = (event) => {
      setOrgId(event.target.value)
  }

  return (
    <div>
        <div className={classes.textContainer}>
          <Typography variant="h6">Enter Your Authorization Code </Typography>
          <Typography>If you do not have an authorization code, you may need to complete Organization Registration.</Typography>
        </div>
        
        <TextField className={classes.authCode} id="org-auth-code" label="Authorization Code" variant="outlined" InputLabelProps={{shrink: true}} value={orgId} onChange={handleOrgChange}/>
        <Button className={classes.submitButton} fullWidth variant="contained" onClick={submitOrgAuth}>Submit</Button>
    </div>);
};

const useStyles = makeStyles(() => ({
  textContainer: {
    marginBottom: '1rem'
  },
  authCode: {
    marginBottom: '1rem'
  },
  submitButton: {
    textTransform: 'none'
  }
}));