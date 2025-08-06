import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Typography, Button, Stack } from "@mui/material";

export default function MgrTeam() {
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);


  useEffect(() => {
    const managerId = localStorage.getItem("empId");
    fetch(`http://localhost:8080/employees/team/${managerId}`, {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`
            }
    })
  .then(res => res.json())
    .then(data => {
      setMembers(data);
      setFilteredMembers(data);
    })
    .catch(err => console.error(err));
}, []);

const filterByRole = (role) => {
  if (role === "All") {
    setFilteredMembers(members);
  } else {
    setFilteredMembers(members.filter(m => (m.empRole || m.role) === role));
  }
};

  return (
    <Paper sx={{ padding: 2 }}>
      <Typography variant="h5" gutterBottom>Your Team</Typography>

      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
       <Button variant="outlined" onClick={() => filterByRole("All")}>All</Button>
        <Button variant="outlined" onClick={() => filterByRole("ROLE_DEVELOPER")}>Developers</Button>
        <Button variant="outlined" onClick={() => filterByRole("ROLE_TESTER")}>Testers</Button>
      </Stack>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredMembers.map((member) => (
            <TableRow key={member.id}>
              <TableCell>{member.empName}</TableCell>
              <TableCell>{member.empRole}</TableCell>
              <TableCell>{member.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
