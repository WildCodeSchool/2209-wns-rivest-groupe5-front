import { styled, alpha } from '@mui/material/styles'
import InputBase from '@mui/material/InputBase'
import SearchIcon from '@mui/icons-material/Search'
import { useEffect, useRef, useState } from 'react'
import { SEARCH_USERS } from '../../graphql/mutations/users/searchUsersQuery'
import { useLazyQuery } from '@apollo/client'
import { useDebounce } from 'use-debounce'
import { UserInterface } from '../../interfaces/user'
import UserAvatar from './UserAvatar'
import { Link } from 'react-router-dom'
import { Tooltip } from '@mui/material'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}))

const SearchResults = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: '100%',
  left: '0',
  width: '100%',
  backgroundColor: 'white',
  paddingTop: theme.spacing(3),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
  borderRadius: '8px',
}))

const StyledLink = styled(Link)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  alignItems: 'center',
  textDecoration: 'none',
  backgroundColor: 'transparent',
  padding: theme.spacing(1),
  borderRadius: '5px',
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
  },
}))

const SearchUsersBar = () => {
  const [searchValue, setSearchValue] = useState('')
  const [debouncedSearchValue] = useDebounce(searchValue, 350) // wait for 350ms after user stops typing
  const [searchResults, setSearchResults] = useState([])
  const [isResultsBoxOpen, setIsResultsBoxOpen] = useState(false)
  const searchResultsRef = useRef<HTMLDivElement>(null) // reference to the search results box

  const [searchUsers, { loading }] = useLazyQuery(SEARCH_USERS, {
    variables: { searchString: debouncedSearchValue.toLowerCase().trim() },
    onCompleted: (data) => {
      setSearchResults(data?.searchPublicUsers)
    },
  })

  const handleSearch = async (value: string) => {
    setSearchValue(value)
    await searchUsers()
  }

  useEffect(() => {
    setIsResultsBoxOpen(searchValue !== '') // searchValue, open results box

    // close the search results box when clicking outside of the input and the search results box
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        searchResultsRef.current &&
        !searchResultsRef.current.contains(event.target as Node) && // clicked element is not a child of searchResultsRef
        !event?.target?.toString().includes('profile') // check if the click was on a profile link, if contains "profile" means we don't close the results box because link won't be reachable
      ) {
        setIsResultsBoxOpen(false)
        setSearchValue('')
      }
    }
    document.addEventListener('click', handleOutsideClick)
    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [searchValue])

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <Tooltip
        title="Rechercher par nom, prénom ou email exact"
        arrow
        placement="right"
      >
        <StyledInputBase
          placeholder="Rechercher un ami..."
          inputProps={{ 'aria-label': 'search' }}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setIsResultsBoxOpen(searchValue !== '')} // open results box when input is focused and there are search results
          value={searchValue}
        />
      </Tooltip>
      {isResultsBoxOpen && (
        <SearchResults ref={searchResultsRef}>
          {searchResults.length > 0 ? (
            searchResults.map((userFound: UserInterface) => (
              <StyledLink
                to={`/profile/${userFound.userId}`}
                key={userFound.userId}
                onClick={() => {
                  setSearchValue('')
                  setIsResultsBoxOpen(false)
                }}
              >
                <UserAvatar user={userFound} />
                {userFound.firstname} {userFound.lastname}
              </StyledLink>
            ))
          ) : (
            <p style={{ color: 'black' }}>Aucun utilisateur trouvé.</p>
          )}
        </SearchResults>
      )}
    </Search>
  )
}

export default SearchUsersBar
