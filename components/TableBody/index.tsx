import { Delete } from "@mui/icons-material";
import { Checkbox, IconButton } from "@mui/joy";

interface TableBodyProps {
  stableSort: (value1: any[], value2: any) => any[];
  list: any[];
  getComparator: (value1: any, value2: any) => void;
  order: any;
  orderBy: string;
  page: number;
  rowsPerPage: number;
  isSelected: (value: string) => boolean;
  handleClick: (value1: React.MouseEvent<unknown>, value2: string) => void;
  emptyRows: number;
  name: string;
  handleRemove: (value: string) => void;
  loading: boolean;
}

const TableBody = (props: TableBodyProps) => {
  const {
    stableSort,
    list,
    getComparator,
    order,
    orderBy,
    page,
    rowsPerPage,
    isSelected,
    handleClick,
    emptyRows,
    name,
    handleRemove,
    loading
  } = props;

  return (
    <tbody>
      {stableSort(list, getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((item: any, index) => {
          const isItemSelected = isSelected(item.id.toString());
          const labelId = `enhanced-table-checkbox-${index}`;

          return (
            <tr
              onClick={(event) => handleClick(event, item.id.toString())}
              role="checkbox"
              aria-checked={isItemSelected}
              tabIndex={-1}
              key={item.id}
              style={
                isItemSelected
                  ? ({
                      "--TableCell-dataBackground":
                        "var(--TableCell-selectedBackground)",
                      "--TableCell-headBackground":
                        "var(--TableCell-selectedBackground)",
                    } as React.CSSProperties)
                  : {}
              }
            >
              <th scope="row">
                <Checkbox
                  checked={isItemSelected}
                  slotProps={{
                    input: {
                      "aria-labelledby": labelId,
                    },
                  }}
                  sx={{ verticalAlign: "top" }}
                />
              </th>
              {name && name === "Content" ? (
                <>
                  <th id={labelId} scope="row">
                    {item.title}
                  </th>
                  <td>{item.description}</td>
                  <td>{item.Addresses.length}</td>
                  <td>{new Date(item.created_at).toDateString()}</td>
                  <td>
                    <IconButton onClick={() => handleRemove(item.id)}>
                      <Delete loading={loading ? true: false}/>
                    </IconButton>
                  </td>
                </>
              ) : (
                <>
                  <th id={labelId} scope="row">
                    {item.address}
                  </th>
                  <td>{item.Contents.length}</td>
                  <td>{new Date(item.created_at).toDateString()}</td>
                </>
              )}
            </tr>
          );
        })}
      {emptyRows > 0 && (
        <tr
          style={
            {
              height: `calc(${emptyRows} * 40px)`,
              "--TableRow-hoverBackground": "transparent",
            } as React.CSSProperties
          }
        >
          <td colSpan={6} />
        </tr>
      )}
    </tbody>
  );
};

export default TableBody;
