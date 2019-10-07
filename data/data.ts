const mainUrl = 'http://computer-database.herokuapp.com/computers'

const urls = {
  main: mainUrl,
  addComputer: `${mainUrl}/new`,
}

enum Companies {
  appleInc = 'Apple Inc.',
  thinkingMachines = 'Thinking Machines',
  rCA = 'RCA',
  netronics = 'Netronics',
  tandyCorporation = 'Tandy Corporation',
  commodoreInternational = 'Commodore International',
  mOSTechnology = 'MOS Technology',
  microInstrumentation = 'Micro Instrumentation and Telemetry Systems',
  iMSAssociatesInc = 'IMS Associates, Inc.',
  digitalEquipmentCorporation = 'Digital Equipment Corporation',
  lincolnLaboratory = 'Lincoln Laboratory'
}

export {urls, Companies}
