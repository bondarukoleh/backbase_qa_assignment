import * as faker from 'faker';
import * as moment from 'moment';
import {Companies} from '.'

interface IComputer {
  computerName?: string
  introducedData?: string
  discontinuedData?: string
  company?: Companies
}

const getAnyComputer = (): IComputer => {
  return {
    computerName: faker.company.companyName(),
    introducedData: moment(faker.date.between('1950-01-01', '2019-01-01')).format('YYYY-MM-DD'),
    discontinuedData: moment(faker.date.between('1960-01-01', '2019-01-01')).format('YYYY-MM-DD'),
    company: getRandomCompany() as Companies,
  };
};

const getNotValidFormatData = (): string => moment(faker.date.between('1950-01-01', '2019-01-01')).format('MM-DD-YYYY')

const getRandomCompany = (): string => {
  const companiesLength = Object.keys(Companies).length
  const randomIndex = (min: number, max: number) => Math.round(min - 0.5 + Math.random() * (max - min + 1))
  const randomCompanyName = Object.keys(Companies)[randomIndex(0, companiesLength - 1)]
  return Companies[randomCompanyName]
}

export {getAnyComputer, getNotValidFormatData}
