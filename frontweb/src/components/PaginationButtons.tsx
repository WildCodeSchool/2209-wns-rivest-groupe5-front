import { Button } from '@mui/material'
import { IPaginatedResult } from '../interfaces/paginatedResult'
import { theme } from '../assets/Styles/theme'

const PaginationButtons = ({
  items,
  handleLoadNewResults,
}: {
  items: IPaginatedResult<any>
  handleLoadNewResults: (newPage: number) => Promise<void>
}) => {
  return (
    <div style={{ display: 'flex' }}>
      {items?.currentPage > 1 && (
        <Button
          onClick={async () =>
            await handleLoadNewResults(items.currentPage - 1)
          }
          style={{
            marginRight: 'auto',
            color: theme.palette.primary.main,
          }}
        >
          Page Précédente
        </Button>
      )}
      {items?.currentPage < items?.totalPages && (
        <Button
          onClick={async () =>
            await handleLoadNewResults(items.currentPage + 1)
          }
          style={{
            marginLeft: 'auto',
            color: theme.palette.primary.main,
          }}
        >
          Page Suivante
        </Button>
      )}
    </div>
  )
}

export default PaginationButtons
