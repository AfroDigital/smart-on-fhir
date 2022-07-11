import _ from 'lodash'

/* global chrome */
const tabs = _.get(chrome, 'tabs')
if (!tabs) {
  console.error('chrome.tabs not found', tabs)
  console.warn('is {"permissions": ["activeTab"]} in the manifest.json ?')
}

const scripting = _.get(chrome, 'scripting')
if (!scripting) {
  console.error('chrome.scripting not found', scripting)
  console.warn('is {"permissions": ["scripting"]} in the manifest.json ?')
}

const storage = _.get(chrome, 'storage.sync')
if (!storage) {
  console.error('chrome.storage not found', storage)
  console.warn('is {"permissions": ["storage"]} in the manifest.json ?')
}

export { tabs, scripting, storage }
