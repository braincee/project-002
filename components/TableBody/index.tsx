import { Checkbox } from "@mui/joy";

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
  } = props;
  return (
    <tbody>
      {stableSort(list, getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((content: any, index) => {
          const isItemSelected = isSelected(content.id.toString());
          const labelId = `enhanced-table-checkbox-${index}`;

          return (
            <tr
              onClick={(event) => handleClick(event, content.id.toString())}
              role="checkbox"
              aria-checked={isItemSelected}
              tabIndex={-1}
              key={content.id}
              // selected={isItemSelected}
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
              <th id={labelId} scope="row">
                {content.title}
              </th>
              <td>{content.description}</td>
              <td>{content.Addresses.length}</td>
              <td>{new Date(content.created_at).toDateString()}</td>
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
