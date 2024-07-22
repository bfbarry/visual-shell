import { FC } from "react";

interface PandasDescribeValue {
  count: number;
  mean: number;
  std: number;
  min: number;
  '25%': number;
  '50%': number;
  '75%': number;
  max: number;
}

interface PandasDescribeDict {
  [column: string]: PandasDescribeValue
}

export const CSVHandler:FC<{data: PandasDescribeDict}> = ({ data }) => {
  // const [ DescribeData, setDescribeData ] = useState(data);

  return (
    <div className=" bg-zinc-500 flex max-h-[500px]">
      <div>
      <table className ="float-right" border="1" cellPadding="5" cellSpacing="0">
        <thead>
          <tr><td><br/></td></tr>
          <tr>
            <td>Count</td>
          </tr>
          <tr>
            <td>Mean</td>
          </tr>
          <tr>
            <td>Std</td>
          </tr>
          <tr>
            <td>Min</td>
          </tr>
          <tr>
            <td>25%</td>
          </tr>
          <tr>
            <td>50%</td>
          </tr>
          <tr>
            <td>75%</td>
          </tr>
          <tr>
            <td>Max</td>
          </tr>
        </thead>
      </table>
      </div>
      <div className="overflow-x-auto">
        {Object.entries(data).map(([column, stats]) => (
          <div key={column} className ="float-left">
          <table border="1" cellPadding="5" cellSpacing="0">
            <thead>
                <tr>
                    <th>{column}</th>
                </tr>
            </thead>
            <tbody>
              <tr>
                <td>{stats.count}</td>
              </tr>
              <tr>
                <td>{stats.mean}</td>
              </tr>
              <tr>
                <td>{stats.std}</td>
              </tr>
              <tr>
                <td>{stats.min}</td>
              </tr>
              <tr>
                <td>{stats['25%']}</td>
              </tr>
              <tr>
                <td>{stats['50%']}</td>
              </tr>
              <tr>
                <td>{stats['75%']}</td>
              </tr>
              <tr>
                <td>{stats.max}</td>
              </tr>
            </tbody>
          </table>
          </div>
        ))}
      </div>
    </div>
  )
}