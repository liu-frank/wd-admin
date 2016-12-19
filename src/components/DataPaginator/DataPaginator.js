import React from 'react'
import Box from 'components/Box'
import classes from './DataPaginator.scss'

export default class DataPaginator extends React.Component {
  props: {
    data: React.propTypes.object.isRequred,
    onSwitch: React.propTypes.func.isRequred
  }

  nextPage () {
    const { currentPage, totalPage } = this.calParams(this.props.data)

    if (currentPage < totalPage - 1) {
      this.props.onSwitch(currentPage + 1)
    }
  }

  prevPage () {
    const { currentPage } = this.calParams(this.props.data)

    if (currentPage > 0) {
      this.props.onSwitch(currentPage - 1)
    }
  }

  firstPage () {
    const { currentPage } = this.calParams(this.props.data)

    if (currentPage !== 0) {
      this.props.onSwitch(0)
    }
  }

  lastPage () {
    const { currentPage, totalPage } = this.calParams(this.props.data)

    if (currentPage !== totalPage - 1) {
      this.props.onSwitch(totalPage - 1)
    }
  }

  switchPage (targetPage) {
    const { currentPage } = this.calParams(this.props.data)

    if (currentPage !== targetPage) {
      this.props.onSwitch(targetPage)
    }
  }

  calParams (data) {
    const { total, currentPage, pageSize } = data
    const start = currentPage * pageSize + 1
    const offset = (data.currentPage + 1) * data.pageSize
    const totalPage = (total % pageSize) ? (parseInt(total / pageSize, 10) + 1) : parseInt(total / pageSize, 10)
    let end = offset > total ? total : offset

    return {
      start,
      end,
      total,
      currentPage,
      pageSize,
      totalPage
    }
  }

  calPaginators (totalPage, currentPage) {
    const paginators = []

    if (totalPage > 9) {
      if (currentPage < 5) {
        for (let i = 0; i < 9; i++) {
          paginators.push(i)
        }
      } else if (currentPage > (totalPage - 5)) {
        for (let i = 0; i < 9; i++) {
          paginators.push(totalPage - 9 + i)
        }
      } else {
        for (let i = 0; i < 9; i++) {
          paginators.push(currentPage - 4 + i)
        }
      }
    } else {
      for (let i = 0; i < totalPage; i++) {
        paginators.push(i)
      }
    }

    return paginators
  }

  render () {
    const { data } = this.props
    const { start, end, total, currentPage, totalPage } = this.calParams(data)
    const paginators = this.calPaginators(totalPage, currentPage)

    if (total === 0) {
      return null
    }

    return (
      <Box.Footer>
        <div className='row' style={{lineHeight: '35px'}}>
          <div className='col-sm-5'>
            当前显示 {start} 到 {end} 条，共 {total} 条
          </div>
          <div className='col-sm-7'>
            <ul className='pagination pagination-sm pull-right' style={{margin: 0}}>
            {
              totalPage > 1
              ? <li
                className={(currentPage === 0) && 'disabled'}
                onClick={this.firstPage.bind(this)}>
                <a className={classes.paginator}>
                  <i className='fa fa-fast-backward' />
                </a>
              </li>
              : null
            }
            {
              totalPage > 1
              ? <li
                className={(currentPage === 0) && 'disabled'}
                onClick={this.prevPage.bind(this)}>
                <a className={classes.paginator}>
                  <i className='fa fa-backward' />
                </a>
              </li>
              : null
            }
              {
                paginators.map((paginator, index) => (
                  <li
                    key={index}
                    className={(currentPage === paginator) && 'active'}
                    onClick={this.switchPage.bind(this, paginator)}>
                    <a className={classes.paginator}>{paginator + 1}</a>
                  </li>
                ))
              }
            {
              totalPage > 1
              ? <li
                className={(currentPage === totalPage - 1) && 'disabled'}
                onClick={this.nextPage.bind(this)}>
                <a className={classes.paginator}>
                  <i className='fa fa-forward' />
                </a>
              </li>
              : null
            }
            {
              totalPage > 1
              ? <li
                className={(currentPage === totalPage - 1) && 'disabled'}
                onClick={this.lastPage.bind(this)}>
                <a className={classes.paginator}>
                  <i className='fa fa-fast-forward' />
                </a>
              </li>
              : null
            }
            </ul>
          </div>
        </div>
      </Box.Footer>
    )
  }
}
