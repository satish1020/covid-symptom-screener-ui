import React, {useEffect, useState} from "react";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Typography } from "@material-ui/core";
import { getOrganizations } from "../../services/organizations";

export const OrganizationsSection = () => {
  const [organizations, setOrganizations] = useState([])

  const fetchOrgs = async () => {
    const res = await getOrganizations();
    setOrganizations(res)
  }

  useEffect(() => {
    fetchOrgs()
  }, [])

   return (
    <div>
        <Typography>{organizations.length} organizations</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Organization</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Job title</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Phone</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          </TableBody>
        </Table>
      </TableContainer>
    </div>);
};