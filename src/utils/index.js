export function checkResources (props) {
  const queryRes = getResource(props, '/query')
  const createRes = getResource(props, '/add')
  const modifyRes = getResource(props, '/modify')
  const authorizeRes = getResource(props, '/authorize')
  const importRes = getResource(props, '/import')
  const exportRes = getResource(props, '/export')
  const detailRes = getResource(props, '/detail')

  return {
    canQuery: !!queryRes,
    canModify: !!modifyRes,
    queryRes,
    createRes,
    modifyRes,
    authorizeRes,
    importRes,
    exportRes,
    detailRes
  }
}

export function getResource (props, url) {
  url = props.location.pathname + url
  return props.resources.find(resource => resource.linkUrl === url)
}

export function getSystem () {
  let system = ''
  const pathname = window.location.href

  if (pathname.indexOf('/aas') > -1) {
    system = 'aas'
  } else if (pathname.indexOf('/ams') > -1) {
    system = 'ams'
  }

  return system
}

