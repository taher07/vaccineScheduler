import style from "./Table.module.css"
import { nanoid } from 'nanoid'

const Table = ({ columns = [], rows = [] }) => {
  const renderHeader = () => columns && columns.map(column => <div>{column}</div>)

  const renderRow = row => (
    row.map(r => (
      <div key={nanoid()}>
        {r}
      </div>
    ))
  )

  const renderRows = () => rows && rows.map(row => {
    return (
      <div className={style.row} key={nanoid()} style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}>
        {renderRow(row)}
      </div>
    )
  })

  return rows.length ? (
    <div className={style.table}>
      <div className={style.header} style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}>
        {renderHeader()}
      </div>
      <div className={style.body}>
        {renderRows()}
      </div>
    </div>
  ) : (
    <div className={style.table}>
      <h3>No record found!</h3>
    </div>
  )
}

export default Table
