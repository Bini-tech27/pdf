type TableProps = {
    headers: string[];
    rows: ({data:string,title:string,classname?:string,span?:number})[][];
    className?: string;
  };
  
  
  export const Table: React.FC<TableProps> = ({ headers, rows, className = ""  }) => {
    const span= Math.floor(12/headers.length)
    return (
      <table className={`w-full text-sm mb-10 text-center border-collapse border border-black ${className}`}>
        <thead className="bg-[#00b0f0] text-white">
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="px-4 py-2 border-t border-b border-black" colSpan={span}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className= {`border border-black px-4 py-2  ${cell.classname}`} colSpan={cell.span}>
                  {`${cell.title !='' && cell.title} ${cell.data}`}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };