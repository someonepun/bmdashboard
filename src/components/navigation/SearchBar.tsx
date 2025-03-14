"use client"

import type React from "react"
import { useState } from "react"
import { InputBase, IconButton, Paper, Popper, Grow, ClickAwayListener, useTheme } from "@mui/material"
import { Search as SearchIcon, Close as CloseIcon } from "@mui/icons-material"

interface SearchBarProps {
  placeholder?: string
  onSearch?: (query: string) => void
}

/**
 * SearchBar component for the top navigation
 *
 * @param placeholder - Placeholder text for the search input
 * @param onSearch - Callback function when search is submitted
 */
export const SearchBar: React.FC<SearchBarProps> = ({ placeholder = "Search...", onSearch }) => {
  const theme = useTheme()
  const [query, setQuery] = useState("")
  const [open, setOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleToggle = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
    setOpen((prevOpen) => !prevOpen)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (onSearch && query.trim()) {
      onSearch(query.trim())
    }
  }

  const handleClear = () => {
    setQuery("")
  }

  return (
    <>
      <IconButton color="inherit" aria-label="search" onClick={handleToggle} size="medium">
        <SearchIcon />
      </IconButton>

      <Popper
        open={open}
        anchorEl={anchorEl}
        placement="bottom-end"
        transition
        disablePortal
        style={{ zIndex: theme.zIndex.appBar + 1 }}
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps} style={{ transformOrigin: "right top" }}>
            <div>
              <ClickAwayListener onClickAway={handleClose}>
                <Paper
                  elevation={3}
                  sx={{
                    p: "2px 4px",
                    display: "flex",
                    alignItems: "center",
                    width: { xs: 250, sm: 300, md: 350 },
                    m: 1,
                  }}
                >
                  <form onSubmit={handleSubmit} style={{ display: "flex", width: "100%" }}>
                    <InputBase
                      sx={{ ml: 1, flex: 1 }}
                      placeholder={placeholder}
                      inputProps={{ "aria-label": "search" }}
                      value={query}
                      onChange={handleChange}
                      autoFocus
                    />
                    {query && (
                      <IconButton size="small" aria-label="clear" onClick={handleClear}>
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    )}
                    <IconButton type="submit" aria-label="search" sx={{ p: "10px" }}>
                      <SearchIcon />
                    </IconButton>
                  </form>
                </Paper>
              </ClickAwayListener>
            </div>
          </Grow>
        )}
      </Popper>
    </>
  )
}

