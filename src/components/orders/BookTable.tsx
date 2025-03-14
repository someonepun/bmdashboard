"use client"

import type React from "react"
import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Avatar,
  Box,
  Typography,
  Paper,
  TablePagination,
  useTheme,
} from "@mui/material"
import type { Seller } from "../../types"
import { StatusChip } from "../StatusChip"
import { formatCurrency } from "../../utils/formatters"

interface BookTableProps {
  seller: Seller
  sellerIndex: number
}

/**
 * BookTable component displays a table of books for a seller
 *
 * @param seller - The seller data
 * @param sellerIndex - Index of the seller
 */
export const BookTable: React.FC<BookTableProps> = ({ seller, sellerIndex }) => {
  const theme = useTheme()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  // Handle page change
  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage)
  }

  // Handle rows per page change
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10))
    setPage(0)
  }

  // Calculate displayed books based on pagination
  const displayedBooks = seller.books.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Avatar
          sx={{
            mr: 2,
            bgcolor: theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[800],
            color: "text.secondary",
          }}
        >
          {seller.avatar}
        </Avatar>
        <Typography variant="h6">{seller.name}</Typography>
      </Box>

      <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
        <Table aria-label={`${seller.name} books table`}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={false}
                  color="primary"
                  inputProps={{
                    "aria-label": "select all books",
                  }}
                />
              </TableCell>
              <TableCell>Book Info</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Cost</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedBooks.map((book) => (
              <TableRow key={book.id} hover role="checkbox" tabIndex={-1}>
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    inputProps={{
                      "aria-labelledby": `book-${book.id}`,
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar
                      variant="square"
                      sx={{
                        mr: 2,
                        bgcolor:
                          book.image === "primary"
                            ? theme.palette.primary.main
                            : theme.palette.mode === "light"
                              ? theme.palette.grey[100]
                              : theme.palette.grey[800],
                        color: book.image === "primary" ? theme.palette.primary.contrastText : "text.secondary",
                      }}
                    >
                      {book.title.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography id={`book-${book.id}`}>{book.title}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        by {book.author}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>{book.quantity}</TableCell>
                <TableCell>{formatCurrency(book.cost)}</TableCell>
                <TableCell>
                  <StatusChip status={book.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={seller.books.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Rows per page:"
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} of ${count}`}
        />
      </TableContainer>
    </Box>
  )
}

