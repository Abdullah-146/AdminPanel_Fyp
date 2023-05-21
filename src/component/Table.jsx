import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: theme.palette.common.white,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#334155",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Sir Ibarhaim Office", "At office", 6.0, 24, 4.0),
  createData("Cafeteria", 1, 9.0, 37, 4.3),
  createData("Cafeteria", 2, 16.0, 24, 6.0),
  createData("Cafeteria", 3, 3.7, 67, 4.3),
  createData("Cafeteria", 4, 16.0, 49, 3.9),
];

export default function CustomizedTables() {
  return (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: "10px",
        width: "100%",
        overflowX: "hidden",
        maxWidth: 700,
      }}
    >
      <Table
        sx={{ minWidth: 350, maxWidth: 700 }}
        aria-label="customized table"
      >
        <TableHead>
          <TableRow>
            <StyledTableCell>Table</StyledTableCell>
            <StyledTableCell align="center">Label</StyledTableCell>

            <StyledTableCell
              sx={{
                fontWeight: "300",
                fontFamily: "Lexend",
                fontSize: "16px",
                color: "#22222280",
                width: "62px",
              }}
              align="center"
            ></StyledTableCell>
            <StyledTableCell
              sx={{
                fontWeight: "300",
                fontFamily: "Lexend",
                fontSize: "16px",
                color: "#22222280",
                width: "62px",
              }}
              align="center"
            ></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="center">{row.calories}</StyledTableCell>
              <StyledTableCell align="center">
                <div style={{ cursor: "pointer" }}>
                  <ModeEditOutlineIcon />
                </div>
              </StyledTableCell>
              <StyledTableCell align="center">
                <div style={{ cursor: "pointer" }}>
                  <DeleteSweepIcon />
                </div>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
