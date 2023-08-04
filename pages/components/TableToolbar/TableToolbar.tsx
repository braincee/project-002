import { Add } from "@mui/icons-material";
import { Box, Button, Tooltip, Typography } from "@mui/joy";

interface TableToolbarProps {
  numSelected: number;
  handleAccess: () => void;
  buttonName: string;
  tableHeader: string;
}

const TableToolbar = (props: TableToolbarProps) => {
  const { numSelected, handleAccess , buttonName, tableHeader} = props;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        py: 1,
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: 'background.level1',
        }),
        borderTopLeftRadius: 'var(--unstable_actionRadius)',
        borderTopRightRadius: 'var(--unstable_actionRadius)',
      }}
    >
      {numSelected > 0 ? (
        <Typography sx={{ flex: '1 1 100%' }} component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          level="h4"
          sx={{ flex: '1 1 100%' }}
          id="tableTitle"
          component="div"
        >
          {tableHeader}
        </Typography>
      )}

      {numSelected > 0 && (
        <Tooltip title="Add">
          <Button startDecorator={<Add />} size="sm" color="primary" variant="solid" onClick={() => handleAccess()}>
            {buttonName}
          </Button>
        </Tooltip>
      )}
    </Box>
  );
}

export default TableToolbar;