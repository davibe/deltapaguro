const path = require('path')

interface LocalConfiguration {
  replaceLink?: () => void,
  pageWrapper?: (content: string, filePath: string) => string
}

const getLocalConfiguration = (): LocalConfiguration => {
  try {
    return require(
      path.join(process.cwd(), '.deltapaguro.conf.js')
    )
  } catch (e) {
    return {}
  }
}

export default getLocalConfiguration()